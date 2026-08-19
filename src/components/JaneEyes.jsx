import { useEffect, useRef } from "react"

/*
 * Jane's portrait, watching the pointer.
 *
 * The art ships in two pieces: jane-peek-v2.webp is the whole figure with the eyes
 * left blank, and jane-iris.webp is one iris, drawn once and used for both. Each
 * socket is a hole punched in CSS — an ellipse with overflow hidden — and the
 * iris rides inside it. That is what keeps this honest: the iris cannot escape
 * the eye however far the pointer travels, and the socket crops it exactly the
 * way a lid would.
 *
 * Sockets are stored as percentages of the picture, not pixels, so the rig
 * scales with whatever box the portrait is dropped into.
 *
 * Traced off the white the artist left blank, not eyeballed: these are the
 * bounding boxes of the two blank patches in jane-peek-v2.webp. Her head is tilted
 * and the lower eye is half closed — 5.1% of the height against the upper eye's
 * 7.4% — so the two carry separate boxes rather than one shared size.
 */
const EYES = [
  { cx: 52.038, cy: 53.222, w: 4.937, h: 7.435 }, // her left, the open one
  { cx: 39.773, cy: 65.056, w: 4.389, h: 5.081 }, // her right, half under the lid
]

/*
 * Iris diameter, as a share of the picture's width. One number for both eyes —
 * they are the same eyeball, and sizing each one off its own socket instead
 * made the half-lidded eye's iris the larger of the two, which is what read as
 * a wandering eye.
 *
 * Sized off the narrower socket (4.389%) with room to spare, because the room
 * left over is what the iris has to move in — and that room is shared, see
 * below. Filling the opening edge to edge would leave it nowhere to go.
 *
 * Kept as large as that allows: a small iris ringed by white all round is a
 * stare, not a glance. What is left over here is the eyes' entire range of
 * movement, so this is the one dial that trades gaze for expression — raising
 * it further buys a rounder eye and costs travel one-for-one.
 */
const IRIS = 3.95

/*
 * How far the iris travels from centre, same number for both eyes and both
 * axes.
 *
 * Sharing one number is the point. One gaze moves one head — when each eye got
 * its own leftover room the open eye swung three times as far as the half-lidded
 * one, and an eye that barely moves next to one that does reads as a lazy eye
 * rather than as a lid.
 *
 * Set rather than derived. It used to be whatever room the tighter socket had
 * left over after the iris, which capped the swing at ~2px of a 1000px portrait
 * — below the threshold where anyone reads it as looking at them. The sockets
 * already crop with overflow hidden, so the iris is allowed to run past the
 * rim: at the extremes it presses into the corner and the ellipse takes a sliver
 * off it, which is what an eye at the end of its range actually does. Past ~1.1
 * that sliver turns into a flat edge and the eye reads as strained.
 */
const TRAVEL = 0.8

// Pointer distance, in px, at which the eyes are looking as far as they will
// go. Wide enough that crossing a full-width screen keeps grading the look
// instead of pinning them at the extreme and holding there, which is what makes
// them read as dead.
const REACH = 900
const EASE = 0.12

export default function JaneEyes({ alt, className = "" }) {
  const box = useRef(null)
  const pupils = useRef([])

  useEffect(() => {
    // Honour the same preference the rest of the site does: the portrait still
    // renders, the eyes just hold still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf
    const want = { x: null, y: null }
    const have = EYES.map(() => ({ x: 0, y: 0 }))

    const onMove = (e) => {
      want.x = e.clientX
      want.y = e.clientY
    }

    function loop() {
      const el = box.current
      if (el && want.x !== null) {
        const r = el.getBoundingClientRect()
        EYES.forEach((eye, i) => {
          // Each eye aims from its own centre, so they converge on a near
          // pointer and go parallel on a far one — the same thing real eyes do.
          const ex = r.left + (r.width * eye.cx) / 100
          const ey = r.top + (r.height * eye.cy) / 100
          const dx = want.x - ex
          const dy = want.y - ey
          const d = Math.hypot(dx, dy) || 1
          const pull = Math.min(d / REACH, 1)
          have[i].x += ((dx / d) * pull - have[i].x) * EASE
          have[i].y += ((dy / d) * pull - have[i].y) * EASE

          const p = pupils.current[i]
          if (!p) return
          // One distance, off the picture's width on both axes, so the two eyes
          // move as a pair. The half-lidded one is shorter than the iris is
          // wide, so its vertical share of that travel just slides further
          // under the lid — which is what looking up does to a half-shut eye.
          const t = (r.width * TRAVEL) / 100
          p.style.transform = `translate3d(calc(-50% + ${have[i].x * t}px), calc(-50% + ${have[i].y * t}px), 0)`
        })
      }
      raf = requestAnimationFrame(loop)
    }

    // mousemove, like JennyPeek — the head that already does this on the other
    // person's page listens on the same event, and the pair should agree.
    window.addEventListener("mousemove", onMove)
    loop()
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={box} className={`relative select-none ${className}`}>
      <img src="/ip/jane-peek-v2.webp" alt={alt} className="block h-auto w-full" />
      {EYES.map((eye, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute overflow-hidden rounded-[50%]"
          style={{
            left: `${eye.cx}%`,
            top: `${eye.cy}%`,
            width: `${eye.w}%`,
            // A share of the box's height, which is what a CSS percentage
            // height resolves against — so w and h are measured against
            // different axes of the art. The box takes its height from the
            // image's own aspect, so the two stay in step regardless.
            height: `${eye.h}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            // Braces matter: React 19 reads a ref callback's return value as a
            // cleanup function, and the bare assignment would hand it the node.
            ref={(el) => {
              pupils.current[i] = el
            }}
            src="/ip/jane-iris.webp"
            alt=""
            className="absolute top-1/2 left-1/2 max-w-none"
            // One diameter for both eyes, so it is expressed against whichever
            // socket it lands in. Square art: in the open eye it sits clear of
            // the rim all round, and in the half-closed one it is taller than
            // the socket and gets cropped top and bottom — which is the lid.
            style={{ width: `${(IRIS / eye.w) * 100}%`, transform: "translate(-50%, -50%)" }}
          />
        </span>
      ))}
    </div>
  )
}

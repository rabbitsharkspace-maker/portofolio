import { useEffect, useMemo, useRef, useState } from "react"
import TextPressure from "./TextPressure"
import ScrollFloat from "./ScrollFloat"
import CircularText from "./CircularText"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * Scroll-driven hero, in three beats.
 *
 *   rest      the wordmark alone, centred, with the scroll hint under it. The
 *             rocket waits below the fold and no copy has arrived yet.
 *   lift-off  the rocket climbs from under the fold, through the wordmark, to
 *             the top of the frame while the wordmark rises and dims.
 *   copy      the three lines take the middle of the screen, swapping as the
 *             scroll runs out.
 *
 * Each line floats in character by character the first time it is reached and
 * is plain text on every later pass — `played` is what remembers that, so
 * scrolling back up doesn't replay the whole hero.
 *
 * Transforms are written straight to the nodes inside rAF — putting scroll
 * position in React state would re-render the whole hero on every frame.
 */

// Progress marks along the section, 0 (top) to 1 (bottom).
// The section is tall (see height below) so each of these fractions is a long
// stretch of scroll — the copy changes slowly enough to read, one line at a
// time, rather than flicking past.
const COPY_IN = 0.3 // first line arrives, and the mark clears out of its way
const LINE_2 = 0.55
const LINE_3 = 0.78
/*
 * The mark's journey, in three beats:
 *
 *   rest     nothing but the wordmark. The mark waits under the fold and the
 *            ring has not faded in yet, so RABBIT and SHARK are clean.
 *   arrive   as the copy takes the middle, the mark rises into the empty lower
 *            half and settles inside the ring, which fades up around it. It
 *            stays there, under each line, for the whole read.
 *   lift-off only once the last line is up does it climb — straight up and
 *            swelling, the loud part — and then it arcs into the top-left
 *            corner and shrinks down to sit there as the site's logo. The ring
 *            is a launch pad, not a passenger: it is pinned at LOW_Y and never
 *            moves, so the mark flies up out of it.
 */
const START_Y = 0.86 // under the fold, where the mark waits before it is called
const LOW_Y = 0.3 // where it settles, in screens below centre, ringed
const BOTTOM_AIR = 34 // px kept under the ring, whatever the window's height
const COPY_CLEAR = 56 // px kept between the copy's middle and the ring's top edge
const FLY_START = LINE_3 // nothing moves it until the last line has landed
const FLY_END = 1
// Where the flight ends: the mark parked in the corner as the wordmark's stand-in
// for the rest of the page. The inset matches the nav's top-5. The flight aims at
// this element's measured box rather than at these numbers — the mark is wider
// than it is tall, so half of DOCK_SIZE is not its vertical centre.
const DOCK_SIZE = 46
const DOCK_INSET = 20
const PEAK = 0.42 // the point in the flight where the mark is at its biggest
const PEAK_SCALE = 2.2
const HOVER_GROW = 0.22 // how much it swells under the pointer, still on the pad
// Past this the flight is close enough to done that the hand-off to the docked
// mark — same spot, same size — cannot be seen.
const HANDOFF = 0.99
/*
 * Leaving the atmosphere. One value, --night, runs the whole scene change: the
 * sky, the stars, the moon and the colour of the copy all read off it, so they
 * can never drift apart. It arrives early in the climb and — this is the part
 * that matters — clears again before the section ends. The page below is cream,
 * so a hero that handed over still deep in space would slam into it. The launch
 * is a moment the page passes through, not a state it stays in.
 */
const NIGHT_IN = [0.05, 0.45]
const NIGHT_OUT = [0.86, 1]
const STAR_COUNT = 90

export default function RocketStage() {
  const { lang } = useLang()
  const T = ui[lang]
  const LINES = T.heroLines
  const outer = useRef(null)
  // Not `frame` — the scroll loop below declares a function by that name, and it
  // would shadow this ref inside the very effect that needs it.
  const stage = useRef(null)
  const rocket = useRef(null)
  const dock = useRef(null)
  const ring = useRef(null)
  const trail = useRef(null)
  const word = useRef(null)
  const hint = useRef(null)
  const played = useRef(new Set())
  // Pointer state, eased in the frame loop rather than by a CSS transition:
  // the transform below is rewritten every frame, so a transition on it would
  // never settle. `want` is where the pointer says it should be, `have` chases.
  const hover = useRef({ want: 0, have: 0 })
  const [step, setStep] = useState(-1) // -1 = nothing but the wordmark

  useEffect(() => {
    let raf
    let last = -2
    let wasLit = null

    function frame() {
      const el = outer.current
      if (el) {
        const r = el.getBoundingClientRect()
        const travel = r.height - window.innerHeight
        const p = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 0

        const vh = window.innerHeight
        // Two moves, and they don't overlap. `rise` walks the mark up from under
        // the fold into the ring as the copy arrives; `t` runs the flight to the
        // corner once the last line is up. Smoothstep on both so it eases into
        // the ring and eases into the corner rather than jerking at either end.
        const a = Math.min(Math.max(p / COPY_IN, 0), 1)
        const rise = a * a * (3 - 2 * a)
        const t = Math.min(Math.max((p - FLY_START) / (FLY_END - FLY_START), 0), 1)
        // The flight curves because the two axes are paced differently: the
        // climb eases (leads), the sideways swing is quadratic (lags). So the
        // mark goes straight up out of the ring first and only leans into the
        // corner near the end, rather than sliding there on a diagonal.
        const climb = t * t * (3 - 2 * t)
        const swing = t * t
        /*
         * Where the pair parks. LOW_Y is a fraction of the viewport but the ring
         * is a fixed pixel size, so on a short window the ring ate the fraction
         * and its bottom arc ran off the fold. Pull the station up far enough to
         * keep BOTTOM_AIR under the ring whenever the proportional spot would
         * not — tall windows are unaffected, short ones stop clipping.
         */
        const ringH = ring.current ? ring.current.offsetHeight : 0
        // …but never so far up that it climbs into the copy, which owns the
        // middle. Under about 640px of height the two cannot both be satisfied,
        // and a ring grazing the bottom edge beats one sitting on the words.
        const low = Math.max(
          Math.min(LOW_Y * vh, vh / 2 - ringH / 2 - BOTTOM_AIR),
          ringH / 2 + COPY_CLEAR,
        )
        /*
         * Everything in the sticky grid shares one cell, so they all centre on
         * the ROW — and the wordmark makes that row taller than the frame, which
         * parks the row's middle below the screen's. Both offsets above are
         * measured from the screen's middle, so take the difference back out or
         * they land low by half the overflow.
         */
        const rowOff = ring.current ? ring.current.offsetTop + ringH / 2 - vh / 2 : 0
        // The ring is centred in the same cell, so it also stands in for where
        // the mark sits before any transform — both axes are measured off it.
        const cx = ring.current
          ? ring.current.offsetLeft + ring.current.offsetWidth / 2
          : window.innerWidth / 2
        // Aim at the docked mark itself, measured. Nothing about the corner has
        // to be worked out from constants that way, so the two land on each
        // other exactly however the image is proportioned or sized.
        const d = dock.current
          ? dock.current.getBoundingClientRect()
          : { x: DOCK_INSET, y: DOCK_INSET, width: DOCK_SIZE, height: DOCK_SIZE }
        const dx = d.x + d.width / 2
        const dy = d.y + d.height / 2
        const y = START_Y * vh - rise * (START_Y * vh - low) + climb * (dy - vh / 2 - low) - rowOff
        const x = swing * (dx - cx)
        if (rocket.current) {
          /*
           * Size tells the whole story of the flight. It leaves the pad growing
           * — coming at the viewer, biggest at PEAK, the moment the launch is
           * meant to land — and from there it falls away to exactly the docked
           * mark's size, so the swap at the end has nothing to give away.
           */
          const g = Math.min(t / PEAK, 1)
          const s = Math.min(Math.max((t - PEAK) / (1 - PEAK), 0), 1)
          const shed = s * s * (3 - 2 * s)
          const w = rocket.current.offsetWidth
          const docked = w ? d.width / w : 1
          const grown = 1 + (PEAK_SCALE - 1) * (g * g * (3 - 2 * g))
          // The pointer only has a say while it is still on the pad — once it is
          // flying, the flight owns the scale.
          hover.current.have += (hover.current.want - hover.current.have) * 0.12
          const lean = 1 + HOVER_GROW * hover.current.have * (1 - t)
          const scale = (grown * (1 - shed) + docked * shed) * lean
          rocket.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          rocket.current.style.opacity = t < HANDOFF ? "1" : "0"
          // Big enough to swallow the page mid-flight, so it stops taking the
          // pointer the moment it leaves the pad.
          rocket.current.style.pointerEvents = t > 0.02 ? "none" : "auto"
        }
        if (dock.current) dock.current.style.opacity = t < HANDOFF ? "0" : "1"
        // The ring holds station at LOW_Y and only fades: up with the mark's
        // arrival, then a long dissolve that starts once the second line is up
        // and runs to the end, so it is gone by the time the section hands over
        // rather than left burning under an empty frame.
        if (ring.current) {
          const out = Math.min(Math.max((p - LINE_2) / (FLY_END - LINE_2), 0), 1)
          ring.current.style.opacity = String(rise * (1 - out))
          ring.current.style.transform = `translate3d(0, ${low - rowOff}px, 0)`
        }
        if (trail.current) {
          // The exhaust belongs to the climb only. It draws out under the mark
          // on the way up, then burns off through the arc — a plume hanging off
          // a logo parked in the corner would read as a leftover, not a flight.
          const plume = Math.min(t / PEAK, 1)
          const spent = Math.min(Math.max((t - PEAK) / 0.3, 0), 1)
          trail.current.style.height = `${plume * 46}vh`
          trail.current.style.opacity = String(plume * 0.6 * (1 - spent))
          trail.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
        if (stage.current) {
          // Up on the way out, back down on approach. The two ramps are written
          // as one value so the sky can never be caught half-lit at handover.
          const ni = Math.min(Math.max((t - NIGHT_IN[0]) / (NIGHT_IN[1] - NIGHT_IN[0]), 0), 1)
          const no = Math.min(Math.max((t - NIGHT_OUT[0]) / (NIGHT_OUT[1] - NIGHT_OUT[0]), 0), 1)
          const night = ni * ni * (3 - 2 * ni) * (1 - no * no * (3 - 2 * no))
          stage.current.style.setProperty("--night", night.toFixed(4))
          // The stars keep twinkling behind a fully transparent sky otherwise —
          // compositing work for something nobody can see, on every frame of the
          // long stretch of this section that happens in daylight.
          const lit = night > 0.002
          if (lit !== wasLit) {
            wasLit = lit
            stage.current.style.setProperty("--sky-vis", lit ? "visible" : "hidden")
          }
        }
        if (word.current) {
          // Clears the middle by the time the copy lands there.
          const up = Math.min(p / COPY_IN, 1)
          word.current.style.transform = `translate3d(0, ${-up * 0.44 * vh}px, 0) scale(${1 + up * 0.1})`
          word.current.style.opacity = String(1 - up * 0.84)
        }
        if (hint.current) {
          hint.current.style.opacity = String(1 - Math.min(p / 0.1, 1))
        }

        const s = p < COPY_IN ? -1 : p < LINE_2 ? 0 : p < LINE_3 ? 1 : 2
        if (s !== last) {
          last = s
          setStep(s)
        }
      }
      raf = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  // Keyed by language too: a switch is a different sentence, so it earns its
  // float again.
  const key = `${lang}-${step}`
  useEffect(() => {
    if (step >= 0) played.current.add(key)
  }, [key, step])

  // Scattered once and kept. Regenerating them on a re-render would reshuffle
  // the whole sky under the viewer mid-scroll.
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 1.8,
        delay: Math.random() * -5,
        lit: 0.35 + Math.random() * 0.65,
      })),
    [],
  )

  const line = step >= 0 ? LINES[step] : null
  const float = step >= 0 && !played.current.has(key)
  const titleClass = "text-[clamp(19px,2.6vw,30px)] leading-snug"

  return (
    <section ref={outer} style={{ height: "560vh" }} aria-label="Intro">
      <div
        ref={stage}
        className="hero-frame sticky top-0 grid h-screen place-items-center overflow-hidden"
      >
        {/* Space. Absolute rather than a grid item so it covers the frame without
            taking a place in the layout, and first in the DOM so everything else
            paints over it. */}
        <div aria-hidden className="hero-sky">
          {stars.map((s, i) => (
            <i
              key={i}
              className="hero-star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                "--lit": s.lit,
              }}
            />
          ))}
          {/* Where it is headed. The moon sits on the spot the mark is flying to,
              so the corner it parks in is somewhere it arrived rather than just
              the edge of the screen. It leaves with the rest of the sky. */}
          <div className="hero-moon" />
        </div>

        {/* giant wordmark, behind everything — two justified TextPressure lines */}
        <div
          ref={word}
          className="col-start-1 row-start-1 w-[min(92vw,940px)] px-4"
          style={{ willChange: "transform" }}
        >
          <TextPressure
            text="RABBIT"
            textColor="var(--brand)"
            italic={false}
            minFontSize={52}
          />
          {/* The ring rides in the seam between the two words, and belongs to the
              wordmark rather than to the mark: it lives inside this group, so it
              rises and fades with the lettering and is gone by the time the mark
              flies. Zero-height so it fills the existing gap instead of opening
              a new one — which also keeps children[0] the first line for the
              seam measurement above. */}
          <TextPressure
            text="SHARK"
            textColor="var(--brand)"
            italic={false}
            minFontSize={52}
          />
        </div>

        {/* exhaust */}
        <div
          ref={trail}
          aria-hidden
          className="col-start-1 row-start-1 w-[46px] self-center justify-self-center rounded-full blur-xl"
          style={{
            background: "linear-gradient(to bottom, var(--brand), transparent)",
            marginTop: "22vh",
            opacity: 0,
            willChange: "transform, height",
          }}
        />

        {/* The ring is the pad the mark sits in and launches from: parked at
            LOW_Y, spinning, and it stays put once the mark has left. */}
        <div
          ref={ring}
          aria-hidden
          className="col-start-1 row-start-1 self-center justify-self-center"
          style={{ transform: `translate3d(0, ${LOW_Y * 100}vh, 0)`, opacity: 0, willChange: "transform, opacity" }}
        >
          <CircularText
            text="RABBITSHARK · RABBITSHARK · "
            spinDuration={22}
            onHover="speedUp"
            className="hero-ring"
          />
        </div>

        {/* The mark flies alone — it rises into the ring, waits, then leaves it
            for the corner. Hovering it on the pad swells it a little, so the
            launch feels like something that was building. */}
        <img
          ref={rocket}
          src="/ip/rocket.png"
          alt="RabbitShark"
          width="200"
          height="137"
          className="col-start-1 row-start-1 h-auto w-[clamp(76px,11vw,138px)] select-none"
          // The mark is a solid black silhouette, which simply disappears once
          // the sky goes dark — inverting it in step with --night flies it up as
          // black against the cream and white against the stars. The docked copy
          // in the corner is left alone: by the time it appears the sky has
          // cleared and it belongs to the cream page again.
          // …and once it is white it collides with the copy, which is also white
          // by then and passes in front of it. The halo is what keeps the line
          // legible where the two cross; it is tied to --night as well, so
          // nothing is cast over the cream page where the mark is still black.
          style={{
            willChange: "transform",
            filter:
              "invert(var(--night)) drop-shadow(0 0 16px rgba(0, 0, 0, calc(var(--night) * 0.6)))",
          }}
          onMouseEnter={() => (hover.current.want = 1)}
          onMouseLeave={() => (hover.current.want = 0)}
        />

        {/* Copy takes the middle once the rocket is out of it. Lifted out of the
            normal paint order because the mark carries a transform, which alone
            is enough to put it above plain siblings — and at full size it would
            otherwise cover the line it is meant to be launching under. It passes
            behind the words instead. */}
        <div
          className="relative z-10 col-start-1 row-start-1 px-6 text-center"
          // The line passes in front of the mark, and at the top of the climb the
          // mark is a white shape filling the middle of the screen — white copy
          // on it would vanish. The aura only exists once the sky is dark, so the
          // type on the cream page is untouched.
          style={{
            color: "var(--copy-ink)",
            textShadow: "0 0 18px rgba(4, 6, 14, calc(var(--night) * 0.95))",
          }}
        >
          {line && (
            <div key={key}>
              {float ? (
                <ScrollFloat
                  trigger="appear"
                  animationDuration={0.9}
                  stagger={0.022}
                  containerClassName={titleClass}
                >
                  {line.title}
                </ScrollFloat>
              ) : (
                <h2 className={titleClass} style={{ color: "var(--copy-ink)" }}>
                  {line.title}
                </h2>
              )}
              <p
                className="mt-3 text-[14px]"
                style={{
                  color: "var(--copy-dim)",
                  animation: "fadeUp 600ms cubic-bezier(.22,1,.36,1)",
                }}
              >
                {line.sub}
              </p>
            </div>
          )}
        </div>

        <p
          ref={hint}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.18em] uppercase"
          style={{ color: "var(--dim)" }}
        >
          {T.scroll}
        </p>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: none; }
          }
          /*
           * --night is written by the frame loop; everything below is derived
           * from it, so the sky, the stars, the moon and the text can only ever
           * describe the same altitude. At 0 the hero is exactly the cream page
           * it was before any of this existed.
           */
          .hero-frame {
            --night: 0;
            --sky-vis: hidden;
            --copy-ink: color-mix(in srgb, var(--ink) calc((1 - var(--night)) * 100%), #eaf0ff);
            --copy-dim: color-mix(in srgb, var(--dim) calc((1 - var(--night)) * 100%), #aab8dc);
          }
          .hero-sky {
            position: absolute;
            inset: 0;
            opacity: var(--night);
            visibility: var(--sky-vis);
            /* The lime at the base is the launch site burning under the climb —
               it keeps the sky in the brand rather than a stock starfield. */
            background:
              radial-gradient(120% 70% at 50% 100%, rgba(186, 231, 34, 0.13), transparent 62%),
              linear-gradient(180deg, #04060e 0%, #0a1024 52%, #121a3a 100%);
          }
          .hero-star {
            position: absolute;
            display: block;
            border-radius: 50%;
            background: #fffdf2;
            opacity: var(--lit);
            animation: twinkle 5s ease-in-out infinite;
          }
          @keyframes twinkle {
            0%, 100% { opacity: calc(var(--lit) * 0.35); }
            50%      { opacity: var(--lit); }
          }
          .hero-moon {
            position: absolute;
            top: ${DOCK_INSET + DOCK_SIZE / 2}px;
            left: ${DOCK_INSET + DOCK_SIZE / 2}px;
            width: 132px;
            height: 132px;
            margin: -66px 0 0 -66px;
            border-radius: 50%;
            background: radial-gradient(circle at 34% 32%, #fdfcf0, #dfe2cd 58%, #b6bda3);
            box-shadow: 0 0 70px rgba(255, 253, 235, 0.32);
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-star { animation: none; }
          }
          /* The component ships at a fixed 200px in white; the hero needs it
             sized off the viewport and painted in the wordmark's green. */
          .hero-ring {
            width: clamp(110px, 15.5vw, 194px);
            height: clamp(110px, 15.5vw, 194px);
            margin: 0;
            color: var(--brand);
          }
          .hero-ring span {
            font-size: clamp(8px, 0.95vw, 12px);
            letter-spacing: 0.06em;
          }
        `}</style>
      </div>

      {/*
       * Where the flight lands. The flying mark is a child of the sticky frame
       * and scrolls away with it once the section is done, so the last moment of
       * the flight hands over to this one — fixed, so it holds the corner for
       * the rest of the page. It is the same image at the same place and size at
       * the moment they swap, which is what makes the two read as one mark.
       * Outside the sticky div because that one clips.
       */}
      <img
        ref={dock}
        aria-hidden
        src="/ip/rocket.png"
        alt=""
        width="200"
        height="137"
        className="pointer-events-none fixed z-50 h-auto select-none"
        style={{
          top: DOCK_INSET,
          left: DOCK_INSET,
          width: DOCK_SIZE,
          opacity: 0,
          willChange: "opacity",
        }}
      />
    </section>
  )
}

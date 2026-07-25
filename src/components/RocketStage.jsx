import { useEffect, useRef, useState } from "react"
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
 *   lift-off only once the last line is up does it climb, and it keeps going
 *            until it is clear off the top of the frame as the section hands
 *            over. The ring is a launch pad, not a passenger: it is pinned at
 *            LOW_Y and never moves, so the mark flies up out of it.
 */
const START_Y = 0.86 // under the fold, where the mark waits before it is called
const LOW_Y = 0.3 // where it settles, in screens below centre, ringed
const BOTTOM_AIR = 34 // px kept under the ring, whatever the window's height
const COPY_CLEAR = 56 // px kept between the copy's middle and the ring's top edge
const OUT_Y = -0.78 // clear of the top edge — the mark leaves the frame entirely
const FLY_START = LINE_3 // nothing moves it until the last line has landed
const FLY_END = 1

export default function RocketStage() {
  const { lang } = useLang()
  const T = ui[lang]
  const LINES = T.heroLines
  const outer = useRef(null)
  const rocket = useRef(null)
  const ring = useRef(null)
  const trail = useRef(null)
  const word = useRef(null)
  const hint = useRef(null)
  const played = useRef(new Set())
  const [step, setStep] = useState(-1) // -1 = nothing but the wordmark

  useEffect(() => {
    let raf
    let last = -2

    function frame() {
      const el = outer.current
      if (el) {
        const r = el.getBoundingClientRect()
        const travel = r.height - window.innerHeight
        const p = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 0

        const vh = window.innerHeight
        // Two moves, and they don't overlap. `rise` walks the mark up from under
        // the fold into the ring as the copy arrives; `fly` takes it off the top
        // once the last line is up. Smoothstep on both so it eases into the ring
        // and eases off the edge rather than jerking at either end.
        const a = Math.min(Math.max(p / COPY_IN, 0), 1)
        const rise = a * a * (3 - 2 * a)
        const t = Math.min(Math.max((p - FLY_START) / (FLY_END - FLY_START), 0), 1)
        const fly = t * t * (3 - 2 * t)
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
        const y = START_Y * vh - rise * (START_Y * vh - low) + fly * (OUT_Y * vh - low) - rowOff
        if (rocket.current) {
          // It grows on the way up rather than shrinking: it sits small inside
          // the ring and comes toward the viewer as it climbs, so the mark is at
          // its largest just as it leaves the frame.
          rocket.current.style.transform = `translate3d(0, ${y}px, 0) scale(${1 + fly * 0.72})`
        }
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
          // The exhaust belongs to the flight — it draws out under the mark as it
          // climbs and stays lit behind it once it is up there.
          trail.current.style.height = `${fly * 46}vh`
          trail.current.style.opacity = String(Math.min(fly * 1.6, 0.6))
          trail.current.style.transform = `translate3d(0, ${y}px, 0)`
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

  const line = step >= 0 ? LINES[step] : null
  const float = step >= 0 && !played.current.has(key)
  const titleClass = "text-[clamp(19px,2.6vw,30px)] leading-snug"

  return (
    <section ref={outer} style={{ height: "560vh" }} aria-label="Intro">
      <div className="sticky top-0 grid h-screen place-items-center overflow-hidden">
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

        {/* The mark flies alone — it rises into the ring, waits, then leaves it. */}
        <img
          ref={rocket}
          src="/ip/rocket.png"
          alt="RabbitShark"
          width="200"
          height="137"
          className="col-start-1 row-start-1 h-auto w-[clamp(76px,11vw,138px)] select-none"
          style={{ willChange: "transform" }}
        />

        {/* copy takes the middle once the rocket is out of it */}
        <div className="col-start-1 row-start-1 px-6 text-center">
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
                <h2 className={titleClass} style={{ color: "var(--ink)" }}>
                  {line.title}
                </h2>
              )}
              <p
                className="mt-3 text-[14px]"
                style={{ color: "var(--dim)", animation: "fadeUp 600ms cubic-bezier(.22,1,.36,1)" }}
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
          /* The component ships at a fixed 200px in white; the hero needs it
             sized off the viewport and painted in the wordmark's green. */
          .hero-ring {
            width: clamp(125px, 18vw, 225px);
            height: clamp(125px, 18vw, 225px);
            margin: 0;
            color: var(--brand);
          }
          .hero-ring span {
            font-size: clamp(9px, 1.05vw, 13px);
            letter-spacing: 0.06em;
          }
        `}</style>
      </div>
    </section>
  )
}

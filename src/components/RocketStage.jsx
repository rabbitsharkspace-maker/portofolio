import { useEffect, useRef, useState } from "react"
import TextPressure from "./TextPressure"
import ScrollFloat from "./ScrollFloat"
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
const COPY_IN = 0.3 // first line arrives, and the logo starts drifting up
const LINE_2 = 0.55
const LINE_3 = 0.78
/*
 * The logo's flight starts at the second line — "two people" — and then takes
 * the whole rest of the hero. It drifts up from under the fold while the first
 * line reads and waits low in the frame; from "two people" on, every notch of
 * scroll moves it, so the long stretch under the last line is the climb rather
 * than a blank screen, and it is still going up as the section hands over.
 */
const HOLD_Y = 0.3 // resting height, in screens below centre, through line 1
const TOP_Y = -0.38 // top of the frame, reached as the hero runs out
const FLY_END = 1 // the flight owns everything from "two people" to the end

export default function RocketStage() {
  const { lang } = useLang()
  const T = ui[lang]
  const LINES = T.heroLines
  const outer = useRef(null)
  const rocket = useRef(null)
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
        // Two moves, not one. `drift` walks it up into view under the first line;
        // `fly` carries it from there to the top of the frame. Smoothstep rather
        // than a plain ease-out: it leaves "two people" gently, spends the middle
        // of the climb actually moving, and eases in at the top — so no part of
        // the long last stretch reads as the logo standing still.
        const drift = Math.min(Math.max((p - COPY_IN) / (LINE_2 - COPY_IN), 0), 1)
        const t = Math.min(Math.max((p - LINE_2) / (FLY_END - LINE_2), 0), 1)
        const fly = t * t * (3 - 2 * t)
        const y = (0.86 - drift * (0.86 - HOLD_Y) - fly * (HOLD_Y - TOP_Y)) * vh
        if (rocket.current) {
          rocket.current.style.transform = `translate3d(0, ${y}px, 0) scale(${1 - fly * 0.42})`
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

        <img
          ref={rocket}
          src="/ip/rocket.png"
          alt="RabbitShark"
          width="200"
          height="137"
          className="col-start-1 row-start-1 h-auto w-[clamp(150px,22vw,270px)] select-none"
          style={{ transform: "translate3d(0, 86vh, 0)", willChange: "transform" }}
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
        `}</style>
      </div>
    </section>
  )
}

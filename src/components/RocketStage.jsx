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
 *   rest     it sits in the gap between RABBIT and SHARK, ringed by the spinning
 *            RABBITSHARK lettering — the two words and the mark read as one
 *            lockup. Its resting height is measured off the wordmark rather than
 *            hard-coded, see gapY below.
 *   step down as the copy comes in to take the middle, the mark drops out of the
 *            way into the empty lower half and waits there, under each line, for
 *            the whole read. The ring does not come with it: it belongs to the
 *            wordmark and fades out with it.
 *   lift-off only once the last line is up does it climb, and it keeps going
 *            until it is clear off the top of the frame as the section hands over.
 */
const LOW_Y = 0.3 // where it waits, in screens below centre, while the copy reads
const OUT_Y = -0.78 // clear of the top edge — the mark leaves the frame entirely
const FLY_START = LINE_3 // nothing moves it until the last line has landed
const FLY_END = 1

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
        /*
         * Where the mark rests: the seam between the two wordmark lines. Derived
         * from layout (offsetHeight is untouched by the transforms this loop
         * writes) rather than a magic fraction, so the mark stays in the gap at
         * every width, where TextPressure sets its own line height off the
         * container. The wordmark is centred in the frame, so the seam sits
         * `first line height - half the block` from the middle.
         */
        let gap = 0
        const w = word.current
        if (w && w.children.length) gap = w.children[0].offsetHeight - w.offsetHeight / 2

        // Two moves, and they don't overlap. `drop` steps the mark out of the
        // middle as the copy arrives; `fly` takes it off the top once the last
        // line is up. Smoothstep on both so it eases out of the gap and eases
        // off the edge rather than jerking at either end.
        const d = Math.min(Math.max(p / COPY_IN, 0), 1)
        const drop = d * d * (3 - 2 * d)
        const t = Math.min(Math.max((p - FLY_START) / (FLY_END - FLY_START), 0), 1)
        const fly = t * t * (3 - 2 * t)
        const y = gap * (1 - drop) + (drop * LOW_Y + fly * (OUT_Y - LOW_Y)) * vh
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
          {/* The ring rides in the seam between the two words, and belongs to the
              wordmark rather than to the mark: it lives inside this group, so it
              rises and fades with the lettering and is gone by the time the mark
              flies. Zero-height so it fills the existing gap instead of opening
              a new one — which also keeps children[0] the first line for the
              seam measurement above. */}
          {/* z-10 so the lower arc paints over SHARK's letters instead of being
              sliced by them — it is a sibling, so DOM order alone would put the
              second word on top of it. */}
          <div className="relative z-10 h-0" aria-hidden>
            <CircularText
              text="RABBITSHARK · RABBITSHARK · "
              spinDuration={22}
              onHover="speedUp"
              className="hero-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
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

        {/* The mark itself flies alone — it starts centred in the ring up in the
            wordmark's gap, then leaves both behind. */}
        <img
          ref={rocket}
          src="/ip/rocket.png"
          alt="RabbitShark"
          width="200"
          height="137"
          className="col-start-1 row-start-1 h-auto w-[clamp(112px,16vw,190px)] select-none"
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
            width: clamp(180px, 30vw, 380px);
            height: clamp(180px, 30vw, 380px);
            margin: 0;
            color: var(--brand);
          }
          .hero-ring span {
            font-size: clamp(11px, 1.35vw, 17px);
            letter-spacing: 0.06em;
          }
        `}</style>
      </div>
    </section>
  )
}

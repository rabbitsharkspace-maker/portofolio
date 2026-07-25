import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CharacterStage from "./CharacterStage"
import CharacterModel from "./CharacterModel"
import { people } from "../data/people"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { BLUE, YELLOW } from "../theme"

/*
 * One animated value, 0 → target, on an ease-out cubic. Both the number and the
 * bar width are drawn straight from it every frame, so they fill together and
 * neither depends on a CSS transition landing — that reliance was why the bar
 * used to read as fixed while the number counted.
 */
function useCountUp(to, run, delay = 0, duration = 900) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) {
      setN(0)
      return
    }
    let raf
    let start = 0
    const step = (ts) => {
      if (!start) start = ts + delay
      const t = Math.min(Math.max((ts - start) / duration, 0), 1)
      const e = 1 - Math.pow(1 - t, 3)
      setN(e * to)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, to, delay, duration])
  return run ? n : 0
}

function AnimatedStat({ label, value, run, delay, accent }) {
  const n = useCountUp(value, run, delay)
  return (
    <li>
      <div className="flex items-baseline justify-between text-[11px]">
        <span style={{ color: "var(--ink)" }}>{label}</span>
        <span style={{ color: "var(--dim)" }}>{Math.round(n)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full" style={{ background: "var(--tint-2)" }}>
        <div className="h-full rounded-full" style={{ width: `${n}%`, background: accent }} />
      </div>
    </li>
  )
}

/*
 * "Who we are" as a character-select screen: roster down the left, the chosen
 * character on the stage in the middle, their card and stat bars on the right.
 *
 * The panel carries data-world, so picking someone re-tints the whole block from
 * the same custom properties the person pages use — one attribute instead of a
 * second palette living in here.
 *
 * The bars run from zero on every switch and, the first time, only once the
 * block is actually on screen: `armed` drops to false and is set again on the
 * next frame, which is what gives the widths something to transition from.
 * Arming on mount instead would spend the whole animation while the section is
 * still four screens down the page.
 */

const ROSTER = [
  { id: "jenny", accent: BLUE },
  { id: "jane", accent: YELLOW },
]

// One box for both characters, so the flanking arrows land in the same place
// whichever of them is on the stage. 46:100 is Jane's bare CharacterStage ratio.
const STAGE_H = "clamp(340px, 58vh, 560px)"

function Arrow({ dir, accent, label, onClick }) {
  const prev = dir === "prev"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-dir={dir}
      className={`stage-arrow absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full ${
        prev ? "-left-14 md:-left-24" : "-right-14 md:-right-24"
      }`}
      style={{ "--accent": accent, color: accent }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={prev ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function CharacterSelect() {
  const nav = useNavigate()
  const { lang } = useLang()
  const T = ui[lang]
  const [who, setWho] = useState("jenny")
  const [armed, setArmed] = useState(false)
  const [inView, setInView] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    const el = box.current
    if (!el) return
    // Left connected and tracking both directions, not disconnected after the
    // first sighting: the bars should refill from zero every time the block
    // comes back on screen, not once and never again.
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    setArmed(false)
    if (!inView) return
    // Double rAF, not single: the first frame lets the browser actually paint
    // the bars at width 0, and only then does the second frame set them to their
    // value so the transition runs from 0. With one frame the 0 state is
    // computed but never painted, and the bar jumps straight to full.
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setArmed(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [who, lang, inView])

  const slot = ROSTER.find((r) => r.id === who)
  const other = ROSTER.find((r) => r.id !== who).id
  const person = people[who]
  const c = person[lang]

  return (
    // No frame — just the tinted panel. The character and the coloured bars are
    // the whole read here; a border only fought them.
    <div
      ref={box}
      data-world={who}
      className="relative overflow-hidden rounded-3xl p-4 md:p-6"
      style={{
        background: "color-mix(in srgb, var(--surface) 86%, transparent)",
        transition: "background 500ms ease",
      }}
    >
      {/* HUD grid, faded out at the edges so it never competes with the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.45,
          maskImage: "radial-gradient(ellipse at 50% 40%, black 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 15%, transparent 75%)",
        }}
      />

      {/*
        Both columns are sized, not stretched, and the pair is centred: letting
        the stage take 1fr parked the character out by the left edge and the card
        out by the right, with a hole between them.
      */}
      <div className="relative grid gap-5 md:grid-cols-[minmax(0,480px)_320px] md:justify-center md:gap-10">
        {/* stage */}
        <div className="relative grid place-items-center">
          {/* spotlight behind, platform under — the character stands on the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-6 bottom-10 rounded-[50%] blur-3xl transition-colors duration-500"
            style={{ background: slot.accent, opacity: 0.16 }}
          />
          {/*
            The shadow tightens as she rises. Keyed like the character so both
            animations restart on the same frame when the pick changes —
            otherwise the float's clock resets and the shadow's doesn't, and
            within one switch she is rising while her shadow grows.
          */}
          <div
            key={`platform-${who}`}
            aria-hidden
            className="stage-platform pointer-events-none absolute bottom-4 h-14 w-[58%] rounded-[50%] blur-xl transition-colors duration-500"
            style={{ background: slot.accent, opacity: 0.42 }}
          />

          <div className="relative">
            {/* With two of them, both arrows land on the other one. */}
            <Arrow dir="prev" accent={slot.accent} label={T.prevCharacter} onClick={() => setWho(other)} />
            <Arrow dir="next" accent={slot.accent} label={T.nextCharacter} onClick={() => setWho(other)} />
            {/*
              Two wrappers, because both animations drive `transform` and one
              element can only be driven by one of them: the outer plays once on
              arrival (it remounts with `who`), the inner breathes forever.
            */}
            <div key={who} className="character-in">
              <div className="character-float">
                {/*
                  Jenny is the whole-body GLB with its baked idle clip; Jane is
                  the drawn still on the CSS stage. Both boxes are the same
                  46:100 at STAGE_H, so she stands at the height Jane does and
                  the flanking arrows land in the same place either way.
                */}
                {who === "jenny" ? (
                  <CharacterModel height={STAGE_H} />
                ) : (
                  <CharacterStage
                    bare
                    src={person.art}
                    alt={person.name}
                    accent={slot.accent}
                    height={STAGE_H}
                    onClick={() => nav(`/${who}`)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="flex flex-col justify-center">
          {/* Just the name she goes by — the passport-name reveal is gone. */}
          <h3
            key={`${who}-${lang}`}
            className="character-card-in text-[24px] leading-tight"
          >
            {person.name}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--dim)" }}>
            {c.line}
          </p>

          <p className="mt-6 text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--dim)" }}>
            {T.statsLabel}
          </p>
          <ul className="mt-3 space-y-3">
            {c.stats.map((s, i) => (
              <AnimatedStat
                key={s.label}
                label={s.label}
                value={s.value}
                run={armed}
                delay={i * 90}
                accent={slot.accent}
              />
            ))}
          </ul>

          <button
            onClick={() => nav(`/${who}`)}
            className="mt-7 self-start rounded-full px-5 py-2.5 text-[13px] transition-transform hover:scale-[1.03]"
            style={{ background: slot.accent, color: "#12212e" }}
          >
            {T.enterSide(person.short)}
          </button>
        </div>
      </div>
    </div>
  )
}

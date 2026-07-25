import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Section, { Reveal } from "../components/Section"
import CharacterStage from "../components/CharacterStage"
import JennyPeek from "../components/JennyPeek"
import WorkGallery from "../components/WorkGallery"
import WorkEmbeds from "../components/WorkEmbeds"
import GlareHover from "../components/GlareHover"
import { people, studio } from "../data/people"
import { works } from "../data/works"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { BLUE, YELLOW, BLUE_INK, YELLOW_INK, CARD_COLORS } from "../theme"

const ACCENT = { jenny: BLUE, jane: YELLOW }
const ACCENT_INK = { jenny: BLUE_INK, jane: YELLOW_INK }

export default function Person() {
  const { who } = useParams()
  const { lang } = useLang()
  const p = people[who]
  const accent = ACCENT[who]
  const ink = ACCENT_INK[who]
  const T = ui[lang]

  useEffect(() => {
    document.documentElement.setAttribute("data-world", who)
    window.scrollTo(0, 0)
    return () => document.documentElement.removeAttribute("data-world")
  }, [who])

  if (!p) return null
  const c = p[lang]

  const mine = works.filter((w) => w.owner === who || w.owner === "both")

  const intro = (
    <div className={who === "jenny" ? "mx-auto max-w-[52ch] text-center" : "relative"}>
      <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: ink }}>
        {c.animal}
      </p>
      <h1 className="shiny mt-4 text-[clamp(30px,5vw,52px)] leading-[1.08]">{c.line}</h1>
      <p
        className={`mt-5 text-[15px] leading-relaxed ${who === "jenny" ? "" : "max-w-[46ch]"}`}
        style={{ color: "var(--dim)" }}
      >
        {c.sub}
      </p>
    </div>
  )

  return (
    <>
      {/* Jenny's hero stacks: she peeks over her wordmark up top and the line
          reads underneath it, so nothing sits across her face. Everyone else
          keeps the two-column portrait layout. */}
      {who === "jenny" ? (
        <header className="mx-auto max-w-[1100px] px-6 pt-20">
          <div className="relative h-[min(58vh,520px)] min-h-[340px] w-full">
            <JennyPeek />
          </div>
          <Reveal>{intro}</Reveal>
        </header>
      ) : (
        <header className="relative mx-auto grid min-h-[80vh] max-w-[1100px] items-center gap-8 px-6 pt-24 md:grid-cols-2">
          <Reveal>{intro}</Reveal>
          <Reveal delay={140}>
            <CharacterStage src={p.art} alt={`${c.animal} — ${p.name}`} accent={accent} />
          </Reveal>
        </header>
      )}

      <Section label={T.whoIAm} title={p.name}>
        <div className="max-w-[58ch] space-y-3 text-[16px] leading-relaxed">
          {c.about.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Section>

      <Section label={T.capabilitiesLabel} title={T.capabilities}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.skills.map((s, i) => {
            // Each capability keeps its own colour off the card, as the card's
            // own rim — no electric edge on top of it.
            const rim = CARD_COLORS[i % CARD_COLORS.length]
            return (
              <GlareHover
                key={s.group}
                width="100%"
                height="100%"
                background="var(--surface)"
                borderColor={rim}
                borderRadius="16px"
                glareColor={rim}
                glareOpacity={0.45}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                // GlareHover centres its child in a grid; the capability list reads
                // as a top-left block, so stretch the child to fill and pad the content.
                style={{ placeItems: "stretch" }}
              >
                <div className="p-5">
                  <h3 className="text-[15px]" style={{ color: "var(--ink)" }}>
                    {s.group}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-[13px]" style={{ color: "var(--dim)" }}>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </GlareHover>
            )
          })}
        </div>
      </Section>

      <Section label={T.workLabel} title={T.work} wide>
        {/* Jenny shows her work live — the real sites and films embedded. Everyone
            else keeps the gallery wall. keyed on the person: the two pages share
            the DOM, and without this the rail keeps the scroll position from the
            wall you just left */}
        {who === "jenny" ? (
          <WorkEmbeds works={mine} />
        ) : (
          <WorkGallery key={who} works={mine} accent={accent} />
        )}
      </Section>

      <Section label={T.recognition} title={T.awards}>
        <ul className="max-w-[62ch] space-y-3 text-[15px]">
          {c.awards.map((a) => (
            <li key={a} className="border-l-4 pl-4" style={{ borderColor: accent }}>
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section label={T.backgroundLabel} title={T.training}>
        <ul className="max-w-[62ch] space-y-2 text-[14px]" style={{ color: "var(--dim)" }}>
          {c.background.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {c.photoNote && (
          <p className="mt-10 text-[13px]" style={{ color: "var(--dim)" }}>
            {c.photoNote}
          </p>
        )}
      </Section>

      <Section label={T.contactPerson} title={studio.email}>
        <a
          href={`mailto:${studio.email}`}
          className="inline-block rounded-full px-6 py-3 text-[14px] transition-transform hover:scale-[1.03]"
          style={{ background: accent, color: "#12212e" }}
        >
          {studio.email}
        </a>
        <p className="mt-6 text-[13px]" style={{ color: "var(--dim)" }}>
          {c.replyNote}
        </p>
      </Section>

      <footer className="mx-auto max-w-[1100px] px-6 pb-16 text-[12px]" style={{ color: "var(--dim)" }}>
        <span>{T.studioFooter}</span>
      </footer>
    </>
  )
}

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Section, { Reveal } from "../components/Section"
import CharacterStage from "../components/CharacterStage"
import JennyPeek from "../components/JennyPeek"
import JaneEyes from "../components/JaneEyes"
import WorkEmbeds from "../components/WorkEmbeds"
import GlareHover from "../components/GlareHover"
import { people, studio } from "../data/people"
import { works } from "../data/works"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { BLUE, YELLOW, CARD_COLORS } from "../theme"

const ACCENT = { jenny: BLUE, jane: YELLOW }

export default function Person() {
  const { who } = useParams()
  const { lang } = useLang()
  const p = people[who]
  const accent = ACCENT[who]
  const T = ui[lang]

  useEffect(() => {
    document.documentElement.setAttribute("data-world", who)
    window.scrollTo(0, 0)
    return () => document.documentElement.removeAttribute("data-world")
  }, [who])

  if (!p) return null
  const c = p[lang]

  const mine = works.filter((w) => w.owner === who || w.owner === "both")

  /*
   * Jane's hero is full-bleed and leads on her name rather than her line, so it
   * runs much larger than everyone else's. The surname is set down a step — the
   * given name is what the page is announcing. Split off the last word rather
   * than hard-coding "Zhang", so the treatment survives the data changing.
   */
  const big = who === "jane"
  const names = p.name.split(" ")
  const surname = names.length > 1 ? names.pop() : null
  const intro = (
    <div className={who === "jenny" ? "mx-auto max-w-[52ch] text-center" : "relative"}>
      <h1
        className={`shiny leading-[1.02] ${
          big ? "text-[clamp(44px,7.4vw,104px)]" : "text-[clamp(30px,5vw,52px)]"
        }`}
      >
        {big ? (
          <>
            <span className="block">{names.join(" ")}</span>
            {surname && <span className="block text-[0.54em] leading-[1.1]">{surname}</span>}
          </>
        ) : (
          c.line
        )}
      </h1>
      <p
        className={`mt-5 leading-relaxed ${big ? "max-w-[34ch] text-[17px]" : "text-[15px]"} ${
          who === "jenny" ? "" : big ? "" : "max-w-[46ch]"
        }`}
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
      ) : who === "jane" ? (
        /*
         * Jane gets the whole screen. Her art is cut off at the arms, so she is
         * hung off the bottom-left corner and allowed to bleed past both edges —
         * the fold becomes the surface she is leaning on. The line takes the
         * right half and is the only thing competing with her.
         *
         * The portrait leaves the flow only from md up. Stacked on a phone there
         * is no room beside her, so she sits under the copy at full width
         * instead of behind it.
         *
         * Top-aligned rather than centred: her ear slopes down to the right, so
         * the clear space on this screen is the upper-right wedge. Centring the
         * copy drops it straight onto the ear.
         */
        <header className="relative min-h-screen overflow-hidden md:flex md:items-start">
          {/* Above her in the stack. She is absolutely positioned and comes
              later in the DOM, so at this size her ear would otherwise paint
              straight over the name. */}
          <div className="relative z-10 px-6 pt-28 md:ml-auto md:w-[38%] md:pt-[13vh] md:pr-12">
            <Reveal>{intro}</Reveal>
          </div>
          {/* No Reveal on her. It reveals on scroll position and only tests once
              on mount — pinned to the bottom of the first screen, and measured
              before the image has loaded and given the box a height, she reads
              as below the fold, fails the test and never comes back. She is the
              anchor of the page anyway; she should be there on arrival. */}
          <JaneEyes
            alt={`${c.animal} — ${p.name}`}
            /*
             * She sits higher by being bigger, not by being moved: the art is
             * cut off flat across her sleeves with barely 2% of clear margin
             * under them, so lifting her off the bottom edge would put a hard
             * horizontal cut across the page. Scaling up raises her head while
             * the cut stays safely past the fold.
             */
            className="pointer-events-none mt-10 w-full md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-[82vw]"
          />
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
        <div className="max-w-[1000px] text-[16px] leading-[1.8]">
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
        {/* The work shows live — the real sites and films embedded. Keyed on the
            person: the two pages share the DOM, and without this the rail keeps
            the scroll position from the wall you just left */}
        <WorkEmbeds key={who} works={mine} accent={accent} />
      </Section>

      <Section label={T.recognition} title={T.awards}>
        <ul className="max-w-none space-y-3 text-[15px]">
          {c.awards.map((a) => (
            <li key={a} className="border-l-4 pl-4" style={{ borderColor: accent }}>
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section label={T.backgroundLabel} title={T.training}>
        <ul className="max-w-none space-y-2 text-[14px]" style={{ color: "var(--dim)" }}>
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

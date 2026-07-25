import CharacterSelect from "../components/CharacterSelect"
import Section from "../components/Section"
import CircularGallery from "../components/CircularGallery"
import GlareHover from "../components/GlareHover"
import RocketStage from "../components/RocketStage"
import ScrollReveal from "../components/ScrollReveal"
import { works } from "../data/works"
import { studio } from "../data/people"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { BLUE, YELLOW, GREEN, GREEN_INK, CARD_COLORS } from "../theme"

export default function Home() {
  const { lang } = useLang()
  const T = ui[lang]
  const st = studio[lang]

  return (
    <>
      <RocketStage />

      {/* extra air up top: the hero's last line needs somewhere to land before
          this one starts reading itself out */}
      <section className="mx-auto max-w-[900px] px-6 pt-48 pb-28">
        <ScrollReveal
          dim="#b3c197"
          edge={GREEN_INK}
          lit="#1e2b10"
          start={0.95}
          end={0.05}
          softness={18}
          className="text-[clamp(22px,3.4vw,40px)] leading-[1.4]"
        >
          {T.manifesto}
        </ScrollReveal>
      </section>

      <Section label={T.whoWeAre} title={T.whoWeAreTitle}>
        <CharacterSelect />
        <p className="mt-4 text-center text-[12px]" style={{ color: "var(--dim)" }}>
          {T.turnHint}
        </p>
      </Section>

      <Section label={T.builtLabel} title={T.builtTitle} wide>
        <CircularGallery works={works} />
        <div
          className="mx-auto mt-10 flex max-w-[1100px] flex-wrap justify-center gap-6 px-6 text-[12px]"
          style={{ color: "var(--dim)" }}
        >
          <span className="flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded-sm" style={{ background: BLUE }} /> Jenny
          </span>
          <span className="flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded-sm" style={{ background: YELLOW }} /> Jane
          </span>
          <span className="flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded-sm" style={{ background: GREEN }} /> {T.both}
          </span>
        </div>
      </Section>

      <Section label={T.howWeWork} title={T.howWeWorkTitle}>
        <div className="grid gap-5 md:grid-cols-3">
          {st.offers.map((o, i) => {
            // Each way-of-working gets its own colour off the card, so the three
            // read as a set rather than one green block repeated.
            const rim = CARD_COLORS[i % CARD_COLORS.length]
            return (
              <GlareHover
                key={o.title}
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
                // GlareHover centres its child in a grid; the offer copy reads as a
                // top-left block, so stretch the child to fill and pad the content.
                style={{ placeItems: "stretch" }}
              >
                <div className="p-6">
                  <h3 className="text-[17px]">{o.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--dim)" }}>
                    {o.body}
                  </p>
                </div>
              </GlareHover>
            )
          })}
        </div>
      </Section>

      <Section label={T.contact} title={T.contactTitle}>
        <p className="max-w-[50ch] text-[15px] leading-relaxed" style={{ color: "var(--dim)" }}>
          {T.contactBody}
        </p>
        <a
          href={`mailto:${studio.email}`}
          className="mt-8 inline-block rounded-full px-6 py-3 text-[14px] transition-transform hover:scale-[1.03]"
          style={{ background: "var(--brand)", color: "var(--ink)" }}
        >
          {studio.email}
        </a>
        <div className="mt-10 flex gap-6 text-[13px]">
          {studio.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{ color: "var(--dim)" }}>
              {s.label}
            </a>
          ))}
        </div>
      </Section>

      <footer className="mx-auto max-w-[1100px] px-6 pb-16 text-[12px]" style={{ color: "var(--dim)" }}>
        {T.footer}
      </footer>
    </>
  )
}

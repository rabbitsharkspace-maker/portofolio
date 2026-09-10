import BorderGlow from "./BorderGlow"
import { OWNER } from "../data/works"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { OWNER_THEME as THEME } from "../theme"

/*
 * The "eight things" cards. White panel, unchanged content — the only added
 * effect is React Bits' BorderGlow on the rim: a colored mesh-gradient border
 * that lights up toward the pointer near the edges. fillOpacity 0 keeps it to
 * the border alone, so the card body stays plain white.
 *
 * Border colour is the attribution: blue = Jenny, yellow = Jane, green = both.
 */
export default function WorkCard({ work }) {
  const { lang } = useLang()
  const t = THEME[work.owner] ?? THEME.jenny
  const c = work[lang]
  const T = ui[lang]

  return (
    <BorderGlow
      className="h-full w-full"
      colors={t.colors}
      glowColor={t.glow}
      backgroundColor="#ffffff"
      borderRadius={16}
      glowRadius={52}
      glowIntensity={2.6}
      coneSpread={34}
      edgeSensitivity={8}
      fillOpacity={0}
    >
      <div className="flex h-full flex-col p-6">
        <p className="text-[11px] tracking-[0.14em] uppercase" style={{ color: t.ink }}>
          {c.kind}
        </p>
        <h3 className="mt-2 text-[19px] leading-snug" style={{ color: "var(--ink)" }}>
          {c.name}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {c.what}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--dim)" }}>
          {c.who}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {work.stack.map((s) => (
              <span
                key={s}
                className="rounded-full px-2.5 py-1 text-[11px]"
                style={{ background: `color-mix(in srgb, ${t.fill} 30%, white)`, color: t.ink }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px]" style={{ color: "var(--dim)" }}>
              {T.builtBy} {OWNER[work.owner].label[lang]}
            </span>
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] underline-offset-4 hover:underline"
                style={{ color: t.ink }}
              >
                {T.visit}
              </a>
            )}
          </div>
        </div>
      </div>
    </BorderGlow>
  )
}

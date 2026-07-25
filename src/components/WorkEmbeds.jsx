import { useMemo } from "react"
import { OWNER_THEME as THEME } from "../theme"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * Jenny's work, shown live rather than as gallery plates: each piece is the real
 * site running in a framed browser window, or the actual film playing on YouTube.
 * This is Jenny-only — Person.jsx keeps everyone else on WorkGallery — so nothing
 * here touches Jane's page.
 *
 * Websites are framed pointer-events-none, so they read as a live homepage screen
 * without trapping the page scroll; a full-card link over the top opens the real
 * thing (and is the way in for any site that refuses to be framed). Videos stay
 * interactive so they can be played in place.
 */
function youtubeId(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1)
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v")
  } catch {
    return null
  }
  return null
}

export default function WorkEmbeds({ works }) {
  const { lang } = useLang()
  const T = ui[lang]
  return (
    <div className="mx-auto max-w-[1180px] px-6">
      <div className="grid gap-7 md:grid-cols-2">
        {works.map((w) => (
          <EmbedCard key={w.id} work={w} lang={lang} T={T} />
        ))}
      </div>
      <p className="mt-6 text-center text-[12px]" style={{ color: "var(--dim)" }}>
        {T.embedHint}
      </p>
    </div>
  )
}

function EmbedCard({ work, lang, T }) {
  const c = work[lang]
  const t = THEME[work.owner] ?? THEME.jenny
  const url = work.embed ?? work.link
  const yt = useMemo(() => youtubeId(url), [url])
  const host = useMemo(() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "")
    } catch {
      return url
    }
  }, [url])

  return (
    <figure
      className="flex flex-col overflow-hidden rounded-[16px] bg-white"
      style={{
        border: `1px solid color-mix(in srgb, ${t.fill} 40%, white)`,
        boxShadow: "0 18px 40px -24px rgba(16,32,48,.5)",
      }}
    >
      {/* browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: `color-mix(in srgb, ${t.fill} 12%, white)`,
          borderBottom: `1px solid color-mix(in srgb, ${t.fill} 22%, white)`,
        }}
      >
        <span className="flex shrink-0 gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span
          className="ml-1 min-w-0 flex-1 truncate rounded-full px-3 py-1 text-[11px]"
          style={{ background: "#fff", color: "var(--dim)", border: "1px solid rgba(16,32,48,.08)" }}
        >
          {yt ? "youtube.com" : host}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[12px] underline-offset-4 hover:underline"
          style={{ color: t.ink }}
        >
          {T.visit} ↗
        </a>
      </div>

      {/* live preview */}
      <div className="relative w-full overflow-hidden bg-[#eef3f8]" style={{ aspectRatio: "16 / 10" }}>
        {/* fallback behind the frame — shows through if a site refuses to be framed */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-[13px]"
          style={{ color: "var(--dim)" }}
        >
          {host}
        </span>
        {yt ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${yt}`}
            title={c.name}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <iframe
              className="absolute inset-0 h-full w-full"
              style={{ pointerEvents: "none" }}
              src={url}
              title={c.name}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              referrerPolicy="no-referrer"
              scrolling="no"
            />
            {/* opens the real site; also the way in when the frame is blank */}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${T.visit} ${c.name}`}
              className="absolute inset-0"
            />
          </>
        )}
      </div>

      {/* caption */}
      <figcaption className="flex flex-col gap-1.5 p-5">
        <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: t.ink }}>
          {c.kind}
        </p>
        <h3 className="text-[18px] leading-snug" style={{ color: "var(--ink)" }}>
          {c.name}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--dim)" }}>
          {c.what}
        </p>
      </figcaption>
    </figure>
  )
}

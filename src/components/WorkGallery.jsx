import { useCallback, useEffect, useRef, useState } from "react"
import WorkCard from "./WorkCard"
import PixelTransition from "./PixelTransition"
import { OWNER } from "../data/works"
import { ui } from "../data/ui"
import { useLang } from "../lang"
import { OWNER_THEME as THEME } from "../theme"

/*
 * The work, hung like a show. One piece fills the wall at a time and you swipe
 * along the wall to the next — the rail is a real scroll container with snap
 * points, so a trackpad flick, a touch drag, the arrows and the keyboard all
 * move it the same way.
 *
 * The write-up rides in a small card over the bottom-right corner of the plate,
 * the way a wall label sits beside a painting: the piece is the thing you look
 * at, the words are there when you want them. Under `md` the label has nowhere
 * to go without covering the art, so it drops underneath instead.
 *
 * `work.image` is the piece itself and is expected to be missing for now — the
 * frame hangs empty until there is something to put in it.
 */
export default function WorkGallery({ works, accent }) {
  const { lang } = useLang()
  const T = ui[lang]
  const rail = useRef(null)
  const [i, setI] = useState(0)
  const current = works[i]

  const onScroll = () => {
    const el = rail.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setI(Math.min(Math.max(idx, 0), works.length - 1))
  }

  // Wraps, so the arrows never dead-end at either edge of the wall.
  const go = useCallback(
    (step) => {
      const el = rail.current
      if (!el) return
      const idx = (i + step + works.length) % works.length
      el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" })
    },
    [i, works.length],
  )

  // A resize changes the slide width, which would leave the rail parked between
  // two pieces — put it back on the one that was showing.
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const onResize = () => el.scrollTo({ left: i * el.clientWidth })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [i])

  const onKeyDown = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    go(e.key === "ArrowRight" ? 1 : -1)
  }

  return (
    <div className="mx-auto max-w-[1180px] px-6">
      <div className="relative">
        <div
          ref={rail}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label={T.work}
          className="rail flex overflow-x-auto overscroll-x-contain rounded-[22px]"
        >
          {works.map((w, n) => (
            <Plate key={w.id} work={w} index={n} total={works.length} accent={accent} lang={lang} />
          ))}
        </div>

        {/* the wall label, over the bottom-right corner of the plate */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="pointer-events-auto absolute right-6 bottom-6 w-[340px]">
            <Plaque key={current.id} work={current} lang={lang} T={T} />
          </div>
        </div>

        {/* bottom-left, the corner the label never reaches */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          <Arrow label={T.prevWork} onClick={() => go(-1)}>
            ‹
          </Arrow>
          <Arrow label={T.nextWork} onClick={() => go(1)}>
            ›
          </Arrow>
        </div>
      </div>

      {/* under md the label cannot sit on the art without hiding it */}
      <div className="mt-5 md:hidden">
        <WorkCard key={current.id} work={current} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {works.map((w, n) => (
          <button
            key={w.id}
            type="button"
            aria-label={w[lang].name}
            aria-current={n === i}
            onClick={() => go(n - i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: n === i ? 22 : 8,
              background: n === i ? accent : "color-mix(in srgb, var(--ink) 18%, transparent)",
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[12px]" style={{ color: "var(--dim)" }}>
        {T.swipeHint}
      </p>
    </div>
  )
}

/*
 * The label beside the piece, and the one place the pixel dissolve earns its
 * keep: at rest it is a gallery plaque — what it is, what it's called, who made
 * it — and the write-up only arrives if you go looking, dissolving in through a
 * grid of squares in that person's colour. The plaque stays small either way, so
 * it never turns into a panel sitting on top of the art.
 *
 * Fixed height, because both faces are absolutely positioned inside it: whatever
 * this box is, both sides have to live in it, so the copy on each is kept short.
 */
function Plaque({ work, lang, T }) {
  const t = THEME[work.owner] ?? THEME.jenny
  return (
    <PixelTransition
      aspectRatio="0px"
      gridSize={12}
      pixelColor={t.fill}
      animationStepDuration={0.34}
      style={{
        width: "100%",
        height: 232,
        background: "#ffffff",
        border: `1px solid color-mix(in srgb, ${t.fill} 40%, white)`,
        borderRadius: 16,
        boxShadow: "0 18px 40px -22px rgba(16,32,48,.55)",
        cursor: "pointer",
      }}
      firstContent={<PlaqueFace work={work} lang={lang} T={T} t={t} />}
      secondContent={<PlaqueFace work={work} lang={lang} T={T} t={t} detail />}
    />
  )
}

function PlaqueFace({ work, lang, T, t, detail = false }) {
  const c = work[lang]
  if (!detail) {
    return (
      <div className="flex h-full flex-col justify-between bg-white p-5">
        <div>
          <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: t.ink }}>
            {c.kind}
          </p>
          <h3 className="mt-2 text-[20px] leading-snug" style={{ color: "var(--ink)" }}>
            {c.name}
          </h3>
        </div>
        <div className="flex items-end justify-between text-[11px]" style={{ color: "var(--dim)" }}>
          <span>
            {T.builtBy} {OWNER[work.owner].label[lang]}
          </span>
          <span style={{ color: t.ink }}>{T.plaqueHint}</span>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--ink)" }}>
        {c.what}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "var(--dim)" }}>
        {c.who}
      </p>
      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-1.5">
          {work.stack.map((s) => (
            <span
              key={s}
              className="rounded-full px-2.5 py-1 text-[10.5px]"
              style={{ background: `color-mix(in srgb, ${t.fill} 30%, white)`, color: t.ink }}
            >
              {s}
            </span>
          ))}
        </div>
        {work.link && (
          <a
            href={work.link}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[12px] underline-offset-4 hover:underline"
            style={{ color: t.ink }}
          >
            {T.visit}
          </a>
        )}
      </div>
    </div>
  )
}

function Plate({ work, index, total, accent, lang }) {
  const c = work[lang]
  return (
    <div className="w-full shrink-0">
      <div
        className="relative h-[clamp(360px,62vh,600px)] w-full overflow-hidden"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, var(--tint) 55%, #dde4ec) 0%, #c8d3de 100%)`,
        }}
      >
        {/* light from above, so the wall has a top and a bottom */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 75% at 50% -8%, rgba(255,255,255,.95), rgba(255,255,255,0) 62%)",
          }}
        />

        <span
          className="absolute top-5 left-6 text-[11px] tracking-[0.18em]"
          style={{ color: "color-mix(in srgb, var(--ink) 45%, transparent)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Everything below is sized off the plate's own height — the frame is a
            fixed share of the wall, the mat fills the frame, and the piece fills
            the mat — so the widths shrink-wrap to whatever is hung and nothing
            has to guess a viewport unit. */}
        <figure className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="flex h-[74%] max-w-full"
            style={{
              padding: 14,
              // the moulding carries the world's own ink, so each person's wall
              // is hung in their colour rather than a generic gold
              background: `linear-gradient(150deg, color-mix(in srgb, var(--ink) 62%, #ffffff), var(--ink))`,
              boxShadow: "0 26px 50px -22px rgba(16,32,48,.6), 0 2px 6px rgba(16,32,48,.18)",
            }}
          >
            {/* the mat */}
            <div
              className="flex h-full min-w-0 bg-white"
              style={{ padding: 22, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }}
            >
              {work.image ? (
                <img src={work.image} alt={c.name} className="block h-full w-auto max-w-full object-contain" />
              ) : (
                // nothing hung yet — an empty canvas, waiting
                <div
                  className="aspect-[4/5] h-full max-w-full"
                  style={{
                    background: "linear-gradient(160deg,#fbfcfe,#eef3f8)",
                    boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 22%, transparent)`,
                  }}
                />
              )}
            </div>
          </div>
        </figure>
      </div>
    </div>
  )
}

function Arrow({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full text-[18px] opacity-70 transition-opacity hover:opacity-100"
      style={{
        background: "rgba(255,255,255,.88)",
        color: "var(--ink)",
        boxShadow: "0 6px 18px -8px rgba(16,32,48,.55)",
      }}
    >
      {children}
    </button>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PixelTransition from "./PixelTransition"
import { OWNER } from "../data/works"
import { OWNER_THEME as THEME } from "../theme"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * The work in gallery mode: one project fills the wall as a live "big screen"
 * — the real site running, or the film playing — and you walk the rail to the
 * next (arrows, dots, keyboard, swipe; the rail snaps). The wall label rides over
 * the bottom-right corner as a small card and dissolves between its name and its
 * write-up on hover, using the same pixel effect as the studio gallery.
 *
 * Websites are framed pointer-events-none so they read as a live screen without
 * eating the rail's drag; a full-screen link opens the real thing (and is the way
 * in for any site that refuses to be framed). Videos stay interactive.
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

export default function WorkEmbeds({ works, accent }) {
  const { lang } = useLang()
  const T = ui[lang]
  const rail = useRef(null)
  const [i, setI] = useState(0)
  const current = works[i]
  /*
   * The wall stays dark until it is nearly on screen. These are real sites, and
   * one of them opens a dialog and puts the caret in it on load — a frame that
   * takes focus drags the whole page down to show itself, which landed a visitor
   * arriving at the top of the page in the middle of the work section. Nothing
   * is fetched until the section is close, so there is no focus to steal while
   * the hero is still the thing being read (and four live sites are not booting
   * behind it).
   */
  const shell = useRef(null)
  const [live, setLive] = useState(false)

  /*
   * The wall runs in a ring: the last piece is cloned in front of the first and
   * the first behind the last, so you can keep swiping the same way forever and
   * come back round rather than hitting a wall and having to swipe back. Once
   * the scroll settles on a clone the rail is teleported onto the real copy of
   * that piece — same pixels, so the jump is invisible.
   */
  const n = works.length
  const pad = n > 1 ? 1 : 0
  const loop = pad ? [works[n - 1], ...works, works[0]] : works
  const settle = useRef(0)

  const onScroll = () => {
    const el = rail.current
    if (!el || !el.clientWidth) return
    const slot = Math.round(el.scrollLeft / el.clientWidth)
    setI((((slot - pad) % n) + n) % n)
    if (!pad) return
    clearTimeout(settle.current)
    settle.current = setTimeout(() => {
      const at = Math.round(el.scrollLeft / el.clientWidth)
      if (at === 0) el.scrollLeft = n * el.clientWidth
      else if (at === n + 1) el.scrollLeft = el.clientWidth
    }, 140)
  }

  useEffect(() => () => clearTimeout(settle.current), [])

  // Start on the real first piece, one slot in past the head clone.
  useEffect(() => {
    const el = rail.current
    if (el && pad) el.scrollLeft = el.clientWidth
  }, [pad])

  // Relative, so it walks straight off either end onto a clone and lets the
  // teleport above put it back — no rewind across every screen.
  const go = useCallback((step) => {
    const el = rail.current
    if (!el) return
    el.scrollTo({ left: el.scrollLeft + step * el.clientWidth, behavior: "smooth" })
  }, [])

  // A resize changes the slide width, which would park the rail between two
  // screens — put it back on the one that was showing.
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const onResize = () => el.scrollTo({ left: (i + pad) * el.clientWidth })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [i, pad])

  const onKeyDown = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    go(e.key === "ArrowRight" ? 1 : -1)
  }

  // One-way: once the wall has been reached the frames stay, so walking the
  // rail never re-boots a site that is already running.
  useEffect(() => {
    const el = shell.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setLive(true)
        io.disconnect()
      },
      // a screen's worth of warning, so the sites have booted by the time the
      // wall is actually looked at rather than loading under the viewer
      { rootMargin: "100% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={shell} className="mx-auto max-w-[1180px] px-6">
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
          {loop.map((w, slot) => (
            <Screen
              key={`${w.id}-${slot}`}
              work={w}
              index={(((slot - pad) % n) + n) % n}
              total={n}
              lang={lang}
              live={live}
            />
          ))}
        </div>

        {/* the wall label, over the bottom-right corner of the screen */}
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

      {/* under md the label cannot sit on the screen without hiding it */}
      <div className="mt-5 md:hidden">
        <Plaque key={current.id} work={current} lang={lang} T={T} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {works.map((w, dot) => (
          <button
            key={w.id}
            type="button"
            aria-label={w[lang].name}
            aria-current={dot === i}
            onClick={() => go(dot - i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: dot === i ? 22 : 8,
              background: dot === i ? accent : "color-mix(in srgb, var(--ink) 18%, transparent)",
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
 * The logical width the framed sites are laid out at. An iframe lays its page
 * out against its own pixel width, so at the wall's real width (~1000px and
 * less on a laptop) these sites were rendering their tablet/cramped breakpoint
 * and the hero copy ran off the edge. Framing at a desktop width and scaling
 * the whole thing down instead shows the site as it is actually designed —
 * the full screen, just smaller.
 */
const FRAME_W = 1440

// The big screen: the live site or film, filling the wall behind a browser bar.
function Screen({ work, index, total, lang, live }) {
  const c = work[lang]
  const url = work.embed ?? work.link
  /*
   * A still stands in for the site when `image` is set, and the frame is then a
   * picture rather than a door: no iframe boots and the click-through overlay is
   * left off. That is the point for anything behind a sign-in — a login form is
   * not a portfolio piece, and framing one live puts a real password box on the
   * page.
   */
  const still = work.image
  const yt = useMemo(() => (still ? null : youtubeId(url)), [still, url])
  const box = useRef(null)
  // scale 0 until measured, so the frame never flashes at full size first
  const [fit, setFit] = useState({ scale: 0, h: 0 })
  /*
   * What the browser bar reads. Normally the host, because that is the honest
   * label for a live site — but `address` overrides it for work whose hosting
   * is not the point: a project parked on someone's github.io announces the
   * account rather than the product.
   */
  const host = useMemo(() => {
    if (work.address) return work.address
    if (yt) return "youtube.com"
    try {
      return new URL(url).hostname.replace(/^www\./, "")
    } catch {
      return url
    }
  }, [work.address, yt, url])

  // The wall's width sets the scale, and the wall's height (divided back out)
  // sets how much page the frame has to render to fill it.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      const scale = width / FRAME_W
      setFit({ scale, h: height / scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="w-full shrink-0">
      <div className="relative flex h-[clamp(440px,72vh,760px)] w-full flex-col overflow-hidden bg-white">
        {/* browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#f4f7fa", borderBottom: "1px solid rgba(16,32,48,.08)" }}
        >
          <span className="flex shrink-0 gap-1.5">
            <i className="inline-block h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <i className="inline-block h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <i className="inline-block h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </span>
          <span
            className="ml-1 min-w-0 flex-1 truncate rounded-full px-3 py-1 text-[12px]"
            style={{ background: "#fff", color: "var(--dim)", border: "1px solid rgba(16,32,48,.08)" }}
          >
            {host}
          </span>
          <span
            className="shrink-0 text-[11px] tracking-[0.16em]"
            style={{ color: "color-mix(in srgb, var(--ink) 42%, transparent)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* the screen */}
        <div ref={box} className="relative min-h-0 flex-1 overflow-hidden bg-[#eef3f8]">
          {/* shows through if a site refuses to be framed */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-[14px]"
            style={{ color: "var(--dim)" }}
          >
            {host}
          </span>
          {still ? (
            // top-aligned: a page shot is read from its header down, so if the
            // wall's aspect crops it, the crop belongs at the bottom
            <img
              src={still}
              alt={c.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : yt ? (
            live && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${yt}`}
                title={c.name}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <>
              {live && (
                <iframe
                  className="absolute top-0 left-0 origin-top-left"
                  style={{
                    pointerEvents: "none",
                    width: FRAME_W,
                    height: fit.h || "100%",
                    transform: `scale(${fit.scale || 1})`,
                    // hidden until measured — at scale 1 it would briefly paint a
                    // 1440px frame overflowing the wall
                    visibility: fit.scale ? "visible" : "hidden",
                  }}
                  src={url}
                  title={c.name}
                  loading="lazy"
                  // allow-same-origin so the SPAs actually render (they read their own
                  // storage on boot); allow-scripts so they run. Crucially NO
                  // allow-top-navigation, so a frame-busting site cannot redirect the
                  // page out from under a visitor — standards browsers block that. The
                  // frames are cross-origin, so the allow-scripts+allow-same-origin
                  // sandbox-escape (removing your own sandbox) does not apply.
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  scrolling="no"
                />
              )}
              {/*
               * The way in, and only for a piece that has one. `link` is the
               * public address; `embed` is just what the wall renders, and the
               * two are not the same promise — several of these are previewed
               * from a URL that is a staging box or opens straight onto a
               * sign-in. Reading the door off `embed` handed those out as if
               * they were finished work.
               */}
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.name}
                  className="absolute inset-0"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/*
 * The small label over the corner of the screen — a gallery plaque that dissolves
 * between its name and its write-up through a grid of squares in that person's
 * colour (React Bits' pixel effect), the same one the studio gallery uses.
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
  // Only what has a public address is offered. Same rule as the screen: `embed`
  // is what the wall shows, `link` is what a visitor may be sent to.
  const url = work.link
  if (!detail) {
    return (
      <div className="flex h-full flex-col bg-white p-5 text-center">
        <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: t.ink }}>
          {c.kind}
        </p>
        {/* the name owns the middle of the plaque — the kind and the credit are
            the top and bottom rules it sits between */}
        <div className="grid flex-1 place-items-center px-1">
          <div>
            <h3 className="text-[22px] leading-snug text-balance" style={{ color: "var(--ink)" }}>
              {c.name}
            </h3>
            {/*
             * Where the thing came from, when that is the strongest argument for
             * it: Sunrise Care was built by someone who works the round, LiftPPT
             * by people who have been in that church for eleven years. It belongs
             * on the front of the label beside the name, not buried in a CV.
             */}
            {c.ground && (
              <p className="mt-1.5 text-[11.5px] leading-snug" style={{ color: t.ink }}>
                {c.ground}
              </p>
            )}
          </div>
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
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[12px] underline-offset-4 hover:underline"
            style={{ color: t.ink }}
          >
            {T.visit} ↗
          </a>
        )}
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

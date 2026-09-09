import { useEffect, useLayoutEffect, useRef, useState } from "react"
import WorkCard from "./WorkCard"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * Works arranged around a vertical axis and spun by dragging or by a two-finger
 * trackpad swipe. CSS 3D rather than WebGL — the page already carries the
 * character art, and a second GPU surface buys nothing here.
 *
 * Depth is a veil laid over each card, never opacity on the slot: fading the
 * slot makes the card itself translucent and you see the rest of the ring
 * straight through it.
 *
 * The live index lives in a ref and is written to the nodes inside rAF. Holding
 * it in state would re-render every card on every frame of a drag.
 */

const CARD_W = 320
const CARD_H = 392
const STEP = 30 // gentle arc, so three cards read at once
const GAP = 28 // clear air between the front card and its neighbours

export default function CircularGallery({ works }) {
  const { lang } = useLang()
  const T = ui[lang]
  const box = useRef(null)
  const slots = useRef([])
  const cards = useRef([])
  const veils = useRef([])
  const index = useRef(0) // where the ring is now
  const target = useRef(0) // where it is heading
  const drag = useRef(null)
  const moved = useRef(false)
  const [radius, setRadius] = useState(540)
  const [front, setFront] = useState(0)

  const step = Math.min(360 / works.length, STEP)

  useLayoutEffect(() => {
    function measure() {
      const w = box.current?.clientWidth ?? 900
      // A neighbour sits at x = R·sin(step) and, rotated, projects to a half
      // width of (CARD_W/2)·cos(step). For it to clear the front card:
      //   R·sin(step) − (CARD_W/2)·cos(step) ≥ CARD_W/2 + GAP
      // Sizing off centre distance alone leaves the neighbours lying on top of
      // the front card, which is what the first pass got wrong.
      const rad = (step * Math.PI) / 180
      const min = ((CARD_W / 2) * (1 + Math.cos(rad)) + GAP) / Math.sin(rad)
      setRadius(Math.max(min, Math.min(w * 0.52, 760)))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [step])

  useEffect(() => {
    let raf
    let shown = -1

    function paint() {
      index.current += (target.current - index.current) * 0.12

      slots.current.forEach((el, i) => {
        if (!el) return
        // Wrap the slot *offset* into [-n/2, n/2) before it becomes an angle.
        // Wrapping the angle instead leaves the arc lopsided whenever step is
        // capped: eight cards at 30° only span 240°, so one side sits empty.
        const n = works.length
        let d = (((i - index.current) % n) + n + n / 2) % n - n / 2
        const a = d * step
        const abs = Math.abs(a)

        el.style.transform = `rotateY(${a}deg) translateZ(${radius}px)`
        el.style.visibility = abs > 92 ? "hidden" : "visible"
        el.style.zIndex = String(100 - Math.round(abs))
        // The slot is a click target for every visible card, so a side card can
        // be tapped to spin it forward.
        el.style.pointerEvents = abs > 92 ? "none" : "auto"
        // Every visible card keeps the pointer, front or side, so hovering one
        // lights its rim wherever it sits in the ring. Only the links inside a
        // side card are switched off (see .ring-card in index.css) — otherwise
        // a tap on a side card would follow its link instead of spinning the
        // ring. Written as a data attribute, and only when it flips, so this
        // costs nothing on the frames in between.
        const card = cards.current[i]
        if (card) {
          const isFront = abs < 12 ? "1" : "0"
          if (card.dataset.front !== isFront) card.dataset.front = isFront
        }

        const veil = veils.current[i]
        if (veil) veil.style.opacity = String(Math.min(abs / 145, 0.78))
      })

      const f = ((Math.round(target.current) % works.length) + works.length) % works.length
      if (f !== shown) {
        shown = f
        setFront(f)
      }
      raf = requestAnimationFrame(paint)
    }

    paint()
    return () => cancelAnimationFrame(raf)
  }, [radius, step, works.length])

  // Two-finger trackpad swipe. Horizontal delta only — claiming deltaY would
  // trap the page inside the gallery on the way down.
  useEffect(() => {
    const el = box.current
    if (!el) return
    let idle
    function wheel(e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      target.current += e.deltaX / 220
      clearTimeout(idle)
      idle = setTimeout(() => (target.current = Math.round(target.current)), 140)
    }
    el.addEventListener("wheel", wheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", wheel)
      clearTimeout(idle)
    }
  }, [])

  function down(e) {
    moved.current = false
    drag.current = { x: e.clientX, start: target.current }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  function move(e) {
    if (!drag.current) return
    if (Math.abs(e.clientX - drag.current.x) > 5) moved.current = true
    target.current = drag.current.start - (e.clientX - drag.current.x) / 130
  }
  function up(e) {
    if (!drag.current) return
    drag.current = null

    // A real drag: settle on the nearest card.
    if (moved.current) {
      target.current = Math.round(target.current)
      return
    }

    // A tap: if it landed on a card that isn't the front one, spin that card
    // forward by the shortest way round. Front-card taps fall through so its
    // own links still work.
    const n = works.length
    const cur = Math.round(target.current)
    const front = ((cur % n) + n) % n
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest?.("[data-slot]")
    const i = hit ? Number(hit.dataset.slot) : front
    if (i !== front) {
      const d = ((((i - cur) % n) + n + n / 2) % n) - n / 2
      target.current = cur + d
    } else {
      target.current = cur
    }
  }

  const go = (d) => {
    target.current = Math.round(target.current) + d
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6">
      <div
        ref={box}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="relative touch-pan-y overflow-hidden select-none"
        style={{ height: CARD_H + 48, perspective: "1500px" }}
      >
        {/*
          Push the ring back by one radius so the front card lands at z=0 and
          renders at its true size. Without this, perspective magnifies it by
          P/(P-R) — about 1.5x — and it spills over the heading and controls.
        */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", transform: `translateZ(${-radius}px)` }}
        >
          {works.map((w, i) => (
            <div
              key={w.id}
              ref={(el) => (slots.current[i] = el)}
              data-slot={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              <div ref={(el) => (cards.current[i] = el)} data-front="0" className="ring-card h-full w-full">
                <WorkCard work={w} />
              </div>
              <div
                ref={(el) => (veils.current[i] = el)}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: "var(--bg)", opacity: 0 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label={T.prevWork}
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ border: "2px solid var(--line)", background: "var(--surface)", color: "var(--dim)" }}
        >
          ←
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Works">
          {works.map((w, i) => (
            <button
              key={w.id}
              onClick={() => (target.current = i)}
              aria-label={w[lang].name}
              aria-selected={i === front}
              role="tab"
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === front ? 22 : 8,
                background: i === front ? "var(--brand)" : "var(--line)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label={T.nextWork}
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ border: "2px solid var(--line)", background: "var(--surface)", color: "var(--dim)" }}
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center text-[12px]" style={{ color: "var(--dim)" }}>
        {T.spinHint}
      </p>
    </div>
  )
}

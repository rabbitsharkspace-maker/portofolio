import { useEffect, useMemo, useRef } from "react"
import "./ScrollReveal.css"

/*
 * Reading-progress highlight. As the block travels up the viewport each character
 * warms from the faint "unread" colour to the solid "read" colour, one after the
 * next — a progress meter you drive with the scroll wheel.
 *
 * Driven straight off the element's position each frame rather than a scroll
 * library: on a page with a 320vh sticky hero above it, that measures true every
 * time and never needs a refresh. Splits on characters, so it works for Latin and
 * CJK alike — spaces go through as ordinary spaces, since a non-breaking one
 * leaves the paragraph a single unwrappable line and widens the whole document.
 * Off on reduced motion — the text simply starts fully "read".
 *
 * start/end are viewport fractions (of height, top = 0): the reveal runs while the
 * element's top crosses from `start` down to `end`.
 */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => {
  const [ar, ag, ab] = hex(a)
  const [br, bg, bb] = hex(b)
  return `rgb(${Math.round(ar + (br - ar) * t)}, ${Math.round(ag + (bg - ag) * t)}, ${Math.round(ab + (bb - ab) * t)})`
}

export default function ScrollReveal({
  children,
  dim = "#b3c197",
  lit = "#1e2b10",
  edge = null, // optional colour the leading characters flare through on their way to `lit`
  start = 0.82,
  end = 0.32,
  softness = 12, // how many characters are mid-fade at once
  className = "",
}) {
  const ref = useRef(null)
  const spans = useRef([])

  const chars = useMemo(() => {
    const text = typeof children === "string" ? children : ""
    return [...text]
  }, [children])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = spans.current

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((s) => s && (s.style.color = lit))
      return
    }

    let raf = 0
    let head = null // eased leading edge, in characters
    const painted = new Array(nodes.length).fill(null)

    function targetHead() {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clamp((start * vh - r.top) / ((start - end) * vh), 0, 1)
      return p * (nodes.length + softness)
    }

    function colourAt(f) {
      if (f <= 0) return dim
      if (f >= 1) return lit
      const e = f * f * (3 - 2 * f) // smoothstep: no corner where a character starts or finishes
      if (!edge) return mix(dim, lit, e)
      // Two-stage: warm up to `edge` first, then cool into `lit`, so the leading
      // characters flare instead of walking straight down one line of colour.
      return e < 0.55 ? mix(dim, edge, e / 0.55) : mix(edge, lit, (e - 0.55) / 0.45)
    }

    function paint() {
      const t = targetHead()
      // Chase the target instead of snapping to it: a wheel arrives in notches,
      // and following it one-to-one is what makes the reveal feel stepped.
      head = head === null ? t : head + (t - head) * 0.16
      if (Math.abs(t - head) < 0.005) head = t

      for (let i = 0; i < nodes.length; i++) {
        const s = nodes[i]
        if (!s) continue
        const c = colourAt(clamp((head - i) / softness, 0, 1))
        // Most characters sit at one of the two end colours on any given frame;
        // skipping the repeat writes keeps this to a handful of style changes.
        if (c !== painted[i]) {
          s.style.color = c
          painted[i] = c
        }
      }
      raf = requestAnimationFrame(paint)
    }

    // The loop only runs while the paragraph is on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(paint)
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { rootMargin: "20% 0px" }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [children, dim, lit, edge, start, end, softness])

  return (
    <p ref={ref} className={`sr ${className}`}>
      {chars.map((ch, i) => (
        <span key={i} ref={(el) => (spans.current[i] = el)} className="sr-char" style={{ color: dim }}>
          {ch}
        </span>
      ))}
    </p>
  )
}

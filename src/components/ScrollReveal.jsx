import { useEffect, useMemo, useRef } from "react"
import "./ScrollReveal.css"

/*
 * The studio statement, read out to the scroll: the words arrive one after
 * another, each lifting from the page's own dim grey to full ink as it is
 * reached, so the eye is walked left to right rather than handed a paragraph.
 *
 * A word at a time, not a letter — an earlier pass swept per character and left
 * words split down the middle, half lit and half washed out, which read as
 * unfinished text rather than as an effect. The word is the smallest unit that
 * still looks deliberate when the sweep stops halfway.
 *
 * start/end are viewport fractions (of height, top = 0): the sweep runs while
 * the element's top crosses from `start` down to `end`.
 */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const smooth = (v) => v * v * (3 - 2 * v)

// How much of the whole sweep a single word takes to go from dim to lit. Wider
// than the gap between words on purpose, so several are always mid-way and the
// front reads as a soft edge travelling through the text rather than as a row
// of switches being flipped.
const WORD_RAMP = 0.22

function mix(a, b, t) {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t))
}

// #rgb / #rrggbb -> [r,g,b]
function rgb(hex) {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

export default function ScrollReveal({
  children,
  dim = "#b3c197",
  lit = "#1e2b10",
  start = 0.9,
  end = 0.35,
  className = "",
}) {
  const ref = useRef(null)
  const spans = useRef([])

  // Split on whitespace and keep the words; the gaps are re-inserted as plain
  // text so the paragraph still wraps and is still selectable as a sentence.
  const words = useMemo(() => String(children).split(/(\s+)/), [children])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = spans.current.filter(Boolean)
    const from = rgb(dim)
    const to = rgb(lit)
    const total = nodes.length
    if (!total) return

    const paintAll = (t) => {
      for (let i = 0; i < total; i++) {
        const c = mix(from, to, t)
        nodes[i].style.color = `rgb(${c[0]},${c[1]},${c[2]})`
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paintAll(1)
      return
    }

    let raf = 0
    let current = null
    // Last value written per word, so a frame that changes nothing writes
    // nothing — the sweep touches every word but only a handful move per frame.
    const painted = new Array(total).fill(-1)

    function targetProgress() {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      return clamp((start * vh - r.top) / ((start - end) * vh), 0, 1)
    }

    function paint() {
      const target = targetProgress()
      current = current === null ? target : current + (target - current) * 0.12
      if (Math.abs(target - current) < 0.002) current = target

      // The sweep front runs past the end by one ramp, so the last word gets
      // the same full ramp the first one did instead of being clipped.
      const head = current * (1 + WORD_RAMP)
      for (let i = 0; i < total; i++) {
        const at = (i / total) * 1
        const t = smooth(clamp((head - at) / WORD_RAMP, 0, 1))
        // quantised: below this the colour step is not visible anyway
        const q = Math.round(t * 50) / 50
        if (q === painted[i]) continue
        painted[i] = q
        const c = mix(from, to, q)
        nodes[i].style.color = `rgb(${c[0]},${c[1]},${c[2]})`
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
      { rootMargin: "20% 0px" },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [children, dim, lit, start, end])

  let w = -1
  return (
    <p ref={ref} className={`sr ${className}`}>
      {words.map((part, i) => {
        if (/^\s+$/.test(part)) return part
        w += 1
        const at = w
        return (
          <span
            key={i}
            ref={(node) => {
              spans.current[at] = node
            }}
            style={{ color: dim }}
          >
            {part}
          </span>
        )
      })}
    </p>
  )
}

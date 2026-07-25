import { useEffect, useRef } from "react"
import "./ScrollReveal.css"

/*
 * A restrained scroll reveal for the studio statement. The previous character-
 * by-character colour sweep left long paragraphs half dark and half washed out,
 * which looked unfinished and made the copy harder to read. The whole statement
 * now settles into place as one confident block: a short rise, blur release and
 * opacity fade, always keeping every line at the same visual weight.
 *
 * start/end are viewport fractions (of height, top = 0): the reveal runs while the
 * element's top crosses from `start` down to `end`.
 */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export default function ScrollReveal({
  children,
  lit = "#1e2b10",
  start = 0.82,
  end = 0.32,
  className = "",
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.style.filter = "none"
      return
    }

    let raf = 0
    let current = null
    function targetProgress() {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      return clamp((start * vh - r.top) / ((start - end) * vh), 0, 1)
    }

    function paint() {
      const target = targetProgress()
      current = current === null ? target : current + (target - current) * 0.12
      if (Math.abs(target - current) < 0.002) current = target
      const eased = current * current * (3 - 2 * current)
      el.style.opacity = String(0.35 + eased * 0.65)
      el.style.transform = `translate3d(0, ${(1 - eased) * 28}px, 0)`
      el.style.filter = `blur(${(1 - eased) * 3}px)`
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
  }, [children, lit, start, end])

  return (
    <p
      ref={ref}
      className={`sr ${className}`}
      style={{ color: lit, opacity: 0.35, transform: "translate3d(0, 28px, 0)", filter: "blur(3px)" }}
    >
      {children}
    </p>
  )
}

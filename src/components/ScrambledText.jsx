import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import "./ScrambledText.css"

gsap.registerPlugin(SplitText, ScrambleTextPlugin)

/*
 * React Bits' ScrambledText (after Tom Miller's pen for the GSAP community):
 * the pointer drags a small field over the paragraph and every character inside
 * it churns through junk before settling back into itself, hardest at the
 * centre. Reading the bio becomes something you do with the cursor.
 *
 * Each character is frozen at its own natural width first. The site's face is
 * proportional, so a `w` swapping for a `.` mid-scramble would otherwise pull
 * the rest of the line sideways and the paragraph would ripple as you moved.
 *
 * ponytail: the widths are px, measured once. A resize that changes the type
 * size (the clamp) leaves them stale — re-split on resize if that ever shows.
 */
export default function ScrambledText({
  // Barely wider than the pointer itself. At a hundred pixels the whole line
  // churned and the paragraph read as broken rather than as responding.
  radius = 34,
  duration = 1.1,
  speed = 0.45,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    // Touch has no pointer to chase, and splitting the bio into a few hundred
    // spans there buys nothing.
    if (!window.matchMedia("(hover: hover)").matches) return

    const split = SplitText.create(el.querySelector("p"), { type: "chars", charsClass: "char" })
    const chars = split.chars
    chars.forEach((c) => gsap.set(c, { display: "inline-block", attr: { "data-content": c.innerHTML } }))

    /*
     * Every width is measured first and only then written. Measuring and writing
     * one character at a time asks the browser to re-lay-out the paragraph
     * between each pair — three hundred forced reflows per page, which is what
     * was freezing the tab for a fifth of a second on arrival. Read all, write
     * all: one reflow.
     */
    const widths = chars.map((c) => c.getBoundingClientRect().width)
    chars.forEach((c, i) => {
      c.style.width = `${widths[i]}px`
      c.style.textAlign = "center"
    })

    const onMove = (e) => {
      chars.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect()
        const dist = Math.hypot(e.clientX - (left + width / 2), e.clientY - (top + height / 2))
        if (dist >= radius) return
        gsap.to(c, {
          overwrite: true,
          duration: duration * (1 - dist / radius),
          scrambleText: { text: c.dataset.content || "", chars: scrambleChars, speed },
          ease: "none",
        })
      })
    }

    el.addEventListener("pointermove", onMove)
    return () => {
      el.removeEventListener("pointermove", onMove)
      split.revert()
    }
  }, [radius, duration, speed, scrambleChars, children])

  return (
    <div ref={root} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  )
}

import { useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { BLUE, YELLOW, GREEN } from "../theme"
import "./PillNav.css"

/*
 * React Bits' PillNav: hovering a tab swells a circle up out of its bottom edge
 * while the label rolls over to a copy of itself, so the pill fills in rather
 * than just changing colour. The circle and the active pill both paint in the
 * colour of the world you are in — the bar shifts blue on Jenny's page, yellow
 * on Jane's, green on the studio's — so the nav belongs to the page under it.
 */
const links = [
  { to: "/", label: "Studio", end: true },
  { to: "/jenny", label: "Jenny" },
  { to: "/jane", label: "Jane" },
]

const ease = "power3.easeOut"

export default function PillNav() {
  const { pathname } = useLocation()
  const accent = pathname.startsWith("/jenny") ? BLUE : pathname.startsWith("/jane") ? YELLOW : GREEN

  const circles = useRef([])
  const timelines = useRef([])
  const tweens = useRef([])

  useEffect(() => {
    // The circle has to clear the pill's top corners from a standing start at
    // its bottom edge, so its radius is solved off the pill's own box.
    const layout = () => {
      circles.current.forEach((circle, i) => {
        const pill = circle?.parentElement
        if (!pill) return

        const { width: w, height: h } = pill.getBoundingClientRect()
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1

        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${D - delta}px` })

        const label = pill.querySelector(".pill-label")
        const hover = pill.querySelector(".pill-label-hover")
        gsap.set(label, { y: 0 })
        gsap.set(hover, { y: h + 12, opacity: 0 })

        timelines.current[i]?.kill()
        const tl = gsap.timeline({ paused: true })
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0)
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0)
        tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0)
        timelines.current[i] = tl
      })
    }

    layout()
    window.addEventListener("resize", layout)
    // the pills are sized by their type, so they move again when the font lands
    document.fonts?.ready.then(layout).catch(() => {})
    return () => window.removeEventListener("resize", layout)
  }, [])

  const run = (i, to, duration) => {
    const tl = timelines.current[i]
    if (!tl) return
    tweens.current[i]?.kill()
    tweens.current[i] = tl.tweenTo(to === 1 ? tl.duration() : 0, { duration, ease, overwrite: "auto" })
  }

  return (
    <nav className="pill-nav" aria-label="Primary" style={{ "--base": accent }}>
      <ul className="pill-list">
        {links.map((l, i) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              className={({ isActive }) => `pill${isActive ? " is-active" : ""}`}
              onMouseEnter={() => run(i, 1, 0.3)}
              onMouseLeave={() => run(i, 0, 0.2)}
            >
              <span
                className="hover-circle"
                aria-hidden
                ref={(el) => {
                  circles.current[i] = el
                }}
              />
              <span className="label-stack">
                <span className="pill-label">{l.label}</span>
                <span className="pill-label-hover" aria-hidden>
                  {l.label}
                </span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

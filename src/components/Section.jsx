import { useLayoutEffect, useRef, useState } from "react"

/*
 * Scroll-reveal without IntersectionObserver. IO silently never fires in some
 * embedded/headless browsers, which would leave the whole site at opacity 0 —
 * a manual rect check always resolves, and falls open rather than closed.
 *
 * Anything already on screen when this mounts skips the entrance entirely and
 * is simply there. Two people share this route, so switching between them
 * remounts every Reveal on the page: measuring after paint meant the new
 * person's first screen was drawn at opacity 0 and then faded up, which is the
 * blank that flashed between them. A layout effect measures before the browser
 * paints, so the first frame already has the hero in it.
 *
 * The entrance is kept for what is below the fold — it is an arrival for things
 * you scroll to, not for what you are already looking at.
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const instant = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.92

    if (inView()) {
      instant.current = true
      setShown(true)
      return
    }

    function check() {
      if (!inView()) return
      setShown(true)
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }

    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(22px)",
        transition: instant.current
          ? "none"
          : `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function Section({ label, title, children, wide = false }) {
  return (
    <section className={wide ? "py-24" : "mx-auto max-w-[1100px] px-6 py-24"}>
      <Reveal>
        <div className={wide ? "mx-auto max-w-[1100px] px-6" : ""}>
          {label && (
            <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--dim)" }}>
              {label}
            </p>
          )}
          {title && <h2 className="shiny mt-3 text-[clamp(26px,4vw,40px)] leading-tight">{title}</h2>}
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className={title || label ? "mt-10" : ""}>{children}</div>
      </Reveal>
    </section>
  )
}

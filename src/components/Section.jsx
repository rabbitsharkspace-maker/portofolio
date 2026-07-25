import { useEffect, useRef, useState } from "react"

/*
 * Scroll-reveal without IntersectionObserver. IO silently never fires in some
 * embedded/headless browsers, which would leave the whole site at opacity 0 —
 * a manual rect check always resolves, and falls open rather than closed.
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function check() {
      const top = el.getBoundingClientRect().top
      if (top < window.innerHeight * 0.92) {
        setShown(true)
        window.removeEventListener("scroll", check)
        window.removeEventListener("resize", check)
      }
    }

    check()
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
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
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

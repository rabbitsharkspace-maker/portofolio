import { useRef, useState } from "react"

/*
 * The two pointer-driven hover effects, pulled out of WorkCard so every card on
 * the site shares one implementation:
 *  - border glow — a radial gradient tracking the pointer, laid on the outer
 *    element and covered by an inset inner panel, so only the `pad`-wide rim
 *    shows it.
 *  - glare — a skewed light streak that sweeps across, clipped by the inner
 *    panel so it never spills past the rounded corners.
 *
 * `fill` is the rim colour (usually a per-owner accent). `pad` is the rim
 * thickness; `radius` the inner corner. Children render inside the panel.
 */
export default function GlareCard({
  fill,
  pad = 2,
  radius = 14,
  className = "",
  panelClassName = "",
  lift = true,
  children,
}) {
  const ref = useRef(null)
  const [p, setP] = useState({ x: -300, y: -300, on: false })

  function move(e) {
    const r = ref.current.getBoundingClientRect()
    setP({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setP((s) => ({ ...s, on: false }))}
      className={`relative h-full w-full rounded-2xl transition-transform duration-300 ${className}`}
      style={{
        padding: pad,
        background: fill,
        transform: p.on && lift ? "translateY(-4px)" : "none",
        boxShadow: p.on ? `0 18px 40px -22px ${fill}` : "none",
      }}
    >
      {/* border glow — only the rim of this shows past the inner panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: p.on ? 1 : 0,
          background: `radial-gradient(180px circle at ${p.x}px ${p.y}px, #fff 0%, ${fill} 55%, transparent 100%)`,
        }}
      />

      <div
        className={`relative flex h-full flex-col overflow-hidden ${panelClassName}`}
        style={{ background: "var(--surface)", borderRadius: radius }}
      >
        {/* glare — sweeps left to right on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 h-full w-1/2"
          style={{
            left: 0,
            background: `linear-gradient(100deg, transparent 20%, color-mix(in srgb, ${fill} 55%, white) 50%, transparent 80%)`,
            opacity: p.on ? 0.55 : 0,
            transform: p.on ? "translateX(220%) skewX(-14deg)" : "translateX(-120%) skewX(-14deg)",
            transition: "transform 900ms cubic-bezier(.22,1,.36,1), opacity 300ms ease",
          }}
        />
        {children}
      </div>
    </div>
  )
}

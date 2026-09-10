import ShapeBlur from "./ShapeBlur"

/*
 * Drop-in replacement for the old ElectricBorder: instead of a crackling line on
 * the rim, a ShapeBlur canvas sits over the card and lights a soft, blurred
 * rounded-rect border in the card's own colour wherever the pointer is near it.
 * The layer is pointer-transparent, so the card underneath keeps every click.
 */
export default function ShapeBorder({ color = "#ffffff", borderRadius = 16, className = "", children }) {
  const pr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  return (
    <div className={`relative ${className}`} style={{ borderRadius }}>
      {children}
      <div className="pointer-events-none absolute inset-0 z-20" style={{ borderRadius, overflow: "hidden" }}>
        <ShapeBlur
          color={color}
          variation={0}
          pixelRatioProp={pr}
          shapeSize={1.9}
          roundness={0.5}
          borderSize={0.04}
          circleSize={0.3}
          circleEdge={0.6}
        />
      </div>
    </div>
  )
}

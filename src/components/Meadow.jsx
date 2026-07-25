import LiquidChrome from "./LiquidChrome"

/*
 * Jane's world: a warm liquid-gold field. A LiquidChrome shader flows across the
 * background in Jane's yellow, the rabbit's counterpart to the shark's water.
 * The shader is opaque and fills the screen; the gradient wash sits under it as
 * the reduced-motion fallback (and while the canvas boots), so the colour stays
 * yellow either way.
 */

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function Meadow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* warm wash — the yellow, kept as the reduced-motion / boot fallback */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #fffdf3 0%, #fff6d8 46%, #fdeaa6 100%)" }}
      />
      {!reduce && (
        <>
          <div className="absolute inset-0">
            <LiquidChrome
              baseColor={[0.98, 0.8, 0.3]}
              speed={0.4}
              amplitude={0.4}
              frequencyX={3}
              frequencyY={3}
              interactive={false}
            />
          </div>
          {/* warm veil: mutes the shader's blown highlights so page copy stays
              readable over it — the liquid motion still reads underneath */}
          <div className="absolute inset-0" style={{ background: "rgba(255, 249, 224, 0.55)" }} />
        </>
      )}
    </div>
  )
}

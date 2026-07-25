/*
 * Ambient wash. Deliberately CSS, not WebGL — the character Stage already owns
 * a WebGL context and a second one stalls the compositor on modest hardware.
 * On a light page these read as soft colour bleeding into the paper.
 */
export default function Aura() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[25%] left-[-12%] h-[75vh] w-[75vh] rounded-full blur-[110px]"
        style={{ background: "var(--tint)", opacity: 0.9, animation: "drift 26s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute top-[30%] right-[-18%] h-[65vh] w-[65vh] rounded-full blur-[120px]"
        style={{ background: "var(--glow)", opacity: 0.5, animation: "drift 34s ease-in-out infinite alternate-reverse" }}
      />
      <div
        className="absolute bottom-[-25%] left-[22%] h-[60vh] w-[60vh] rounded-full blur-[130px]"
        style={{ background: "var(--tint-2)", opacity: 0.85, animation: "drift 30s ease-in-out infinite alternate" }}
      />
      <style>{`
        @keyframes drift {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(6vw,-4vh,0) scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden] > div { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

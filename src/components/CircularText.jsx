export default function CircularText({ text = "RABBITSHARK · STUDIO · ", size = 190 }) {
  const chars = text.split("")
  const r = size / 2 - 12
  return (
    <div className="spin-slow relative" style={{ width: size, height: size }} aria-hidden>
      {chars.map((ch, i) => {
        const angle = (360 / chars.length) * i
        return (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 text-[11px] tracking-[0.2em]"
            style={{
              color: "var(--dim)",
              transform: `rotate(${angle}deg) translateY(-${r}px)`,
              transformOrigin: "0 0",
            }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}

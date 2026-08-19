import { useRef, useState } from "react"

/*
 * The IP art is rendered 2D, not a model — so the stage is CSS perspective and
 * a parallax tilt rather than WebGL. Same read as a 3D turntable at a fraction
 * of the weight, and it keeps the artwork exactly as drawn.
 *
 * The art is a cut-out on transparency, so it is fitted rather than cropped:
 * the two characters are drawn at different widths and `cover` would take the
 * rabbit's ears and shoes off. Fitting them into one portrait box also lands
 * both of them at the same height, which is what a roster wants.
 *
 * `bare` drops the card — no border, no fill, no shadow — for the places where
 * the character should stand on the page itself rather than sit in a frame.
 */
export default function CharacterStage({
  src,
  alt,
  accent,
  height = "clamp(280px, 44vh, 480px)",
  bare = false,
  onClick,
}) {
  const box = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, lift: 0 })

  function move(e) {
    const r = box.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: -py * 12, y: px * 20, lift: 1 })
  }

  return (
    <div
      ref={box}
      onMouseMove={move}
      onMouseLeave={() => setTilt({ x: 0, y: 0, lift: 0 })}
      onClick={onClick}
      className={`grid place-items-center ${bare ? "" : "rounded-3xl"} ${onClick ? "cursor-pointer" : ""}`}
      style={{
        height,
        // The ratio belongs on this box, not on the art inside it: as a
        // shrink-to-fit grid item its width would otherwise be measured from the
        // artwork's own pixel width and the character would burst out of the
        // column. Framed, the ratio is opened up by the 12% of height the card
        // keeps as padding around the art.
        aspectRatio: bare ? "46 / 100" : "46 / 88",
        perspective: "1000px",
        ...(bare ? {} : { border: `2px solid ${accent}`, background: "var(--surface)" }),
      }}
    >
      <div
        className={bare ? "" : "rounded-2xl"}
        style={{
          // Sized off the same clamp rather than a percentage: this box is
          // centred in its grid area, and a centred grid item resolves
          // percentage heights against nothing, so h-full silently became the
          // artwork's own height and the character overflowed the card.
          height: bare ? height : `calc(${height} * 0.88)`,
          aspectRatio: "46 / 100",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${1 + tilt.lift * 0.04})`,
          transition: "transform 450ms cubic-bezier(.22,1,.36,1)",
          ...(bare ? {} : { boxShadow: `0 12px 30px -12px ${accent}` }),
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          loading="lazy"
          className="h-full w-full object-contain select-none"
          style={bare ? { filter: `drop-shadow(0 18px 26px color-mix(in srgb, ${accent} 45%, transparent))` } : undefined}
        />
      </div>
    </div>
  )
}

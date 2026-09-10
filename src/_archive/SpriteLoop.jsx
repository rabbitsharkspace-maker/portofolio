import { useEffect, useRef, useState } from "react"

/*
 * Flipbook player for a sprite sheet — a grid of `cols`×`rows` frames, `count`
 * of them in row-major order. It steps the CSS background-position through the
 * cells on a rAF clock, ping-ponging so the idle loop has no seam.
 *
 * Percentage positioning (not pixels) is what lets it scale to any display size:
 * the sheet is COLS×ROWS frames, so background-size is (cols·100%)×(rows·100%)
 * and cell (c,r) sits at (c/(cols-1), r/(rows-1)) of the range.
 *
 * The heavy sheet is preloaded behind a lightweight poster frame, and the loop
 * only runs while the sprite is on screen — offscreen it parks on one frame.
 */
export default function SpriteLoop({
  src,
  poster,
  cols,
  rows,
  count,
  frameW,
  frameH,
  fps = 20,
  height = "clamp(340px, 58vh, 560px)",
  accent = "#45aef2",
  alt = "",
  className = "",
  onClick,
}) {
  const el = useRef(null)
  const [ready, setReady] = useState(false)
  const inView = useRef(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setReady(true)
    img.src = src
  }, [src])

  useEffect(() => {
    const node = el.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.05 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!ready) return
    const node = el.current
    if (!node) return

    let k = 0
    let dir = 1
    let acc = 0
    let last = 0
    let raf = 0
    const step = 1000 / fps

    const pos = (i) => {
      const c = i % cols
      const r = Math.floor(i / cols)
      const px = cols > 1 ? (c / (cols - 1)) * 100 : 0
      const py = rows > 1 ? (r / (rows - 1)) * 100 : 0
      return `${px}% ${py}%`
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    node.style.backgroundImage = `url('${src}')`
    node.style.backgroundSize = `${cols * 100}% ${rows * 100}%`
    node.style.backgroundPosition = pos(0)

    if (reduce) return // hold on the first frame

    const tick = (t) => {
      if (!last) last = t
      const dt = t - last
      last = t
      if (inView.current) {
        acc += dt
        while (acc >= step) {
          acc -= step
          k += dir
          if (k >= count - 1) {
            k = count - 1
            dir = -1
          } else if (k <= 0) {
            k = 0
            dir = 1
          }
        }
        node.style.backgroundPosition = pos(k)
      } else {
        last = t
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, src, cols, rows, count, fps])

  return (
    <div
      ref={el}
      role="img"
      aria-label={alt}
      onClick={onClick}
      className={`select-none bg-no-repeat ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        height,
        aspectRatio: `${frameW} / ${frameH}`,
        // poster fills the box until the sheet is ready, then the sheet takes over
        backgroundImage: ready ? undefined : `url('${poster}')`,
        backgroundSize: ready ? undefined : "100% 100%",
        backgroundPosition: ready ? undefined : "center",
        filter: `drop-shadow(0 18px 26px color-mix(in srgb, ${accent} 45%, transparent))`,
      }}
    />
  )
}

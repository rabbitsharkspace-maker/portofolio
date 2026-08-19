/*
 * Jane's world: her own painted backdrop, fixed behind the page and cropped to
 * cover whatever the viewport is. It replaces the liquid-gold shader — a still
 * picture, so there is no reduced-motion branch left to make and nothing here
 * costs a frame.
 *
 * The flat fill under the image is the picture's own centre colour, so the
 * moment before it loads is the same cream rather than a flash of page white.
 *
 * The art carries its decoration around the edges — a daisy and clouds up top,
 * a rabbit peeking over the hills bottom-right — with a wide empty middle. `cover`
 * centres that empty middle and lets the edges crop away on narrow screens,
 * which is the right thing to lose: the copy sits in the middle.
 */
export default function Meadow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "#fef8e5 url(/ip/jane-bg.webp) center / cover no-repeat" }}
    />
  )
}

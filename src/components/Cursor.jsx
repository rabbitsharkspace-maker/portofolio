import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

/*
 * Rocket on the studio page, shark fin on Jenny's side, carrot on Jane's.
 * At cursor size a whole shark is mush — a dorsal fin reads instantly, and so
 * does a carrot.
 *
 * The nav pill always shows the studio rocket regardless of which world you are
 * in: it belongs to the studio, not to either person, and switching the pointer
 * back is what tells you the bar is a way out of the world you're in.
 *
 * Skipped entirely on touch and coarse-pointer devices, where there is no cursor
 * to replace and hiding the native one would strand the user.
 */

function Shape({ world }) {
  if (world === "jenny") {
    // Cartoon fin breaking the surface, mirrored so it leans into the pointer's
    // direction of travel, and hung from its own centre so the click lands in
    // the middle of the shape.
    return (
      <img
        src="/ip/cursor-fin.png"
        alt=""
        width="62"
        className="block h-auto max-w-none"
        style={{ transform: "translate(-50%, -50%) scaleX(-1)", transformOrigin: "50% 50%" }}
      />
    )
  }
  if (world === "jane") {
    /*
     * Drawn carrot, cut out. Its tip sits at the pointer and the body hangs
     * down-right, the way an arrow cursor does. The art is tip-up with the point
     * at the top centre, so the origin goes on the tip (51% 2%) and the matching
     * negative translate brings that point onto the pointer; the rotation then
     * happens about the tip and leaves it pinned there.
     *
     * Sized with an explicit class — Tailwind's reset forces img height:auto,
     * which would otherwise ignore a height attribute and blow it up to full
     * resolution.
     */
    return (
      <img
        src="/ip/cursor-carrot.png"
        alt=""
        className="block h-[54px] w-auto max-w-none"
        style={{ transform: "translate(-51%, -2%) rotate(-25deg)", transformOrigin: "51% 2%" }}
      />
    )
  }
  // Studio: the mark itself, flying. Nose sits at the pointer.
  return (
    <img
      src="/ip/rocket.png"
      alt=""
      width="44"
      height="30"
      className="block max-w-none"
      style={{ transform: "translateX(-50%) rotate(-32deg)", transformOrigin: "50% 0" }}
    />
  )
}

export default function Cursor() {
  const dot = useRef(null)
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  const [over, setOver] = useState(false)
  const [onNav, setOnNav] = useState(false)
  const started = useRef(false)

  const page = pathname.startsWith("/jenny") ? "jenny" : pathname.startsWith("/jane") ? "jane" : "studio"
  const world = onNav ? "studio" : page

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let raf

    function onMove(e) {
      x = e.clientX
      y = e.clientY
      if (!started.current) {
        started.current = true
        setActive(true)
      }
      const t = e.target
      setOnNav(!!t.closest?.("nav"))
      setOver(!!t.closest?.("a, button, [role='button'], .rail"))
    }

    function loop() {
      cx += (x - cx) * 0.28
      cy += (y - cy) * 0.28
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    document.documentElement.setAttribute("data-cursor", "custom")
    window.addEventListener("pointermove", onMove)
    loop()

    return () => {
      document.documentElement.removeAttribute("data-cursor")
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) return null

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60]"
      style={{ opacity: active ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        style={{
          transform: over ? "scale(1.4)" : "scale(1)",
          // Pivot the hover scale on the pointer itself. Both the fin and the
          // carrot already place their own hotspot — the fin's centre, the
          // carrot's tip — on the wrapper's origin, so scaling about (0,0) grows
          // them in place instead of letting the shape drift off the pointer.
          // The rocket is the exception: it hangs from the middle of its top
          // edge, so it pivots there.
          transformOrigin: world === "studio" ? "50% 0" : "0px 0px",
          transition: "transform 220ms cubic-bezier(.22,1,.36,1)",
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,.18))",
        }}
      >
        <Shape world={world} />
      </div>
    </div>
  )
}

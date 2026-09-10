import { useEffect, useRef } from "react"

export default function ClickSpark() {
  const canvas = useRef(null)

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext("2d")
    let sparks = []
    let raf

    function size() {
      c.width = window.innerWidth
      c.height = window.innerHeight
    }
    size()
    window.addEventListener("resize", size)

    function onClick(e) {
      // --brand, not --glow: on a light page the pale tint is invisible.
      const color = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#bae722"
      for (let i = 0; i < 10; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (Math.PI * 2 * i) / 10, life: 1, color })
      }
    }
    window.addEventListener("click", onClick)

    function loop() {
      ctx.clearRect(0, 0, c.width, c.height)
      sparks = sparks.filter((s) => s.life > 0)
      for (const s of sparks) {
        const d = (1 - s.life) * 26
        ctx.strokeStyle = s.color
        ctx.globalAlpha = s.life
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x + Math.cos(s.a) * d, s.y + Math.sin(s.a) * d)
        ctx.lineTo(s.x + Math.cos(s.a) * (d + 9), s.y + Math.sin(s.a) * (d + 9))
        ctx.stroke()
        s.life -= 0.035
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", size)
      window.removeEventListener("click", onClick)
    }
  }, [])

  return <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-[55]" />
}

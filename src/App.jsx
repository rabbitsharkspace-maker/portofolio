import { useEffect, useState } from "react"
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import PillNav from "./components/PillNav"
import Aura from "./components/Aura"
import Meadow from "./components/Meadow"
import Ferrofluid from "./components/Ferrofluid"
import { useLocation } from "react-router-dom"
import ClickSpark from "./components/ClickSpark"
import Cursor from "./components/Cursor"
import Home from "./routes/Home"
import Person from "./routes/Person"
import { LangToggle } from "./lang"

/*
 * The standalone single-file build is opened straight off disk, where there is
 * no server to resolve /jenny — so that build routes on the hash instead.
 */
const Router = import.meta.env.VITE_STANDALONE ? HashRouter : BrowserRouter

// Out here, not inline in the props: the surface rebuilds itself whenever this
// array's identity changes, and a fresh literal per render meant recompiling the
// shader on every navigation.
const SEA = ["#45aef2", "#8fd0f8", "#c5f3ff"]

/*
 * Shark's world gets the ferrofluid; the other two keep the soft wash. Only one
 * background renders at a time — the WebGL surface is the most expensive thing
 * on the page and stacking it under the aura would pay for both.
 *
 * The wrapper carries a seawater gradient so the space between the fluid's
 * contours reads as deep water, not white page. The fluid drifts slowly on top
 * in brighter blues, like light moving through the surface.
 */
function Background() {
  const { pathname } = useLocation()
  const jenny = pathname.startsWith("/jenny")
  const jane = pathname.startsWith("/jane")

  /*
   * The fluid is built once and then never taken down. Compiling its shader is a
   * quarter of a second of frozen main thread, and mounting it per visit meant
   * paying that every single time Jenny's tab was clicked — the stutter people
   * kept hitting. Off her page it is hidden and `paused`, so it holds a GPU
   * context and does no work; coming back is free.
   *
   * The first build still waits for an idle frame, so arriving on her page paints
   * against the seawater gradient underneath and the water fades up a beat later.
   */
  const [fluid, setFluid] = useState(false)
  useEffect(() => {
    if (!jenny || fluid) return
    const run = () => setFluid(true)
    const idle = window.requestIdleCallback
    const id = idle ? idle(run, { timeout: 600 }) : setTimeout(run, 150)
    return () => (idle ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [jenny, fluid])

  return (
    <>
      {jane ? (
        <Meadow />
      ) : jenny ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{ background: "linear-gradient(165deg, #f4fbff 0%, #e6f6ff 45%, #dcf1ff 80%, #e0ebff 100%)" }}
        />
      ) : (
        <Aura />
      )}

      {fluid && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            opacity: jenny ? 1 : 0,
            visibility: jenny ? "visible" : "hidden",
            transition: "opacity 500ms ease",
          }}
        >
          <Ferrofluid
            colors={SEA}
            speed={0.16}
            scale={1.5}
            turbulence={0.9}
            fluidity={0.13}
            rimWidth={0.26}
            sharpness={2.3}
            shimmer={1.1}
            glow={1.5}
            flowDirection="up"
            opacity={0.4}
            paused={!jenny}
            mouseInteraction
            mouseStrength={1}
            mouseRadius={0.32}
          />
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Background />
      <ClickSpark />
      <Cursor />
      <PillNav />
      <LangToggle className="fixed top-5 right-5 z-50" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:who" element={<Person />} />
      </Routes>
    </Router>
  )
}

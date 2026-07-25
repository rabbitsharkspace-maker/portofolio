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
  if (pathname.startsWith("/jane")) return <Meadow />
  if (!pathname.startsWith("/jenny")) return <Aura />
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "linear-gradient(165deg, #f4fbff 0%, #e6f6ff 45%, #dcf1ff 80%, #e0ebff 100%)" }}
    >
      <Ferrofluid
        colors={["#45aef2", "#8fd0f8", "#c5f3ff"]}
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
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.32}
      />
    </div>
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

import { useEffect } from "react"
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom"
import PillNav from "./components/PillNav"
import useDocumentMeta from "./useDocumentMeta"
import Home from "./routes/Home"
import Person from "./routes/Person"

/*
 * The standalone single-file build is opened straight off disk, where there is
 * no server to resolve /jenny — so that build routes on the hash instead.
 */
const Router = import.meta.env.VITE_STANDALONE ? HashRouter : BrowserRouter

/*
 * No background layer any more.
 *
 * There used to be three, one per world: a WebGL ferrofluid on Jenny's page, a
 * meadow on Jane's, an aura on the studio's. Each was a quarter-second of frozen
 * main thread to compile, each ran a GPU context for the whole visit, and
 * between them they were the main reason the site read as three unrelated
 * places rather than one studio. The paper ground in index.css is the
 * background now, and every screenshot on the page sits on it cleanly.
 *
 * The custom cursor and the click sparks went with them. Both replaced something
 * the operating system already does well, and both were noise laid over work
 * that needed the attention.
 */

// Inside the router, so it can read the route; nothing rendered, it only writes
// to <head>.
function Meta() {
  useDocumentMeta()
  const { pathname, hash } = useLocation()

  /*
   * Arriving at a page puts you at the top of it — unless the address named a
   * section, in which case that is where you meant to arrive.
   *
   * A plain <a href="#work"> works once the page is up, because the section is
   * in the DOM by the time the click happens. Opening or sharing /#work did not:
   * the browser looks for the anchor while parsing the HTML, React has not
   * rendered anything yet, and it never tries again — so every shared link to a
   * section landed silently at the top.
   *
   * Two frames of grace before giving up. The first lets React commit; the
   * second covers a section whose own content arrives a beat later. Longer than
   * that and it would fight a reader who has already started scrolling.
   */
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      return
    }

    let frame
    let tries = 0
    const find = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" })
        return
      }
      if (tries++ < 2) frame = requestAnimationFrame(find)
    }
    frame = requestAnimationFrame(find)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <Router>
      <Meta />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PillNav />
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:who" element={<Person />} />
      </Routes>
      </main>
    </Router>
  )
}

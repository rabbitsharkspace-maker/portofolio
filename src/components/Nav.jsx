import { useLocation, useNavigate } from "react-router-dom"
import GooeyNav from "./GooeyNav"
import { BLUE, YELLOW, GREEN } from "../theme"

/*
 * The three-way switcher, as a GooeyNav. The pill takes each tab's own colour —
 * green for the studio, blue for Jenny, yellow for Jane — and the active tab
 * follows the route, so arriving on a world from anywhere (a card, a button)
 * slides the pill there too.
 */
const TABS = [
  { label: "Studio", to: "/" },
  { label: "Jenny", to: "/jenny" },
  { label: "Jane", to: "/jane" },
]

const PILL = [GREEN, BLUE, YELLOW]

function indexOf(pathname) {
  if (pathname.startsWith("/jenny")) return 1
  if (pathname.startsWith("/jane")) return 2
  return 0
}

export default function Nav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const active = indexOf(pathname)

  return (
    <div
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-2 py-1 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--surface) 78%, transparent)",
        border: "1px solid var(--line)",
      }}
    >
      <GooeyNav
        items={TABS.map((t) => ({ label: t.label, href: t.to }))}
        pillColors={PILL}
        initialActiveIndex={active}
        syncIndex={active}
        onSelect={(i) => nav(TABS[i].to)}
        particleCount={14}
        animationTime={600}
        timeVariance={300}
      />
    </div>
  )
}

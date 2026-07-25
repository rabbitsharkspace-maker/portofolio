import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Studio", end: true },
  { to: "/jenny", label: "Jenny" },
  { to: "/jane", label: "Jane" },
]

export default function PillNav() {
  return (
    <nav className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <ul
        className="flex items-center gap-1 rounded-full p-1 backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--surface) 78%, transparent)",
          border: "1px solid var(--line)",
        }}
      >
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              className="block rounded-full px-4 py-1.5 text-[13px] transition-colors duration-300"
              style={({ isActive }) => ({
                background: isActive ? "var(--brand)" : "transparent",
                color: isActive ? "var(--ink)" : "var(--dim)",
              })}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

import { NavLink, Link } from "react-router-dom"
import { LangToggle, useLang } from "../lang"
import "./PillNav.css"

export default function PillNav() {
  const { lang } = useLang()
  return (
    <header className="site-header">
      <Link className="studio-wordmark" to="/" aria-label="RabbitShark Studio"><img className="official-logo" src="/ip/logo.png" alt="RabbitShark" width="62" height="62" /><span className="wordmark-studio">Independent studio<br />Melbourne & everywhere</span></Link>
      <nav aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
        {[["/", "Studio"], ["/jane", "Jane"], ["/jenny", "Jenny"]].map(([to, label]) => (
          <NavLink key={to} to={to} end className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>{label}</NavLink>
        ))}
      </nav>
      <LangToggle />
    </header>
  )
}

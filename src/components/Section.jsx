export function Reveal({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export default function Section({ label, title, children, wide = false, id }) {
  return (
    <section id={id} className={wide ? "editorial-section" : "editorial-section mx-auto max-w-[1180px] px-6"}>
      <div className={wide ? "mx-auto max-w-[1180px] px-6" : ""}>
        {label && <p className="eyebrow">{label}</p>}
        {title && <h2 className="display mt-3 text-[clamp(28px,4vw,44px)]">{title}</h2>}
      </div>
      <div className={title || label ? "mt-10" : ""}>{children}</div>
    </section>
  )
}

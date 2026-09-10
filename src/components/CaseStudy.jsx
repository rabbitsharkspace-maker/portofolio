import { useRef, useState } from "react"
import { useLang } from "../lang"
import { ui } from "../data/ui"
import { ACCENT } from "../theme"

export default function CaseStudy({ item, index, defaultView = "finished" }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const T = ui[lang]
  const c = item[lang]
  const owners = ['jane','jenny'].filter(who => item.notes.some(n => n.by === who))
  const [view,setView] = useState(owners.includes(defaultView) ? defaultView : owners[0])
  const dialog = useRef(null)
  const prefix = `case-${item.id}`
  const selected = owners.includes(view) ? view : owners[0]
  function moveTab(e) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return
    e.preventDefault()
    const current = owners.indexOf(selected)
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? owners.length - 1 : (current + (e.key === 'ArrowRight' ? 1 : -1) + owners.length) % owners.length
    setView(owners[next])
    e.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
  }
  return <article id={prefix} className={`project-spread project-${item.id}`}>
    <div className="project-visual">
      <span className="project-tab">{String(index+1).padStart(2,'0')} / {zh ? '作品档案' : 'PROJECT FILE'}</span>
      <div className="project-window">
        <div className="project-window-bar"><span>● ● ●</span><span>{c.name}</span><span>↗</span></div>
        <button className="project-image-open" onClick={()=>dialog.current?.showModal()} aria-label={zh ? `放大查看 ${c.name}` : `Enlarge ${c.name}`}><img src={item.image} alt={`${c.name} — ${c.kind}`} loading="lazy" style={{aspectRatio:item.ratio}} /><span>{zh ? '放大看看 ↗' : 'Take a closer look ↗'}</span></button>
      </div>
      <div className="project-seal"><strong>{c.metric.value}</strong><span>{c.metric.label}</span></div>
      <p className="project-pencil">{item.owner === 'both' ? (zh ? '两种脑回路，一件成品。' : 'two ways of thinking. one good thing.') : (zh ? '从一个问题，做成一个产品。' : 'one question, taken all the way.')}</p>
    </div>
    <div className="project-story">
      <p className="micro-label">{c.kind}</p>
      <h3>{c.name}</h3>
      <p className="project-problem">{c.problem}</p>
      <Byline split={item.split} />
      <details className="project-notebook">
        <summary><span>{zh ? '翻开项目笔记' : 'Open the project notes'}</span><span className="notebook-plus" aria-hidden="true">＋</span></summary>
        <div className="project-delivery"><p className="micro-label">{T.caseDid}</p><p>{c.did}</p></div>
        <div className="notebook-tabs" role="tablist" aria-label={`${c.name} · ${T.caseViews}`} onKeyDown={moveTab}>{owners.map(who=><button key={who} id={`${prefix}-tab-${who}`} role="tab" aria-controls={`${prefix}-notes`} aria-selected={selected===who} tabIndex={selected===who?0:-1} onClick={()=>setView(who)}>{who === 'jane' ? 'Jane' : 'Jenny'} / {zh ? '解读' : 'notes'}</button>)}</div>
        <div id={`${prefix}-notes`} role="tabpanel" aria-labelledby={`${prefix}-tab-${selected}`} tabIndex={0}>{item.notes.filter(n=>n.by===selected).map((n,i)=><div className="notebook-entry" key={n.en.q}><span>0{i+1}</span><div><h4>{n[lang].q}</h4><p>{n[lang].a}</p></div></div>)}</div>
      </details>
      {item.link && <a className="project-visit" href={item.link} target="_blank" rel="noreferrer">{zh ? '去产品里逛逛' : 'Visit the live product'} ↗</a>}
    </div>
    <dialog className="project-lightbox" ref={dialog} aria-label={c.name} onClick={e=>{if(e.target === e.currentTarget) dialog.current.close()}}><button className="lightbox-close" autoFocus onClick={()=>dialog.current.close()}>{zh ? '关闭' : 'Close'} ×</button><img src={item.image} alt={`${c.name} — ${c.kind}`} /><p>{c.name} / {c.kind}</p></dialog>
  </article>
}

export function Byline({ split }) {
  const { lang } = useLang()
  const owners = ['jane','jenny'].filter(who => split[who] > 0)
  return <div className="project-signatures">{owners.map(who=><span key={who} style={{'--signature-ink':ACCENT[who]}}><b>{who === 'jane' ? 'Jane' : 'Jenny'}</b><small>{owners.length === 1 ? (lang === 'zh' ? '独立作品' : 'Independent work') : who === 'jane' ? (lang === 'zh' ? '体验与设计' : 'Experience & design') : (lang === 'zh' ? '系统与工程' : 'Systems & engineering')}</small></span>)}</div>
}

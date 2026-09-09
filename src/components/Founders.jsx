import { Link } from 'react-router-dom'
import { people } from '../data/people'
import { useLang } from '../lang'

export default function Founders() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section id="founders" className="founder-passes"><div className="founders-intro"><p className="micro-label">{zh ? '工作室的两位主人' : 'MEET YOUR TWO-PERSON TEAM'}</p><h2>{zh ? <>不同的脑回路。<br /><em>同一张工作台。</em></> : <>Different instincts.<br /><em>Same desk.</em></>}</h2><p>{zh ? 'Jane 把体验做清楚，Jenny 把系统跑顺畅。合作项目与独立作品，分别署名。' : 'Jane shapes the experience. Jenny connects the moving parts. Joint and independent work, always credited.'}</p></div><div className="pass-pair">{['jane','jenny'].map((who,i)=>{const p=people[who];const c=p[lang];return <article key={who} className={`founder-pass pass-${who}`}><div className="pass-slot" aria-hidden="true" /><div className="pass-topline"><span>RABBITSHARK</span><span>00{i+1}</span></div><div className="pass-portrait"><span aria-hidden="true">{who==='jane'?'✳':'↗'}</span><img src={p.art} alt={p.short} loading="lazy" /></div><div className="pass-name"><h3>{p.short}</h3><span>{who==='jane'?(zh?'设计与体验':'DESIGN & EXPERIENCE'):(zh?'系统与工程':'SYSTEMS & ENGINEERING')}</span></div><p className="pass-claim">{c.line}</p><details className="pass-evidence"><summary>{zh?'翻看能力与证据':'A few things I bring'} <span aria-hidden="true">＋</span></summary><dl>{c.evidence.map(e=><div key={e.claim}><dt>{e.claim}</dt><dd>{e.proof}</dd></div>)}</dl></details><Link to={`/${who}`} className="pass-entry">{zh?`到 ${p.short} 的工作台`:`Visit ${p.short}’s desk`} ↗</Link></article>})}</div></section>
}

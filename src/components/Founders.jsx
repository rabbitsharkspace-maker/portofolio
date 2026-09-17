import { Link } from 'react-router-dom'
import { people } from '../data/people'
import { useLang } from '../lang'

export default function Founders() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section id="founders" className="founder-passes"><div className="founders-intro"><p className="micro-label">{zh ? '两个人，两种专业' : 'TWO PEOPLE, TWO DISCIPLINES'}</p><h2>{zh ? <>Jane 管设计，<br /><em>Jenny 管系统</em></> : <>Jane designs it.<br /><em>Jenny builds it.</em></>}</h2><p>{zh ? '每个项目都标了是谁做的。合作的写两个名字，独立的写一个。' : 'Every project says who made it — both names when we worked together, one when we did not.'}</p></div><div className="pass-pair">{['jane','jenny'].map((who,i)=>{const p=people[who];const c=p[lang];return <article key={who} className={`founder-pass pass-${who}`}><div className="pass-slot" aria-hidden="true" /><div className="pass-topline"><span>RABBITSHARK</span><span>00{i+1}</span></div><div className="pass-portrait"><span aria-hidden="true">{who==='jane'?'✳':'↗'}</span><img src={p.art} alt={p.short} loading="lazy" /></div><div className="pass-name"><h3>{p.short}</h3><span>{who==='jane'?(zh?'设计与体验':'DESIGN & EXPERIENCE'):(zh?'系统与工程':'SYSTEMS & ENGINEERING')}</span></div><p className="pass-claim">{c.line}</p><details className="pass-evidence"><summary>{zh?'展开看四个例子':'Four examples'} <span aria-hidden="true">＋</span></summary><dl>{c.evidence.map(e=><div key={e.claim}><dt>{e.claim}</dt><dd>{e.proof}</dd></div>)}</dl></details><Link to={`/${who}`} className="pass-entry">{zh?`到 ${p.short} 的工作台`:`Visit ${p.short}’s work`} ↗</Link></article>})}</div></section>
}

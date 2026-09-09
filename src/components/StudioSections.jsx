import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lang'
import { people, studio } from '../data/people'
import { works } from '../data/works'
import { BG_KINDS, BG_ORDER } from '../theme'
import ContactForm from './ContactForm'

export function Chapter({ number, label, title, note, id }) {
  return <div id={id} className="desk-chapter"><div className="chapter-meta"><span>{number}</span><p>{label}</p></div><h2>{title}</h2>{note && <p className="chapter-note">{note} <span aria-hidden="true">↴</span></p>}</div>
}

export function WorkShelf({ items, id = 'all-work' }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [selected,setSelected] = useState(items[0]?.id)
  const active = items.find(w=>w.id === selected) || items[0]
  if (!active) return null
  const link = active.link || (active.id === 'ticketing' ? 'https://youtu.be/6UMtuA_LSOs' : active.id === 'championship' ? 'https://youtu.be/3z5-F9V2XIQ' : null)
  return <section id={id} className="work-cabinet">
    <div className="cabinet-index"><p className="micro-label">{zh ? '还在桌上的那些点子' : 'ALSO ON THE DESK'}</p><h2>{zh ? <>继续，<em>随便翻翻。</em></> : <>A few more<br /><em>curiosities.</em></>}</h2><div className="cabinet-list" role="group" aria-label={zh ? '选择作品' : 'Choose a project'}>{items.map((w,i)=><button key={w.id} aria-pressed={active.id === w.id} aria-controls={`${id}-preview`} onClick={()=>setSelected(w.id)}><span>{String(i+1).padStart(2,'0')}</span><strong>{w[lang].name}</strong><span>↗</span></button>)}</div></div>
    <div className={`cabinet-preview preview-${active.id}`} id={`${id}-preview`} aria-live="polite">
      <span className="cabinet-paperclip" aria-hidden="true" />
      <div className="cabinet-photo" key={active.id}>{active.image ? <img src={active.image} alt={active[lang].name} loading="lazy" /> : <div className="cabinet-type-cover"><span>{active[lang].kind}</span><strong aria-hidden="true">{active.id === 'ticketing' ? '100+' : active.id === 'championship' ? '▶' : '✳'}</strong><p>{active[lang].name}</p></div>}<div className="cabinet-photo-caption"><span>{active[lang].name}</span><small>{active.owner === 'both' ? 'Jane + Jenny' : active.owner === 'jane' ? 'Jane' : 'Jenny'}</small></div></div>
      <p className="cabinet-description">{active[lang].what}</p>{link && <a className="quiet-link" href={link} target="_blank" rel="noreferrer">{active.id === 'ticketing' || active.id === 'championship' ? (zh ? '播放影片' : 'Watch the film') : (zh ? '打开作品' : 'Open the project')} ↗</a>}
    </div>
  </section>
}

export function Recognition({ who }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const recognition = studio[lang].recognition
  const awards = who ? people[who][lang].awards : recognition.awards.split(' · ')
  return <section className={`recognition-ticket ${who ? 'personal-recognition' : ''}`}>
    <div className="recognition-stub"><span className="micro-label">{zh ? '一些被看见的时刻' : 'A LITTLE RECOGNITION'}</span><span className="award-flower" aria-hidden="true">✳</span><strong>{who ? (zh ? '被看见。' : 'Noticed.') : '2 / 6'}</strong><p>{who ? (zh ? '那些值得保留的小票。' : 'A few things to keep.') : (zh ? '六个获奖席位，两份来自这里。' : 'Six winning places. Two from this desk.')}</p><span className="ticket-barcode" aria-hidden="true" /></div>
    <div className="recognition-body"><p className="micro-label">{who ? people[who].name : 'JANE + JENNY'}</p><h2>{who ? (zh ? '一路留下的印记。' : 'Collected along the way.') : (zh ? <>两个脑袋。<br /><em>一起发光。</em></> : <>Two curious minds.<br /><em>Good company.</em></>)}</h2><ul>{awards.map(a=><li key={a}>{a}</li>)}</ul>{!who && <p className="recognition-context">{recognition.path}</p>}<a className="quiet-link" href={recognition.source} target="_blank" rel="noreferrer">{zh ? 'Google AI Vibe-a-thon · 官方战报' : 'Google AI Vibe-a-thon · official recap'} ↗</a></div>
  </section>
}

export function AutomationReceipt() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section id="ticketing-proof" className="automation-scene"><div className="automation-story"><p className="micro-label">JENNY / {zh ? '社区智能工单' : 'COMMUNITY TICKETING'}</p><h2>{zh ? <>少一点手忙脚乱。<br /><em>多一点井井有条。</em></> : <>Less chasing.<br /><em>More living.</em></>}</h2><p>{works.find(w=>w.id==='ticketing')[lang].what}</p><a href="https://youtu.be/6UMtuA_LSOs" className="ink-button" target="_blank" rel="noreferrer">{zh ? '看看它怎么工作' : 'See it in motion'} ↗</a></div><div className="automation-receipt"><p className="micro-label">RABBITSHARK / DAILY OPERATIONS</p><strong>100<span>+</span></strong><p>{zh ? '条报修 / 每天自动处理' : 'maintenance requests / handled daily'}</p><div className="receipt-rule" />{(zh ? ['收到报修','分类与优先级','派给对应人员'] : ['Request received','Classified & prioritised','Assigned to the right team']).map((label,i)=><div className="receipt-step" key={label}><span>0{i+1}</span><span>{label}</span><span>✓</span></div>)}<div className="receipt-rule" /><div className="receipt-total"><span>{zh ? '响应时间' : 'RESPONSE TIME'}</span><strong>{zh ? '小时 → 秒' : 'hours → seconds'}</strong></div><span className="receipt-signature">a little less manual. — Jenny</span></div></section>
}

export function Services() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section className="service-folder"><div className="service-title"><p className="micro-label">{zh ? '从哪里开始' : 'WHERE DO WE START?'}</p><h2>{zh ? <>把你的<br /><em>「要不试试」</em><br />带来。</> : <>Bring your<br /><em>“what if”.</em></>}</h2><span className="service-asterisk" aria-hidden="true">✳</span><p>{zh ? '先聊问题，再一起确定要做成什么。' : 'Start with the problem. We’ll find the shape of it together.'}</p></div><div className="service-sheets">{studio[lang].offers.map((o,i)=><details key={o.title} open={i === 0}><summary><span>0{i+1}</span><h3>{o.title}</h3><span className="notebook-plus" aria-hidden="true">＋</span></summary><div><p>{o.body}</p><a className="quiet-link" href={o.case === 'ticketing' ? '#ticketing-proof' : `#case-${o.case}`}>{o.proof} ↗</a></div></details>)}</div></section>
}

export function PersonNotebook({ who }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const p = people[who]
  const c = p[lang]
  const [selected,setSelected] = useState(0)
  return <section id="about-me" className={`person-notebook notebook-${who}`}><div className="notebook-bio"><p className="micro-label">{zh ? '桌子另一边的我' : 'THE HUMAN BEHIND THE WORK'}</p><h2>{zh ? <>不止是<br /><em>一份履历。</em></> : <>A person,<br /><em>not just a portfolio.</em></>}</h2><div className="bio-paragraphs">{c.about.map(line=><p key={line}>{line}</p>)}</div><p className="bio-signature">{p.name}<span>{zh ? '中英双语 / 全球远程' : 'English & Mandarin / Remote worldwide'}</span></p></div><div className="evidence-deck"><span className="evidence-pin" aria-hidden="true" /><p className="micro-label">{zh ? '我能带来什么' : 'WHAT I BRING TO THE TABLE'}</p><div className="evidence-page" aria-live="polite"><span className="evidence-number">0{selected+1}<small> / 04</small></span><h3>{c.evidence[selected].claim}</h3><p>{c.evidence[selected].proof}</p><span className="evidence-doodle" aria-hidden="true">{['✳','↗','⌘','✶'][selected]}</span></div><div className="evidence-pagination" role="group" aria-label={zh ? '翻阅能力与证据' : 'Browse capabilities and evidence'}>{c.evidence.map((e,i)=><button key={e.claim} aria-pressed={selected===i} onClick={()=>setSelected(i)} aria-label={`${i+1}. ${e.claim}`}>0{i+1}</button>)}</div><p className="evidence-hint">{zh ? '四张小卡片，点点看。' : 'four little cards. take your pick.'} ↗</p></div></section>
}

export function BackgroundFolder({ who }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const c = people[who][lang]
  const groups = BG_ORDER.filter(kind=>c.background.some(b=>b.kind===kind))
  return <section className="background-folder"><div><p className="micro-label">{zh ? '经验收集册' : 'FIELD NOTES / BACKGROUND'}</p><h2>{zh ? <>一路走来，<br /><em>都算数。</em></> : <>A winding path.<br /><em>It all adds up.</em></>}</h2><div className="background-stamp">RABBITSHARK<br /><strong>{who === 'jane' ? 'JANE' : 'JENNY'}</strong><br />ALWAYS LEARNING</div></div><div className="background-entries">{groups.map((kind,i)=><details key={kind} open={i === 0}><summary><span>0{i+1}</span><h3>{BG_KINDS[kind][lang]}</h3><span className="notebook-plus" aria-hidden="true">＋</span></summary><ul>{c.background.filter(b=>b.kind===kind).map(b=><li key={b.text}>{b.text}{b.note && <small>{b.note}</small>}</li>)}</ul></details>)}</div></section>
}

export function ContactLetter({ who }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section id="contact" className="contact-letter"><div className="contact-invitation"><p className="micro-label">{zh ? '下一件好事，从你好开始' : 'THE NEXT GOOD THING STARTS WITH HELLO'}</p><h2>{zh ? <>你的想法，<br /><em>我们听着。</em></> : <>Got a thought?<br /><em>We’re all ears.</em></>}</h2><p>{who ? people[who][lang].replyNote : (zh ? '一个还没想清楚的点子，或一个反复卡住的问题，都可以写下来。' : 'A half-formed idea, a stubborn problem, or a “could this work?” — we’d love to hear it.')}</p><a className="contact-address" href={`mailto:${studio.email}`}>{studio.email} ↗</a><div className="contact-characters" aria-hidden="true"><img src={people.jane.art} alt="" loading="lazy" /><img src={people.jenny.art} alt="" loading="lazy" /><span>say hello.<br />make something.</span></div></div><div className="letter-paper"><div className="letter-heading"><span>{zh ? `致：${who ? people[who].short : 'Jane & Jenny'}` : `TO: ${who ? people[who].short : 'JANE & JENNY'}`}<small>RABBITSHARK STUDIO</small></span><div className="letter-stamp"><img src="/ip/logo.png" alt="RabbitShark logo" /><span>WITH CURIOSITY</span></div></div><ContactForm /></div></section>
}

export function StudioFooter() {
  const { lang } = useLang()
  return <footer className="studio-footer"><Link to="/" className="footer-brand"><img src="/ip/logo.png" alt="RabbitShark Studio" /><span>{lang === 'zh' ? '两个好奇的人，一起把事情做成。' : 'Two curious humans. Making things happen.'}</span></Link><div className="footer-links">{studio.socials.filter(s=>s.label!=='Email').map(s=><a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div><div className="footer-bottom"><span>© 2026 RabbitShark</span><span>Melbourne & everywhere / EN + 中文</span><a href="#main-content">{lang === 'zh' ? '回到顶部' : 'Back to the top'} ↑</a></div></footer>
}

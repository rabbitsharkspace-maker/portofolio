import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lang'
import { people, studio } from '../data/people'
import { works } from '../data/works'
import { ACCENT, BG_KINDS, BG_ORDER } from '../theme'
import ContactForm from './ContactForm'

export function Chapter({ number, label, title, note, id }) {
  return <div id={id} className="desk-chapter"><div className="chapter-meta"><span>{number}</span><p>{label}</p></div><h2>{title}</h2>{note && <p className="chapter-note">{note} <span aria-hidden="true">↴</span></p>}</div>
}

export function WorkShelf({ items, id = 'all-work' }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [selected,setSelected] = useState(items[0]?.id)
  // The player is swapped in only once it is asked for, so choosing a film in
  // the list costs nothing until play is pressed — same rule as the gallery.
  const [playing,setPlaying] = useState(false)
  const active = items.find(w=>w.id === selected) || items[0]
  if (!active) return null
  const film = active.film
  const watch = film ? `https://youtu.be/${film.youtube}` : null
  // A work that can be tried rather than only seen. Same rule as the film: the
  // frame is not fetched until someone presses the button.
  const demo = active.demo
  // Whatever the work itself says it is reachable at. Films have no homepage;
  // they play here, and `watch` is the same cut on YouTube for anyone who wants it.
  const link = active.link || (film ? null : active.embed) || null
  const cover = <div className="cabinet-type-cover"><span>{active[lang].kind}</span><strong aria-hidden="true">{active.id === 'ticketing' ? '100+' : active.id === 'championship' ? '▶' : '✳'}</strong><p>{active[lang].name}</p></div>
  return <section id={id} className={`work-cabinet${playing && demo ? ' cabinet-open' : ''}`}>
    <div className="cabinet-index"><p className="micro-label">{zh ? '还在桌上的那些点子' : 'ALSO ON THE DESK'}</p><h2>{zh ? <>继续，<em>随便翻翻。</em></> : <>A few more<br /><em>curiosities.</em></>}</h2><div className="cabinet-list" role="group" aria-label={zh ? '选择作品' : 'Choose a project'}>{items.map((w,i)=><button key={w.id} aria-pressed={active.id === w.id} aria-controls={`${id}-preview`} onClick={()=>{setPlaying(false);setSelected(w.id)}}><span>{String(i+1).padStart(2,'0')}</span><strong>{w[lang].name}</strong><span>↗</span></button>)}</div></div>
    <div className={`cabinet-preview preview-${active.id}`} id={`${id}-preview`} aria-live="polite">
      <span className="cabinet-paperclip" aria-hidden="true" />
      <div className={`cabinet-photo${playing && demo ? ' cabinet-live' : ''}`} key={active.id}>{playing && film
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0`} title={`${active[lang].name} — ${zh ? '影片' : 'film'}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        : playing && demo
        ? <iframe src={demo} title={`${active[lang].name} — ${zh ? '可以上手的演示' : 'interactive demo'}`} />
        : active.image ? <img src={active.image} alt={active[lang].name} loading="lazy" />
        : film ? <button type="button" className="cabinet-play" onClick={()=>setPlaying(true)} aria-label={zh ? `播放 ${active[lang].name}` : `Play ${active[lang].name}`}>{cover}</button>
        : cover}<div className="cabinet-photo-caption"><span>{active[lang].name}</span><small>{active.owner === 'both' ? 'Jane + Jenny' : active.owner === 'jane' ? 'Jane' : 'Jenny'}</small></div></div>
      {active[lang].ground && <p className="work-ground" style={ACCENT[active.owner] ? {'--ground-ink':ACCENT[active.owner]} : undefined}>{active[lang].ground}</p>}<p className="cabinet-description">{active[lang].what}</p>
      {film && !playing && <button type="button" className="quiet-link" onClick={()=>setPlaying(true)}>{zh ? '播放影片' : 'Play the film'} ▶</button>}
      {demo && !playing && <button type="button" className="quiet-link" onClick={()=>setPlaying(true)}>{zh ? '在这里试试' : 'Try it here'} ↵</button>}
      {film && <a className="quiet-link cabinet-elsewhere" href={watch} target="_blank" rel="noreferrer">{zh ? '也可以在 YouTube 上看' : 'Also on YouTube'} ↗</a>}
      {link && <a className="quiet-link" href={link} target="_blank" rel="noreferrer">{zh ? '打开作品' : 'Open the project'} ↗</a>}
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
  const ticketing = works.find(w => w.id === 'ticketing')
  return <section id="ticketing-proof" className="automation-scene"><div className="automation-story"><p className="micro-label">JENNY / {zh ? '社区智能工单' : 'COMMUNITY TICKETING'}</p><h2>{zh ? <>少一点手忙脚乱。<br /><em>多一点井井有条。</em></> : <>Less chasing.<br /><em>More living.</em></>}</h2><p>{ticketing[lang].what}</p><a href={`https://youtu.be/${ticketing.film.youtube}`} className="ink-button" target="_blank" rel="noreferrer">{zh ? '看看它怎么工作' : 'See it in motion'} ↗</a></div><div className="automation-receipt"><p className="micro-label">RABBITSHARK / DAILY OPERATIONS</p><strong>100<span>+</span></strong><p>{zh ? '条报修 / 每天自动处理' : 'maintenance requests / handled daily'}</p><div className="receipt-rule" />{(zh ? ['收到报修','分类与优先级','派给对应人员'] : ['Request received','Classified & prioritised','Assigned to the right team']).map((label,i)=><div className="receipt-step" key={label}><span>0{i+1}</span><span>{label}</span><span>✓</span></div>)}<div className="receipt-rule" /><div className="receipt-total"><span>{zh ? '响应时间' : 'RESPONSE TIME'}</span><strong>{zh ? '小时 → 秒' : 'hours → seconds'}</strong></div><span className="receipt-signature">a little less manual. — Jenny</span></div></section>
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

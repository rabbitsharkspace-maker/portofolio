import { useState } from "react"
import { useLang } from "../lang"
import { people } from "../data/people"

const tickets = [
  { en: 'Water leaking under the sink', zh: '水槽下面漏水了', team: ['Plumbing', '水务维修'], priority: ['High', '优先'], code: 'PLUMBING' },
  { en: 'The corridor light is out', zh: '走廊的灯不亮了', team: ['Electrical', '电工维修'], priority: ['Normal', '常规'], code: 'ELECTRICAL' },
  { en: 'The lift has stopped working', zh: '电梯停止运行了', team: ['Lift maintenance', '电梯维保'], priority: ['Urgent', '紧急'], code: 'LIFT' },
]

export function TicketToy() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [index, setIndex] = useState(0)
  const [routed, setRouted] = useState(false)
  const t = tickets[index]
  return <div className={`ticket-toy ${routed ? 'is-routed' : ''}`}>
    <div className="toy-topline"><span className="status-led" /><span>{zh ? '工单分流 / 交互示意' : 'TICKET ROUTER / INTERACTIVE DEMO'}</span><span>01—03</span></div>
    <div className="ticket-paper" key={index}>
      <div className="ticket-paper-head"><span>RS—00{index + 1}</span><span>{zh ? '新报修' : 'INCOMING'}</span></div>
      <p>{zh ? t.zh : t.en}</p><div className="ticket-perforation" /><span className="ticket-barcode" aria-hidden="true" />
    </div>
    <div className="routing-path" aria-hidden="true"><span />✳<span /></div>
    <div className="routing-result" aria-live="polite">{routed ? <><span>✓ {zh ? '已分流（演示）' : 'ROUTED (DEMO)'}</span><strong>{t.team[zh ? 1 : 0]}</strong><small>{zh ? '优先级：' : 'Priority: '}{t.priority[zh ? 1 : 0]}</small></> : <><span>{zh ? '等待一条需求' : 'WAITING FOR AN INPUT'}</span><strong>{zh ? '让事情找到对的人' : 'Right task. Right person.'}</strong><small>{zh ? '点下面的按钮，看看去哪里' : 'Push the button. See where it goes.'}</small></>}</div>
    <button className="toy-action" onClick={() => { if(routed) {setIndex(i => (i+1)%tickets.length);setRouted(false)} else setRouted(true) }}>{routed ? (zh ? '再来一张 ↻' : 'Try another ↻') : (zh ? '分流这张工单 ↗' : 'Route this ticket ↗')}</button>
  </div>
}

const palettes = [
  { name: ['Daydream', '白日梦'], bg: '#f4dbed', ink:'#4b2c59', fill:'#d6e57c', radius:'30px', font:'Georgia, serif' },
  { name: ['After hours', '入夜后'], bg:'#302d42', ink:'#f4eeda', fill:'#c6b6ed', radius:'8px', font:'ui-sans-serif, system-ui' },
  { name: ['Sunday', '星期天'], bg:'#eff1d7', ink:'#344c38', fill:'#e6ae78', radius:'60px', font:'Georgia, serif' },
]
export function PaletteToy() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [index,setIndex] = useState(0)
  const p = palettes[index]
  return <div className="palette-toy">
    <div className="toy-topline"><span>✳</span><span>{zh ? '同一界面 / 三种性格' : 'ONE INTERFACE / THREE PERSONALITIES'}</span><span>0{index+1}</span></div>
    <div className="palette-preview" style={{'--preview-bg':p.bg,'--preview-ink':p.ink,'--preview-fill':p.fill,'--preview-radius':p.radius,fontFamily:p.font}}>
      <div className="palette-preview-top">little moments <span>↗</span></div>
      <span className="palette-flower" aria-hidden="true">✳</span>
      <h3>{zh ? '给日常，留一点空白' : <>A little room<br /><em>for yourself.</em></>}</h3>
      <div className="palette-preview-button">{zh ? '慢慢来' : 'Take it slow'} ↗</div>
    </div>
    <div className="palette-choices" role="group" aria-label={zh ? '切换设计方案' : 'Choose a visual direction'}>{palettes.map((p,i)=><button key={p.name[0]} aria-pressed={index === i} onClick={()=>setIndex(i)}><span style={{background:p.fill,boxShadow:`inset 9px 0 ${p.bg}`}} />{p.name[zh?1:0]}</button>)}</div>
    <p className="toy-footnote" aria-live="polite">{zh ? `试试「${p.name[1]}」：配色、字体、圆角一起改变` : `${p.name[0]}: colour, type and shape change together.`}</p>
  </div>
}

export function PersonPlayground({ who }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const p = people[who]
  return <header className={`person-playground is-${who}`}>
    <div className="person-intro">
      <p className="micro-label">RABBITSHARK / {who === 'jenny' ? 'THE SYSTEMS HALF' : 'THE DESIGN HALF'}</p>
      <h1 className="person-title">{p.short}<span>✳</span><i>{who === 'jenny' ? (zh ? '把复杂，变顺手' : 'a method to the magic.') : (zh ? '给好点子，一点性格' : 'a feeling for the details.')}</i></h1>
      <p className="person-intro-copy">{p[lang].line} {p[lang].sub}</p>
      <div className="person-intro-links"><a className="ink-button" href="#personal-work">{zh ? '打开我的作品' : 'Explore my work'} ↗</a><a className="quiet-link" href="#about-me">{zh ? '认识我' : 'A little about me'} ↓</a></div>
      <p className="character-caption">{who === 'jenny' ? (zh ? '系统、AI，以及一点好奇心' : 'systems, AI & a healthy dose of curiosity.') : (zh ? '体验、品牌，以及一点小执着' : 'experience, identity & a little obsession.')}</p>
    </div>
    <div className="person-toy-column"><span className="toy-handnote">{zh ? '来，动手试试 ↴' : 'a small thing to play with ↴'}</span>{who === 'jenny' ? <TicketToy /> : <PaletteToy />}<p className="person-proof-note">{p[lang].evidence[0].proof}</p></div>
  </header>
}

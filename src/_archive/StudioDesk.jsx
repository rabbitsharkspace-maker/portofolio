/*
 * The studio desk that used to be the home hero: two draggable, tilted
 * screenshots, a "2 of 6" badge, the two figures, a sticker and a "Tidy up"
 * toggle. Retired 2026-09-17 in favour of one real screen shown straight.
 * Kept here, unwired, the way the effect components were.
 */
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useDragControls, useReducedMotion } from "motion/react"
import { useLang } from "../lang"
import { people, studio } from "../data/people"

function DeskObject({ children, className, bounds, angle, label }) {
  const controls = useDragControls()
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  return <motion.div className={`desk-object ${className}`} drag dragControls={controls} dragListener={false} dragConstraints={bounds} dragElastic={0.06} dragMomentum={false} animate={{ ...offset, rotate: angle }} whileDrag={{ scale: reduced ? 1 : 1.04, rotate: 0, zIndex: 12 }} transition={{ duration: reduced ? 0 : .35 }}>
    <button className="drag-grip" aria-label={label} title={label} onPointerDown={e => controls.start(e)} onKeyDown={e => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return
      e.preventDefault()
      const dx = e.key === "ArrowLeft" ? -10 : e.key === "ArrowRight" ? 10 : 0
      const dy = e.key === "ArrowUp" ? -10 : e.key === "ArrowDown" ? 10 : 0
      setOffset(o => ({ x: Math.max(-30, Math.min(30, o.x + dx)), y: Math.max(-30, Math.min(30, o.y + dy)) }))
    }}><span>•••</span><span>↗</span></button>
    {children}
  </motion.div>
}

export function StudioDesk() {
  const { lang } = useLang()
  const zh = lang === "zh"
  const bounds = useRef(null)
  const [tidy, setTidy] = useState(false)
  const [version, setVersion] = useState(0)
  return <div className={`studio-desk ${tidy ? "is-tidy" : ""}`} ref={bounds}>
    <span className="desk-orbit" aria-hidden="true" />
    <span className="desk-handnote">{zh ? "好点子，从这里碰头" : "a little mess. a lot of ideas."}<span>↴</span></span>
    <DeskObject key={`mkr-${version}`} bounds={bounds} className="desk-monitor" angle={tidy ? 0 : -7} label={zh ? "拖动餐厅项目；方向键微调" : "Move restaurant project; arrow keys to nudge"}>
      <a href="#case-mkr"><img src="/ip/mkr.webp" alt="My Kitchen Rules" fetchPriority="high" /><div className="desk-object-caption"><span>My Kitchen Rules</span><span>OPEN ↗</span></div></a>
    </DeskObject>
    <DeskObject key={`resume-${version}`} bounds={bounds} className="desk-polaroid" angle={tidy ? 0 : 9} label={zh ? "拖动简历项目；方向键微调" : "Move resume project; arrow keys to nudge"}>
      <a href="#case-fastresume"><img src="/ip/fastresume-home.webp" alt="FastResume" /><div className="desk-object-caption"><span>FastResume</span><span>↗</span></div></a>
    </DeskObject>
    <a className="desk-award" href={studio[lang].recognition.source} target="_blank" rel="noreferrer"><span>GOOGLE AI</span><strong>2 of 6</strong><span>{zh ? "获奖席位 ↗" : "WINNING PLACES ↗"}</span></a>
    <Link className="desk-person desk-jane" to="/jane"><img src={people.jane.art} alt="Jane" /><span>Jane ↗</span></Link>
    <Link className="desk-person desk-jenny" to="/jenny"><img src={people.jenny.art} alt="Jenny" /><span>Jenny ↗</span></Link>
    <span className="desk-sticker" aria-hidden="true">made<br />with<br /><i>curiosity.</i></span>
    <div className="desk-controls"><span>{zh ? "拖动 • 点开 • 随便逛" : "DRAG • OPEN • HAVE A LOOK"}</span><button onClick={() => {setTidy(!tidy); setVersion(v => v + 1)}}>{tidy ? (zh ? "↻ 弄乱一点" : "↻ Make a mess") : (zh ? "✳ 整理桌面" : "✳ Tidy up")}</button></div>
  </div>
}

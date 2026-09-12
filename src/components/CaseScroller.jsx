import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useLang } from '../lang'

/*
 * A project told in beats, as the case scrolls.
 *
 * The art holds still and the writing moves past it: one sticky stage, one panel
 * per beat, and the scene under the reader changes as it is read.
 *
 * The change is tied to the scroll itself rather than fired at a threshold. An
 * observer would hand us an event — crossed / not crossed — and a fixed CSS
 * transition after it, which reads as a flip however it is eased, because
 * nothing about it answers to the hand doing the scrolling. Here the scroll
 * position IS the progress: `p` runs continuously through beat space (1.37 is a
 * third of the way from the second beat to the third), so scrolling slowly
 * dissolves slowly, and stopping halfway stops halfway.
 *
 * That continuity is also where the parallax belongs — the art answers the same
 * scroll at a fraction of its travel, so it sits a layer behind the words
 * instead of moving at a second speed for decoration.
 */
export default function CaseScroller({ scenes, root }) {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const [active,setActive] = useState(0)
  const arts = useRef([])
  const beats = useRef([])

  useEffect(()=>{
    const scroller = root?.current
    const panels = beats.current.filter(Boolean)
    if (!scroller || panels.length < 2) return
    let frame = 0

    const paint = () => {
      frame = 0
      const box = scroller.getBoundingClientRect()
      const first = panels[0].getBoundingClientRect()
      // Centre-to-centre, so uneven panels still map onto whole-number beats.
      const stride = panels[1].getBoundingClientRect().top - first.top || first.height
      const mid = box.top + box.height / 2
      const p = Math.max(0, Math.min(panels.length - 1, (mid - (first.top + first.height/2)) / stride))

      panels.forEach((panel,i)=>{
        const d = p - i                       // −1 → this beat is one below the reader
        const near = Math.max(0, 1 - Math.abs(d))
        const art = arts.current[i]
        if (art) {
          art.style.opacity = reduced ? (Math.round(p) === i ? 1 : 0) : near
          // A quarter of the panel's travel: present in the scroll, a layer behind it.
          art.style.transform = reduced ? '' : `translate3d(0,${(-d * stride * 0.25).toFixed(1)}px,0) scale(${(1 - Math.abs(d) * 0.03).toFixed(4)})`
        }
        panel.style.opacity = reduced ? 1 : 0.26 + 0.74 * near
      })
      setActive(Math.round(p))
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint) }
    paint()
    scroller.addEventListener('scroll', onScroll, { passive:true })
    window.addEventListener('resize', onScroll)
    return ()=>{
      if (frame) cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  },[scenes,root,reduced])

  if (!scenes?.length) return null
  return <section className="case-scroller">
    {/* The panels carry the words; the stage is the same story in a picture. */}
    <div className="scroller-stage" aria-hidden="true">
      {scenes.map((s,i)=><img key={s.art} ref={el=>{arts.current[i]=el}} src={s.art} alt="" loading={i===0?'eager':'lazy'} />)}
    </div>
    <ol className="scroller-beats">
      {scenes.map((s,i)=><li key={s.art} ref={el=>{beats.current[i]=el}} className={i===active?'is-current':''}>
        <span className="beat-index">{String(i+1).padStart(2,'0')}<small> / {String(scenes.length).padStart(2,'0')}</small></span>
        <h4>{s[lang].title}</h4>
        <p>{s[lang].body}</p>
      </li>)}
    </ol>
  </section>
}

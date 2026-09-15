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
/*
 * Each tool's own mark, traced from the same lucide icons the Kno toolbar
 * draws, in the colour that tool wears there. Quoting the product's own
 * vocabulary rather than inventing a second one for the page.
 */
const TOOL = {
  note:       { tint: '#3B82F6', d: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'] },
  alchemy:    { tint: '#10B981', d: ['M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2', 'M6.453 15h11.094', 'M8.5 2h7'] },
  collider:   { tint: '#A855F7', d: ['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'] },
  spark:      { tint: '#F59E0B', d: ['M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z', 'M20 2v4', 'M22 4h-4'] },
  logicguard: { tint: '#EF4444', d: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'] },
}

const ToolIcon = ({ tool, className }) => {
  const t = TOOL[tool]
  if (!t) return null
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {t.d.map(d=><path key={d} d={d} />)}
  </svg>
}

export default function CaseScroller({ scenes, root }) {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const [active,setActive] = useState(0)
  const arts = useRef([])
  const marks = useRef([])
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
        // The word and the caption sit a layer behind her and travel less, so
        // the scene has depth rather than two things sliding at one speed.
        const mark = marks.current[i]
        if (mark) {
          mark.style.opacity = reduced ? (Math.round(p) === i ? 1 : 0) : near
          mark.style.transform = reduced ? '' : `translate3d(0,${(-d * stride * 0.12).toFixed(1)}px,0)`
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
      {/* The field she stands on. A real element, not a ::before — as a pseudo
          element in this grid it never took its height and painted nothing. */}
      <div className="stage-field" />
      {scenes.map((s,i)=>s[lang].card && <div key={`${s.art}-mark`} ref={el=>{marks.current[i]=el}} className="scroller-mark" style={TOOL[s.tool] ? {'--tint':TOOL[s.tool].tint} : undefined}>
        <ToolIcon tool={s.tool} className="scroller-watermark" />
        {/* The card the tool actually left on the canvas above, in its own colours. */}
        <div className="scroller-card">
          <p className="scroller-card-label"><ToolIcon tool={s.tool} className="scroller-card-icon" />{s[lang].card.label}</p>
          <h5>{s[lang].card.title}</h5>
          <p>{s[lang].card.body}</p>
        </div>
      </div>)}
      {scenes.map((s,i)=><img key={s.art} ref={el=>{arts.current[i]=el}} src={s.art} alt="" loading={i===0?'eager':'lazy'} />)}
    </div>
    <ol className="scroller-beats">
      {scenes.map((s,i)=><li key={s.art} ref={el=>{beats.current[i]=el}} className={i===active?'is-current':''}>
        {/*
          * The counter is the product's own unit, not the page's. FastResume
          * runs on an ATS score, so its beats are 34% -> 96%; RealHeart makes
          * you wait fifteen days, so its rail has fifteen segments and fills a
          * day at a time. "01 / 04" only ever said which picture you were on.
          *
          * A case that sets neither falls back to counting its beats, so the
          * cases written before this read exactly as they did.
          *
          * Number left, label right, the full width of the column between them:
          * the measure below is narrow, and the header and the rail are what
          * give the block its edges.
          */}
        <div className="beat-head">
          <span className="beat-index">
            {s[lang].meter ?? String(i+1).padStart(2,'0')}
            <small>{s[lang].meterCap ?? ` / ${String(scenes.length).padStart(2,'0')}`}</small>
          </span>
          {s[lang].label && <span className="beat-label">{s[lang].label}</span>}
        </div>
        <span className="beat-rail" aria-hidden="true">{(()=>{
          const segs = s.segments ?? scenes.length
          const lit = Math.round((s.fill ?? (i + 1) / scenes.length) * segs)
          return Array.from({length:segs},(_,n)=><i key={n} className={n<lit?'is-done':undefined} />)
        })()}</span>
        <h4>{s[lang].title}</h4>
        <p>{s[lang].body}</p>
        {/* The beat's one word, stamped under it. Optional, like the label. */}
        {s[lang].word && <span className="beat-word">{s[lang].word}</span>}
      </li>)}
    </ol>
  </section>
}

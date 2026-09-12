import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLang } from '../lang'
import { Byline } from './CaseStudy'
import { ACCENT } from '../theme'
import CaseScroller from './CaseScroller'
import SereneStory from './SereneStory'

const StudioWorld = lazy(() => import('./StudioWorld'))

export default function ProjectGallery({ items }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const reduced = useReducedMotion()
  const dialog = useRef(null)
  const opener = useRef(null)
  const [selected,setSelected] = useState(null)
  const [mode,setMode] = useState('world')
  const [notes,setNotes] = useState('all')
  // The film loads only once it is asked for: a third-party player on every open
  // would be a YouTube request for readers who never press play.
  const [playing,setPlaying] = useState(false)
  const item = selected === null ? null : items[selected]
  // A cut we serve ourselves beats one we embed; see the note on `film` in cases.js.
  const film = item?.film
  const ourCut = film?.[lang]
  const poster = typeof item?.poster === 'string' ? item.poster : item?.poster?.[lang]
  useEffect(()=>{
    if (selected === null) return
    if (!dialog.current.open) dialog.current.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return ()=>{document.body.style.overflow = previous}
  },[selected])
  function open(index,e) {opener.current = e?.currentTarget instanceof HTMLElement ? e.currentTarget : document.activeElement;setNotes('all');setPlaying(false);setSelected(index)}
  function close() {dialog.current.close()}
  function move(direction) {setNotes('all');setPlaying(false);setSelected(i=>(i+direction+items.length)%items.length);dialog.current.scrollTop=0}
  function tilt(e) {
    if (reduced || e.pointerType !== 'mouse') return
    const r=e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--art-x',`${((e.clientX-r.left)/r.width-.5)*7}deg`)
    e.currentTarget.style.setProperty('--art-y',`${-((e.clientY-r.top)/r.height-.5)*5}deg`)
  }
  return <div className={`project-gallery gallery-mode-${mode}`}>
    <div className="gallery-toolbar"><span>{zh?'精选展览':'SELECTED EXHIBITION'} / {String(items.length).padStart(2,'0')}</span><div role="group" aria-label={zh?'作品展示方式':'Gallery layout'}><button aria-pressed={mode==='world'} onClick={()=>setMode('world')}>{zh?'小世界':'World'} ✳</button><button aria-pressed={mode==='gallery'} onClick={()=>setMode('gallery')}>{zh?'画廊':'Gallery'} ▦</button><button aria-pressed={mode==='index'} onClick={()=>setMode('index')}>{zh?'索引':'Index'} ☰</button></div></div>
    {mode === 'world' ? <Suspense fallback={<div className="world-fallback"><p>{zh?'正在布置小展岛…':'Setting up the little world…'}</p>{items.map((p,i)=><button id={`case-${p.id}`} key={p.id} onClick={e=>open(i,e)}>{p[lang].name} ↗</button>)}</div>}><StudioWorld items={items} onOpen={open}/></Suspense> : <div className="gallery-grid">{items.map((project,i)=><motion.article key={project.id} id={`case-${project.id}`} className={`gallery-exhibit exhibit-${project.id}`} initial={reduced?false:{y:22}} whileInView={{y:0}} viewport={{once:true,amount:.1}} transition={{duration:.65,ease:[.2,.7,.2,1]}}>
      <button className="exhibit-open" onClick={e=>open(i,e)} aria-label={zh?`进入 ${project[lang].name} 展台`:`Explore ${project[lang].name}`} onPointerMove={tilt} onPointerLeave={e=>{e.currentTarget.style.setProperty('--art-x','0deg');e.currentTarget.style.setProperty('--art-y','0deg')}}>
        <div className="exhibit-stage"><span className="exhibit-number">0{i+1}</span><span className="exhibit-medium">{project.owner==='both'?'JANE × JENNY':project.owner.toUpperCase()}</span><div className="exhibit-art"><img src={project.image} alt={`${project[lang].name} — ${project[lang].kind}`} loading="lazy" /></div><span className="exhibit-explore">{zh?'进入':'Explore'}<i>↗</i></span><div className="exhibit-ground" aria-hidden="true" /></div>
        <div className="exhibit-label"><div><h3>{project[lang].name}</h3><p>{project[lang].kind}</p></div><span className="exhibit-result">{project[lang].metric.value}<small>{project[lang].metric.label}</small></span><span className="exhibit-arrow" aria-hidden="true">↗</span></div>
      </button>
    </motion.article>)}</div>}
    <p className="gallery-endnote">{zh?'点开一件作品，让细节慢慢展开。':'Step inside a project. Stay for the details.'}<span>RABBITSHARK — SELECTED WORKS</span></p>
    <dialog ref={dialog} className="gallery-dialog" aria-label={zh?'作品展台':'Project exhibition'} onClose={()=>{setSelected(null);opener.current?.focus()}} onClick={e=>{if(e.target===e.currentTarget)close()}} onKeyDown={e=>{
      if (e.target instanceof HTMLElement && e.target.closest('input,textarea,select,summary')) return
      if(e.key==='ArrowRight' || e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}
    }}>
      <div className="exhibition-nav"><span>RABBITSHARK / {zh?'作品展台':'EXHIBITION'}</span><div><button onClick={()=>move(-1)} aria-label={zh?'上一件作品':'Previous project'}>←</button><span>{selected===null?'01':String(selected+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><button onClick={()=>move(1)} aria-label={zh?'下一件作品':'Next project'}>→</button><button className="exhibition-close" autoFocus onClick={close}>{zh?'退出展台':'Close'} ×</button></div></div>
      <AnimatePresence mode="wait" initial={false}>{item && <motion.div key={item.id} className={`exhibition-content exhibition-${item.id}`} initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={reduced?{}:{opacity:0,y:-8}} transition={{duration:.2}}>
        <header className="exhibition-title"><p className="micro-label">{item[lang].kind}</p><h2>{item[lang].name}</h2>{item[lang].ground && <p className="work-ground" style={ACCENT[item.owner] ? {'--ground-ink':ACCENT[item.owner]} : undefined}>{item[lang].ground}</p>}<Byline split={item.split} /></header>
        {/* Cover and cut both follow the page's language. */}
        <figure className={`exhibition-image${film ? ' has-film' : ''}`}>{playing && film
          ? (ourCut
            ? <video src={ourCut} poster={poster} controls autoPlay playsInline />
            : <iframe src={`https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0`} title={`${item[lang].name} — ${zh?'影片':'film'}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />)
          : <><img src={poster || item.image} alt={poster ? `${item[lang].name} — ${zh?'影片封面':'film cover'}` : `${item[lang].name} — ${item[lang].kind}`} />{film && <button className="exhibition-play" onClick={()=>setPlaying(true)}><span aria-hidden="true">▶</span>{zh?'播放影片':'Play the film'}</button>}</>}</figure>
        {film?.youtube && <p className="film-elsewhere"><a className="quiet-link" href={`https://youtu.be/${film.youtube}`} target="_blank" rel="noreferrer">{zh?'也可以在 YouTube 上看':'Also on YouTube'} ↗</a></p>}
        <div className="exhibition-story"><div><p className="micro-label">{zh?'起点 / 问题':'THE STARTING POINT'}</p><p>{item[lang].problem}</p></div><div><p className="micro-label">{zh?'交付 / 成品':'WHAT WE DELIVERED'}</p><p>{item[lang].did}</p>{item.link && <a href={item.link} target="_blank" rel="noreferrer" className="quiet-link">{zh?'体验产品':'Visit the product'} ↗</a>}</div><div className="exhibition-metric"><strong>{item[lang].metric.value}</strong><span>{item[lang].metric.label}</span></div></div>
        {item.id === 'serene' ? <SereneStory scenes={item.scenes} root={dialog} /> : <CaseScroller scenes={item.scenes} root={dialog} />}
        <section className="exhibition-notes"><div className="exhibition-notes-heading"><h3>{zh?'近一点，看细节。':'A closer look.'}</h3><div role="group" aria-label={zh?'筛选界面解读':'Filter interface notes'}>{['all','jane','jenny'].filter(who=>who==='all'||item.notes.some(n=>n.by===who)).map(who=><button key={who} aria-pressed={notes===who} onClick={()=>setNotes(who)}>{who==='all'?(zh?'全部':'All'):who==='jane'?'Jane':'Jenny'}</button>)}</div></div><div className="exhibition-note-grid">{item.notes.filter(n=>notes==='all'||notes===n.by).map((n,i)=><details key={n.en.q}><summary><span>0{i+1} / {n.by==='jane'?'Jane':'Jenny'}</span><h4>{n[lang].q}</h4><b aria-hidden="true">＋</b></summary><p>{n[lang].a}</p></details>)}</div></section>
      </motion.div>}</AnimatePresence>
    </dialog>
  </div>
}

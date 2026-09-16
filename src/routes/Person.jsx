import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PersonPlayground } from '../components/Playground'
import ProjectGallery from '../components/ProjectGallery'
import { Chapter, WorkShelf, Recognition, PersonNotebook, BackgroundFolder, ContactLetter, StudioFooter } from '../components/StudioSections'
import { people } from '../data/people'
import { cases } from '../data/cases'
import { works } from '../data/works'
import { useLang } from '../lang'

export default function Person() {
  const { who } = useParams()
  const { lang } = useLang()
  const zh = lang === 'zh'
  const p = people[who]
  useEffect(()=>{
    if (!p) return
    document.documentElement.setAttribute('data-world',who)
    return ()=>document.documentElement.removeAttribute('data-world')
  },[who,p])
  if (!p) return <div className="missing-page"><h1>{zh?'没有这张工作台':'This desk doesn’t exist.'}</h1><Link to="/">{zh?'回工作室':'Back to the studio'} ↗</Link></div>
  const mine = cases.filter(c=>c.owner===who || c.owner==='both').sort((a,b)=>(a.owner===who?-1:0)-(b.owner===who?-1:0))
  const other = works.filter(w=>(w.owner===who || w.owner==='both') && !mine.some(c=>c.id===w.id))
  return <>
    <PersonPlayground key={who} who={who} />
    <div className={`desk-body desk-body-${who}`}>
      <section id="personal-work" className="work-collection"><Chapter number="01" label={zh?`${p.short} 的作品档案`:`${p.short.toUpperCase()}’S SELECTED WORK`} title={who==='jane'?(zh?<>让点子，<em>有自己的样子</em></>:<>Ideas with<br /><em>a personality.</em></>):(zh?<>把复杂，<em>理出头绪</em></>:<>Making sense<br /><em>of the moving parts.</em></>)} note={zh?'每个项目都讲清楚：做了什么、为什么这样做、谁参与了':'Every project shows what we made, why it works that way and who contributed.'}/><ProjectGallery key={who} items={mine} initialMode="gallery" /></section>
      <WorkShelf key={who} items={other} />
      <PersonNotebook key={`notebook-${who}`} who={who} />
      <Recognition who={who} />
      <BackgroundFolder who={who} />
      <ContactLetter who={who} />
      <StudioFooter />
    </div>
  </>
}

import FoundersHero from '../components/FoundersHero'
import Founders from '../components/Founders'
import CaseStudy from '../components/CaseStudy'
import { Chapter, WorkShelf, Recognition, AutomationReceipt, Services, ContactLetter, StudioFooter } from '../components/StudioSections'
import { cases, featuredIds } from '../data/cases'
import { works } from '../data/works'
import { useLang } from '../lang'

export default function Home() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <>
    <FoundersHero />
    <div className="desk-body">
      <section id="work" className="work-collection"><Chapter number="01" label={zh?'一些认真做成的事':'THINGS WE PUT INTO THE WORLD'} title={zh?<>点子，<em>有了着落。</em></>:<>Out of our heads.<br /><em>Into the world.</em></>} note={zh?'挑一件，翻开看看。':'pick one. have a rummage.'} /><div className="project-collection">{cases.map((item,i)=><CaseStudy key={item.id} item={item} index={i} />)}</div></section>
      <WorkShelf items={works.filter(w=>!featuredIds.includes(w.id))} />
      <Recognition />
      <AutomationReceipt />
      <Founders />
      <Services />
      <ContactLetter />
      <StudioFooter />
    </div>
  </>
}

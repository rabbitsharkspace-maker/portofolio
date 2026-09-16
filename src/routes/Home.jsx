import FoundersHero from '../components/FoundersHero'
import Founders from '../components/Founders'
import ProjectGallery from '../components/ProjectGallery'
import { Chapter, WorkShelf, Recognition, AutomationReceipt, Services, ClientVoice, ContactLetter, StudioFooter } from '../components/StudioSections'
import { cases, featuredIds } from '../data/cases'
import { works } from '../data/works'
import { useLang } from '../lang'

export default function Home() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <>
    <FoundersHero />
    <div className="desk-body">
      <section id="work" className="work-collection"><Chapter number="01" label={zh?'一些认真做成的事':'SELECTED WORK'} title={zh?<>点子，<em>有了着落</em></>:<>Out of our heads.<br /><em>Into the world.</em></>} note={zh?'打开一个作品，看看问题、过程和最后做成的东西':'Open a project to see the problem, the build and the result.'} /><ProjectGallery items={cases} initialMode="gallery" /></section>
      <WorkShelf items={works.filter(w=>!featuredIds.includes(w.id))} />
      <Recognition />
      <AutomationReceipt />
      <Founders />
      <Services />
      <ClientVoice />
      <ContactLetter />
      <StudioFooter />
    </div>
  </>
}

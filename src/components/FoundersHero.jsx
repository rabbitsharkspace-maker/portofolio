import { StudioDesk } from './Playground'
import { useLang } from '../lang'

export default function FoundersHero() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section className="playful-hero">
    <div className="playful-hero-copy">
      <p className="micro-label"><span className="status-led" /> INDEPENDENT BY NATURE · MELBOURNE & EVERYWHERE</p>
      <h1>{zh ? <>认真做事。<br /><em>有趣一点。</em></> : <>Serious work.<br /><em>Curious minds.</em></>}</h1>
      <p className="playful-intro">{zh ? '一只兔子，一条鲨鱼。我们是 Jane 和 Jenny，把设计、AI 和工程放在同一张桌上，让好点子真的跑起来。' : 'A rabbit. A shark. A shared curiosity. We’re Jane and Jenny — making useful things with design, AI and a little unexpected thinking.'}</p>
      <div className="playful-hero-links"><a className="ink-button" href="#work">{zh ? '翻翻我们的作品' : 'Open the good stuff'} ↗</a><a className="quiet-link" href="#founders">{zh ? '认识两位主人' : 'Meet the two of us'} ↓</a></div>
      <p className="hero-margin-note"><span>↳</span> {zh ? '两个人，从「要不试试」做到上线。' : 'Two people. From “what if” to out in the world.'}</p>
    </div>
    <StudioDesk />
    <div className="studio-ticker"><span>DESIGN THAT FEELS RIGHT</span><i>✳</i><span>SYSTEMS THAT JUST WORK</span><i>✳</i><span>BUILT BY TWO HUMANS</span><i>✳</i></div>
  </section>
}

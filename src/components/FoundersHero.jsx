import { useLang } from '../lang'
import { studio } from '../data/people'

/*
 * One real screen, shown straight.
 *
 * The right-hand side used to be a desk: two tilted screenshots you could
 * drag, a rotated award, two figures, a sticker, a "Tidy up" toggle and a
 * hand-written "a little mess. a lot of ideas." Eight objects, on the first
 * screen, under a headline that says "Serious work." The visual and the copy
 * were making opposite claims at the same moment, and everything below the
 * fold had since been rebuilt around real screens and checkable numbers.
 *
 * Now it is the owner's dashboard from My Kitchen Rules, at a size where the
 * numbers on it can be read, in a plain frame, with the one thing that was
 * evidence — two of the six Vibe-a-thon places — kept as a flat tag. MKR is
 * the one product both of us built, so it is the one that belongs on the
 * studio's own page. Breadth is the gallery's job, four hundred pixels down.
 */
function HeroShot() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <div className="hero-shot">
    <a className="hero-shot-award" href={studio[lang].recognition.source} target="_blank" rel="noreferrer"><span>GOOGLE AI</span><strong>2 of 6</strong><span>{zh ? '获奖席位 ↗' : 'WINNING PLACES ↗'}</span></a>
    <a className="hero-shot-frame" href="#case-mkr" aria-label={zh ? '打开 My Kitchen Rules 案例' : 'Open the My Kitchen Rules case'}>
      <span className="hero-shot-bar" aria-hidden="true"><i /><i /><i /></span>
      <img src="/ip/mkr-dashboard.webp" alt={zh ? 'My Kitchen Rules 的老板仪表盘：今日工资对预算、待办、事故、今晚在场的人' : 'The owner’s dashboard in My Kitchen Rules: wage against budget, open tasks, incidents, who is on the floor tonight'} fetchPriority="high" width="1600" height="1026" />
    </a>
    <div className="hero-shot-caption">
      <p><strong>My Kitchen Rules</strong><span>{zh ? '餐厅运营系统 · 六个角色，一套系统 · 悉尼试点' : 'Restaurant operations · six roles, one system · piloted in Sydney'}</span></p>
      <a className="quiet-link" href="#case-mkr">{zh ? '打开案例' : 'Open the case'} ↗</a>
    </div>
  </div>
}

export default function FoundersHero() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return <section className="playful-hero">
    <div className="playful-hero-copy">
      <p className="micro-label"><span className="status-led" /> INDEPENDENT BY NATURE · MELBOURNE & EVERYWHERE</p>
      <h1>{zh ? <>认真做事<br /><em>有趣一点</em></> : <>Serious work.<br /><em>Curious minds.</em></>}</h1>
      <p className="playful-intro">{zh ? '我们是 Jane 和 Jenny。把设计、AI 和工程放在同一张桌上，亲自把一个想法从问题梳理做到上线。' : 'We’re Jane and Jenny. We bring design, AI and engineering together, and take ideas from the real problem through to a live product.'}</p>
      <div className="playful-hero-links"><a className="ink-button" href="#work">{zh ? '看精选作品' : 'View selected work'} ↗</a><a className="quiet-link" href="#founders">{zh ? '认识 Jane 和 Jenny' : 'Meet Jane + Jenny'} ↓</a></div>
      <p className="hero-margin-note"><span>↳</span> {zh ? '两个人，从「要不试试」做到上线' : 'Two people. From “what if” to out in the world.'}</p>
    </div>
    <HeroShot />
    <div className="studio-ticker"><span>DESIGN THAT FEELS RIGHT</span><i>✳</i><span>SYSTEMS THAT JUST WORK</span><i>✳</i><span>BUILT BY TWO HUMANS</span><i>✳</i></div>
  </section>
}

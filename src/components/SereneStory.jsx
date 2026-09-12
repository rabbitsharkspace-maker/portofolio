import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLang } from '../lang'
import './SereneStory.css'

/*
 * Serene, in the four beats Jenny gives them in her own talk.
 *
 * Every word on this page comes out of `cases.js` — the big watermark, the act
 * label, the caption on the scene, the label on the toggle, all of it. None of
 * it is written here. The two of them edit their own writing in one file, and
 * the third beat in particular has to stay word for word: "don't tell your
 * family or your friends" is the whole point of that beat, and a paraphrase
 * that says "anyone" loses it.
 *
 * The toggles are story, not product. They turn over Jenny's own sentence to
 * its second half; they do not pretend to drive the app, and each one says so.
 */
export default function SereneStory({ scenes, root }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const stage = useRef(null)
  const [open, setOpen] = useState({})
  const turn = i => setOpen(o => ({ ...o, [i]: !o[i] }))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        stage.current.querySelectorAll('.serene-act').forEach(act => {
          /*
           * Every line watches for itself, rather than the whole column waiting on
           * one trigger somewhere in the act.
           *
           * Shared, the column could only be all hidden or all shown, and both
           * settings were wrong: fired off the act's top edge it finished below the
           * fold and nobody saw it happen; fired off the act's middle you sat and
           * watched an empty column until it caught up. A line of its own only ever
           * holds at nought while it is still under the fold, and rises as it
           * crosses in — so there is never a hole on screen, and the movement
           * happens where it can be read.
           */
          /*
           * The heading is set line by line, each line rising out from behind its
           * own clipped edge. It is the biggest type on the page and it used to
           * arrive the way the small print does — one block, faded.
           *
           * `autoSplit` re-splits when the webfont lands or the column changes
           * width, so lines never break against a measurement that has since
           * moved; the animation is made inside `onSplit` and returned, which is
           * what lets SplitText resync it across a re-split.
           */
          const heading = act.querySelector('.serene-copy h3')
          if (heading) SplitText.create(heading, {
            type: 'lines', mask: 'lines', autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 115, duration: .85, stagger: .11, ease: 'power3.out',
                scrollTrigger: { trigger: heading, scroller: root.current, start: 'top bottom-=70', toggleActions: 'play none none none' },
              })
            },
          })
          act.querySelectorAll('.serene-enter').forEach(el => {
            gsap.from(el, {
              y: 26, opacity: 0, duration: .7, ease: 'power2.out',
              scrollTrigger: { trigger: el, scroller: root.current, start: 'top bottom-=70', toggleActions: 'play none none none' },
            })
          })
          gsap.fromTo(act.querySelector('.serene-figure'), { y: 18 }, {
            y: -18, ease: 'none', scrollTrigger: { trigger: act, scroller: root.current, start: 'top bottom', end: 'bottom top', scrub: .5 },
          })
        })
        /*
         * Measured again once the case has actually stopped moving.
         *
         * Every trigger above was worked out against the dialog the instant it
         * opened — before its images had arrived and before the fonts had been
         * applied — so the whole story was shorter then than it is a moment
         * later, and each start position was computed too near the top. Every
         * trigger then reads as already passed, all of it plays at once while
         * the case is still opening, and by the time anyone scrolls there is
         * nothing left to see: the words are simply sitting there.
         *
         * It showed up in production and not in dev for the reason that makes it
         * hard to catch — served from cache the page arrives all at once and the
         * triggers are built before anything has settled, while Vite hands over
         * module by module and the layout is already still by then.
         */
        const settle = () => ScrollTrigger.refresh()
        requestAnimationFrame(()=>requestAnimationFrame(settle))
        document.fonts?.ready.then(settle).catch(()=>{})
        stage.current.querySelectorAll('img').forEach(img => {
          if (!img.complete) img.addEventListener('load', settle, { once: true })
        })
      }, stage)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [root, lang])

  const note = zh ? '故事示意 · 真实功能见上方演示影片' : 'Story, not the product — the film above is the real thing'

  return <section ref={stage} className="serene-story" aria-label={zh ? 'Serene：四幕' : 'Serene: four moments'}>
    <div className="serene-story-heading">
      <span>SERENE / {zh ? '四幕，出自 Jenny 的讲稿' : 'FOUR MOMENTS, FROM JENNY’S TALK'}</span>
      <span>{zh ? '往下滚' : 'SCROLL'} ↓</span>
    </div>
    {scenes.map((scene, i) => {
      const c = scene[lang]
      const turned = !!open[i]
      return <article key={scene.art} className={`serene-act serene-act-${i}${turned ? ' is-turned' : ''}`}>
        <div className="serene-scene">
          <span className="serene-scene-word" aria-hidden="true">{c.word}</span>
          <div className="serene-orbit" aria-hidden="true" />
          {i === 0 && <div className="serene-sign serene-enter" aria-hidden="true"><span>15 MIN</span><b>P</b><small>← &nbsp; THIS SIDE</small><div>GoGet<br /><small>SHARE CARS ONLY →</small></div></div>}
          {i === 2 && <div className="serene-rings" aria-hidden="true"><i /><i /><i /></div>}
          {i === 3 && <div className="serene-weather" aria-hidden="true"><span className="serene-sun" />{Array.from({ length: 14 }, (_, n) => <i key={n} style={{ left: `${n * 7.4}%`, animationDelay: `${n * -.27}s` }} />)}</div>}
          {/* Anything laid over the still goes inside this box, never beside it. */}
          <div className="serene-figure">
            <img className="serene-character" src={scene.art} alt="" loading="lazy" />
            {i === 1 && <div className="serene-viewfinder" aria-hidden="true"><span className="serene-scan" /><small>{turned ? '✓ READ & VERIFIED' : 'POSITION DOCUMENT HERE'}</small></div>}
          </div>
          <div className="serene-floor" aria-hidden="true" />
          <div className="serene-caption serene-enter">
            <span>{c.stamp}</span>
            <p>{turned && c.captionAfter ? c.captionAfter : c.caption}</p>
          </div>
        </div>
        <div className="serene-copy">
          <div className="serene-act-label serene-enter"><span>0{i + 1}</span><span>{c.label}</span><i>✳</i></div>
          {/* Keyed on the language: SplitText replaces this element's children and
              restores the text it cached when it split, which would put the old
              language back over the new one. A fresh element each time instead. */}
          <h3 key={lang}>{c.title}</h3>
          <p className="serene-body serene-enter">{c.body}</p>
          {c.action
            ? <><button className="serene-interact serene-enter" aria-pressed={turned} onClick={() => turn(i)}>
                <span>{turned ? c.actionAfter : c.action}</span><b aria-hidden="true">{turned ? '↺' : '→'}</b>
              </button><p className="serene-interaction-note">{note}</p></>
            : <div className="serene-aside serene-enter">{c.aside}</div>}
        </div>
      </article>
    })}
    <div className="serene-end"><span>✳</span><p>{zh ? '知道下一步该做什么。' : 'Knowing what to do next.'}</p><small>SERENE · BY JENNY</small></div>
  </section>
}

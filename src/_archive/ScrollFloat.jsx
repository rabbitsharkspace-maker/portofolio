import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * React Bits' ScrollFloat: the string is split per character and each one floats
 * up into place, staggered.
 *
 * `trigger` picks what drives it:
 *   "scroll" — upstream behaviour, scrubbed by the element's own scroll position.
 *   "appear" — plays once when the element mounts and never again. The hero copy
 *     lives inside a pinned section, so it never travels through the viewport for
 *     a ScrollTrigger to scrub; it is swapped in by the stage, and the brief is
 *     that each line animates the first time it shows and is static after that.
 */
const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  trigger = 'scroll',
}) => {
  const containerRef = useRef(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    // Spaces stay plain inline spans rather than the non-breaking .char upstream
    // uses: .char is inline-block, and a run of inline-blocks with no breakable
    // space between them leaves the line unwrappable — fine for a one-word demo
    // heading, not for a sentence on a phone.
    return text.split('').map((char, index) =>
      char === ' ' ? (
        <span className="char-space" key={index}>
          {' '}
        </span>
      ) : (
        <span className="char" key={index}>
          {char}
        </span>
      )
    )
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const charElements = el.querySelectorAll('.char')
    const from = {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    }
    const to = {
      duration: animationDuration,
      ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger,
      clearProps: 'willChange',
    }

    if (trigger === 'appear') {
      const tween = gsap.fromTo(charElements, from, to)
      return () => tween.kill()
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window
    const tween = gsap.fromTo(charElements, from, {
      ...to,
      scrollTrigger: { trigger: el, scroller, start: scrollStart, end: scrollEnd, scrub: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, trigger, children])

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  )
}

export default ScrollFloat

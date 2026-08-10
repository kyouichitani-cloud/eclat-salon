import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loading({ onComplete }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onComplete(); return }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete })
      tl.from('.opening__eyebrow', { opacity: 0, y: 10, duration: .35 })
        .from('.opening__letter span', { yPercent: 110, stagger: .08, duration: .65, ease: 'power3.out' }, '-=.1')
        .to('.opening__line', { scaleX: 1, duration: .55, ease: 'power2.inOut' }, '-=.25')
        .from('.opening__tagline', { opacity: 0, y: 12, duration: .45 }, '-=.15')
        .to('.opening__panel--top', { yPercent: -100, duration: .8, ease: 'power4.inOut' }, '+=.15')
        .to('.opening__panel--bottom', { yPercent: 100, duration: .8, ease: 'power4.inOut' }, '<')
        .to(root.current, { autoAlpha: 0, duration: .1 })
    }, root)
    const fallback = window.setTimeout(onComplete, 3200)
    return () => { window.clearTimeout(fallback); ctx.revert() }
  }, [onComplete])
  return <div className="opening" ref={root} role="status" aria-label="サイトを読み込んでいます">
    <div className="opening__panel opening__panel--top"/><div className="opening__panel opening__panel--bottom"/>
    <div className="opening__content"><p className="opening__eyebrow">PRIVATE HAIR SALON</p><div className="opening__letter" aria-label="ÉCLAT">{'ÉCLAT'.split('').map((l,i)=><span key={i}>{l}</span>)}</div><div className="opening__line"/><p className="opening__tagline">美しさに、静かな余韻を。</p></div>
  </div>
}

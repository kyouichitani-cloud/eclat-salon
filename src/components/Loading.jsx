import { useEffect } from 'react'

export default function Loading({ onComplete }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return undefined
    }

    const fallback = window.setTimeout(onComplete, 3200)
    return () => window.clearTimeout(fallback)
  }, [onComplete])

  return <div className="opening" role="status" aria-label="サイトを読み込んでいます" onAnimationEnd={event => {
    if (event.target === event.currentTarget && event.animationName === 'opening-hide') onComplete()
  }}>
    <div className="opening__panel opening__panel--top"/>
    <div className="opening__panel opening__panel--bottom"/>
    <div className="opening__content">
      <p className="opening__eyebrow">PRIVATE HAIR SALON</p>
      <div className="opening__letter" aria-label="ÉCLAT">
        {'ÉCLAT'.split('').map((letter, index) => <span key={index} style={{ '--letter': index }}>{letter}</span>)}
      </div>
      <div className="opening__line"/>
      <p className="opening__tagline">美しさに、静かな余韻を。</p>
    </div>
  </div>
}

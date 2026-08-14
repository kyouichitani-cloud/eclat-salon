import MagneticButton from './MagneticButton'
import ResponsiveImage from './ResponsiveImage'
export default function Hero(){return <section className="hero" id="top">
  <div className="hero__media"><ResponsiveImage src="images/hero.jpg" alt="艶やかなロングヘアの女性とÉCLATの静かなサロン空間" width="1672" height="944" fetchPriority="high" decoding="async"/></div><div className="hero__veil"/>
  <div className="hero__content"><p className="hero__kicker">PRIVATE HAIR SALON <span/> OSAKA</p><h1>ÉCLAT</h1><div className="text-reveal"><span>美しさに、</span><span>静かな余韻を。</span></div><p className="hero__sub">髪を整えるだけではなく、自分自身と向き合える時間を。<br/>都会の喧騒から少し離れた、上質なプライベートヘアサロン。</p><div className="hero__actions"><MagneticButton href="#reservation" className="button button--gold" aria-label="予約セクションへ">WEB RESERVATION</MagneticButton><MagneticButton href="#menu" className="button button--line">VIEW MENU</MagneticButton></div></div>
  <div className="hero__scroll">SCROLL<span/></div>
  </section>}

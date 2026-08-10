import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loading from './components/Loading'
import Header from './components/Header'
import Hero from './components/Hero'
import Concept from './components/Concept'
import StyleGallery from './components/StyleGallery'
import FullscreenMoment from './components/FullscreenMoment'
import Stylist from './components/Stylist'
import Menu from './components/Menu'
import Coupon from './components/Coupon'
import SalonGallery from './components/SalonGallery'
import Reservation from './components/Reservation'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ignoreMobileResize:true})

export default function App(){
  const root=useRef(null),[loading,setLoading]=useState(true),[preset,setPreset]=useState(null)
  const openingDone=useCallback(()=>setLoading(false),[])
  const reserveStylist=id=>setPreset({stylist:id})
  const reserveCoupon=coupon=>setPreset({coupon})
  useLayoutEffect(()=>{
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches
    if(loading||reduce){ if(!loading)document.querySelectorAll('.image-mask').forEach(x=>x.style.transform='translateX(101%)');return }
    const mm=gsap.matchMedia()
    const ctx=gsap.context(()=>{
      mm.add('(min-width: 768px)',()=>{
        gsap.timeline().from('.hero__media',{clipPath:'inset(0 50% 0 50%)',duration:1.2,ease:'power4.inOut'}).from('.hero__media img',{scale:1.18,duration:1.8,ease:'power3.out'},'<').from('.hero h1,.hero__kicker,.hero .text-reveal span,.hero__sub,.hero__actions,.header',{y:45,opacity:0,stagger:.1,duration:.75,ease:'power3.out'},'-=.8')
        gsap.to('.hero__media img',{scale:1.1,yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}})
        gsap.to('.hero__content',{yPercent:28,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
        document.querySelectorAll('.image-reveal').forEach((wrap)=>{const img=wrap.querySelector('img'),mask=wrap.querySelector('.image-mask');if(!mask)return;gsap.timeline({scrollTrigger:{trigger:wrap,start:'top 88%',once:true}}).fromTo(mask,{xPercent:0},{xPercent:105,duration:1.05,ease:'power4.inOut'}).fromTo(img,{scale:1.13},{scale:1,duration:1.35,ease:'power3.out'},'<')})
        document.querySelectorAll('.reveal-lines,.text-reveal').forEach(el=>gsap.from(el.children,{yPercent:110,opacity:0,stagger:.12,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}}))
        document.querySelectorAll('.giant-type').forEach((el,i)=>gsap.fromTo(el,{xPercent:i%2?-20:10},{xPercent:i%2?8:-18,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.4}}))
        gsap.fromTo('.fullscreen-frame',{clipPath:'inset(0 31vw)'},{clipPath:'inset(0 0vw)',ease:'none',scrollTrigger:{trigger:'.fullscreen-moment',start:'top top',end:'bottom bottom',scrub:.8,pin:'.fullscreen-frame',anticipatePin:1}})
        gsap.to('.progress__bar',{scaleY:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}})
      })
      mm.add('(max-width: 767px)',()=>{
        gsap.set('.image-reveal .image-mask',{xPercent:105})
        gsap.timeline().from('.hero__media',{opacity:0,duration:.65,ease:'power2.out'}).from('.hero h1,.hero__kicker,.hero .text-reveal span,.hero__sub,.hero__actions,.header',{y:20,opacity:0,stagger:.06,duration:.5,ease:'power2.out'},'-=.3')
        document.querySelectorAll('.concept-shot,.fullscreen-frame').forEach((wrap)=>{
          const mask=wrap.querySelector('.image-mask')
          if(!mask)return
          gsap.fromTo(mask,{xPercent:0},{xPercent:105,duration:.65,ease:'power2.inOut',scrollTrigger:{trigger:wrap,start:'top 92%',once:true}})
        })
        gsap.from('.salon-shot',{y:24,opacity:0,stagger:.07,duration:.55,ease:'power2.out',scrollTrigger:{trigger:'.salon-grid',start:'top 88%',once:true}})
        document.querySelectorAll('.reveal-lines:not(.hero .reveal-lines)').forEach(el=>gsap.from(el.children,{y:22,opacity:0,stagger:.08,duration:.55,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}))
      })
      mm.add('(min-width: 1025px)',()=>{
        ScrollTrigger.create({trigger:'.concept',start:'top top',end:'bottom bottom',pin:'.concept__sticky',pinSpacing:false,anticipatePin:1})
        const track=document.querySelector('.stylist-track');gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth+innerWidth*.12),force3D:true,ease:'none',scrollTrigger:{trigger:'.stylist',start:'top top',end:()=>`+=${track.scrollWidth}`,scrub:.75,pin:true,anticipatePin:1,invalidateOnRefresh:true}})
        document.querySelectorAll('.style-tile:nth-child(3n+1)').forEach((el,i)=>gsap.to(el,{y:i%2?-35:35,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.3}}))
      })
    },root)
    const refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh())
    return()=>{cancelAnimationFrame(refreshFrame);mm.revert();ctx.revert()}
  },[loading])
  return <div ref={root}>{loading&&<Loading onComplete={openingDone}/>}<CustomCursor/><div className="progress"><span className="progress__bar"/></div><Header/><main><Hero/><Concept/><div className="giant-type giant-type--one" aria-hidden="true">ÉCLAT</div><StyleGallery/><FullscreenMoment/><div className="giant-type giant-type--two" aria-hidden="true">BEAUTY</div><Stylist onReserve={reserveStylist}/><Menu/><Coupon onReserve={reserveCoupon}/><SalonGallery/><Reservation preset={preset} onConsumed={()=>setPreset(null)}/><FAQ/></main><Footer/><a className="mobile-book" href="#reservation">WEB RESERVATION</a></div>
}

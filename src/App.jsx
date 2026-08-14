import { useEffect, useState } from 'react'
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
import './styles.css'

export default function App(){
  const [preset,setPreset]=useState(null)
  const reserveStylist=id=>setPreset({stylist:id})
  const reserveCoupon=coupon=>setPreset({coupon})
  useEffect(()=>{
    let frame
    const scrollToHash=behavior=>{
      const id=decodeURIComponent(location.hash.slice(1))
      const target=id&&document.getElementById(id)
      if(target)target.scrollIntoView({behavior,block:'start'})
    }
    const scheduleScroll=(behavior='auto')=>{
      cancelAnimationFrame(frame)
      frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>scrollToHash(behavior))})
    }
    const handleClick=e=>{
      const anchor=e.target.closest('a[href^="#"]')
      if(!anchor)return
      const hash=anchor.getAttribute('href')
      const id=hash&&decodeURIComponent(hash.slice(1))
      if(!id||!document.getElementById(id))return
      e.preventDefault()
      if(location.hash!==hash)history.pushState(null,'',hash)
      scheduleScroll('smooth')
    }
    const opening=document.querySelector('.opening')
    const handleHashChange=()=>scheduleScroll()
    const handleLoad=()=>scheduleScroll()
    const handleOpeningEnd=e=>{if(e.animationName==='opening-hide')scheduleScroll()}
    document.addEventListener('click',handleClick)
    addEventListener('hashchange',handleHashChange)
    addEventListener('load',handleLoad)
    opening?.addEventListener('animationend',handleOpeningEnd)
    scheduleScroll()
    return()=>{
      cancelAnimationFrame(frame)
      document.removeEventListener('click',handleClick)
      removeEventListener('hashchange',handleHashChange)
      removeEventListener('load',handleLoad)
      opening?.removeEventListener('animationend',handleOpeningEnd)
    }
  },[])
  return <div><Header/><main><Hero/><Concept/><div className="giant-type giant-type--one" aria-hidden="true">ÉCLAT</div><StyleGallery/><FullscreenMoment/><div className="giant-type giant-type--two" aria-hidden="true">BEAUTY</div><Stylist onReserve={reserveStylist}/><Menu/><Coupon onReserve={reserveCoupon}/><SalonGallery/><Reservation preset={preset} onConsumed={()=>setPreset(null)}/><FAQ/></main><Footer/><a className="mobile-book" href="#reservation" aria-label="予約セクションへ">WEB RESERVATION</a></div>
}

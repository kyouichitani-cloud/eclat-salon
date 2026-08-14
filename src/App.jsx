import { useCallback, useState } from 'react'
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
import './styles.css'

export default function App(){
  const [loading,setLoading]=useState(true),[preset,setPreset]=useState(null)
  const openingDone=useCallback(()=>setLoading(false),[])
  const reserveStylist=id=>setPreset({stylist:id})
  const reserveCoupon=coupon=>setPreset({coupon})
  return <div>{loading&&<Loading onComplete={openingDone}/>}<Header/><main><Hero/><Concept/><div className="giant-type giant-type--one" aria-hidden="true">ÉCLAT</div><StyleGallery/><FullscreenMoment/><div className="giant-type giant-type--two" aria-hidden="true">BEAUTY</div><Stylist onReserve={reserveStylist}/><Menu/><Coupon onReserve={reserveCoupon}/><SalonGallery/><Reservation preset={preset} onConsumed={()=>setPreset(null)}/><FAQ/></main><Footer/><a className="mobile-book" href="#reservation" aria-label="予約セクションへ">WEB RESERVATION</a></div>
}

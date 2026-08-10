import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const links = ['CONCEPT','STYLE','STYLIST','MENU','COUPON','SALON','FAQ','RESERVATION']
export default function Header() {
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false)
  useEffect(()=>{ let previous=scrollY>40;setScrolled(previous);const fn=()=>{const next=scrollY>40;if(next!==previous){previous=next;setScrolled(next)}};addEventListener('scroll',fn,{passive:true});return()=>removeEventListener('scroll',fn)},[])
  useEffect(()=>{
    if(!open)return
    const bodyOverflow=document.body.style.overflow
    const htmlOverflow=document.documentElement.style.overflow
    const bodyOverscroll=document.body.style.overscrollBehavior
    document.body.style.overflow='hidden'
    document.documentElement.style.overflow='hidden'
    document.body.style.overscrollBehavior='none'
    return()=>{
      document.body.style.overflow=bodyOverflow
      document.documentElement.style.overflow=htmlOverflow
      document.body.style.overscrollBehavior=bodyOverscroll
    }
  },[open])
  const top=e=>{e.preventDefault();setOpen(false);history.replaceState(null,'',location.pathname+location.search);scrollTo({top:0,behavior:'smooth'})}
  return <header className={`header ${scrolled?'header--scrolled':''} ${open?'header--menu-open':''}`}>
    <a className="brand" href="#" onClick={top} aria-label="ÉCLAT ページ最上部へ">ÉCLAT<span>エクラ</span></a>
    <nav className="desktop-nav" aria-label="メインナビゲーション">{links.map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
    <button className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'メニューを閉じる':'メニューを開く'} onClick={()=>setOpen(!open)}><i/><i/></button>
    {createPortal(<AnimatePresence>{open&&<motion.div className="mobile-menu-overlay" initial={{opacity:1}} animate={{opacity:1}} exit={{opacity:1}} transition={{duration:.4}}><motion.div className="mobile-menu-panel" initial={{opacity:0,y:-24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}} transition={{duration:.45,ease:[.76,0,.24,1]}}><div className="mobile-menu-overlay__top"><a className="brand" href="#" onClick={top} aria-label="ÉCLAT ページ最上部へ">ÉCLAT<span>エクラ</span></a><button className="mobile-nav-close" aria-label="メニューを閉じる" onClick={()=>setOpen(false)}><i/><i/></button></div><nav id="mobile-nav" className="mobile-nav" aria-label="モバイルナビゲーション">{links.map((x,i)=><motion.a key={x} href={`#${x.toLowerCase()}`} onClick={()=>setOpen(false)} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.08+i*.03}}>{x}<small>0{i+1}</small></motion.a>)}</nav></motion.div></motion.div>}</AnimatePresence>,document.body)}
  </header>
}

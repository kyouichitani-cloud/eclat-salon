import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = ['CONCEPT','STYLE','STYLIST','MENU','COUPON','SALON','FAQ','RESERVATION']
export default function Header() {
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false)
  useEffect(()=>{ let previous=scrollY>40;setScrolled(previous);const fn=()=>{const next=scrollY>40;if(next!==previous){previous=next;setScrolled(next)}};addEventListener('scroll',fn,{passive:true});return()=>removeEventListener('scroll',fn)},[])
  useEffect(()=>{document.body.classList.toggle('nav-open',open);return()=>document.body.classList.remove('nav-open')},[open])
  const top=e=>{e.preventDefault();setOpen(false);history.replaceState(null,'',location.pathname+location.search);scrollTo({top:0,behavior:'smooth'})}
  return <header className={`header ${scrolled?'header--scrolled':''} ${open?'header--menu-open':''}`}>
    <a className="brand" href="#" onClick={top} aria-label="ÉCLAT ページ最上部へ">ÉCLAT<span>エクラ</span></a>
    <nav className="desktop-nav" aria-label="メインナビゲーション">{links.map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
    <button className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'メニューを閉じる':'メニューを開く'} onClick={()=>setOpen(!open)}><i/><i/></button>
    <AnimatePresence>{open&&<motion.nav id="mobile-nav" className="mobile-nav" aria-label="モバイルナビゲーション" initial={{y:'-100%'}} animate={{y:0}} exit={{y:'-100%'}} transition={{duration:.55,ease:[.76,0,.24,1]}}>{links.map((x,i)=><motion.a key={x} href={`#${x.toLowerCase()}`} onClick={()=>setOpen(false)} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.12+i*.035}}>{x}<small>0{i+1}</small></motion.a>)}</motion.nav>}</AnimatePresence>
  </header>
}

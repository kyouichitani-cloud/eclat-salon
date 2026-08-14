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
    <nav className="desktop-nav" aria-label="メインナビゲーション">{links.map(x=><a className={x==='RESERVATION'?'nav-reservation':undefined} key={x} href={`#${x.toLowerCase()}`} aria-label={x==='RESERVATION'?'予約セクションへ':undefined}>{x}</a>)}</nav>
    <button className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'メニューを閉じる':'メニューを開く'} onClick={()=>setOpen(!open)}><i/><i/></button>
    {open&&createPortal(<div className="mobile-menu-overlay"><div className="mobile-menu-panel"><div className="mobile-menu-overlay__top"><a className="brand" href="#" onClick={top} aria-label="ÉCLAT ページ最上部へ">ÉCLAT<span>エクラ</span></a><button className="mobile-nav-close" aria-label="メニューを閉じる" onClick={()=>setOpen(false)}><i/><i/></button></div><nav id="mobile-nav" className="mobile-nav" aria-label="モバイルナビゲーション">{links.map((x,i)=><a className={x==='RESERVATION'?'nav-reservation':undefined} key={x} href={`#${x.toLowerCase()}`} aria-label={x==='RESERVATION'?'予約セクションへ':undefined} onClick={()=>setOpen(false)}>{x}<small>0{i+1}</small></a>)}</nav></div></div>,document.body)}
  </header>
}

import { motion, useMotionValue, useSpring } from 'framer-motion'
export default function MagneticButton({href,children,className='',onClick,type}){
  const x=useSpring(useMotionValue(0),{stiffness:180,damping:16}),y=useSpring(useMotionValue(0),{stiffness:180,damping:16})
  const move=e=>{if(innerWidth<1024)return;const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.16);y.set((e.clientY-r.top-r.height/2)*.16)}
  const leave=()=>{x.set(0);y.set(0)}
  const props={className:`magnetic ${className}`,style:{x,y},onMouseMove:move,onMouseLeave:leave,onClick,'data-cursor':'BOOK'}
  return href?<motion.a href={href} {...props}>{children}</motion.a>:<motion.button type={type||'button'} {...props}>{children}</motion.button>
}

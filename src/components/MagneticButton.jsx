export default function MagneticButton({href,children,className='',onClick,type}){
  const props={className:`magnetic ${className}`,onClick}
  return href?<a href={href} {...props}>{children}</a>:<button type={type||'button'} {...props}>{children}</button>
}

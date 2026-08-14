export default function MagneticButton({href,children,className='',onClick,type,...rest}){
  const props={className:`magnetic ${className}`,onClick,...rest}
  return href?<a href={href} {...props}>{children}</a>:<button type={type||'button'} {...props}>{children}</button>
}

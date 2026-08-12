export default function ResponsiveImage({ src, alt, ...props }) {
  const filename = src.split('/').pop()

  return <picture className="responsive-picture">
    <source media="(max-width: 767px)" srcSet={`images/mobile/${filename}`}/>
    <img src={src} alt={alt} {...props}/>
  </picture>
}

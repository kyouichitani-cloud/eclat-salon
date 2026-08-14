export default function ResponsiveImage({ src, alt, mobileVariant, ...props }) {
  const filename = src.split('/').pop()
  const fetchPriority = props.fetchPriority ?? (props.loading === 'lazy' ? 'low' : undefined)
  const mobileDirectory = mobileVariant === 'grid' ? 'mobile-grid' : 'mobile'

  return <picture className="responsive-picture">
    <source media="(max-width: 767px)" srcSet={`images/${mobileDirectory}/${filename}`}/>
    <img src={src} alt={alt} {...props} fetchPriority={fetchPriority}/>
  </picture>
}

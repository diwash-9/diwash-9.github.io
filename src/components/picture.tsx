type PictureProps = {
  /** Path to the JPEG fallback, e.g. "/certificates/foo.jpg". */
  src: string
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

/**
 * Renders an image with AVIF and WebP sources alongside the original JPEG.
 * The companion files are generated next to the JPEG with the same name
 * (`foo.avif`, `foo.webp`).
 *
 * The wrapper uses `display: contents` so the inner <img> participates in the
 * parent layout exactly as it would without the <picture> element.
 */
export function Picture({
  src,
  alt,
  className,
  loading = "lazy",
  onClick,
}: PictureProps) {
  const base = src.replace(/\.[a-z0-9]+$/i, "")

  return (
    <picture className="contents">
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onClick={onClick}
      />
    </picture>
  )
}

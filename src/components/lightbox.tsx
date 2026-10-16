import { useCallback, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Picture } from "@/components/picture"

export type LightboxItem = {
  image: string
  title: string
  note?: string
}

/**
 * Full-screen viewer for a list of images. Rendered on top of the page with a
 * fixed overlay; supports Escape to close, arrow keys to move, and traps focus
 * on the dialog while open.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const item = items[index]
  const multiple = items.length > 1

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + items.length) % items.length)
  }, [index, items.length, onIndexChange])

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % items.length)
  }, [index, items.length, onIndexChange])

  // Close on Escape and navigate with the arrow keys.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft" && multiple) goPrev()
      else if (e.key === "ArrowRight" && multiple) goNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goPrev, goNext, multiple, onClose])

  // Lock background scroll and move focus into the dialog while open.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (!item) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, image ${index + 1} of ${items.length}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm outline-none"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
        <p className="font-mono text-xs text-white/70">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8">
        {multiple ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous certificate"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
        ) : null}

        <Picture
          src={item.image}
          alt={item.title}
          loading="eager"
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />

        {multiple ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next certificate"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-6" />
          </button>
        ) : null}
      </div>

      <div className="px-4 pb-6 text-center text-white sm:px-6">
        <p className="font-serif text-lg font-medium">{item.title}</p>
        {item.note ? (
          <p className="mx-auto mt-1 max-w-xl text-sm text-white/70">
            {item.note}
          </p>
        ) : null}
      </div>
    </div>
  )
}

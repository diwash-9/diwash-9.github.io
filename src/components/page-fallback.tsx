export function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase motion-safe:animate-pulse">
        Loading
      </span>
    </div>
  )
}

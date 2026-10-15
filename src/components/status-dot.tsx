import { cn } from "@/lib/utils"

export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex size-2 shrink-0 rounded-full bg-primary",
        className
      )}
    >
      <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
    </span>
  )
}

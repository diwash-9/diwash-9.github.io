import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"

export function ProfileCard() {
  return (
    <aside
      aria-label="Profile"
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <img
          src={site.avatar}
          alt={site.name}
          width={64}
          height={64}
          loading="lazy"
          className="size-16 shrink-0 rounded-full border border-border object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-mono text-sm">@{site.handle}</p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {site.location}
          </p>
        </div>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="ml-auto shrink-0"
        >
          <a href={site.github} target="_blank" rel="noopener">
            <Github className="size-3.5" />
            Follow
          </a>
        </Button>
      </div>

      <dl className="mt-5 grid gap-3 border-t border-border pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Learning
          </dt>
          <dd className="text-right">{site.currentlyLearning}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Fun fact
          </dt>
          <dd className="text-right">{site.funFact}</dd>
        </div>
      </dl>
    </aside>
  )
}

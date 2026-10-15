import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-xs tracking-[0.08em] text-primary uppercase">
        404
      </p>
      <h1 className="font-serif text-4xl font-medium tracking-tight">
        This page does not exist.
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The link may be old or mistyped. Head back to the start.
      </p>
      <Button asChild className="mt-2">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}

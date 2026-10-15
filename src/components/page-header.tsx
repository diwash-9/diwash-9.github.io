import type { ReactNode } from "react"

export function PageHeader({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string
  title: string
  lede?: string
  children?: ReactNode
}) {
  return (
    <header className="border-t-2 border-border pt-5">
      <p className="mb-3 font-mono text-xs tracking-[0.08em] text-primary uppercase">
        {kicker}
      </p>
      <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  )
}

import { useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { archive, archiveFilters, kindLabels } from "@/data/archive"
import { filterArchive, type ArchiveFilter } from "@/lib/archive"
import { site } from "@/data/site"

type Filter = ArchiveFilter

export default function Archive() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const searchRef = useRef<HTMLInputElement>(null)

  const results = useMemo(
    () => filterArchive(archive, query, filter),
    [query, filter]
  )

  function reset() {
    setQuery("")
    setFilter("all")
    searchRef.current?.focus()
  }

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("")
      searchRef.current?.blur()
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Seo
        title="Archive · Devraj Khatiwada"
        description="Coursework, games, and utilities: everything else Devraj Khatiwada has built, searchable."
        path="/archive"
      />
      <PageHeader
        kicker="Archive"
        title="Coursework, games, and utilities."
        lede="Everything else I have built, searchable. The two big projects live on the projects page."
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search name, stack, or idea..."
              aria-label="Search the archive"
              className="pl-9"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="flex-wrap">
              {archiveFilters.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <p className="font-mono text-xs text-muted-foreground" role="status">
          {query || filter !== "all"
            ? `${results.length} of ${archive.length} entries`
            : `${archive.length} entries`}
        </p>

        {results.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No matches. Try a shorter term, or{" "}
            <button
              type="button"
              onClick={reset}
              className="text-foreground underline underline-offset-4"
            >
              clear the search
            </button>
            .
          </p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {results.map((entry) => (
              <li
                key={entry.name}
                className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="flex items-baseline gap-3">
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener"
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {entry.name}
                  </a>
                  <Badge variant="muted" className="font-mono">
                    {kindLabels[entry.kind]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground sm:text-right">
                  {entry.note}
                </p>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm">
          <a
            href={site.githubRepos}
            target="_blank"
            rel="noopener"
            className="text-primary underline underline-offset-4"
          >
            All repositories on GitHub
          </a>
        </p>
      </div>
    </div>
  )
}

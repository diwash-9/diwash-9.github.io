import { useMemo, useState } from "react"
import { Maximize2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { Lightbox } from "@/components/lightbox"
import { Picture } from "@/components/picture"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  credentialFilters,
  credentials,
  kindLabels,
  type CredentialFilter,
} from "@/data/credentials"
import { site } from "@/data/site"

export default function Credentials() {
  const [filter, setFilter] = useState<CredentialFilter>("all")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = useMemo(
    () =>
      filter === "all"
        ? credentials
        : credentials.filter((entry) => entry.kind === filter),
    [filter]
  )

  const lightboxItems = visible.map((entry) => {
    const meta = [entry.issuer, entry.date].filter(Boolean).join(" · ")
    return {
      image: entry.image,
      title: entry.title,
      note: meta || kindLabels[entry.kind],
    }
  })

  return (
    <div className="flex flex-col gap-10">
      <Seo
        title={`Credentials · ${site.name}`}
        description="Certificates, hackathons, workshops, and recognitions earned by Devraj Khatiwada, with the originals to view."
        path="/credentials"
        ogImage="/og/credentials.png"
      />
      <PageHeader
        kicker="Credentials"
        title="Certificates, hackathons, and coursework."
      />

      <div className="flex flex-col gap-6">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as CredentialFilter)}
        >
          <TabsList className="flex-wrap">
            {credentialFilters.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <p className="font-mono text-xs text-muted-foreground" role="status">
          {visible.length === credentials.length
            ? `${credentials.length} credentials`
            : `${visible.length} of ${credentials.length} credentials`}
        </p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry, i) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-card text-left shadow-sm ring-1 ring-border/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="relative block aspect-4/3 overflow-hidden bg-muted">
                  <Picture
                    src={entry.thumb}
                    alt={`${entry.title} certificate`}
                    className="size-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 rounded-full bg-background/85 font-mono text-[11px] tracking-wide shadow-sm backdrop-blur-sm"
                  >
                    {kindLabels[entry.kind]}
                  </Badge>
                  <span className="absolute right-3 bottom-3 translate-y-1 rounded-full bg-background/85 p-2 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Maximize2 className="size-4" />
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-1.5 p-5">
                  <span className="font-serif text-lg leading-snug font-medium tracking-tight">
                    {entry.title}
                  </span>
                  {entry.issuer || entry.date ? (
                    <span className="font-mono text-xs text-muted-foreground">
                      {[entry.issuer, entry.date].filter(Boolean).join(" · ")}
                    </span>
                  ) : null}
                  <span className="mt-auto pt-2 text-sm text-muted-foreground">
                    {entry.note}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={lightboxItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </div>
  )
}

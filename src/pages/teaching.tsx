import { ExternalLink } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { playlists } from "@/data/teaching"
import { site } from "@/data/site"

export default function Teaching() {
  return (
    <div className="flex flex-col gap-12">
      <Seo
        title="Teaching · Devraj Khatiwada"
        description="Video lectures for CSIT, BCA, BIM, and engineering students through Digital Nomad Academy."
        path="/teaching"
        ogImage="/og/teaching.png"
      />
      <PageHeader
        kicker="Teaching"
        title="Video lectures for CSIT, BCA, BIM, and engineering students."
        lede="Through Digital Nomad Academy, plus study material work with HamroCSIT."
      />

      <div className="flex flex-col gap-5">
        {playlists.map((playlist) => (
          <Card key={playlist.id}>
            <CardHeader className="gap-3">
              <CardTitle>{playlist.title}</CardTitle>
              <p className="flex flex-wrap gap-x-3 font-mono text-xs text-muted-foreground">
                <span>{playlist.videos} videos</span>
                <span aria-hidden="true">·</span>
                <span>{playlist.channel}</span>
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="text-sm">
                <span className="font-medium">About:</span> {playlist.about}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">For:</span>{" "}
                {playlist.for}
              </p>
              <a
                href={playlist.href}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm text-primary underline underline-offset-4"
              >
                Open on YouTube <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm">
        <a
          href={site.youtube}
          target="_blank"
          rel="noopener"
          className="text-primary underline underline-offset-4"
        >
          Digital Nomad Academy on YouTube
        </a>
      </p>
    </div>
  )
}

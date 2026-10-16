import { CopyCommand } from "@/components/copy-command"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tools } from "@/data/tools"

export default function Tools() {
  return (
    <div className="flex flex-col gap-12">
      <Seo
        title="Tools · Devraj Khatiwada"
        description="Small, dependency-light utilities for the Omarchy Linux desktop: bsdate, minimize, and ytmp3."
        path="/tools"
        ogImage="/og/tools.png"
      />
      <PageHeader
        kicker="Developer tools"
        title="Utilities for the Omarchy Linux desktop."
        lede="Small, dependency-light scripts I use every day and keep maintained."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.id} className="flex flex-col">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="font-mono text-lg">
                  {tool.name}
                  {tool.alias ? (
                    <span className="text-muted-foreground">
                      {" "}
                      ({tool.alias})
                    </span>
                  ) : null}
                </CardTitle>
                <Badge variant="outline" className="font-mono">
                  {tool.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {tool.stack}
              </p>
              <div className="mt-auto flex flex-col gap-3">
                {tool.command ? <CopyCommand command={tool.command} /> : null}
                <a
                  href={tool.repo}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-primary underline underline-offset-4"
                >
                  Repository
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

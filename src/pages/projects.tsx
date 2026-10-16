import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatusDot } from "@/components/status-dot"
import { Seo } from "@/components/seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"
import { site } from "@/data/site"

export default function Projects() {
  return (
    <div className="flex flex-col gap-12">
      <Seo
        title={`Projects · ${site.name}`}
        description="Bidhan and Matchday: web applications Devraj Khatiwada has carried from idea to something people use."
        path="/projects"
        ogImage="/og/projects.png"
      />
      <PageHeader
        kicker="Projects"
        title="Web applications carried from idea to something people use."
        lede="Two apps so far, both live. Longer write-ups on the archive page for the rest."
      />

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden py-0">
            <CardHeader className="gap-3 pt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="flex items-baseline gap-2 text-2xl">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {project.title}
                  </Link>
                  {project.nativeTitle ? (
                    <span className="text-lg text-muted-foreground" lang="ne">
                      {project.nativeTitle}
                    </span>
                  ) : null}
                </CardTitle>
                <Badge variant="secondary" className="gap-1.5 font-mono">
                  <StatusDot />
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pb-7">
              <p className="text-base text-muted-foreground">
                {project.problem}
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <p>{project.summary}</p>
                  {project.diagram ? (
                    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs leading-relaxed">
                      <code>{project.diagram}</code>
                    </pre>
                  ) : null}
                </div>
                <dl className="flex flex-col gap-3">
                  {project.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="border-l-2 border-border pl-4"
                    >
                      <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button asChild>
                  <Link to={`/projects/${project.slug}`}>
                    Read the breakdown <ArrowRight className="size-4" />
                  </Link>
                </Button>
                {project.links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="link"
                    className="px-0"
                  >
                    <a href={link.href} target="_blank" rel="noopener">
                      {link.label}
                    </a>
                  </Button>
                ))}
                {project.note ? (
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.note}
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        More on{" "}
        <a
          href={site.githubRepos}
          target="_blank"
          rel="noopener"
          className="text-foreground underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  )
}

import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { StatusDot } from "@/components/status-dot"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { site } from "@/data/site"

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = index >= 0 ? projects[index] : undefined

  if (!project) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Seo
          title={`Project not found · ${site.name}`}
          description="No project lives at this address."
          path="/projects"
        />
        <p className="font-mono text-xs tracking-[0.08em] text-primary uppercase">
          Projects
        </p>
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          No project here.
        </h1>
        <p className="text-muted-foreground">
          That one either moved or never existed.
        </p>
        <Button asChild variant="outline">
          <Link to="/projects">
            <ArrowLeft className="size-4" /> Back to projects
          </Link>
        </Button>
      </div>
    )
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="flex flex-col gap-12">
      <Seo
        title={`${project.title} · ${site.name}`}
        description={project.problem}
        path={`/projects/${project.slug}`}
        ogImage={`/og/${project.id}.png`}
      />

      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="size-3.5" /> All projects
        </Link>
      </div>

      <PageHeader kicker="Project" title={project.title}>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="gap-1.5 font-mono">
            <StatusDot />
            {project.status}
          </Badge>
          {project.nativeTitle ? (
            <span
              className="font-serif text-lg text-muted-foreground"
              lang="ne"
            >
              {project.nativeTitle}
            </span>
          ) : null}
        </div>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {project.tagline}
        </p>
      </PageHeader>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div className="flex flex-col gap-8">
          <p className="text-lg">{project.summary}</p>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
              What it does
            </h2>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {project.diagram ? (
            <section className="flex flex-col gap-4">
              <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                Unlock path
              </h2>
              <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-xs leading-relaxed">
                <code>{project.diagram}</code>
              </pre>
            </section>
          ) : null}
        </div>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
              The problem
            </h2>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </section>

          <dl className="flex flex-col gap-3">
            {project.specs.map((spec) => (
              <div key={spec.label} className="border-l-2 border-border pl-4">
                <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3">
            {project.links.map((link, i) => (
              <Button
                key={link.href}
                asChild
                variant={i === 0 ? "default" : "outline"}
                className="justify-between"
              >
                <a href={link.href} target="_blank" rel="noopener">
                  {link.label}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ))}
            {project.note ? (
              <p className="font-mono text-xs text-muted-foreground">
                {project.note}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <nav
        aria-label="Other projects"
        className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        <Link
          to={`/projects/${prev.slug}`}
          className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-primary/60"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <span className="font-serif text-lg font-medium">{prev.title}</span>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          className="flex flex-col gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/60 sm:items-end"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            Next <ArrowRight className="size-3.5" />
          </span>
          <span className="font-serif text-lg font-medium">{next.title}</span>
        </Link>
      </nav>
    </div>
  )
}

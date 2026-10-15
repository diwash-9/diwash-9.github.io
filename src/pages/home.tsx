import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProfileCard } from "@/components/profile-card"
import { Seo } from "@/components/seo"
import { navItems, site, writing } from "@/data/site"
import { projects } from "@/data/projects"

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Seo
        title={`${site.name} · ${site.tagline}`}
        description={site.lede}
        path="/"
      />
      <section className="grid gap-10 pt-4 md:grid-cols-[1.5fr_1fr] md:items-start">
        <div className="max-w-xl">
          <p className="mb-4 font-mono text-xs tracking-[0.08em] text-primary uppercase">
            {site.kicker}
          </p>
          <h1 className="font-serif text-5xl leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            {site.tagline}. {site.lede}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/projects">
                See the work <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">About</Link>
            </Button>
          </div>
        </div>
        <ProfileCard />
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            Currently building
          </h2>
          <Link
            to="/projects"
            className="font-mono text-xs underline underline-offset-4"
          >
            All projects
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.links[0].href}
              target="_blank"
              rel="noopener"
              className="group"
            >
              <Card className="h-full gap-3 transition-colors hover:border-primary/60">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-4">
                    <span>
                      {project.title}{" "}
                      {project.nativeTitle ? (
                        <span className="text-muted-foreground" lang="ne">
                          {project.nativeTitle}
                        </span>
                      ) : null}
                    </span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </CardTitle>
                  <CardDescription>{project.problem}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
          Explore
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="group">
              <Card className="h-full gap-2 transition-colors hover:border-primary/60">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {item.label}
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </CardTitle>
                  <CardDescription>{item.blurb}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            Writing
          </h2>
          <a
            href={site.medium}
            target="_blank"
            rel="noopener"
            className="font-mono text-xs underline underline-offset-4"
          >
            All on Medium
          </a>
        </div>
        {writing.map((entry) => (
          <a
            key={entry.href}
            href={entry.href}
            target="_blank"
            rel="noopener"
            className="group"
          >
            <Card className="gap-3 transition-colors hover:border-primary/60">
              <CardHeader>
                <p className="font-mono text-xs text-muted-foreground">
                  {formatDate(entry.date)}
                </p>
                <CardTitle className="flex items-start justify-between gap-4 text-xl">
                  {entry.title}
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </CardTitle>
                <CardDescription>{entry.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{entry.excerpt}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </section>
    </div>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

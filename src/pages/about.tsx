import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Seo } from "@/components/seo"
import { aboutFacts, contacts } from "@/data/teaching"
import { site } from "@/data/site"

export default function About() {
  return (
    <div className="flex flex-col gap-12">
      <Seo
        title="About · Devraj Khatiwada"
        description="CSIT student at Tribhuvan University, teacher at Digital Nomad Academy, and founding member of Samriddhi IT Club."
        path="/about"
      />
      <PageHeader
        kicker="About"
        title="Hello, I'm Devraj."
        lede="A CS student in Kathmandu who spends the free hours building things and teaching them back."
      />

      <div className="grid gap-12 md:grid-cols-2">
        <dl className="flex flex-col gap-6">
          {aboutFacts.map((fact) => (
            <div key={fact.label} className="border-l-2 border-border pl-4">
              <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1.5">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-1">
          <h2 className="mb-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            Elsewhere
          </h2>
          <ul className="divide-y divide-border border-t border-border">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    contact.href.startsWith("mailto:") ? undefined : "noopener"
                  }
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-medium">{contact.label}</span>
                    <span className="block font-mono text-xs text-muted-foreground">
                      {contact.note}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Based in {site.location}.
          </p>
        </div>
      </div>
    </div>
  )
}

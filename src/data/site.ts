export const site = {
  name: "Devraj Khatiwada",
  handle: "diwash-9",
  domain: "diwash-9.github.io",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  lede: "I build web apps, Linux desktop tools, and teach computer science on the side.",
  avatar: "https://github.com/diwash-9.png?size=200",
  kicker: "Portfolio",
  tagline: "A Computer Science Student from Nepal",
  currentlyLearning: "Whatever the AI companies come up with next",
  funFact: "I run a YouTube channel",
  email: "devrajkhatiwada003@gmail.com",
  github: "https://github.com/diwash-9",
  githubRepos: "https://github.com/diwash-9?tab=repositories",
  linkedin: "https://www.linkedin.com/in/devrajkhatiwada/",
  youtube: "https://www.youtube.com/@digitalnomadacademy2",
  medium: "https://medium.com/@devrajkhatiwada003",
} as const

export type WritingEntry = {
  title: string
  subtitle: string
  date: string
  excerpt: string
  href: string
}

export const writing: WritingEntry[] = [
  {
    title:
      "I Turned the Constitution of Nepal Into Something You Actually Want to Open",
    subtitle:
      "Bidhan takes all 308 articles and rebuilds them as lessons, quizzes, and a path you can finish.",
    date: "2026-10-15",
    excerpt:
      "I built Bidhan to make the Constitution of Nepal readable: all 308 articles turned into lessons, quizzes, and a branching path you can actually finish.",
    href: "https://medium.com/@devrajkhatiwada003/i-turned-the-constitution-of-nepal-into-something-you-actually-want-to-open-3b68a0186a03",
  },
  {
    title: "Do Random Numbers Really Follow a Pattern?",
    subtitle: "Testing Benford's Law Using Nepal's Census Data",
    date: "2026-01-19",
    excerpt:
      "A Netflix documentary got me thinking about Benford's Law, so I tested it against 7,000+ ward-level population figures from Nepal's 2021 census. The real data matched the theory surprisingly well.",
    href: "https://medium.com/@devrajkhatiwada003/do-random-numbers-really-follow-a-pattern-0f21cfc72741",
  },
]

export type NavItem = {
  label: string
  to: string
  blurb: string
}

export const navItems: NavItem[] = [
  {
    label: "Projects",
    to: "/projects",
    blurb: "Web applications carried from idea to something people use.",
  },
  {
    label: "Tools",
    to: "/tools",
    blurb: "Small utilities for the Omarchy Linux desktop.",
  },
  {
    label: "Archive",
    to: "/archive",
    blurb: "Coursework, games, and experiments worth keeping.",
  },
  {
    label: "Teaching",
    to: "/teaching",
    blurb: "Video lectures for CSIT, BCA, BIM, and engineering students.",
  },
  {
    label: "Credentials",
    to: "/credentials",
    blurb: "Certificates, hackathons, workshops, and recognitions.",
  },
  {
    label: "About",
    to: "/about",
    blurb: "Study, teaching, and where to find me.",
  },
]

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  /** URL segment used by /projects/:slug. */
  slug: string
  title: string
  nativeTitle?: string
  status: string
  /** One-line pitch, used on cards and detail pages. */
  tagline: string
  problem: string
  summary: string
  diagram?: string
  /** What the app actually does, as short bullets. */
  features: string[]
  specs: { label: string; value: string }[]
  links: ProjectLink[]
  note?: string
}

export const projects: Project[] = [
  {
    id: "bidhan",
    slug: "bidhan",
    title: "Bidhan",
    nativeTitle: "विधान",
    status: "Live",
    tagline: "The Constitution of Nepal, rebuilt as lessons you can finish.",
    problem:
      "The Constitution of Nepal runs to 308 articles, and most people meet it as a PDF. What if studying it felt closer to a language app than to homework?",
    summary:
      "Bidhan organizes all 308 articles into lessons along a branching unlock path. Each lesson pairs reading with a quiz, with hearts, XP, streaks, and leaderboards. Includes full-text search and an admin panel.",
    diagram: `Part 1: Art. 4 --> Art. 5 --> Art. 6
                \\-> Art. 9 (unlocks after 4 + 5)
328 edges like this, not a straight line`,
    features: [
      "All 308 articles, organized into 35 parts",
      "A branching unlock path instead of a straight read",
      "Reading paired with a quiz in every lesson",
      "Hearts, XP, streaks, and leaderboards",
      "Full-text search across the whole constitution",
      "An admin panel for managing content",
    ],
    specs: [
      { label: "Stack", value: "React 18, TypeScript, FastAPI, PostgreSQL 17" },
      {
        label: "Content",
        value: "308 articles, 35 parts, 1,200+ quiz questions",
      },
    ],
    links: [
      { label: "Open the app", href: "https://bidhan.vercel.app" },
      { label: "Repository", href: "https://github.com/diwash-9/bidhan" },
      { label: "API docs", href: "https://bidhan-api.onrender.com/docs" },
    ],
  },
  {
    id: "matchday",
    slug: "matchday",
    title: "Matchday",
    status: "Live, v1.0.0",
    tagline: "Tournament operations, from the draw to the certificates.",
    problem:
      "Small tournaments tend to run on a spreadsheet, a group chat, and hope. Scores go missing, tables go stale, and nobody knows when they play next.",
    summary:
      "Matchday carries a tournament from registration to certificates: group draw, fixtures, points tables, knockout brackets, a certificate designer, and public pages that teams can follow without logging in.",
    features: [
      "Registration through to final certificates",
      "Group draw and automatic fixture generation",
      "Live points tables that update as results come in",
      "Knockout brackets",
      "A certificate designer",
      "Public pages teams can follow without logging in",
    ],
    specs: [{ label: "Stack", value: "Next.js 16, React 19, Prisma, Turso" }],
    links: [{ label: "Open the app", href: "https://matchdayhq.vercel.app" }],
    note: "Source is private for now.",
  },
]

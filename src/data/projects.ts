export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  nativeTitle?: string
  status: string
  problem: string
  summary: string
  diagram?: string
  specs: { label: string; value: string }[]
  links: ProjectLink[]
  note?: string
}

export const projects: Project[] = [
  {
    id: "bidhan",
    title: "Bidhan",
    nativeTitle: "विधान",
    status: "Live",
    problem:
      "The Constitution of Nepal runs to 308 articles, and most people meet it as a PDF. What if studying it felt closer to a language app than to homework?",
    summary:
      "Bidhan organizes all 308 articles into lessons along a branching unlock path. Each lesson pairs reading with a quiz, with hearts, XP, streaks, and leaderboards. Includes full-text search and an admin panel.",
    diagram: `Part 1: Art. 4 --> Art. 5 --> Art. 6
                \\-> Art. 9 (unlocks after 4 + 5)
328 edges like this, not a straight line`,
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
    title: "Matchday",
    status: "Live, v1.0.0",
    problem:
      "Small tournaments tend to run on a spreadsheet, a group chat, and hope. Scores go missing, tables go stale, and nobody knows when they play next.",
    summary:
      "Matchday carries a tournament from registration to certificates: group draw, fixtures, points tables, knockout brackets, a certificate designer, and public pages that teams can follow without logging in.",
    specs: [{ label: "Stack", value: "Next.js 16, React 19, Prisma, Turso" }],
    links: [{ label: "Open the app", href: "https://matchdayhq.vercel.app" }],
    note: "Source is private for now.",
  },
]

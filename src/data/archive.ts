export type ArchiveKind = "applications" | "tools" | "experiments"

export type ArchiveEntry = {
  name: string
  kind: ArchiveKind
  note: string
  href: string
  search: string
}

export const kindLabels: Record<ArchiveKind, string> = {
  applications: "Application",
  tools: "Developer tool",
  experiments: "Experiment",
}

export const archiveFilters: { value: ArchiveKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "applications", label: "Applications" },
  { value: "tools", label: "Developer tools" },
  { value: "experiments", label: "Experiments" },
]

export const archive: ArchiveEntry[] = [
  {
    name: "Bidhan",
    kind: "applications",
    note: "Study game for the Constitution of Nepal. Details above.",
    href: "https://bidhan.vercel.app",
    search: "bidhan constitution study game react typescript fastapi postgres",
  },
  {
    name: "Matchday",
    kind: "applications",
    note: "Tournament manager. Details above.",
    href: "https://matchdayhq.vercel.app",
    search: "matchday tournament fixtures brackets next.js prisma turso",
  },
  {
    name: "omarchy-bsdate",
    kind: "tools",
    note: "Nepali date widget for the Omarchy bar. Details above.",
    href: "https://github.com/diwash-9/omarchy-bsdate",
    search: "omarchy-bsdate bikram sambat nepali calendar qml bash quickshell",
  },
  {
    name: "omarchy-minimize",
    kind: "tools",
    note: "Minimize workflow for Hyprland. Details above.",
    href: "https://github.com/diwash-9/omarchy-minimize",
    search: "omarchy-minimize omaveil hyprland minimize restore bash",
  },
  {
    name: "omarchy-ytmp3",
    kind: "tools",
    note: "YouTube downloader on the AUR. Details above.",
    href: "https://github.com/diwash-9/omarchy-ytmp3",
    search: "omarchy-ytmp3 youtube mp3 mp4 downloader yt-dlp ffmpeg aur",
  },
  {
    name: "QuickNote",
    kind: "applications",
    note: "Desktop text editor in Java Swing.",
    href: "https://github.com/diwash-9/quick-note",
    search: "quicknote quick-note java swing text editor notepad dark mode",
  },
  {
    name: "Hangman, Football Edition",
    kind: "experiments",
    note: "Console hangman in Java with a football word list.",
    href: "https://github.com/diwash-9/Hangman-Java-Football-Edition",
    search: "hangman football java console game ascii words",
  },
  {
    name: "currency-converter",
    kind: "applications",
    note: "Currency converter with live rates.",
    href: "https://github.com/diwash-9/currency-converter",
    search: "currency converter javascript exchange rates",
  },
  {
    name: "unit-wise-converter",
    kind: "applications",
    note: "Unit conversion tool.",
    href: "https://github.com/diwash-9/unit-wise-converter",
    search: "unit wise converter units javascript",
  },
  {
    name: "workbud",
    kind: "applications",
    note: "Small productivity experiment on the web.",
    href: "https://github.com/diwash-9/workbud",
    search: "workbud productivity javascript",
  },
  {
    name: "Quiz Game",
    kind: "experiments",
    note: "Command line quiz program in Python.",
    href: "https://github.com/diwash-9/Quiz-Game",
    search: "quiz game python cli",
  },
  {
    name: "Password Manager",
    kind: "experiments",
    note: "Local password storage practice project.",
    href: "https://github.com/diwash-9/Password-Manager-in-Python",
    search: "password manager python vault",
  },
  {
    name: "Genetic Algorithm",
    kind: "experiments",
    note: "Genetic algorithm implemented from scratch.",
    href: "https://github.com/diwash-9/Genetic-Algorithm",
    search: "genetic algorithm python evolution",
  },
  {
    name: "AI-LAB",
    kind: "experiments",
    note: "College AI lab notebooks.",
    href: "https://github.com/diwash-9/AI---LAB",
    search: "ai lab jupyter notebooks college coursework",
  },
  {
    name: "react playground",
    kind: "experiments",
    note: "Practice repo from learning React.",
    href: "https://github.com/diwash-9/react",
    search: "react playground learning useeffect javascript",
  },
  {
    name: "swing-java-class",
    kind: "experiments",
    note: "Java Swing classroom exercises.",
    href: "https://github.com/diwash-9/swing-java-class",
    search: "swing java class gui exercises college",
  },
  {
    name: "Net-Centric Computing",
    kind: "experiments",
    note: "Coursework solutions in C#.",
    href: "https://github.com/diwash-9/Net-Centric-Computing-Solutions",
    search: "net-centric computing c# coursework solutions",
  },
]

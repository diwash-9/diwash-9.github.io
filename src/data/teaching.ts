export type Playlist = {
  id: string
  title: string
  videos: number
  channel: string
  about: string
  for: string
  href: string
}

export const playlists: Playlist[] = [
  {
    id: "numerical-method",
    title: "Numerical Method in Nepali",
    videos: 26,
    channel: "Digital Nomad Academy",
    about:
      "Numerical Methods chapter by chapter, from non-linear equations to differentiation and integration, with worked examples.",
    for: "bachelor level students taking Numerical Methods. Taught in Nepali.",
    href: "https://www.youtube.com/playlist?list=PL_t29gGD01swfExTzXakkyyuExvVdsh9b",
  },
  {
    id: "eda-python",
    title: "Complete EDA with Python: 25 Years of Premier League Data",
    videos: 10,
    channel: "Digital Nomad Academy",
    about:
      "exploratory data analysis in Python on 25 years of football match data, from cleaning to insights.",
    for: "Python learners meeting data analysis for the first time.",
    href: "https://www.youtube.com/playlist?list=PLLSUNk1as9EE",
  },
  {
    id: "csit-breakdown",
    title: "BSc.CSIT Semester-wise Breakdown",
    videos: 3,
    channel: "Digital Nomad Academy",
    about:
      "walkthroughs of the first three semester CSIT syllabi with study resources.",
    for: "current and incoming BSc.CSIT students.",
    href: "https://www.youtube.com/playlist?list=PL_t29gGD01symSIyiEgRc5KgUDnsg9Sp6",
  },
]

export const aboutFacts = [
  {
    label: "Study",
    value:
      "BSc CSIT, Samriddhi College, Tribhuvan University, 2023 to 2027 (in progress)",
  },
  {
    label: "Teaching",
    value: "Digital Nomad Academy (from 2024), study material with HamroCSIT",
  },
  {
    label: "Elsewhere",
    value: "Founding member, Samriddhi IT Club; Cisco IT Essentials",
  },
]

export const contacts = [
  {
    label: "devrajkhatiwada003@gmail.com",
    note: "Email, replies within a day",
    href: "mailto:devrajkhatiwada003@gmail.com",
  },
  {
    label: "github.com/diwash-9",
    note: "Code and docs",
    href: "https://github.com/diwash-9",
  },
  {
    label: "LinkedIn",
    note: "Work and teaching history",
    href: "https://www.linkedin.com/in/devraj-khatiwada-733a95264/",
  },
]

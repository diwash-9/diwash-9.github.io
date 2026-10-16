// Credentials shown on /credentials. Images live in public/certificates/.
//
// NOTE: the metadata below was drafted from the image file names. Please check
// the issuer names and add the missing `date` values against the originals —
// dates are only rendered when present, so it is safe to leave them out.
//
// To add a new credential:
//   1. Drop an optimized image into public/certificates/ as `<slug>.jpg`
//      and a smaller `<slug>-thumb.jpg`.
//   2. Add an entry below.

export type CredentialKind =
  "Certification" | "Hackathon" | "Workshop" | "Recognition"

export type Credential = {
  id: string
  title: string
  /** Omitted when the issuing body is still to be confirmed. */
  issuer?: string
  kind: CredentialKind
  /** Optional, e.g. "2025" or "Mar 2025". Omitted when unknown. */
  date?: string
  /** One line of context shown under the title. */
  note: string
  /** Full-size image opened in the lightbox. */
  image: string
  /** Small preview used in the grid. */
  thumb: string
}

export const credentials: Credential[] = [
  {
    id: "cisco-it-essentials",
    title: "Cisco IT Essentials",
    issuer: "Cisco Networking Academy",
    kind: "Certification",
    note: "PC hardware, operating systems, networking, and security fundamentals.",
    image: "/certificates/cisco-it-essentials.jpg",
    thumb: "/certificates/cisco-it-essentials-thumb.jpg",
  },
  {
    id: "cisco-it-essentials-2",
    title: "Cisco IT Essentials II",
    issuer: "Cisco Networking Academy",
    kind: "Certification",
    note: "Advanced IT Essentials course: troubleshooting, networking, and client-side security.",
    image: "/certificates/cisco-it-essentials-2.jpg",
    thumb: "/certificates/cisco-it-essentials-2-thumb.jpg",
  },
  {
    id: "pcap-python-essentials",
    title: "PCAP: Programming Essentials in Python",
    issuer: "Python Institute",
    kind: "Certification",
    note: "Python fundamentals, from data types and OOP to modules and file handling.",
    image: "/certificates/pcap-python-essentials.jpg",
    thumb: "/certificates/pcap-python-essentials-thumb.jpg",
  },
  {
    id: "securitypal-hackathon",
    title: "SecurityPal Hackathon",
    issuer: "SecurityPal",
    kind: "Hackathon",
    note: "Participant in the SecurityPal hackathon.",
    image: "/certificates/securitypal-hackathon.jpg",
    thumb: "/certificates/securitypal-hackathon-thumb.jpg",
  },
  {
    id: "youth-hack-fest",
    title: "Youth Hack Fest Hackathon",
    issuer: "Youth Hack Fest",
    kind: "Hackathon",
    note: "Participation certificate for the Youth Hack Fest hackathon.",
    image: "/certificates/youth-hack-fest.jpg",
    thumb: "/certificates/youth-hack-fest-thumb.jpg",
  },
  {
    id: "st-xaviers-hackathon",
    title: "St. Xavier's Hackathon",
    issuer: "St. Xavier's College",
    kind: "Hackathon",
    note: "Participation certificate for the St. Xavier's College hackathon.",
    image: "/certificates/st-xaviers-hackathon.jpg",
    thumb: "/certificates/st-xaviers-hackathon-thumb.jpg",
  },
  {
    id: "hult-prize",
    title: "Hult Prize",
    issuer: "Hult Prize Foundation",
    kind: "Hackathon",
    note: "Participation in the Hult Prize, a global student social-entrepreneurship competition.",
    image: "/certificates/hult-prize.jpg",
    thumb: "/certificates/hult-prize-thumb.jpg",
  },
  {
    id: "hr-essentials-workshop",
    title: "HR Essentials Guide Workshop",
    kind: "Workshop",
    note: "Certificate of completion for the HR Essentials Guide workshop.",
    image: "/certificates/hr-essentials-workshop.jpg",
    thumb: "/certificates/hr-essentials-workshop-thumb.jpg",
  },
  {
    id: "samriddhi-contribution",
    title: "Contribution to Samriddhi IT Club",
    issuer: "Samriddhi IT Club",
    kind: "Recognition",
    note: "Recognised for contributions to the Samriddhi IT Club.",
    image: "/certificates/samriddhi-contribution.jpg",
    thumb: "/certificates/samriddhi-contribution-thumb.jpg",
  },
  {
    id: "samriddhi-token-of-love",
    title: "Token of Love · Samriddhi IT Club",
    issuer: "Samriddhi IT Club",
    kind: "Recognition",
    note: "A token of appreciation from the Samriddhi IT Club.",
    image: "/certificates/samriddhi-token-of-love.jpg",
    thumb: "/certificates/samriddhi-token-of-love-thumb.jpg",
  },
]

export const kindLabels: Record<CredentialKind, string> = {
  Certification: "Certification",
  Hackathon: "Hackathon",
  Workshop: "Workshop",
  Recognition: "Recognition",
}

export type CredentialFilter = CredentialKind | "all"

export const credentialFilters: { value: CredentialFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Certification", label: "Certifications" },
  { value: "Hackathon", label: "Hackathons" },
  { value: "Workshop", label: "Workshops" },
  { value: "Recognition", label: "Recognition" },
]

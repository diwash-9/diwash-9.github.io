import type { ArchiveEntry, ArchiveKind } from "@/data/archive"

export type ArchiveFilter = ArchiveKind | "all"

export function filterArchive(
  entries: ArchiveEntry[],
  query: string,
  filter: ArchiveFilter
): ArchiveEntry[] {
  const q = query.trim().toLowerCase()
  return entries.filter((entry) => {
    const kindOk = filter === "all" || entry.kind === filter
    const queryOk = !q || entry.search.toLowerCase().includes(q)
    return kindOk && queryOk
  })
}

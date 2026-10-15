import { describe, expect, it } from "vitest"
import { filterArchive } from "@/lib/archive"
import { archive } from "@/data/archive"

const sample = [
  {
    name: "Bidhan",
    kind: "applications" as const,
    note: "",
    href: "https://example.com",
    search: "bidhan constitution react typescript",
  },
  {
    name: "omarchy-bsdate",
    kind: "tools" as const,
    note: "",
    href: "https://example.com",
    search: "omarchy bsdate nepali calendar qml",
  },
  {
    name: "Genetic Algorithm",
    kind: "experiments" as const,
    note: "",
    href: "https://example.com",
    search: "genetic algorithm python evolution",
  },
]

describe("filterArchive", () => {
  it("returns everything for an empty query and the all filter", () => {
    expect(filterArchive(sample, "", "all")).toHaveLength(3)
  })

  it("filters by kind", () => {
    const tools = filterArchive(sample, "", "tools")
    expect(tools).toHaveLength(1)
    expect(tools[0].name).toBe("omarchy-bsdate")
  })

  it("matches query against the search terms, case-insensitively", () => {
    expect(filterArchive(sample, "TYPESCRIPT", "all")).toHaveLength(1)
    expect(filterArchive(sample, "python", "all")[0].name).toBe(
      "Genetic Algorithm"
    )
  })

  it("combines query and kind filters", () => {
    expect(filterArchive(sample, "bidhan", "tools")).toHaveLength(0)
    expect(filterArchive(sample, "bidhan", "applications")).toHaveLength(1)
  })

  it("returns nothing when there is no match", () => {
    expect(filterArchive(sample, "nonexistent-xyz", "all")).toHaveLength(0)
  })

  it("ignores surrounding whitespace in the query", () => {
    expect(filterArchive(sample, "  react  ", "all")).toHaveLength(1)
  })

  it("works against the real archive data", () => {
    expect(filterArchive(archive, "", "all")).toHaveLength(archive.length)
  })
})

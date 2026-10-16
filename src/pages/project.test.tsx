import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import ProjectDetail from "@/pages/project"

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe("Project detail page", () => {
  it("renders the project for a known slug", () => {
    renderAt("/projects/bidhan")

    expect(screen.getByRole("heading", { name: "Bidhan" })).toBeInTheDocument()
    expect(screen.getByText("What it does")).toBeInTheDocument()
    expect(
      screen.getByText("All 308 articles, organized into 35 parts")
    ).toBeInTheDocument()
  })

  it("shows a fallback for an unknown slug", () => {
    renderAt("/projects/does-not-exist")

    expect(screen.getByText("No project here.")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /back to projects/i })
    ).toBeInTheDocument()
  })
})

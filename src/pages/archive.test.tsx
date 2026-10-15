import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Archive from "@/pages/archive"

describe("Archive page", () => {
  it("filters entries as the user types", async () => {
    const user = userEvent.setup()
    render(<Archive />)

    expect(screen.getByText("Bidhan")).toBeInTheDocument()

    await user.type(screen.getByLabelText("Search the archive"), "genetic")

    expect(screen.getByText("Genetic Algorithm")).toBeInTheDocument()
    expect(screen.queryByText("Bidhan")).not.toBeInTheDocument()
  })

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup()
    render(<Archive />)

    await user.type(screen.getByLabelText("Search the archive"), "zzzzzz")

    expect(screen.getByText(/No matches/)).toBeInTheDocument()
  })
})

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Credentials from "@/pages/credentials"

describe("Credentials page", () => {
  it("filters credentials by category", async () => {
    const user = userEvent.setup()
    render(<Credentials />)

    expect(screen.getByText("Cisco IT Essentials")).toBeInTheDocument()

    await user.click(screen.getByRole("tab", { name: "Hackathons" }))

    expect(screen.getByText("SecurityPal Hackathon")).toBeInTheDocument()
    expect(screen.queryByText("Cisco IT Essentials")).not.toBeInTheDocument()
  })

  it("opens a certificate in the lightbox and closes on Escape", async () => {
    const user = userEvent.setup()
    render(<Credentials />)

    await user.click(
      screen.getByRole("button", { name: /Cisco IT Essentials certificate/i })
    )

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})

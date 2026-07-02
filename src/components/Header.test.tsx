import { render, screen } from "@testing-library/react"
import {describe, it, expect, vi} from "vitest"
import Header from "./Header"
import userEvent from "@testing-library/user-event"

describe("Header", () => {
    it("must render the title", () => {
        render(<Header theme="light" changeTheme={vi.fn()}/>)

        expect(screen.getByText(/Habit-Dash/)).toBeInTheDocument()
    })

    it("must render Sun icon when the theme is light", () => {
        const {container} = render(<Header theme="light" changeTheme={vi.fn()}/>)

        expect(container.querySelector(".lucide-sun")).toBeInTheDocument()
    })

    it("must render Moon icon when the theme is dark", () => {
        const {container} = render(<Header theme="dark" changeTheme={vi.fn()}/>)

        expect(container.querySelector(".lucide-moon")).toBeInTheDocument()
    })

    it("must call changeTheme when click up on the button", async () => {
        const mockChangeTheme = vi.fn()
        const user = userEvent.setup()
        render(<Header theme="dark" changeTheme={mockChangeTheme}/>)

        await user.click(screen.getByRole("button"))

        expect(mockChangeTheme).toHaveBeenCalledTimes(1)
    })
})
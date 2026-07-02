import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import HabitForm from './HabitForm'
import userEvent from '@testing-library/user-event'

describe("HabitForm", () => {
    it("must render the input", () => {
        render(<HabitForm onSubmit={vi.fn()}/>)

        expect(screen.getByPlaceholderText("Habit name")).toBeInTheDocument()
    })

    it("must call onSubmit with the input value when called", async () => {
        const mockOnSubmit = vi.fn()
        const user = userEvent.setup()
        render(<HabitForm onSubmit={mockOnSubmit}/>)

        await user.type(screen.getByPlaceholderText("Habit name"),"Drink water")
        await user.click(screen.getByRole("button"))

        expect(mockOnSubmit).toHaveBeenCalledWith("Drink water")
    })

    it("must clear the input after the submit", async () => {
        const user = userEvent.setup()
        render(<HabitForm onSubmit={vi.fn()}/>)

        const input = screen.getByPlaceholderText("Habit name")
        await user.type(input,"Drink water")
        await user.click(screen.getByRole("button"))

        expect(input).toHaveValue("")
    })

    it("must show an alert if the input is empty when submit it", async () => {
        vi.spyOn(window,"alert").mockImplementation(() => {})
        const user = userEvent.setup()
        render(<HabitForm onSubmit={vi.fn()}/>)

        await user.click(screen.getByRole("button"))

        expect(window.alert).toHaveBeenCalledWith("Error:There is nothing written in the habit input!")
    })

    it("must not call onSubmit if the input is empty", async () => {
        const mockOnSubmit = vi.fn()
        const user = userEvent.setup()
        render(<HabitForm onSubmit={mockOnSubmit}/>)

        await user.click(screen.getByRole("button"))

        expect(mockOnSubmit).not.toHaveBeenCalled()
    })
})
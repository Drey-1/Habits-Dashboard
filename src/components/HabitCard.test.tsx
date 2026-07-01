import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import HabitCard from "./HabitCard"

const mockItem = { id: "1", title: "Drink water", done: false }

const mockProps = {
    item: mockItem,
    onRemove: vi.fn(),
    onDone: vi.fn(),
    onUpdate: vi.fn(),
}

describe("HabitCard", () => {
    it("must render the habit's title", () => {
        render(<HabitCard {...mockProps}/>)

        expect(screen.getByText("Drink water")).toBeInTheDocument()
    })

    it("must call onDone when click up on check button", async () => {
        const user = userEvent.setup()
        render(<HabitCard {...mockProps}/>)

        const buttons = screen.getAllByRole("button")
        await user.click(buttons[0])

        expect(mockProps.onDone).toHaveBeenCalledWith("1")
    })

    it("must call onRemove when click up on trash button", async () => {
        const user = userEvent.setup()
        render(<HabitCard {...mockProps}/>)

        const buttons = screen.getAllByRole("button")
        await user.click(buttons[1])

        expect(mockProps.onRemove).toHaveBeenCalledWith("1")
    })

    it("must call onUpdate when edit the title", async () => {
        vi.spyOn(window, "prompt").mockReturnValue("Sleep early")
        const user = userEvent.setup()
        const {container } = render(<HabitCard {...mockProps}/>)

        const editDiv = container.querySelector(".updt")!
        await user.click(editDiv)

        expect(mockProps.onUpdate).toHaveBeenCalledWith("1","Sleep early")
    })
})
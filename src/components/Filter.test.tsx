import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Filter from './Filter'
import userEvent from '@testing-library/user-event'

describe("Filter", () => {
    it("must render the filter's type", () => {
        render(<Filter filter='all' type='all' bgColor='#fff' onFilter={vi.fn()}/>)

        expect(screen.getByText("all")).toBeInTheDocument()
    })

    it("must apply the active class when filter === type", () => {
        const {container} = render(<Filter filter='checked' type='checked' bgColor='#fff' onFilter={vi.fn()}/>)

        expect(container.querySelector(".nav-y")).toBeInTheDocument()
    })

    it("must not apply the active class when filter !== type", () => {
        const {container} = render(<Filter filter='all' type='checked' bgColor='#fff' onFilter={vi.fn()}/>)

        expect(container.querySelector(".nav-y")).not.toBeInTheDocument()
    })

    it("must call onFilter with the correct type when click up", async () => {
        const mockOnFilter = vi.fn()
        const user = userEvent.setup()
        render(<Filter filter='all' type='checked' bgColor='#fff' onFilter={mockOnFilter}/>)

        await user.click(screen.getByText("checked"))

        expect(mockOnFilter).toHaveBeenCalledWith("checked")
    })
})
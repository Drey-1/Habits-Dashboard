import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
    it("must show 0 of 0 when there are no habits", () => {
        render(<Dashboard items={[]}/>)

        expect(screen.getByText((_, el) => el?.textContent === "Items dones: 0/0")).toBeInTheDocument()
    })

    it("must show the correct count of completed habits", () => {
        const items = [
            { id: '1', title: 'Drink water', done: true },
            { id: '2', title: 'Meditate', done: false },
        ]

        render(<Dashboard items={items}/>)

        expect(screen.getByText((_, el) => el?.textContent === "Items dones: 1/2")).toBeInTheDocument()
    })

    it("must show the alert when all of habits are completed", () => {
        vi.spyOn(window, "alert").mockImplementation(() => {})

        const items = [
            { id: '1', title: 'Drink water', done: true },
            { id: '2', title: 'Meditate', done: true },
        ]

        render(<Dashboard items={items}/>)

        expect(window.alert).toHaveBeenCalledWith("CONGRATULATIONS! You made all of your habits today.")
    })
})
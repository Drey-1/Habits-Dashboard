import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHabits } from "./useHabits";
import { act } from "react";

vi.mock("../services/localStorage.ts", () => ({
    loadHabits: vi.fn(() => []),
    saveHabits: vi.fn(),
    loadDay: vi.fn(() => new Date().toDateString()),
    saveDay: vi.fn(),
    loadTheme: vi.fn(() => "light"),
    saveTheme: vi.fn(),
}))

describe("useHabits", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("must start with an empty list of habits", () => {
        const { result } = renderHook(() => useHabits())

        expect(result.current.habits).toEqual([])
    })

    it("must add one habit to their list", () => {
        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        expect(result.current.habits).toHaveLength(1)
        expect(result.current.habits[0].title).toBe("Drink Water")
    })

    it("must remove one habit of the list", () => {
        vi.spyOn(window, "confirm").mockReturnValue(true)

        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        act(() => {
            result.current.removeHabit(result.current.habits[0].id)
        })

        expect(result.current.habits).toHaveLength(0)
    })

    it("must not remove the habit if the user cancel", () => {
        vi.spyOn(window, "confirm").mockReturnValue(false)

        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        act(() => {
            result.current.removeHabit(result.current.habits[0].id)
        })

        expect(result.current.habits).toHaveLength(1)
    })

    it("must update the habit's title", () => {
        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        act(() => {
            result.current.updateHabit(result.current.habits[0].id, "Sleep early")
        })

        expect(result.current.habits[0].title).toBe("Sleep early")
    })

    it("must not update the habit's title if the new title is null", () => {
        vi.spyOn(window, "confirm").mockReturnValue(false)

        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        act(() => {
            result.current.updateHabit(result.current.habits[0].id, "")
        })

        expect(result.current.habits[0].title).toBe("Drink Water")
    })

    it("must mark the habit as done", () => {
        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
        })

        act(() => {
            result.current.doneHabit(result.current.habits[0].id)
        })

        expect(result.current.habits[0].done).toBe(true)
    })

    it("must filter only checked habits", () => {
        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
            result.current.addHabit("Meditate")
        })

        act(() => {
            result.current.doneHabit(result.current.habits[0].id)
        })

        act(() => {
            result.current.setFilter("checked")
        })

        expect(result.current.filteredHabits).toHaveLength(1)
        expect(result.current.filteredHabits[0].title).toBe("Drink Water")
    })

    it("must filter only pending habits", () => {
        const { result } = renderHook(() => useHabits())

        act(() => {
            result.current.addHabit("Drink Water")
            result.current.addHabit("Meditate")
        })

        act(() => {
            result.current.doneHabit(result.current.habits[0].id)
        })

        act(() => {
            result.current.setFilter("unchecked")
        })

        expect(result.current.filteredHabits).toHaveLength(1)
        expect(result.current.filteredHabits[0].title).toBe("Meditate")
    })

    it("must turn the theme", () => {
        const { result } = renderHook(() => useHabits())

        expect(result.current.theme).toBe("light")

        act(() => {
            result.current.setTheme("dark")
        })

        expect(result.current.theme).toBe("dark")
    })
})
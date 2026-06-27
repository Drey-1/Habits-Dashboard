import { describe, it, expect } from 'vitest'
import { createHabit, filterHabits, toggleDoneHabit, resetHabits, updateHabitTitle, deleteHabit } from './habitsComands'

describe('createHabit', () => {
  it('must return the name of the habit correctly', () => {
    const habit = createHabit('Drink water')

    expect(habit.title).toBe('Drink water')
  })

  it("must return done of the habit as false", () => {
    const habit = createHabit('Drink water')

    expect(habit.done).toBe(false)
  })
  it("must return a unique ID on each call", () => {
    const habit1 = createHabit('Drink water')
    const habit2 = createHabit('Drink water')

    expect(habit1.id).not.toBe(habit2.id)
  })
})

describe("filterHabits", () => {
    const habits = [
        { id: '1', title: 'Drink water', done: true },
        { id: '2', title: 'Meditate', done: false },
        { id: '3', title: 'Practise', done: true },
    ]

    it("must return all habits when kind 'all'",() => {
        const result = filterHabits(habits,"all")

        expect(result).toHaveLength(3)
    })

    it("must return all habits when kind 'checked'",() => {
        const result = filterHabits(habits,"checked")

        expect(result).toHaveLength(2)
        expect(result.every(h => h.done)).toBe(true)
    })

    it("must return all habits when kind 'unchecked'",() => {
        const result = filterHabits(habits,"unchecked")

        expect(result).toHaveLength(1)
        expect(result.every(h => !h.done)).toBe(true)
    })

    it("must not modify the original array",() => {
        const original = [
            { id: '1', title: 'Beber água', done: true },
            { id: '2', title: 'Meditar', done: false },
        ]
        const copy = [...original]

        filterHabits(original, "checked")
        
        expect(original).toEqual(copy)
    })
})

describe("toggleDoneHabit", () => {
    const habits = [
        { id: '1', title: 'Beber água', done: false },
        { id: '2', title: 'Meditar', done: false },
    ]
    
    it("must mark the correctly habit as done", () => {
        const result = toggleDoneHabit(habits, "1")

        expect(result[0].done).toBe(true)
    })

    it("must not affect the other habits", () => {
        const result = toggleDoneHabit(habits, "1")

        expect(result[1].done).toBe(false)
    })

    it("must not modify the original array", () => {
        const original = [{ id: '1', title: 'Drink water', done: false }]
        const copy = [...original]

        toggleDoneHabit(original, "1")

        expect(original).toEqual(copy)
    })
})

describe("resetHabits", () => {
    it("must set done as false in all of the habits", () => {
        const habits = [
            { id: '1', title: 'Beber água', done: true },
            { id: '2', title: 'Meditar', done: true },
            { id: '3', title: 'Exercitar', done: false },
        ]
        
        const result = resetHabits(habits)

        expect(result.every(h => h.done === false)).toBe(true)
    })

    it("must not modify the original array", () => {
        const original = [{ id: '1', title: 'Beber água', done: true }]
        const copy = [...original]
        
        resetHabits(original)

        expect(original).toEqual(copy)
    })
})

describe("updateHabitTitle", () => {
    const habits = [
        { id: '1', title: 'Drink water', done: false },
        { id: '2', title: 'Meditate', done: false },
    ]

    it("must update the title of the correct habit", () => {
        const result = updateHabitTitle(habits, "Sleep early", "1")

        expect(result[0].title).toBe("Sleep early")
    })

    it("must not affect other habits", () => {
        const result = updateHabitTitle(habits, "Sleep early", "1")

        expect(result[1].title).toBe("Meditate")
    })

    it("must not modify the original array", () => {
        const original = [{ id: '1', title: 'Beber água', done: false }]
        const copy = [...original]

        updateHabitTitle(original, "Sleep early", "1")

        expect(original).toEqual(copy)
    })
})

describe("deleteHabit", () => {
    const habits = [
        { id: '1', title: 'Beber água', done: false },
        { id: '2', title: 'Meditar', done: false },
        { id: '3', title: 'Exercitar', done: false },
    ]

    it("must remove the correct habit", () => {
        const result = deleteHabit(habits, "2")

        expect(result).toHaveLength(2)
        expect(result.find(h => h.id === "2")).toBeUndefined()
    })

    it("must not remove other habits", () => {
        const result = deleteHabit(habits, "2")

        expect(result.find(h => h.id === "1")).toBeDefined()
        expect(result.find(h => h.id === "3")).toBeDefined()
    })

    it("must not modify the original array", () => {
        const original = [{ id: '1', title: 'Beber água', done: false }]
        const copy = [...original]

        deleteHabit(original, "1")

        expect(original).toEqual(copy)
    })
})
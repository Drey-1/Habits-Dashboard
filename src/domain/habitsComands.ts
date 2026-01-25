import type { Habit } from "../types/habitType";
import { v4 as uuid } from "uuid";

export function createHabit( title : string): Habit {
    return {
        id: uuid(),
        title,
        done: false,
    };
}

export function filterHabits( habits : Habit[], kind : "all" | "checked" | "unchecked" ) : Habit[] {
    if( kind === "checked" ) return habits.filter(( item ) => { return item.done });
    if( kind === "unchecked" ) return habits.filter(( item ) => { return !item.done });
    return habits;
}

export function toggleDoneHabit( habits : Habit[], id : string ) : Habit[] {
    return habits.map((item) => {
        return item.id === id ? { ...item, done: true } : item
    });
}

export function resetHabits( habits : Habit[] ) : Habit[] {
    return habits.map((item) => {
        return {...item, done : false }
    });
}

export function updateHabitTitle( habits : Habit[], title : string, id : string ) : Habit[] {
    return habits.map((item) => {
        return item.id === id ? { ...item, title : title} : item
    });
}

export function deleteHabit( habits : Habit[], id : string ) : Habit[] {
    return habits.filter((item) => {
        return item.id != id 
    });
}

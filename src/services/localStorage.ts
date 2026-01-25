import type { Habit } from "../types/habitType";

const HABIT_KEY = "habits";
const DAY_KEY = "today";
const THEME_KEY = "theme";

export function loadHabits() : Habit[] {
    const prevHabits = localStorage.getItem(HABIT_KEY);
    return prevHabits ? JSON.parse(prevHabits) : [];
}

export function saveHabits( habits : Habit[] ) : void {
    localStorage.setItem( HABIT_KEY, JSON.stringify(habits));
}

export function loadDay() : string | null {
    return localStorage.getItem(DAY_KEY);
}

export function saveDay( day: string ) : void {
    localStorage.setItem( DAY_KEY, day );
}

export function loadTheme() : string | null {
    return localStorage.getItem(THEME_KEY);
}

export function saveTheme( theme: string ) : void {
    localStorage.setItem( THEME_KEY, theme );
}
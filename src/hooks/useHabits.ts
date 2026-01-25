import { useEffect, useState } from 'react';
import type { Habit } from '../types/habitType';
import {
  createHabit, 
  deleteHabit, 
  filterHabits, 
  resetHabits, 
  toggleDoneHabit, 
  updateHabitTitle 
} from '../domain/habitsComands';
import { 
  loadDay, 
  loadHabits, 
  loadTheme, 
  saveDay, 
  saveHabits, 
  saveTheme 
} from '../services/localStorage';

export function useHabits() {
    const [ habits, setHabits ] = useState<Habit[]>(loadHabits());
    const [ filter, setFilter ] = useState<'all' | 'checked' | 'unchecked'>('all');
    const [ theme, setTheme ] = useState<'light' | 'dark'>(() => {
        return loadTheme() === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        saveHabits(habits);
    }, [habits])

    useEffect(() => {
        const today = new Date().toDateString();
        const savedDay = loadDay();
        if(today != savedDay) {
            setHabits(resetHabits(habits));
            saveDay(today);
        }
    }, []);

    useEffect(() => {
        saveTheme(theme);
    }, [theme])

    return {
        habits,
        filteredHabits: filterHabits(habits, filter),
        filter,
        setFilter,
        theme,
        setTheme,

        addHabit( title: string ) {
            setHabits((prev) => [...prev, createHabit(title)])
        },

        removeHabit( id : string ) {
            if (window.confirm('Do you really want to delete this habit?')) {
                setHabits(deleteHabit( habits, id ))
            }
        },

        updateHabit( id: string, newText : string ) {
            if(newText){
                setHabits(updateHabitTitle( habits, newText, id ))
            }
        },

        doneHabit( id : string ) {
            setHabits(toggleDoneHabit( habits, id ))
        }
    }
}
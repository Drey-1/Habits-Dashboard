import type { Habit } from "./habitType";

type HabitCardProps = {
    item: Habit;
    onRemove: (id: string) => void;
    onDone: (id:string) => void;
    onUpdate: (id:string, newTitle:string) => void;
}

export type {HabitCardProps}
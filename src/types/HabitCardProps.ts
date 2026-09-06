import type { Habit } from "./habitType";

type HabitCardProps = {
  item: Habit;
  onRemove: (id: string) => void;
  onDone: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDragStart: (id: string) => void;
  onMouseOver: (e: React.DragEvent) => void;
  onDrop: (idTarget: string) => void;
  onDragEnd: () => void;
};

export type { HabitCardProps };
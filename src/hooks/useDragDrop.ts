import { useState } from "react";
import type { Habit } from "../types/habitType";

export const useDragDrop = (habits: Habit[], setHabits: (habits: Habit[]) => void) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const onDragStart = (id: string) => {
    setDraggedId(id);
  };

  const onMouseOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (idTarget: string) => {
    if (draggedId === null || draggedId === idTarget) return;

    const sourceIndex = habits.findIndex((h) => h.id === draggedId);
    const destinationIndex = habits.findIndex((h) => h.id === idTarget);

    if (sourceIndex === -1 || destinationIndex === -1) return;

    const novaLista = [...habits];
    const [itemRemovido] = novaLista.splice(sourceIndex, 1);
    novaLista.splice(destinationIndex, 0, itemRemovido);

    setHabits(novaLista);
    setDraggedId(null);
  };

  const onDragEnd = () => {
    setDraggedId(null);
  };

  return { onDragStart, onMouseOver, onDrop, onDragEnd };
};
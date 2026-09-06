import { Check, Trash, SquarePen } from "lucide-react";
import Btn from "./Btn";
import "../styles/HabitCard.css";
import type { HabitCardProps } from "../types/HabitCardProps";

export default function HabitCard({ 
    item, 
    onRemove, 
    onDone, 
    onUpdate, 
    onDragEnd, 
    onDragStart, 
    onMouseOver, 
    onDrop 
}: HabitCardProps) {
    const { title, id, done } = item;

    return (
        <div 
            className="card" 
            draggable 
            onDragStart={() => onDragStart(id)}
            onDragOver={onMouseOver}
            onDrop={() => onDrop(id)}
            onDragEnd={onDragEnd}
        >
            <div className={done ? "checkedP" : "uncheckP"}>
                <button className={done ? "check-btn checked" : "check-btn"} onClick={() => onDone(id)}>
                    <Check className="icon"/>
                </button>
            </div>
            <div className="text">
                {title}
                <div className="updt" onClick={() => {
                    const newTitle = window.prompt("Write the new text:", item.title);
                    if (!newTitle) return;
                    onUpdate(id, newTitle);
                }}>
                    <SquarePen />
                </div>
            </div>
            <div onClick={() => onRemove(id)} style={{ display: 'inline-block' }}>
                <Btn color={"#be4040"} content={<Trash/>} />
            </div>   
        </div>
    );
}
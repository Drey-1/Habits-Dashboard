import { useEffect } from "react";
import "../styles/Dashboard.css"
import type { Habit } from "../types/habitType";

type DashboardProps = {
    items: Habit[]
}

export default function Dashboard({items}:DashboardProps) {
    const totalItms = items.length;
    const doneItms = items.filter(item => item.done === true).length;
    const date = new Date();
    const minutes = 60 - date.getMinutes();
    const hours = (minutes != 0?23:24) - date.getHours();
    

    useEffect(() => {
        if (doneItms === totalItms && totalItms > 0) {
    window.alert("CONGRATULATIONS! You made all of your habits today.");}}, [doneItms, totalItms]);

    return (
        <div className="div-dash">
            <span>Items dones: <b style={{color:"green"}}>{doneItms}</b>/{totalItms}</span>
            <span>Remaining time: {hours}h and {minutes}min</span>
        </div>
    )
}
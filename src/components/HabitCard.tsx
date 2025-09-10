import { Check, Trash } from "lucide-react"
import Btn from "./Btn"
import "../styles/HabitCard.css"
import React, { useState } from "react";

type habitType = {
  id: string,
  title: string,
  done: boolean,
};

type HabitCardProps = {
    item: habitType;
    onRemove: (id: string) => void;
    onDone: (id:string) => void;

}

export default function HabitCard({ item, onRemove , onDone }:HabitCardProps) {
    const { title, id ,done } = item;
    const [ check, setCheck ] = useState(done)

    const Checking = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCheck( true );
        e.currentTarget.className = "check-btn checked"
        onDone(id);
        if(e.currentTarget.parentElement) {
            e.currentTarget.parentElement.className = "checkedP"
        }
    }

    return(
        <div className="card" key={id}>
            <div className="uncheckP">
                <button className={check ? "check-btn checked" : "check-btn"} onClick={Checking}>
                    <Check className="icon"/>
                </button>
            </div>
            <div className="text">{title}</div>
            <div onClick={() => onRemove(id)} style={{ display: 'inline-block' }}>
                <Btn  color={"#be4040"} content={<Trash/>} />
            </div>   
        </div>
    )
}
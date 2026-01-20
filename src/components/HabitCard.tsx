import { Check, Trash, SquarePen } from "lucide-react"
import Btn from "./Btn"
import "../styles/HabitCard.css"
import { useState } from "react";

type habitType = {
  id: string,
  title: string,
  done: boolean,
};

type HabitCardProps = {
    item: habitType;
    onRemove: (id: string) => void;
    onDone: (id:string) => void;
    onUpdate: (id:string) => void;

}

export default function HabitCard({ item, onRemove , onDone, onUpdate }:HabitCardProps) {
    const { title, id ,done } = item;
    const [ check, setCheck ] = useState(done)

    const Checking = () => {
        setCheck( true );
        onDone(id);
    }

    return(
        <div className="card">
            <div className={ check? "checkedP":"uncheckP"}>
                <button className={check ? "check-btn checked" : "check-btn"} onClick={Checking}>
                    <Check className="icon"/>
                </button>
            </div>
            <div className="text">
                {title}
                <div className="updt" onClick={() => onUpdate(id)}>
                    <SquarePen />
                </div>
            </div>
            <div onClick={() => onRemove(id)} style={{ display: 'inline-block' }}>
                <Btn  color={"#be4040"} content={<Trash/>} />
            </div>   
        </div>
    )
}
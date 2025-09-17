import { CheckIcon, Moon, Sun } from "lucide-react";
import "../styles/Header.css"

type HeaderProps = {
    theme:string;
    changeTheme: () => void;
}

export default function Header({ changeTheme, theme }:HeaderProps) {
    return (
        <div className="header">
            <h1>Habit-Dash<CheckIcon className="h1-ico"/></h1>
            <button className="theme-btn" onClick={changeTheme}>
                {theme === "light"?<Sun/>:<Moon/>}
            </button>
        </div>
    )
}
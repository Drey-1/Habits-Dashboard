import { CheckIcon, Moon, Sun } from "lucide-react";
import "../styles/Header.css"
import type { HeaderProps } from "../types/HeaderProps";

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
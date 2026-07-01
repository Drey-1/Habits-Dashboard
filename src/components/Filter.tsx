import type { FilterProps } from "../types/FilterProps"
import Btn from "./Btn"

export default function Filter({ filter, type, bgColor, onFilter } : FilterProps) {
    return (
        <div
            className={filter === type ? 'nav-y' : ''}
            onClick={() => onFilter(type)}
            >
            <Btn color={bgColor} content={type} />
        </div>
    )
}
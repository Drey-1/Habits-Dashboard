import Btn from "./Btn"

type FilterProps = {
    filter: "all" | "checked" | "unchecked",
    type: "all" | "checked" | "unchecked",
    bgColor: string,
    onFilter: (filter: "all" | "checked" | "unchecked") => void,
    
}

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
type FilterProps = {
    filter: "all" | "checked" | "unchecked",
    type: "all" | "checked" | "unchecked",
    bgColor: string,
    onFilter: (filter: "all" | "checked" | "unchecked") => void,
    
}

export type {FilterProps}
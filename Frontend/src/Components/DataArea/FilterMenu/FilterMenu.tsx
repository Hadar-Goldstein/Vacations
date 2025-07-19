import { NavLink } from "react-router-dom";
import "./FilterMenu.css";
import { useState } from "react";
import { calculate } from "../../../Utils/Calculate";

type VacationFilterProp = {
    filter: (filter: string) => void;
};

export function FilterMenu(props: VacationFilterProp) {
    const filters = [
        { filter: "liked", isActive: false },
        { filter: "active", isActive: false },
        { filter: "future", isActive: false },
        { filter: "all", isActive: true },
    ];

    const [state, setState] = useState(filters);

    function handleClick(selectedFilter: string) {
        const newFilters = filters.map(item => ({
            filter: item.filter,
            isActive: item.filter === selectedFilter
        }));

        setState(newFilters);
        props.filter(selectedFilter);
    }


    return (
        <div className="FilterMenu">
            {state.map(item => (
                <NavLink
                    key={item.filter}
                    to="#"
                    onClick={() => handleClick(item.filter)}
                    className={`FilterMenuLink${item.isActive ? "-active" : ""}`}>
                    {calculate.getLabel(item.filter)}
                </NavLink>

            ))}
        </div>
    );
}

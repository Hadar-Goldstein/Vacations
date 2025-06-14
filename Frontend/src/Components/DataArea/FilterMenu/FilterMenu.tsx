import { NavLink } from "react-router-dom";
import "./FilterMenu.css";

export function FilterMenu(): JSX.Element {
    return (
        <div className="FilterMenu">
            <NavLink to="/" className={"FilterMenuLink"}>Liked</NavLink>
            <NavLink to="/" className={"FilterMenuLink"}>Active Now</NavLink>
            <NavLink to="/" className={"FilterMenuLink"}>Future</NavLink>
            <NavLink to="/" className={"FilterMenuLink"}>Display All</NavLink>
        </div>
    );
}

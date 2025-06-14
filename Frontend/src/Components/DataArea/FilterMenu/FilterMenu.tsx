import { NavLink } from "react-router-dom";
import "./FilterMenu.css";

type VacationFilterProp = {
    filter: (filter: string)=> void;
}
export function FilterMenu(props: VacationFilterProp): JSX.Element {

    return (
        <div className="FilterMenu">
            <NavLink to="#" onClick={()=>{props.filter("liked")}} className={"FilterMenuLink"}>Liked</NavLink>
            <NavLink to="#" onClick={()=>{props.filter("active")}} className={"FilterMenuLink"}>Active Now</NavLink>
            <NavLink to="#" onClick={()=>{props.filter("future")}} className={"FilterMenuLink"}>Future</NavLink>
            <NavLink to="#" onClick={()=>{props.filter("all")}} className={"FilterMenuLink"}>Display All</NavLink>
        </div>
    );
}

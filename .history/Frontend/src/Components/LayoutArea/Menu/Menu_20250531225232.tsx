import { NavLink } from "react-router-dom";
import "./Menu.css";
import gif from "../"

export function Menu() {

    return (
        <div className="Menu">
            
            <div className="MenuLinks">
            <NavLink to="/home" className={"MenuLink"}>Home</NavLink>
            <NavLink to="/list" className={"MenuLink"}>List</NavLink>               
            <NavLink to="/new" className={"MenuLink"}>New</NavLink>
            </div>

            <img src={openGift}/>
            
        </div>
    );
}

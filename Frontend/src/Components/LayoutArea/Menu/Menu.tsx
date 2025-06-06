import { NavLink } from "react-router-dom";
import "./Menu.css";
import gif from "../../../Assets/Images/hotel-unscreen.gif"
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";

export function Menu() {

    return (
        <div className="Menu">
            
            <div className="MenuLinks">
            <NavLink to="/home" className={"MenuLink"}>Home</NavLink>
            <NavLink to="/vacations" className={"MenuLink"}>Vacations</NavLink>               
            <NavLink to="/new" className={"MenuLink"}>New</NavLink>
            </div>

            <div className="user-menu-container"><UserMenu></UserMenu></div>

            <img src={gif}/>

            
        </div>
    );
}

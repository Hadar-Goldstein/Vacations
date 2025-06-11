import { NavLink } from "react-router-dom";
import "./Menu.css";
import gif from "../../../Assets/Images/hotel-unscreen.gif"
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import { AppState } from "../../../Redux/Store";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";

export function Menu() {

    const user = useSelector<AppState, UserModel>(store => store.user);
    


    return (
        <div className="Menu">
            
            <div className="MenuLinks">
            <NavLink to="/home" className={"MenuLink"}>Home</NavLink>
            <NavLink to="/vacations" className={"MenuLink"}>Vacations</NavLink>   
            {user?.role === 1 && <NavLink to="/add-vacation" className={"MenuLink"}>Add Vacation</NavLink>}               
            </div>

            <div className="user-menu-container"><UserMenu></UserMenu></div>

            <img src={gif}/>

            
        </div>
    );
}

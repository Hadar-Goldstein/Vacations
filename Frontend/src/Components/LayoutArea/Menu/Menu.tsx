import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import gif from "../../../Assets/Images/hotel-unscreen.gif";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Menu.css";

export function Menu() {

    const user = useSelector<AppState, UserModel>(store => store.user);



    return (
        <div className="Menu">

            <div className="menu-links">
                <NavLink to="/home" className={"menu-link"}>Home</NavLink>
                <NavLink to="/vacations" className={"menu-link"}>Vacations</NavLink>
                {user?.role === 1 && <NavLink to="/add-vacation" className={"menu-link"}>Add Vacation</NavLink>}
                {user?.role === 1 && <NavLink to="/reports" className={"menu-link"}>Reports</NavLink>}
            </div>

            <div className="right-section">
                <UserMenu />
                <img src={gif} />
            </div>



        </div>
    );
}

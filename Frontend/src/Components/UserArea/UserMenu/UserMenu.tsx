import { useSelector } from "react-redux";
import "./UserMenu.css";
import { AppState, store } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { User } from 'phosphor-react';


export function UserMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);

    function logOut() {
        userService.logout();
        notify.success("We Hope To See You Soon.. 🏝️");
    }


    return (
        <div className="UserMenu">
            {!user && <div>
                <span>Hello Guest | </span>
                <NavLink className="user-links" to="/login">Login</NavLink>
                <span> | </span>
                <NavLink className="user-links" to="/register">Register</NavLink>
            </div>}

            {user && <div className="user-container">
                <User size={20}/>
                <span>{user.firstName} {user.lastName} | </span>
                <NavLink className="user-links" to="/home" onClick={logOut}>Logout</NavLink>
            </div>}
        </div>
    );
}

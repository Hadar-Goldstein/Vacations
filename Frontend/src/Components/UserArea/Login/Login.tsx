import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { store } from "../../../Redux/Store";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

export function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success(`Welcome, ${store.getState().user.firstName} 😉`);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">
            <div className="login-container">
                <p className="title-container">W E L C O M E !</p>
                <p className="subtitle-container">Don't have an account yet? <NavLink to={"/register"} className="link">Sign Up</NavLink></p>

                <form onSubmit={handleSubmit(send)} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" {...register("email")} required></input>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" {...register("password")} required></input>
                    </div>

                    <div className="button-container">
                        <button className="login-button" type="submit">L O G I N</button>
                    </div>
                </form>
            </div >
        </div >
    );
}

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import background from "../../../Assets/Images/Background-Website.png"
import "./Register.css";

export function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            notify.success(`Welcome, ${user.firstName} - Lets pick your next dream ✈️🏖️`);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="Register">
            <img src={background} className="registerImage"></img>

            <div className="register-container">
            <form onSubmit={handleSubmit(send)} className="register-form">
                <p className="rg-title-container">R E G I S T E R</p>
                <p className="rg-subtitle-container">Already have an account? <NavLink to={"/login"} className="link">Sign In</NavLink></p>
                <div className="rg-form-group">
                    <label>First Name:</label>
                    <input type="text" {...register("firstName")} />
                </div>
                <div className="rg-form-group">
                    <label>Last Name:</label>
                    <input type="text" {...register("lastName")} />
                </div>

                <div className="rg-form-group">
                    <label>Email:</label>
                    <input type="email"  {...register("email")} />
                </div>
                <div className="rg-form-group">
                    <label>Password:</label>
                    <input type="Password" {...register("password")} />
                </div>

                <div className="rg-button-container">
                    <button className="register-button" type="submit">L O G I N</button>
                </div>
            </form>
            </div>
        </div>
    );
}

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { dataService } from "../../../Services/DataService";
import { calculate } from "../../../Utils/Calculate";
import { notify } from "../../../Utils/Notify";
import "./AddVacation.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { useEffect } from "react";

export function AddVacation() {
    const user = useSelector<AppState, UserModel>(store => store.user);
    
    useEffect(() => {
        if (user) return;
        else navigate("/unauthorized");
    }, [user]);

    const { register, handleSubmit } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            const start = new Date(vacation.startDate);
            const end = new Date(vacation.endDate);

            if (end <= start) {
                notify.error("End date must be after start date");
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.addVacation(vacation);
            await dataService.getAllVacations(true);
            notify.success("Vacation has been added");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    const tomorrow = calculate.getTomorrowDate();

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)} className="add-form">
                <div className="add-container">
                    <p className="add-title-container">A D D   V A C A T I O N</p>

                    <div className="add-form-group">
                        <label>Destination</label>
                        <input type="text" {...register("destination")} required minLength={2} maxLength={50}></input>
                    </div>

                    <div className="add-form-group">
                        <label>Description</label>
                        <textarea rows={4} {...register("description")} required minLength={50} maxLength={450}></textarea>
                    </div>

                    <div className="add-form-group">
                        <label>Start Date</label>
                        <input type="date" {...register("startDate")} required min={tomorrow}></input>
                    </div>


                    <div className="add-form-group">
                        <label>End Date</label>
                        <input type="date" {...register("endDate")} required min={tomorrow}></input>
                    </div>

                    <div className="add-form-group">
                        <label>Price</label>
                        <input type="number" step="0.01" {...register("price")} required min={0} max={10000}></input>
                    </div>

                    <div className="add-form-group">
                        <label>Image</label>
                        <input type="file" accept="image/*" {...register("image")} required />
                    </div>

                    <div className="add-button-container">
                        <button className="add-button" type="submit">A D D</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

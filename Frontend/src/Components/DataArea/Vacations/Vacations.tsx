import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { dataService } from "../../../Services/DataService";
import { likesService } from "../../../Services/LikesService";
import { notify } from "../../../Utils/Notify";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
import { LikeModel } from "../../../Models/LikeModel";

export function Vacations() {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
    const user = useSelector<AppState, UserModel>(store => store.user);

    const navigate = useNavigate();

    // const [wasLoggedIn, setWasLoggedIn] = useState(false);

    async function fetchData() {
        await dataService.getAllVacations();
        await likesService.getLikesByUserId(user._id);
    }

    useEffect(() => {
        if (user) {
            fetchData();
        }
        else {
            navigate("/unauthorized");
        }
    }, [user]);

    async function deleteVacation(_id: string) {
        try {

            const sure = confirm("Are you sure?");
            if (!sure) return;
            await dataService.deleteVacation(_id);
            notify.success("Vacation has been deleted");
        }
        catch (err: any) {
            notify.error(err);
        }

    }

    async function editVacation(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.updateVacation(vacation);
            notify.success("Vacation has been updated");
        }
        catch (err: any) {
            notify.error(err);
        }

    }

    async function addLike(like: LikeModel) {
        try {
            await likesService.addLike(like);
            await dataService.getVacationByIdAndUpdate(like.vacationId);
            // notify.success("like has been added");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    async function removeLike(like: LikeModel) {
        try {
            await likesService.removeLike(like._id);
            await dataService.getVacationByIdAndUpdate(like.vacationId);
            // notify.success("like has been removed");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Vacations">
            {user?.role === 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} deleteCard={deleteVacation} editCard={editVacation} />
            ))}

            {user?.role !== 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} like={addLike} unLike={removeLike} />
            ))}

        </div>
    );
}

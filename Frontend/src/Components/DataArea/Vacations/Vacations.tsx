import { useEffect } from "react";
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

export function Vacations() {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
    const user = useSelector<AppState, UserModel>(store => store.user);

    // function getLikesCount(_id: string): number {
    //     const likeObj = likesPerVacation.find(obj => obj.vacationId === _id);
    //     console.log("Vacation ID:", _id, "=> Likes object:", likeObj);
    //     return likeObj?.likes ?? 0;
    // }

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await dataService.getAllVacations();
            await likesService.getLikesByUserId(user._id);
        }

        if (!user) {
            navigate("/unauthorized");
        } else {
            fetchData();
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

    return (
        <div className="Vacations">
            {user?.role === 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} deleteCard={deleteVacation} editCard={editVacation} />
            ))}

            {user?.role !== 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} />
            ))}

        </div>
    );
}

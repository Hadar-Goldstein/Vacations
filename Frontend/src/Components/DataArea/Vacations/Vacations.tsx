import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeObjModel } from "../../../Models/LikeObjModel";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { dataService } from "../../../Services/DataService";
import { likesService } from "../../../Services/LikesService";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";

export function Vacations() {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
    const user = useSelector<AppState, UserModel>(store => store.user);

    const likesPerVacation = useSelector<AppState, LikeObjModel[]>(store => store.likes);

    function getLikesCount(_id: string): number {
        const likeObj = likesPerVacation.find(obj => obj.vacationId === _id);
        console.log("Vacation ID:", _id, "=> Likes object:", likeObj);
        return likeObj?.likes ?? 0;
    }

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await dataService.getAllVacations();
            await likesService.getLikesPerVacation();
            console.log("likesPerVacation from Redux:", likesPerVacation);
        }

        if (!user) {
            navigate("/unauthorized");
        } else {
            fetchData();
        }
    }, [user]);



    return (
        <div className="Vacations">
            {user?.role === 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} />
            ))}

            {user?.role !== 1 && vacations.map(v => (
                <VacationCard key={v._id} vacation={v} likes={getLikesCount(v._id)} />
            ))}

        </div>
    );
}

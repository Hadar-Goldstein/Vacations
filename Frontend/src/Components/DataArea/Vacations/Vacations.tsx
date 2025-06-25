import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeModel } from "../../../Models/LikeModel";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { dataService } from "../../../Services/DataService";
import { likesService } from "../../../Services/LikesService";
import { notify } from "../../../Utils/Notify";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
import { Pagination } from "@mui/material";
import { confirm } from "../../../Utils/Confirm";

const ITEMS_PER_PAGE = 9;

export function Vacations() {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
    const user = useSelector<AppState, UserModel>(store => store.user);
    const likes = useSelector<AppState, LikeModel[]>(store => store.likes);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            await dataService.getAllVacations();
            await likesService.getLikesByUserId(user._id);
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    useEffect(() => {
        if (user) fetchData();
        else navigate("/unauthorized");
    }, [user]);

    async function deleteVacation(_id: string) {
        try {
            const sure = await confirm.confirmModal("Vacation will be permanently deleted.", "Are you sure?");
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

    async function displayFilter(filter: string) {
        setPage(1);
        switch (filter) {
            case "active":
                await dataService.getActiveVacations();
                break;

            case "future":
                await dataService.getFutureVacations();
                break;

            case "liked":
                await dataService.getAllVacations(true);
                await dataService.getLikedVacations(likes);
                break;

            case "all":
                await dataService.getAllVacations(true);
                break;
        }
    }

    // Pagination:
    const [page, setPage] = useState<number>(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentVacations = vacations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(vacations.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const layoutElement = document.querySelector(".Layout");
        layoutElement?.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);




    return (
        <div className="Vacations">
            {user?.role === 1 && <div className="vacations-list-admin">{currentVacations.map(v => (
                <VacationCard key={v._id} vacation={v} deleteCard={deleteVacation} editCard={editVacation} />
            ))} </div>}

            {user?.role !== 1 && (
                <div className="vacations-user-view">
                    <FilterMenu filter={displayFilter} />

                    <div className="vacations-list">
                        {currentVacations.map(v => (
                            <VacationCard
                                key={v._id}
                                vacation={v}
                                like={addLike}
                                unLike={removeLike}
                            />
                        ))}
                    </div>
                </div>
            )}

            <Pagination count={totalPages} page={page} shape="rounded" variant="outlined" size="small" onChange={(_e, val) => setPage(val)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                    '& .MuiPaginationItem-root': {
                        minWidth: 24,
                        height: 24,
                        fontSize: '0.75rem',
                        padding: 0,
                        margin: '0 4px',
                        width: '24px !important'
                    }
                }}
            />
        </div>
    );
}

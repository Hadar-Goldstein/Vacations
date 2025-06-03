import { useEffect } from "react";
import { useSelector } from "react-redux";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { dataService } from "../../../Services/DataService";
import "./Vacations.css";
import { VacationCard } from "../VacationCard/VacationCard";

export function Vacations() {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);

    useEffect(() => {
        dataService.getAllVacations();

    }, []);
    return (
        <div className="Vacations">
            {vacations.map(v => (
                <VacationCard key={v._id} vacation={v} /> 
            ))}
        </div>
    );
}

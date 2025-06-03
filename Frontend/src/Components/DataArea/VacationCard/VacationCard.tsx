import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";

type VacationCardProps = {
	vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
    return (
        <div className="Card">
            <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>
			<div>{props.vacation.destination}</div>
			<div>{calculate.formatDateRangeAndNights(props.vacation.startDate, props.vacation.endDate)}</div>
			<div>{props.vacation.description}</div>
			<div>{props.vacation.price}</div>
        </div>
    );
}

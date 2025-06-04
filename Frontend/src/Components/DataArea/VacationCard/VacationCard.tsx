import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";
import { CalendarCheck, Info, CurrencyDollar, MapPin } from 'phosphor-react';


type VacationCardProps = {
    vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps) {
    return (
        <div className="Card">
            <div className="ImageContainer">
                <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>
            </div>
            <div className="destination-container">
                <MapPin size={22} />
                <div>{props.vacation.destination}</div>
            </div>
            <div className="destination-container">
                <CalendarCheck size={22} />
                <div>{calculate.formatDateRangeAndNights(props.vacation.startDate, props.vacation.endDate)}</div>
            </div>
            <div className="test">
                <Info size={22} />
                <p className="text">{props.vacation.description}</p>
            </div>

            <div className="destination-container">
                <CurrencyDollar size={22} />
                <div>{props.vacation.price}</div>
            </div>
        </div>
    );
}

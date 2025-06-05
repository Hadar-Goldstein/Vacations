import { CalendarCheck, CurrencyDollar, HeartStraight, Info, MapPin } from 'phosphor-react';
import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";


type VacationCardProps = {
    vacation: VacationModel;
    likes: number;
};

export function VacationCard(props: VacationCardProps) {
    return (
        <div className="Card">
            <div className="ImageContainer">
                <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>
                <div className="like-badge">
                    <HeartStraight size={18} />
                    <span>Like {props.likes > 0 ? ` ${props.likes}` : ""}</span>
                </div>
            </div>
            <div className="scroller-div">
                <div className="destination-container">
                    <MapPin size={22} />
                    <div>{props.vacation.destination}</div>
                </div>
                <div className="destination-container">
                    <CalendarCheck size={22} />
                    <div>{calculate.formatDateRangeAndNights(props.vacation.startDate, props.vacation.endDate)}</div>
                </div>
                <div className="description-container">
                    <Info size={22} />
                    <p className="text">{props.vacation.description}</p>
                </div>
            </div>
            <div className="price-container">
                <CurrencyDollar size={22} />
                <div>{props.vacation.price}</div>
            </div>
        </div>
    );
}

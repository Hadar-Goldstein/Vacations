import { CalendarCheck, CurrencyDollar, HeartStraight, Info, MapPin, Trash, Pencil } from 'phosphor-react';
import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";
import { Tooltip } from 'react-tooltip'


type VacationCardProps = {
    vacation: VacationModel;
    likes?: number;
};

export function VacationCard(props: VacationCardProps) {

    let isAdmin;
    if (props.likes === undefined) isAdmin = true;

    return (
        <div className="Card">
            <div className="ImageContainer">
                <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>
                {props.likes !== undefined && (
                    <div className="like-badge">
                        <HeartStraight size={18} />
                        <span>Like {props.likes > 0 ? ` ${props.likes}` : ""}</span>
                    </div>

                )}
                {props.likes === undefined && (
                    <div>
                        <div className="admin-container">
                            <div className='edit'>
                                <Pencil size={18} />
                            </div>

                            <div className='delete'>
                                <Trash size={18} />
                            </div>
                        </div>
                        <Tooltip anchorSelect=".edit" place="top" content='Edit'  delayHide={1} delayShow={200} />
                        <Tooltip anchorSelect=".delete" place="top" content='Delete' delayHide={1} delayShow={200}/>
                    </div>
                )}
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

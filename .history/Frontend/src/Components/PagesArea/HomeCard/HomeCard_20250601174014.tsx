import { VacationModel } from "../../../Models/VacationModel";
import "./HomeCard.css";

type HomeCardVacation = {
    vacation: VacationModel;
    
}

export function HomeCard(props: HomeCardVacation): JSX.Element {
    return (
        <div className="HomeCard">
			<img src={props.vacation.}></img>
            <div className="VacationInfo">
                <p className="VacationDestination">{props.destination}</p>
                <p className="VacationPrice">{props.price}</p>
            </div>
        </div>
    );
}

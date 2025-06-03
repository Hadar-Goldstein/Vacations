import { VacationModel } from "../../../Models/VacationModel";
import "./HomeCard.css";

type HomeCardVacation = {
    vacation: VacationModel;
    
}

export function HomeCard(props: HomeCardVacation): JSX.Element {
    return (
        <div className="HomeCard">
			<img src={props.vacation.imageFileName}></img>
            <div className="VacationInfo">
                <p className="VacationDestination">{props.vacation.destination}</p>
                <p className="VacationPrice">{
                private _value : string;
                public get value() : string {
                    return this._value;
                }
                public set value(v : string) {
                    this._value = v;
                }
                }</p>
            </div>
        </div>
    );
}

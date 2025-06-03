import "./HomeCard.css";

type HomeCardVacation = {
    destination: string;
    price: string;
    imageFileName: string;
}

export function HomeCard(props: HomeCardVacation): JSX.Element {
    return (
        <div className="HomeCard">
			<img></img>
            <div className="VacationInfo">
                <p className="VacationDestination">{props.destination}</p>
                <p className="VacationPrice"{
                private _value : string;
                public get value() : string {
                    return this._value;
                }
                public set value(v : string) {
                    this._value = v;
                }
                }></p>
            </div>
        </div>
    );
}

import "./HomeCard.css";

type HomeCardVacation = {
    destination: string;
    price: string;
    imageFileName: string;
}

export function HomeCard(
private _value : string;
public get value() : string {
    return this._value;
}
public set value(v : string) {
    this._value = v;
}
): JSX.Element {
    return (
        <div className="HomeCard">
			<img></img>
            <div className="VacationInfo">
                <p className="VacationDestination"></p>
                <p className="VacationPrice"></p>
            </div>
        </div>
    );
}

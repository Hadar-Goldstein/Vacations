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
                <p className="VacationPrice"></p>
            </div>
        </div>
    );
}

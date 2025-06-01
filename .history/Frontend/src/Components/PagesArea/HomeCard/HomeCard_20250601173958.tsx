import "./HomeCard.css";

type HomeCardVacation = {
    _id: string;
    
}

export function HomeCard(props: HomeCardVacation): JSX.Element {
    return (
        <div className="HomeCard">
			<img src={props.imageFileName}></img>
            <div className="VacationInfo">
                <p className="VacationDestination">{props.destination}</p>
                <p className="VacationPrice">{props.price}</p>
            </div>
        </div>
    );
}

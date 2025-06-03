import "./HomeCard.css";

type HomeCardVacation = {
    destination: string;
    price: string;
    imageFileName: string;
}

export function HomeCard(props: ): JSX.Element {
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

import "./HomeCard.css";

type HomeCardVacation = {
    destination: string;
    price: string;
    imageFileName: string;
}

export function HomeCard(): JSX.Element {
    return (
        <div className="HomeCard">
			<img></img>
            <div>
                <p className="VacationDestination"></p>
                <p className="VacationPricen"></p>
            </div>
        </div>
    );
}

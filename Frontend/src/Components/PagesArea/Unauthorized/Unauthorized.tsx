import "./Unauthorized.css";
import { useNavigate } from "react-router-dom";

export function Unauthorized(): JSX.Element {

    const navigate = useNavigate();

    function startButton() {
        navigate("/login");
    }

    return (
        <div className="Unauthorized">
            <div className="container">
                <p className="unauthorized-title">O O P S . . .</p>
                <p className="unauthorized-subtitle">You're Not Logged In</p>
                <p className="unauthorized-title">Y O U R   N E X T   V A C A T I O N   I S   O N E   C L I C K   A W A Y</p>
                <button className="unauthorized-button" onClick={startButton} >T A K E   M E   I N</button>
            </div>
        </div>
    );
}

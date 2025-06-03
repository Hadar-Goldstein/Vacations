import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import background from "../../../Assets/Images/Background-Website.png"
import { dataService } from "../../../Services/DataService";
import { notify } from "../../../Utils/Notify";

export function Home() {

    const [showMain, setShowMain] = useState(false);
    const navigate = useNavigate();

    function startButton() {
        navigate("/vacations");
    }

    const [randomVacations, setRandomVacations] = useState([]);

    useEffect(()=>{
        dataService.getRandomImages()
        .then( v => setRandomVacations(v))
        .catch(err => notify.error(err));
    },[]);

    return (
        <div className="Home">
            <img src={background} className="homeImage"></img>
            <div className="test">

                <AnimatePresence mode="wait">
                    {!showMain ?
                        (<motion.div key="home"
                            initial={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.6 }}
                            className="startPage">
                            <p className="coco">W E L C O M E   T O</p>
                            <p className="catchy">The Vacation Master</p>
                            <button onClick={() => setShowMain(true)}>L E A R N   M O R E</button>
                        </motion.div>)
                        :
                        (<motion.div key="main"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="endPage">
                            <p className="endPage-coco">C H O O S E    Y O U R</p>
                            <p className="endPage-catchy">Dream Vacation</p>
                            <p className="endPage-coco2">I N   O N E   C L I C K</p>
                            <div className="CardsContainer">
                                <div className="HomeCard"><img src={randomVacations[0]}></img></div>
                                <div className="HomeCard"><img src={randomVacations[1]}></img></div>
                                <div className="HomeCard"><img src={randomVacations[2]}></img></div>
                            </div>
                            <button className="endPage-button" onClick={startButton} >G E T   S T A R T E D</button>
                        </motion.div>)}

                </AnimatePresence>
            </div>


        </div>
    );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import "./Home.css";
import { HomeCard } from "../HomeCard/HomeCard";
import { dataService } from "../../../Services/DataService";

export function Home() {

    const [showMain, setShowMain] = useState(false);
    const vacation = useSelector<AppState, VacationModel[]>(store => store.vacations);
    console.log(vacation);
    const [randomVacations, setRandomVacations] = useState([]);

    useEffect(() => {
       const data = async() => await dataService.getAllVacations();
        const randoms = [];
        for (let i = 1; i <= 3; i++) {
            const n = Math.floor(Math.random() * vacation.length - 1);
            const randomVacation = vacation[n];
            randoms.push(randomVacation);
        }
        setRandomVacations(randoms);
    }, []);

    return (
        <div className="Home">
            <AnimatePresence mode="wait">
                {!showMain ?
                    (<motion.div key="home"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.6 }}
                        className="startPage">
                        <p className="coco">W E L C O M E   T O</p>
                        <p className="catchy">The Vacation Master</p>
                        <button onClick={() => setShowMain(true)}>L E A R N   M O R E</button>
                    </motion.div>)
                    :
                    (<motion.div key="main"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="endPage">
                        {randomVacations.map(v => <HomeCard key={v._id} vacation={v}/>)}
                    </motion.div>)}

            </AnimatePresence>


        </div>
    );
}

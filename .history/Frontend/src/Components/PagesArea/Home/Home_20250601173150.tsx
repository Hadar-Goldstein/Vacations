import "./Home.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';
import { AppState, store } from "../../../Redux/Store";
import { VacationModel } from "../../../Models/VacationModel";

export function Home() {

    const [showMain, setShowMain] = useState(false);
    const vacation = useSelector<AppState, VacationModel[]>(store => store.vacations);

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
                        <p>כאן מופיע התוכן החדש של האתר</p>
                    </motion.div>)}

            </AnimatePresence>


        </div>
    );
}

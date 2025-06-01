import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./Home.css";

export function Home() {

    const [showMain, setShowMain] = useState(false);

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
                        <p className="coco">C H O O S E    Y O U R</p>
                        <p className="catchy">Dream Vacation</p>
                        <p className="catchy">In a Click</p>
                        <div className="HomeCard"></div>
                        <div className="HomeCard"></div>
                        <div className="HomeCard"></div>
                        <button onClick={() => setShowMain(true)}>G E T   S T A R T E D</button>
                    </motion.div>)}

            </AnimatePresence>


        </div>
    );
}

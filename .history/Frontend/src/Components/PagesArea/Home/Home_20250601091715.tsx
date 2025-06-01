import "./Home.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Home() {

    const [showMain, setShowMain] = useState(false);

    return (
        <div className="Home">
            <AnimatePresence mode="wait">

                {!showMain ? (<motion.div key="home"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        padding: "100px 20px",
                        textAlign: "center",
                    }}>


                    </motion.div>) : ()}

            </AnimatePresence>


        </div>
    );
}

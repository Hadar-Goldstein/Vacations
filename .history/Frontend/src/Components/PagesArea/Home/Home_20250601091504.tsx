import "./Home.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Home() {

    const [showMain, setShowMain] = useState(false);

    return (
        <div className="Home">
            <AnimatePresence mode="wai"></AnimatePresence>

            <p className="coco">W E L C O M E   T O</p>

            <p className="catchy">The Vacation Master</p>

            <button>L E A R N   M O R E</button>
        </div>
    );
}

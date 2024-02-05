"use client";
import dynamic from 'next/dynamic';
import {AnimatePresence, motion} from 'framer-motion';
import LogoGrid from "@/app/components/LogoGrid";
import {useEffect, useState} from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect";

const PhaserGame = dynamic(() => import('@/app/components/PhaserGame'), {
    ssr: false,
    // Loading the component immediately without waiting for the TypewriterEffect to finish
    loading: () => <div style={{height: '500px'}}>Loading ...</div>
});

const fadeInVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 1, ease: 'easeOut'} // Adjust for a softer transition
    },
};


const Home = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    // Additional state to control the animation
    const [animateContent, setAnimateContent] = useState("hidden");

    useEffect(() => {
        if (isTypingComplete) {
            // Trigger animations after the typewriter effect completes
            setAnimateContent("visible");
        }
    }, [isTypingComplete]);

    const onTypingComplete = () => {
        setIsTypingComplete(true);
    };

    return (
        <>
            <TypewriterEffect onComplete={onTypingComplete}/>
            {/* The main content will start its animation based on animateContent state */}
            <motion.div
                className="main-container" // Ensure this has relative positioning in CSS
                initial="hidden"
                animate={animateContent}
                variants={fadeInVariants}
                style={{position: 'relative'}} // Added inline for demonstration
            >
                {/* PhaserGame as background */}
                <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
                    <PhaserGame/>
                </div>
                {/* Other content overlays the PhaserGame */}
                <LogoGrid isTypingComplete={isTypingComplete}/>
            </motion.div>
        </>
    );
};

export default Home;

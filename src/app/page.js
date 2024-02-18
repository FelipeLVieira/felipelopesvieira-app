"use client";
import {motion} from 'framer-motion';
import LogoGrid from "@/app/components/LogoGrid/LogoGrid";
import {useEffect, useState} from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";
import {debounce} from "next/dist/server/utils";

const fadeInVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 1, ease: 'easeOut'}}
};

const Home = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    useEffect(() => {
        const handleScroll = () => {
            const yPos = -window.pageYOffset * 0.5;
            document.documentElement.style.setProperty('--parallax-y', `${yPos}px`);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isTypingComplete) {
            // Adjust content visibility based on typing completion
        }
    }, [isTypingComplete]);

    const onTypingComplete = () => setIsTypingComplete(true);

    return (
        <>
            <div className="video-container">
                <video autoPlay loop muted className="video-background">
                    <source src="/videos/pixel-lofi-city-moewalls-com.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            <TypewriterEffect onComplete={onTypingComplete}/>
            <motion.div
                className="main-container"
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                variants={fadeInVariants}
            >
                {/* PhaserGame component is displayed first, followed by LogoGrid */}
                <LogoGrid isTypingComplete={isTypingComplete}/>
            </motion.div>
        </>
    );
};

export default Home;

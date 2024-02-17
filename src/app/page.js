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

    const handleScroll = () => {
        const speed = 0.5;
        const yPos = -window.pageYOffset * speed;
        const videoBackground = document.querySelector('.parallax-background');

        if (videoBackground) {
            videoBackground.style.transform = `translateY(${yPos}px)`;
        }
    };

    const debouncedHandleScroll = debounce(handleScroll, 10);

    useEffect(() => {
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => window.removeEventListener('scroll', debouncedHandleScroll);
    }, [debouncedHandleScroll]);

    useEffect(() => {
        if (isTypingComplete) {
            // Adjust content visibility based on typing completion
        }
    }, [isTypingComplete]);

    const onTypingComplete = () => setIsTypingComplete(true);

    return (
        <>
            <div className="video-container">
                <video autoPlay loop muted playsInline className="parallax-background"
                       style={{transform: 'scale(1.5)'}}>
                    <source src="/videos/pixel-lofi-city-moewalls-com.mp4" type="video/mp4"/>
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

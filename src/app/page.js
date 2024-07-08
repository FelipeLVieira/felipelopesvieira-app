"use client";
import { motion } from 'framer-motion';
import LogoGrid from "@/app/components/LogoGrid/LogoGrid";
import {useEffect, useRef, useState} from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";
import NavBar from "@/app/components/navigation/NavBar";
import Footer from "@/app/components/Footer/Footer";

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

const Home = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const videoRef = useRef(null);

    const onTypingComplete = () => setIsTypingComplete(true);

    useEffect(() => {
        const handleVideoEnd = () => {
            setIsFadingOut(true);
            setTimeout(() => {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsFadingOut(false);
            }, 1000); // Match this duration with your CSS transition duration
        };

        const videoElement = videoRef.current;
        videoElement.addEventListener('ended', handleVideoEnd);

        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    return (
        <>
            <div className="video-container">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`video-background ${isFadingOut ? 'fade-out' : ''}`}
                >
                    <source src="/videos/pixel-lofi-city-moewalls-com.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            <NavBar/>

            <TypewriterEffect onComplete={onTypingComplete}/>
            <motion.div
                className="main-container"
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                variants={fadeInVariants}
            >
                <LogoGrid isTypingComplete={isTypingComplete}/>
            </motion.div>

            <Footer/>
        </>
    );
};

export default Home;

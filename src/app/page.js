"use client";
import { motion } from 'framer-motion';
import LogoGrid from "@/app/components/LogoGrid/LogoGrid";
import { useState } from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";
import NavBar from "@/app/components/navigation/NavBar";
import Footer from "@/app/components/Footer/Footer";

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

const Home = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const onTypingComplete = () => setIsTypingComplete(true);

    return (
        <>
            <div className="video-container">
                <video autoPlay loop muted playsInline className="video-background">
                    <source src="/videos/pixel-lofi-city-moewalls-com.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <NavBar />

            <TypewriterEffect onComplete={onTypingComplete} />
            <motion.div
                className="main-container"
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                variants={fadeInVariants}
            >
                <LogoGrid isTypingComplete={isTypingComplete} />
            </motion.div>

            <Footer />
        </>
    );
};

export default Home;

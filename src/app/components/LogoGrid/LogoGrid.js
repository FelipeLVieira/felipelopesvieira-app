"use client";
import {motion, useAnimation} from 'framer-motion';
import ncllogo from '@/app/assets/LogoGrid/ncl-cruise.png';
import axielllogo from '@/app/assets/LogoGrid/axiell_group_logo.png';
import ibmlogo from '@/app/assets/LogoGrid/ibm-logo.png';
import healthgradeslogo from '@/app/assets/LogoGrid/healthgrades-logo.png';
import articlelogo from '@/app/assets/LogoGrid/article-logo.png';
import b2wlogo from '@/app/assets/LogoGrid/b2w-logo.png';
import Image from "next/image";
import styles from "@/app/styles/LogoGrid.css";
import {useEffect, useState} from "react";

const logos = [
    {id: 1, src: axielllogo, alt: 'Axiell'},
    {id: 2, src: ncllogo, alt: 'Norwegian Cruise Line'},
    {id: 3, src: ibmlogo, alt: 'IBM'},
    {id: 4, src: healthgradeslogo, alt: 'Healthgrades'},
    {id: 5, src: articlelogo, alt: 'Article'},
    {id: 6, src: b2wlogo, alt: 'B2W Software'},
];

const logoAnimation = {
    initial: {scale: 0.8, opacity: 0},
    animate: {scale: 1, opacity: 1},
    hover: {scale: 1.1, opacity: 1},
};

const titleAnimation = {
    animate: {y: [0, -10, 0], transition: {duration: 2.5, ease: "easeInOut", repeat: Infinity}},
};

const titleBackgroundAnimation = {
    animate: {backgroundColor: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"],
        transition: {duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror"}},
};

const LogoGrid = ({isTypingComplete}) => {
    const [logoVariant, setLogoVariant] = useState('initial');

    useEffect(() => {
        if (isTypingComplete) {
            setLogoVariant('animate');
        }
    }, [isTypingComplete]);

    return (
        <div className="logo-grid-section">
            <motion.div
                className="title-background"
                initial="initial"
                animate="animate"
                variants={titleBackgroundAnimation}
            />
            <motion.h2 variants={titleAnimation} animate="animate">
                <div className="section-title">
                    Companies I&apos;ve worked with
                </div>
            </motion.h2>
            <div className="logo-grid">
                {logos.map(logo => (
                    <motion.div
                        key={logo.id}
                        whileHover={{scale: 1.1, opacity: 1}} // Direct inline variant for debugging
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}} // Inline styles for direct testing
                        className="logo-item"
                    >
                        <Image src={logo.src} alt={logo.alt} priority={true} width={120} height={120}/>
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default LogoGrid;
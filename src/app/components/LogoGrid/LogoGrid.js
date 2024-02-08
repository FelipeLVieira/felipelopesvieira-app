"use client";
import {motion, useScroll, useTransform} from 'framer-motion';
import ncllogo from '@/app/assets/LogoGrid/ncl-cruise.png';
import axielllogo from '@/app/assets/LogoGrid/axiell_group_logo.png';
import ibmlogo from '@/app/assets/LogoGrid/ibm-logo.png';
import healthgradeslogo from '@/app/assets/LogoGrid/healthgrades-logo.png';
import articlelogo from '@/app/assets/LogoGrid/article-logo.png';
import b2wlogo from '@/app/assets/LogoGrid/b2w-logo.png';
import aguasdobrasillogo from '@/app/assets/LogoGrid/aguasdobrasil-logo.png';
import Image from "next/legacy/image";
import styles from "@/app/styles/LogoGrid.css";
import {useEffect, useState} from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";

const logos = [
    {id: 1, src: axielllogo, alt: 'Axiell'},
    {id: 2, src: ncllogo, alt: 'Norwegian Cruise Line'},
    {id: 3, src: ibmlogo, alt: 'IBM'},
    {id: 4, src: healthgradeslogo, alt: 'Healthgrades'},
    {id: 5, src: articlelogo, alt: 'Article'},
    {id: 6, src: b2wlogo, alt: 'B2W Software'},
    {id: 7, src: aguasdobrasillogo, alt: 'Águas do Brasil'},
];


const titleAnimation = {
    animate: {y: [0, -10, 0], transition: {duration: 2.5, ease: "easeInOut", repeat: Infinity}},
};


const LogoGrid = ({isTypingComplete}) => {

    useEffect(() => {
        if (isTypingComplete) {
            // Adjust content visibility based on typing completion
        }
    }, [isTypingComplete]);

    return (
        <>
            <div className="logo-grid-section">
                <motion.h2 variants={titleAnimation} animate={isTypingComplete ? "animate" : "hidden"}>
                    <div className="section-title">
                        Companies I&apos;ve worked with
                    </div>
                </motion.h2>
                <div className="logo-grid">
                    {logos.map(logo => (
                        <motion.div
                            className="logo-item"
                            key={logo.id}
                            whileHover={{scale: 1.5, opacity: 1}} // Keeps the hover effect
                            initial={{scale: 0}}
                            animate={isTypingComplete ? {rotate: 360, scale: 1} : "hidden"}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <Image src={logo.src} alt={logo.alt} priority={true} width={120} height={120}/>
                        </motion.div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default LogoGrid;
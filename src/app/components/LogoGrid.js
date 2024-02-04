"use client";
import {motion} from 'framer-motion';
import ncllogo from '@/app/assets/LogoGrid/ncl-cruise.png';
import axielllogo from '@/app/assets/LogoGrid/axiell_group_logo.png';
import ibmlogo from '@/app/assets/LogoGrid/ibm-logo.png';
import healthgradeslogo from '@/app/assets/LogoGrid/healthgrades-logo.png';
import articlelogo from '@/app/assets/LogoGrid/article-logo.png';
import b2wlogo from '@/app/assets/LogoGrid/b2w-logo.png';
import Image from "next/image";
import styles from "@/app/styles/LogoGrid.css";

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
    transition: {
        duration: 0.5,
    },
};

const LogoGrid = () => {
    return (
        <div className="logo-grid">
            {logos.map(logo => (
                <motion.div
                    key={logo.id}
                    whileHover="hover"
                    variants={logoAnimation}
                    className="logo-item"
                >
                    <Image src={logo.src} alt={logo.alt} priority={true} width={120} height={120}/>
                </motion.div>
            ))}
        </div>
    );
};

export default LogoGrid;

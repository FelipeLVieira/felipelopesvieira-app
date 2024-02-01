"use client";
import {motion} from 'framer-motion';
import ncllogo from '@/app/assets/ncl-cruise.png';
import axielllogo from '@/app/assets/axiell_group_logo.jpg';
import ibmlogo from '@/app/assets/ibm-logo.png';
import Image from "next/image";
import styles from "@/app/styles/LogoGrid.css";

const logos = [
    {id: 1, src: axielllogo, alt: 'Axiell'},
    {id: 2, src: ncllogo, alt: 'Norwegian Cruise Line'},
    {id: 3, src: ibmlogo, alt: 'IBM'},
    // Add more logos here
];

const logoAnimation = {
    initial: {scale: 0.8, opacity: 0},
    animate: {scale: 1, opacity: 1},
    hover: {scale: 1.1, opacity: 1},
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

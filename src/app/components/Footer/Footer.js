"use client";
import {motion} from 'framer-motion';
import Image from "next/image";
import styles from "@/app/styles/Footer.css"; // Ensure the path matches your file structure

export default function Footer() {
    const containerVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.1, delayChildren: 0.2}},
    };

    return (
        <motion.footer
            className={`footer ${styles.footer}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={`footer-content ${styles.footerContent}`}>
                <p className={`footer-text ${styles.footerText}`}>&copy; {new Date().getFullYear()} felipelopesvieira.com.
                    All rights reserved.</p>
                <p className={`footer-text ${styles.footerText}`}>Made with Next.JS, Vercel, Tailwind, Phaser, and
                    Framer Motion</p>
                <div className={`footer-icons ${styles.footerIcons}`}>
                    {/* Include your icons here, wrapped with the Image component */}
                </div>
            </div>
        </motion.footer>
    );
}

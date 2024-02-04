"use client";
import dynamic from 'next/dynamic';
import {motion} from 'framer-motion';
import LogoGrid from "@/app/components/LogoGrid";

const PhaserGame = dynamic(() => import('@/app/components/PhaserGame'), {
    ssr: false,
});

const fadeInVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 1, ease: "easeOut"} // Adjust for a softer transition
    },
};

const Home = () => {
    return (
        <div className="main-container">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <PhaserGame width={1000} height={500}/>
            </motion.div>
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{duration: 0.8, delay: 0.4}}
            >
                Companies I've worked with
            </motion.h1>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{duration: 0.8, delay: 0.6}}
            >
                <LogoGrid/>
            </motion.div>
        </div>
    );
};

export default Home;

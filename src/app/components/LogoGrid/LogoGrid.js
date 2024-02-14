"use client";
import {AnimatePresence, motion} from 'framer-motion';
import ncllogo from '@/app/assets/LogoGrid/ncl-cruise.png';
import axielllogo from '@/app/assets/LogoGrid/axiell_group_logo.png';
import ibmlogo from '@/app/assets/LogoGrid/ibm-logo.png';
import healthgradeslogo from '@/app/assets/LogoGrid/healthgrades-logo.png';
import articlelogo from '@/app/assets/LogoGrid/article-logo.png';
import b2wlogo from '@/app/assets/LogoGrid/b2w-logo.png';
import aguasdobrasillogo from '@/app/assets/LogoGrid/aguasdobrasil-logo.png';
import Image from "next/legacy/image";
import styles from "@/app/styles/LogoGrid.css";
import {useState} from "react";

const logos = [
    {
        id: 1, src: axielllogo, alt: 'Axiell', description: <div>
            <strong>Consultant at Axiell (Remote), 2021 - Present</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Instrumental in the e-commerce platform overhaul for Oceania Cruises, enhancing user experience and sales
            process efficiency.<br/>
            • Employed a suite of modern development tools and languages (Vue.js, Angular, C#, Scala) in conjunction
            with SQL and NoSQL databases.<br/>
            • Achieved significant user experience improvements, streamlining the online shopping system for enhanced
            customer satisfaction.<br/>
            <br/>
        </div>
    },
    {
        id: 2, src: ncllogo, alt: 'NCL', description: <div>
            <strong>Consultant at Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Played a key role in modernizing the Oceania Cruises e-commerce website. Focused on enhancing user
            experience and performance by revamping the sales platform.<br/>
            • Utilized a range of modern development tools and languages including Vue.js, Angular, C#, and Scala,
            alongside both SQL and NoSQL databases.<br/>
            • Significantly improved the speed and usability of the online selling system, resulting in a more efficient
            and customer-friendly shopping experience.<br/>
            <br/>
        </div>
    },
    {
        id: 3, src: ibmlogo, alt: 'IBM', description: <div>
            <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Enhanced the customer engagement experience by refining the Guided Selling Tool for Sprint stores,
            contributing to an uptick in sales.<br/>
            • Integral to the Sprint and T-Mobile merger, unifying backend systems and revamping UI/UX for a cohesive
            post-merger consumer interface.<br/>
            • Honed expertise in full-stack development, contributing to both user-facing features and backend
            functionalities.<br/>
            <br/>
        </div>
    },
    {
        id: 4, src: healthgradeslogo, alt: 'Healthgrades', description: <div><strong>Independent Contractor at
            Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
            Software Engineer<br/><br/>
            • Pioneered the integration of Salesforce within the patient-doctor engagement process, optimizing
            interaction flows.<br/>
            • Leveraged AWS services and Jenkins to fortify system efficiency and reliability, delivering a seamless
            operational experience.<br/>
            • Simplified patient access to healthcare providers, contributing to a user-centric healthcare
            platform.<br/>
            <br/></div>
    },
    {
        id: 5, src: articlelogo, alt: 'Article', description: <div>
            <strong>Independent Contractor at Article (Remote), 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Co-engineered a suite of new software tools, augmenting Article&apos;s e-commerce platform&apos;s
            functionality and
            operational efficiency, leveraging Vue.js, Node.js, Java, Spring Boot, Kafka, and Postgres, with a robust
            DevOps pipeline using Docker and AWS.<br/>
            • Key contributor to the financial information system overhaul, enhancing process accuracy and efficiency,
            thus fortifying the financial backbone of the e-commerce operations.<br/>
            • Drove improvements in customer experience by developing robust backend systems, ensuring a seamless and
            reliable furniture purchasing journey.<br/>
            <br/>
        </div>
    },
    {
        id: 6,
        src: b2wlogo,
        alt: 'B2W Software',
        description: <div>
            <strong>B2W, 2018 - 2019</strong><br/><br/>
            Software Engineer<br/><br/>
            • Spearheaded the development of versatile e-commerce systems, catering to diverse consumer bases and
            business divisions, enriching the online shopping experience.<br/>
            • Pioneered internal tool development to streamline operations across departments, showcasing a proactive
            and collaborative work ethic.<br/>
            • Managed a complex array of Java, Groovy, Python, and Node.js microservices, ensuring smooth transitions
            and operations across the company’s e-commerce platforms.<br/>
            <br/>
        </div>
    },
    {
        id: 7,
        src: aguasdobrasillogo,
        alt: 'Águas do Brasil',
        description: <div>
            <strong>Águas do Brasil Group, 2017</strong><br/><br/>
            Software Developer<br/><br/>
            • Led the development of the core CRM system utilizing C#, ASP.NET, and front-end technologies, crucial for
            managing billing operations across multiple Brazilian states.<br/>
            • Consistently enhanced system functionalities with new features, balancing business objectives with
            customer satisfaction.<br/>
            <br/>
        </div>
    },
];


const LogoGrid = ({isTypingComplete}) => {
    const [expandedLogos, setExpandedLogos] = useState({});

    const toggleLogo = (id) => {
        setExpandedLogos(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const titleAnimation = {
        animate: {y: [0, -10, 0], transition: {duration: 2.5, ease: "easeInOut", repeat: Infinity}},
    };

    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        initial: {opacity: 0, height: 0},
        animate: {opacity: 1, height: "auto", transition: {duration: 0.5}},
        hidden: {y: 20, opacity: 0},
        show: {y: 0, opacity: 1},
    };

    const detailAnimate = {
        initial: {opacity: 0, height: 0},
        animate: {opacity: 1, height: "auto", transition: {duration: 0.5}},
        exit: {opacity: 0, height: 0, transition: {duration: 0.5}},
    };

    return (
        <AnimatePresence>
            <div className="logo-grid-section">
                <motion.h2 variants={titleAnimation} animate={isTypingComplete ? "animate" : "hidden"}
                           className="section-title">
                    Companies I&apos;ve worked with
                </motion.h2>
                <motion.div className="logo-grid" variants={container} initial="hidden" animate="show">
                    {logos.map(logo => (
                        <motion.div
                            key={logo.id}
                            variants={item}
                            className="logo-item"
                            onClick={() => toggleLogo(logo.id)}
                            layout
                        >
                            <motion.div className="logo-section" layout>
                                <Image src={logo.src} alt={logo.alt} width={120} height={120} priority="true"/>
                            </motion.div>
                            {expandedLogos[logo.id] && (
                                <AnimatePresence>
                                    <motion.div {...detailAnimate} className="detail-section">
                                        <p>{logo.description}</p>
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevents the logo click event
                                                toggleLogo(logo.id);
                                            }}
                                        >
                                            Close
                                        </motion.button>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LogoGrid;
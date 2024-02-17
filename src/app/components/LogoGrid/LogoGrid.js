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
        id: 1,
        src: axielllogo,
        alt: 'Axiell',
        description: <div>
            <strong>Consultant at Axiell (Remote), 2021 - Present</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Spearheaded the implementation and customization of Axiell’s Vital Records Management System, focusing on a Javascript frontend, C# backend, and integration with SQL Server and Oracle databases.<br/>
            • Pioneered the system&apos;s first international deployment in Canada, managing geographic and data management adaptations, including enhanced granularity for death records and new statistical analysis features.<br/>
            • Contributed to Azure pipeline development and CI/CD configurations, optimizing deployment and update processes.<br/><br/>
        </div>
    },
    {
        id: 2,
        src: ncllogo,
        alt: 'NCL',
        description: <div>
            <strong>Consultant at Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Key contributor in modernizing the Oceania Cruises e-commerce website, focusing on user experience and performance enhancements.<br/>
            • Utilized modern development tools and languages (Vue.js, Angular, C#, Scala) alongside SQL and NoSQL databases to revamp the sales platform.<br/>
            • Achieved significant improvements in online system speed and usability, enhancing the customer shopping experience.<br/><br/>
        </div>
    },
    {
        id: 3,
        src: ibmlogo,
        alt: 'IBM',
        description: <div>
            <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Enhanced customer engagement by refining the Guided Selling Tool for Sprint stores, contributing to sales increases.<br/>
            • Played an integral role in the Sprint and T-Mobile merger, focusing on backend system unification and UI/UX revamp.<br/>
            • Demonstrated full-stack development expertise, contributing to both user interface and backend functionalities.<br/><br/>
        </div>
    },
    {
        id: 4,
        src: healthgradeslogo,
        alt: 'Healthgrades',
        description: <div>
            <strong>Independent Contractor at Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
            Software Engineer<br/><br/>
            • Led Salesforce integration within the patient-doctor engagement process, optimizing interactions.<br/>
            • Employed AWS services and Jenkins to enhance system efficiency and reliability.<br/>
            • Improved patient access to healthcare providers, contributing to a more user-centric platform.<br/><br/>
        </div>
    },
    {
        id: 5,
        src: articlelogo,
        alt: 'Article',
        description: <div>
            <strong>Independent Contractor at Article (Remote), 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Co-developed new software tools to enhance the e-commerce platform&apos;s functionality and efficiency using Vue.js, Node.js, Java, Spring Boot, Kafka, and Postgres.<br/>
            • Contributed to the financial information system overhaul, improving accuracy and efficiency.<br/>
            • Developed robust backend systems, enhancing the customer furniture purchasing experience.<br/><br/>
        </div>
    },
    {
        id: 6,
        src: b2wlogo,
        alt: 'B2W Software',
        description: <div>
            <strong>B2W, 2018 - 2019</strong><br/><br/>
            Software Engineer<br/><br/>
            • Led the development of diverse e-commerce systems, improving the online shopping experience.<br/>
            • Initiated internal tool development to streamline operations, fostering a collaborative work environment.<br/>
            • Managed a suite of Java, Groovy, Python, and Node.js microservices, ensuring efficient operations.<br/><br/>
        </div>
    },
    {
        id: 7,
        src: aguasdobrasillogo,
        alt: 'Águas do Brasil',
        description: <div>
            <strong>Águas do Brasil Group, 2017</strong><br/><br/>
            Software Developer<br/><br/>
            • Led the CRM system development using C#, ASP.NET, and front-end technologies, essential for billing operations.<br/>
            • Regularly enhanced system features to balance business needs with customer satisfaction.<br/><br/>
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
                                        {/* Use a div or fragment instead of p */}
                                        <>{logo.description}</>
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
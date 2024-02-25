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
import {useState} from "react";
import '@/app/styles/LogoGrid.css';

const logos = [
    {
        id: 1,
        src: axielllogo,
        alt: 'Axiell',
        description: <div>
            <strong>Consultant at Axiell (Remote), 2021 - Present</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Orchestrated the customization and enhancement of Axiell&apos;s Vital Records Management System, focusing on
            JavaScript for frontend development and C# for backend services, alongside database integrations with SQL Server and Oracle.<br/>
            • Initiated the system&apos;s international adaptation for the Canadian market, focusing on data management
            enhancements and statistical analysis features for death records.<br/>
            • Advanced the CI/CD pipeline development using Azure, optimizing software deployment processes.<br/><br/>
        </div>
    },
    {
        id: 2,
        src: ncllogo,
        alt: 'NCL',
        description: <div>
            <strong>Consultant at Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Central to the Oceania Cruises e-commerce platform&apos;s modernization, enhancing user experience and
            system performance.<br/>
            • Employed a tech stack including Vue.js, Angular, C#, and Scala for database enhancements with both SQL and NoSQL technologies.<br/>
            • Realized significant improvements in system usability and speed, elevating the customer&apos;s online engagement.<br/><br/>
        </div>
    },
    {
        id: 3,
        src: ibmlogo,
        alt: 'IBM',
        description: <div>
            <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Contributed to customer engagement improvements through the Guided Selling Tool for Sprint stores, aiding in sales growth.<br/>
            • Supported the Sprint and T-Mobile merger by integrating backend systems and enhancing UI/UX for a seamless customer experience.<br/>
            • Showcased full-stack development proficiency, enhancing both user interface and backend system functionalities.<br/><br/>
        </div>
    },
    {
        id: 4,
        src: healthgradeslogo,
        alt: 'Healthgrades',
        description: <div>
            <strong>Independent Contractor at Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
            Software Engineer<br/><br/>
            • Facilitated Salesforce integration to streamline the patient-doctor interaction, optimizing platform engagement.<br/>
            • Implemented AWS services for system reliability and efficiency, leveraging Jenkins for continuous integration.<br/>
            • Enhanced accessibility for patients to connect with healthcare providers, enriching the platform&apos;s user experience.<br/><br/>
        </div>
    },
    {
        id: 5,
        src: articlelogo,
        alt: 'Article',
        description: <div>
            <strong>Independent Contractor at Article (Remote), 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Co-engineered enhancements to the e-commerce platform&apos;s efficiency and functionality using Vue.js, Node.js, Java, Spring Boot, Kafka, and Postgres.<br/>
            • Participated in the financial information system&apos;s revamp for improved operational accuracy and efficiency.<br/>
            • Developed advanced backend systems for an improved furniture purchasing process, directly impacting customer satisfaction.<br/><br/>
        </div>
    },
    {
        id: 6,
        src: b2wlogo,
        alt: 'B2W Software',
        description: <div>
            <strong>B2W, 2018 - 2019</strong><br/><br/>
            Software Engineer<br/><br/>
            • Contributed to the development of innovative e-commerce solutions, enhancing user experience across online shopping platforms.<br/>
            • Initiated the creation of internal tools to streamline operational efficiency, promoting a culture of continuous improvement.<br/>
            • Oversaw a portfolio of microservices using Java, Groovy, Python, and Node.js, ensuring high operational performance.<br/><br/>
        </div>
    },
    {
        id: 7,
        src: aguasdobrasillogo,
        alt: 'Águas do Brasil',
        description: <div>
            <strong>Águas do Brasil Group, 2017</strong><br/><br/>
            Software Developer<br/><br/>
            • Spearheaded the development of the CRM system with C#, ASP.NET, focusing on enhancing billing and customer management capabilities.<br/>
            • Actively engaged in system feature enhancements to meet evolving business and customer satisfaction goals.<br/><br/>
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
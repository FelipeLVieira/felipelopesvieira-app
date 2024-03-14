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
            • Enhanced and customized Axiell&apos;s Vital Records Management System, focusing on front-end development (JavaScript, TypeScript) and back-end optimization (C#)<br/>
            • Developed sophisticated database integration solutions for SQL Server and Oracle<br/>
            • Facilitated development and deployment via Azure Pipelines and Jenkins, enhancing CI/CD framework<br/>
            • Spearheaded the system&apos;s first international adaptation for Canada, optimizing it for vital records management<br/><br/>
        </div>
    },
    {
        id: 2,
        src: ncllogo,
        alt: 'NCL',
        description: <div>
            <strong>Consultant at Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            • Contributed to the revitalization of the Oceania Cruises e-commerce platform (Vue.js, Angular, C#, Scala)<br/>
            • Utilized diverse tech stack for database management across SQL and NoSQL databases<br/>
            • Enhanced system responsiveness and user satisfaction<br/><br/>
        </div>
    },
    {
        id: 3,
        src: healthgradeslogo,
        alt: 'Healthgrades',
        description: <div>
            <strong>Independent Contractor at Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
            Software Engineer<br/><br/>
            • Collaborated on integrating Salesforce to streamline patient-doctor interaction process<br/>
            • Leveraged AWS to boost system performance and reliability<br/>
            • Improved accessibility to healthcare providers, enhancing the platform&apos;s user-centric approach<br/>
            • Took ownership of critical system components, driving implementation of new features and optimizations<br/><br/>
        </div>
    },
    {
        id: 4,
        src: articlelogo,
        alt: 'Article',
        description: <div>
            <strong>Independent Contractor at Article (Remote), 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Co-developed innovative software tools to boost e-commerce platform efficiency (Vue.js, Node.js, Java, Spring Boot, Kafka, PostgreSQL)<br/>
            • Instrumental in revamping financial information system, enhancing accuracy and operational efficiency<br/>
            • Mentored team members in Agile methodologies and best practices for e-commerce development<br/><br/>
        </div>
    },
    {
        id: 5,
        src: ibmlogo,
        alt: 'IBM',
        description: <div>
            <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            • Refined Guided Selling Tool for Sprint stores, contributing to enhanced customer engagement<br/>
            • Supported Sprint and T-Mobile merger by integrating backend systems and redesigning UI/UX<br/>
            • Focused on full-stack development, from user interface features to backend functionalities<br/><br/>
        </div>
    },
    {
        id: 6,
        src: b2wlogo,
        alt: 'B2W Software',
        description: <div>
            <strong>B2W, 2018 - 2019</strong><br/><br/>
            Software Engineer<br/><br/>
            • Engineered dynamic e-commerce solutions, enriching online shopping experience and boosting user satisfaction<br/>
            • Developed internal tools to optimize operations<br/>
            • Managed complex microservices architecture (Java, Groovy, Python, Node.js)<br/>
            • Mentored junior developers in microservices architecture and best practices<br/><br/>
        </div>
    },
    {
        id: 7,
        src: aguasdobrasillogo,
        alt: 'Águas do Brasil',
        description: <div>
            <strong>Águas do Brasil Group, 2017</strong><br/><br/>
            Software Developer<br/><br/>
            • Developed foundational CRM system (C#, ASP.NET), enhancing billing and customer management processes<br/>
            • Introduced new system features, aligning business goals with customer needs<br/>
            • Collaborated with cross-functional teams to gather requirements and ensure timely delivery of high-quality solutions<br/><br/>
        </div>
    },
];

const LogoGrid = ({ isTypingComplete }) => {
    const [expandedLogos, setExpandedLogos] = useState({});

    const toggleLogo = (id) => {
        setExpandedLogos(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const titleAnimation = {
        animate: { y: [0, -10, 0], transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity } },
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    const detailAnimate = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.5 } },
    };

    const logoHoverVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1, transition: { duration: 0.3 } },
        tap: { scale: 0.9 },
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
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <motion.div className="logo-section" layout variants={logoHoverVariants}>
                                <Image src={logo.src} alt={logo.alt} width={120} height={120} priority="true" />
                            </motion.div>
                            {expandedLogos[logo.id] && (
                                <AnimatePresence>
                                    <motion.div {...detailAnimate} className="detail-section">
                                        <>{logo.description}</>
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation();
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
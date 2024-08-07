"use client";
import {motion} from 'framer-motion';
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

const LogoGrid = () => {
    const [expandedLogos, setExpandedLogos] = useState({});

    /** @type {Array<{id: number, src: string, alt: string, description: JSX.Element}>} */
    const logos = [
        {
            id: 1,
            src: axielllogo,
            alt: 'Axiell',
            description: <div>
                <strong>Axiell (Remote), 2021 - Present</strong><br/><br/>
                Senior Software Engineer<br/><br/>
                • Spearheaded the modernization of Axiell&apos;s Vital Records Management System, leveraging expertise
                in microservices architecture, domain-driven design, and event-driven systems<br/>
                • Implemented advanced caching mechanisms (Redis, Memcached) and optimized database queries (SQL Server,
                Oracle) to enhance system performance and scalability<br/>
                • Established CI/CD best practices using Azure DevOps, Jenkins, and Terraform, enabling faster, more
                reliable deployments<br/>
                • Led the internationalization effort, adapting the system for the Canadian market and ensuring
                compliance with local regulations and standards<br/><br/>
            </div>
        },
        {
            id: 2,
            src: ncllogo,
            alt: 'NCL',
            description: <div>
                <strong>Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
                Senior Software Engineer<br/><br/>
                • Architected and developed key components of the Oceania Cruises e-commerce platform using a modern
                tech stack (Vue.js, Angular, C#, Scala)<br/>
                • Designed and implemented a multi-tenancy architecture to support multiple brands and countries<br/>
                • Collaborated with UX/UI designers to create responsive, mobile-first interfaces that improved user
                engagement and conversion rates<br/>
                • Conducted code reviews, provided technical guidance, and mentored junior developers to maintain high
                code quality and adherence to best practices<br/><br/>
            </div>
        },
        {
            id: 3,
            src: healthgradeslogo,
            alt: 'Healthgrades',
            description: <div>
                <strong>Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
                Senior Software Engineer<br/><br/>
                • Assisted the integration of Salesforce with the existing platform, utilizing Salesforce APIs and
                custom middleware (Node.js, Express.js) to seamlessly exchange data<br/>
                • Implemented a microservices architecture using Docker and Kubernetes to improve scalability,
                reliability, and maintainability<br/>
                • Designed and developed a real-time notification system using WebSockets and AWS SNS/SQS to enhance
                user experience and engagement<br/>
                • Optimized application performance by implementing server-side rendering (Next.js), lazy loading, and
                code splitting techniques<br/><br/>
            </div>
        },
        {
            id: 4,
            src: articlelogo,
            alt: 'Article',
            description: <div>
                <strong>Article (Remote), 2020</strong><br/><br/>
                Senior Software Engineer<br/><br/>
                • Designed and implemented a distributed event-driven architecture using Apache Kafka and Confluent
                Platform to process high-volume, real-time data streams<br/>
                • Developed a custom ETL pipeline using Apache Spark and Airflow to efficiently process and analyze
                large datasets<br/>
                • Implemented a feature flagging system to enable controlled rollouts and A/B testing of new
                features<br/>
                • Conducted workshops and training sessions on Agile methodologies, CI/CD best practices, and
                microservices architecture for the development team<br/><br/>
            </div>
        },
        {
            id: 5,
            src: ibmlogo,
            alt: 'IBM',
            description: <div>
                <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
                Senior Software Engineer<br/><br/>
                • Contributed for the development of the Guided Selling Tool using React, Redux, and Node.js,
                collaborating closely with product managers and UX designers to deliver an intuitive, data-driven user
                experience<br/>
                • Designed and implemented a unified API gateway using GraphQL to facilitate the integration of backend
                systems during the Sprint and T-Mobile merger<br/>
                • Implemented a robust error tracking and monitoring system to proactively identify and resolve
                production issues<br/>
                • Mentored junior developers and conducted code reviews to ensure adherence to coding standards, design
                patterns, and best practices<br/><br/>
            </div>
        },
        {
            id: 6,
            src: b2wlogo,
            alt: 'B2W Software',
            description: <div>
                <strong>B2W, 2018 - 2019</strong><br/><br/>
                Software Engineer<br/><br/>
                • Developed and maintained a high-performance e-commerce platform using Java, Spring Boot, and
                ReactJS<br/>
                • Implemented a distributed caching layer using Redis to improve application responsiveness and reduce
                database load<br/>
                • Contributed to the adoption of a continuous deployment pipeline using Jenkins, Ansible, and
                Kubernetes, significantly reducing time-to-market for new features<br/><br/>
            </div>
        },
        {
            id: 7,
            src: aguasdobrasillogo,
            alt: 'Águas do Brasil',
            description: <div>
                <strong>Águas do Brasil Group, 2017</strong><br/><br/>
                Software Engineer<br/><br/>
                • Developed a CRM system using JavaScript, C#, ASP.NET, and SQL Server, streamlining billing and
                customer management processes<br/>
                • Implemented a role-based access control system to ensure data security and privacy<br/>
                • Designed and developed RESTful APIs using ASP.NET Web API to enable integration with third-party
                systems<br/>
                • Collaborated with cross-functional teams using Agile methodologies (Scrum, Kanban) to gather
                requirements and deliver high-quality solutions<br/><br/>
            </div>
        }
    ];

    const toggleLogo = (id) => {
        setExpandedLogos(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: {opacity: 0, y: 20},
        show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeInOut"}},
    };

    return (
        <div className="logo-grid-section">
            <motion.div className="logo-grid" variants={container} initial="hidden" animate="show">
                {logos.map(logo => (
                    <motion.div
                        key={logo.id}
                        variants={item}
                        className="logo-item"
                        data-id={logo.id}
                        onClick={() => toggleLogo(logo.id)}
                    >
                        <motion.div className="logo-section">
                            <Image src={logo.src} alt={logo.alt} width={120} height={120} priority={true}/>
                        </motion.div>
                        <div className={`detail-section ${expandedLogos[logo.id] ? 'expanded' : ''}`}>
                            {logo.description}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLogo(logo.id);
                                }}
                            >
                                Close
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogoGrid;

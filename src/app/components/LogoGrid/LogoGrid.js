"use client";
import { AnimatePresence, motion } from 'framer-motion';
import ncllogo from '@/app/assets/LogoGrid/ncl-cruise.png';
import axielllogo from '@/app/assets/LogoGrid/axiell_group_logo.png';
import ibmlogo from '@/app/assets/LogoGrid/ibm-logo.png';
import healthgradeslogo from '@/app/assets/LogoGrid/healthgrades-logo.png';
import articlelogo from '@/app/assets/LogoGrid/article-logo.png';
import b2wlogo from '@/app/assets/LogoGrid/b2w-logo.png';
import aguasdobrasillogo from '@/app/assets/LogoGrid/aguasdobrasil-logo.png';
import Image from "next/legacy/image";
import { useState } from "react";
import '@/app/styles/LogoGrid.css';

const logos = [
    {
        id: 1,
        src: axielllogo,
        alt: 'Axiell',
        description: <div>
            <strong>Consultant at Axiell (Remote), 2021 - Present</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            ▪ Spearheaded the modernization of Axiell&apos;s Vital Records Management System, leveraging expertise in microservices architecture, domain-driven design, and event-driven systems (Kafka, RabbitMQ)<br/>
            ▪ Implemented advanced caching mechanisms (Redis, Memcached) and optimized database queries (SQL Server, Oracle) to enhance system performance and scalability<br/>
            ▪ Established CI/CD best practices using Azure DevOps, Jenkins, and Terraform, enabling faster, more reliable deployments<br/>
            ▪ Led the internationalization effort, adapting the system for the Canadian market and ensuring compliance with local regulations and standards<br/><br/>
        </div>
    },
    {
        id: 2,
        src: ncllogo,
        alt: 'NCL',
        description: <div>
            <strong>Consultant at Norwegian Cruise Lines (Remote), 2023</strong><br/><br/>
            Software Engineer Contractor<br/><br/>
            ▪ Architected and developed key components of the Oceania Cruises e-commerce platform using a modern tech stack (Vue.js, Angular, C#, Scala, GraphQL)<br/>
            ▪ Designed and implemented a multi-tenancy architecture to support multiple brands and regions, utilizing AWS services such as ECS, Lambda, and DynamoDB<br/>
            ▪ Collaborated with UX/UI designers to create responsive, mobile-first interfaces that improved user engagement and conversion rates<br/>
            ▪ Conducted code reviews, provided technical guidance, and mentored junior developers to maintain high code quality and adherence to best practices<br/><br/>
        </div>
    },
    {
        id: 3,
        src: healthgradeslogo,
        alt: 'Healthgrades',
        description: <div>
            <strong>Independent Contractor at Healthgrades (Remote), 2020 - 2021</strong><br/><br/>
            Software Engineer<br/><br/>
            ▪ Led the integration of Salesforce with the existing platform, utilizing Salesforce APIs and custom middleware (Node.js, Express.js) to seamlessly exchange data<br/>
            ▪ Implemented a microservices architecture using Docker and Kubernetes to improve scalability, reliability, and maintainability<br/>
            ▪ Designed and developed a real-time notification system using WebSockets and AWS SNS/SQS to enhance user experience and engagement<br/>
            ▪ Optimized application performance by implementing server-side rendering (Next.js), lazy loading, and code splitting techniques<br/><br/>
        </div>
    },
    {
        id: 4,
        src: articlelogo,
        alt: 'Article',
        description: <div>
            <strong>Independent Contractor at Article (Remote), 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            ▪ Designed and implemented a distributed event-driven architecture using Apache Kafka and Confluent Platform to process high-volume, real-time data streams<br/>
            ▪ Developed a custom ETL pipeline using Apache Spark and Airflow to efficiently process and analyze large datasets<br/>
            ▪ Implemented a feature flagging system using LaunchDarkly to enable controlled rollouts and A/B testing of new features<br/>
            ▪ Conducted workshops and training sessions on Agile methodologies, CI/CD best practices, and microservices architecture for the development team<br/><br/>
        </div>
    },
    {
        id: 5,
        src: ibmlogo,
        alt: 'IBM',
        description: <div>
            <strong>IBM (Remote), 2019 - 2020</strong><br/><br/>
            Software Engineer<br/><br/>
            ▪ Led the development of the Guided Selling Tool using React, Redux, and Node.js, collaborating closely with product managers and UX designers to deliver an intuitive, data-driven user experience<br/>
            ▪ Designed and implemented a unified API gateway using Kong and GraphQL to facilitate the integration of backend systems during the Sprint and T-Mobile merger<br/>
            ▪ Implemented a robust error tracking and monitoring system using Sentry and Grafana to proactively identify and resolve production issues<br/>
            ▪ Mentored junior developers and conducted code reviews to ensure adherence to coding standards, design patterns, and best practices<br/><br/>
        </div>
    },
    {
        id: 6,
        src: b2wlogo,
        alt: 'B2W Software',
        description: <div>
            <strong>B2W, 2018 - 2019</strong><br/><br/>
            Software Engineer<br/><br/>
            ▪ Developed and maintained a high-performance e-commerce platform using Java, Spring Boot, and ReactJS<br/>
            ▪ Implemented a distributed caching layer using Redis to improve application responsiveness and reduce database load<br/>
            ▪ Designed and developed a recommendation engine using collaborative filtering and machine learning techniques (Python, scikit-learn) to personalize user experience<br/>
            ▪ Contributed to the adoption of a continuous deployment pipeline using Jenkins, Ansible, and Kubernetes, significantly reducing time-to-market for new features<br/><br/>
        </div>
    },
    {
        id: 7,
        src: aguasdobrasillogo,
        alt: 'Águas do Brasil',
        description: <div>
            <strong>Águas do Brasil Group, 2017</strong><br/><br/>
            Software Developer<br/><br/>
            ▪ Developed a CRM system using JavaScript, C#, ASP.NET, and SQL Server, streamlining billing and customer management processes<br/>
            ▪ Implemented a role-based access control system to ensure data security and privacy<br/>
            ▪ Designed and developed RESTful APIs using ASP.NET Web API to enable integration with third-party systems<br/>
            ▪ Collaborated with cross-functional teams using Agile methodologies (Scrum, Kanban) to gather requirements and deliver high-quality solutions<br/><br/>
        </div>
    },
];

const LogoGrid = () => {
    const [expandedLogos, setExpandedLogos] = useState({});

    const toggleLogo = (id) => {
        setExpandedLogos(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
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
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const detailAnimate = {
        hidden: { opacity: 0, height: 10, transform: 'scaleY(0)' },
        show: { opacity: 1, height: 'auto', transform: 'scaleY(1)', transition: { duration: 0.5 } },
        exit: { opacity: 0, height: 10, transform: 'scaleY(0)', transition: { duration: 0.5 } },
    };

    const logoHoverVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1, transition: { duration: 0.3 } },
        tap: { scale: 0.9 },
    };

    return (
        <AnimatePresence>
            <div className="logo-grid-section">
                <motion.div className="logo-grid" variants={container} initial="hidden" animate="show">
                    {logos.map(logo => (
                        <motion.div
                            key={logo.id}
                            variants={item}
                            className="logo-item"
                            data-id={logo.id}
                            onClick={() => toggleLogo(logo.id)}
                            layout
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <motion.div className="logo-section" layout variants={logoHoverVariants}>
                                <Image src={logo.src} alt={logo.alt} width={120} height={120} priority={true} />
                            </motion.div>
                            <AnimatePresence>
                                {expandedLogos[logo.id] && (
                                    <motion.div
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        variants={detailAnimate}
                                        className="detail-section"
                                    >
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
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LogoGrid;

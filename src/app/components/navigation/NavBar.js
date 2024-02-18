"use client";
import { useEffect } from 'react';
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import "@/app/styles/NavBar.css";
import Logo from "@/app/components/navigation/Logo";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const NavBar = () => {
    useEffect(() => {
        const existingScript = document.querySelector("[src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js']");
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                kofiWidgetOverlay.draw('fullstackdev1', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Support me',
                    'floating-chat.donateButton.background-color': '#00b9fe',
                    'floating-chat.donateButton.text-color': '#fff'
                });
            };
        } else if (existingScript && window.kofiWidgetOverlay) {
            // If the script is already included and the widget is not drawn, draw it.
            window.kofiWidgetOverlay.draw('fullstackdev1', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Support me',
                'floating-chat.donateButton.background-color': '#00b9fe',
                'floating-chat.donateButton.text-color': '#fff'
            });
        }
    }, []);

    return (
        <div className="navbar">
            <Link href="/">
                <Logo/>
            </Link>
            <div className="social-links">
                <a href="https://linkedin.com/in/felipelv" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className="social-icon"/>
                </a>
                <a href="https://github.com/FelipeLVieira" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="social-icon"/>
                </a>
                <a href="https://www.youtube.com/@fullstackdev_1" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="social-icon"/>
                </a>
            </div>
            <ThemeSwitcher/>
        </div>
    );
};

export default NavBar;

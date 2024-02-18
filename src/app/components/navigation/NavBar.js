"use client";
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import "@/app/styles/NavBar.css";
import Logo from "@/app/components/navigation/Logo";
import Link from "next/link";
import {FaGithub, FaLinkedinIn, FaYoutube} from "react-icons/fa";
import styles from "@/app/styles/NavBar.css";
import {useEffect} from "react";

const NavBar = () => {
    useEffect(() => {
        // Function to load the Ko-fi script
        const loadKofiScript = (callback) => {
            const script = document.createElement('script');
            script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (callback) callback();
            };
        };

        // Initialize the Ko-fi widget once the script is loaded
        loadKofiScript(() => {
            kofiWidgetOverlay.draw('felipelv', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Support me',
                'floating-chat.donateButton.background-color': '#00b9fe',
                'floating-chat.donateButton.text-color': '#fff'
            });
        });

        // Optional: Clean up the script when the component unmounts
        // This might not be necessary for a widget script like Ko-fi's, but included here for completeness
        return () => {
            const script = document.querySelector("script[src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js']");
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="navbar">
            <Link href="/">
                <Logo/>
            </Link>

            {/* Social Links */}
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

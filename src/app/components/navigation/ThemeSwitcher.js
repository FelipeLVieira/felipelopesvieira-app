"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import "@/app/styles/ThemeSwitcher.css";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [iconState, setIconState] = useState(theme); // 'light' or 'dark'

    useEffect(() => {
        // When theme changes, start animation for the exiting icon
        const timer = setTimeout(() => {
            setIconState(theme); // After the animation, set state to the new theme
        }, 500); // Should match animation duration

        return () => clearTimeout(timer);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="theme-switcher" onClick={toggleTheme}>
            <SunIcon className={`heroicon sun ${theme === 'dark' ? 'exiting' : 'entering'}`} />
            <MoonIcon className={`heroicon moon ${theme === 'light' ? 'exiting' : 'entering'}`} />
        </div>
    );
}

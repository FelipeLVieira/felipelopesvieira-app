"use client";
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import "@/app/styles/ThemeSwitcher.css";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import NoSsr from '@/app/components/NoSsr';

export default function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();
    const [iconState, setIconState] = useState(theme);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIconState(theme);
    }, [theme]);

    const toggleTheme = () => {
        if (!isAnimating) { // Prevent multiple clicks while animating
            setIsAnimating(true);
            setTheme(theme === 'light' ? 'dark' : 'light');
            setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Adjust the duration to match your animation duration
        }
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
    };

    return (
        <NoSsr>
            <div className="theme-switcher-container" onClick={toggleTheme}>
                <div
                    className={`icon-stack ${isAnimating ? 'animating' : ''}`}
                    onAnimationEnd={handleAnimationEnd} // Add onAnimationEnd event
                >
                    {iconState === 'light' ? (
                        <div>
                            <SunIcon className={`icon-stack-icon`}/>
                        </div>
                    ) : (
                        <div>
                            <MoonIcon className={`icon-stack-icon`}/>
                        </div>
                    )}
                </div>
            </div>
        </NoSsr>
    );
}

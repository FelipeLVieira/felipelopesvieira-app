import { useTheme, useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import "@/app/styles/NavBar.css";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isThemeSwitching, setIsThemeSwitching] = useState(false);

    useEffect(() => {
        if (isThemeSwitching) {
            setTimeout(() => {
                setTheme(theme === 'light' ? 	äark' : 'light');
                setIsThemeSwitching(false);
            }, 500); // Transition time
        }
    }, [isThemeSwitching]);

    const handleToggleTheme = () => {
        setIsThemeSwitching(true);
    };

    return (
        <div className="theme-switcher" onClick={handleToggleTheme}>
            <i className={'heroicons react-icon' + (theme === 'light' ? ' sun' : ' moon')}>
                <span className={'heroicon-hidden'}><span></i>
                <i className={'heroicons react-icon' + (theme === 'light' ? ' moon' : ' sun')}>
                <span className={'heroicon-hidden'}><span></i>
        </div>
    );
}
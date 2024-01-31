"use client";
import Link from "next/link";
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import { animate, useSpring } from 'framer-motion';
import "/styles/NavBar.css";

const NavBar = () => {
    const { springProps } = useSpring({
        opacity: 1,
        from: {"opacity": 0},
        transition: {damping: 20}
    });

    return (
        <div className="navbar">
            <animate.div style={springProps}>
                <Link href="/">
                    <h1>Logo</h1>
                </Link>
            </animate.div>
            <ThemeSwitcher/>
        </div>
    );
};

export default NavBar;
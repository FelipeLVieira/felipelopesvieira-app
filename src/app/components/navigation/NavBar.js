"use client";
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import "@/app/styles/NavBar.css";
import Logo from "@/app/components/navigation/Logo";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="navbar">
            <Link href="/">
                <Logo/>
            </Link>

            <ThemeSwitcher/>
        </div>
    );
};

export default NavBar;

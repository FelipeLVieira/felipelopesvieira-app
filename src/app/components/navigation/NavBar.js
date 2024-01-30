"use client";
import Link from "next/link";
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import "@/app/styles/NavBar.css";

const NavBar = () => {
    return (
        <div className="navbar">
            <Link href="/">
                {/*<Image*/}
                {/*    src="/images/logo.png"*/}
                {/*    alt="Logo"*/}
                {/*    width={width < 1024 ? 150 : 250}*/}
                {/*    height={width < 1024 ? 45 : 74}*/}
                {/*    className="relative"*/}
                {/*/>*/}
                <h1>Logo</h1>
            </Link>
            <ThemeSwitcher/>
        </div>
    );
};

export default NavBar;

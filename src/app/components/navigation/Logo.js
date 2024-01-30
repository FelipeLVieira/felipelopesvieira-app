"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "./Button";

const Logo = () => {
    const [width, setWidth] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        const changeNavButton = () => {
            setShowButton(window.scrollY >= 400 && window.innerWidth < 768);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        window.addEventListener("scroll", changeNavButton);

        return () => {
            window.removeEventListener("resize", updateWidth);
            window.removeEventListener("scroll", changeNavButton);
        };
    }, []);

    return (
        <>
            <Link href="/">
                <a>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={width < 1024 ? 150 : 250}
                        height={width < 1024 ? 45 : 74}
                        className="relative"
                    />
                </a>
            </Link>
            {showButton && <Button/>}
        </>
    );
};

export default Logo;

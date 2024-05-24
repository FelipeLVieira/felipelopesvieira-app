"use client";
import Image from "next/legacy/image";
import logo from "@/app/assets/flv-logo-main.png";

const Logo = () => {
    return (
        <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            priority={true}
        />
    );
};

export default Logo;

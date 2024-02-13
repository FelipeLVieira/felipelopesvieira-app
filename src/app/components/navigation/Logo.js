"use client";
import Image from "next/legacy/image";
import logo from "@/app/assets/flv-logo-main.png";

const Logo = () => {
    return (
        <Image
            src={logo}
            alt="Logo"
            width={80} // Adjust as needed
            height={80} // Adjust as needed
            priority={true}
        />
    );
};

export default Logo;

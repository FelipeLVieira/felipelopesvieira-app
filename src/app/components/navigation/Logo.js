"use client";
import Image from "next/image";
import logo from "@/app/assets/flv-logo-main.png";

const Logo = () => {
    return (
        <Image
            src={logo}
            alt="Logo"
            width={100} // Adjust as needed
            height={100} // Adjust as needed
            priority={true}
        />
    );
};

export default Logo;

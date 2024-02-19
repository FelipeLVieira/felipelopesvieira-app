"use client";
import {Providers} from './providers'
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/navigation/NavBar";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";
import "@/app/styles/globals.css";
import {useState} from "react";

export default function RootLayout({children}) {
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    return (
        <html lang="en" suppressHydrationWarning={true}>
        <head>
            <title>Felipe Lopes Vieira Page</title>
        </head>
        <body>
        <Providers>
            {!isTypingComplete && (
                <TypewriterEffect onComplete={() => setIsTypingComplete(true)}/>
            )}
            <div style={{visibility: isTypingComplete ? 'visible' : 'hidden'}}>
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
"use client";
import {Providers} from './providers'
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/navigation/NavBar";
import TypewriterEffect from "@/app/components/TypewriterEffect/TypewriterEffect";
import globals from "@/app/styles/globals.css";
import {useState} from "react";

globals;

export default function RootLayout({children}) {
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body>
        <Providers>
            {!isTypingComplete && (
                <TypewriterEffect onComplete={() => setIsTypingComplete(true)}/>
            )}
            {/* The main content is always rendered but hidden behind the TypewriterEffect */}
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
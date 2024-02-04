"use client";
import React, {useEffect, useState} from 'react';
import '../styles/TypewriterEffect.css';
import {motion, useAnimation} from 'framer-motion';

const getFormattedDateTime = () => {
    const now = new Date();
    return now.toDateString();
};

const TypewriterEffect = ({onComplete}) => {
    const [typedText, setTypedText] = useState(`Last login: ${getFormattedDateTime()} on ttys001`);
    const [cursorVisible, setCursorVisible] = useState(true);
    const fullText = `Last login: ${getFormattedDateTime()} on ttys001\nlocalhost:~ felipe$ Hello, world! 🌎`;
    const controls = useAnimation();

    const isTyping = typedText.length < fullText.length;

    useEffect(() => {
        // Typing logic
        if (isTyping) {
            const nextChar = fullText.charAt(typedText.length);
            const delay = nextChar === '\n' ? 600 : 70;

            const timeoutId = setTimeout(() => {
                setTypedText((currentText) => currentText + nextChar);
            }, delay);

            return () => clearTimeout(timeoutId);
        } else {
            // Cursor blink logic
            const cursorTimeout = setInterval(() => {
                setCursorVisible((v) => !v);
            }, 500);

            return () => clearInterval(cursorTimeout);
        }
    }, [typedText, fullText, onComplete, isTyping]);

    useEffect(() => {
        // Transition logic
        if (!isTyping) {
            setTimeout(() => {
                controls.start({
                    opacity: 0,
                    transition: {duration: 0.5, ease: "easeIn"}
                }).then(onComplete); // After fading out, call onComplete
            }, 1800); // Wait 1.8 seconds after typing is done before starting fade out
        }
    }, [isTyping, controls, onComplete]);

    return (
        <motion.div
            className="typewriter-container"
            initial={{opacity: 1}}
            animate={controls}
        >
            <pre>{typedText}<span className={`blink-cursor${cursorVisible ? ' visible' : ''}`}>|</span></pre>
        </motion.div>
    );
};

export default TypewriterEffect;

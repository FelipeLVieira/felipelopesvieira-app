import React, {useEffect, useState} from 'react';
import '../styles/TypewriterEffect.css';

const getFormattedDateTime = () => {
    const now = new Date();
    return now.toDateString();
};

const TypewriterEffect = ({onComplete}) => {
    const [typedText, setTypedText] = useState(`Last login: ${getFormattedDateTime()} on ttys001`);
    const [cursorVisible, setCursorVisible] = useState(true);
    const fullText = `Last login: ${getFormattedDateTime()} on ttys001\nlocalhost:~ felipe$ Hello, world! 🌎`;

    useEffect(() => {
        // Typing logic
        if (typedText.length < fullText.length) {
            const nextChar = fullText.charAt(typedText.length);
            const delay = nextChar === '\n' ? 600 : 70; // Add a longer pause for line breaks

            const timeoutId = setTimeout(() => {
                setTypedText((currentText) => currentText + nextChar);
            }, delay);

            return () => clearTimeout(timeoutId);
        } else {
            // Cursor blink logic
            const cursorTimeout = setTimeout(() => {
                setCursorVisible((v) => !v);
            }, 500); // Cursor blink speed

            // onComplete logic
            // Call onComplete after some time to simulate the end of the typing effect
            const onCompleteTimeout = setTimeout(() => {
                onComplete();
            }, 1800); // Keep the typewriter on screen for an additional 2 seconds after typing is done

            return () => {
                clearTimeout(cursorTimeout);
                clearTimeout(onCompleteTimeout);
            };
        }
    }, [typedText, fullText, onComplete]);

    return (
        <div className="typewriter-container">
      <pre>
        {typedText}
          <span className={`blink-cursor${cursorVisible ? ' visible' : ''}`}>|</span>
      </pre>
        </div>
    );
};

export default TypewriterEffect;

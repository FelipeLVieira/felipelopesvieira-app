// Footer.js
import React from 'react';
import styles from "@/app/styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="contact-me">
                <h2>Contact Me</h2>
                <p>If you have any questions or would like to get in touch, feel free to reach out:</p>
                <ul>
                    <li>Email: <a href="mailto:felipe.lv.90@gmail.com">felipe.lv.90@gmail.com</a></li>
                    <li>Phone: <a href="tel:+13059062554">+1 305-906-2554</a></li>
                </ul>
            </div>
        </footer>
    );
}

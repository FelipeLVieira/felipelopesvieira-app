"use client";
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import * as PIXI from 'pixi.js';

const LogoGrid = dynamic(() => import('./components/LogoGrid'), { ssr: false });

const Home = () => {
    const pixiContainerRef = useRef(null);
    const appRef = useRef(null);
    const bunnyRef = useRef(null); // Use a ref to store the bunny for access in other effects

    useEffect(() => {
        if (pixiContainerRef.current) {
            const width = pixiContainerRef.current.offsetWidth || 800; // Fallback width
            const height = pixiContainerRef.current.offsetHeight || 600; // Fallback height

            const app = new PIXI.Application({
                backgroundAlpha: 0,
                width,
                height,
                resolution: window.devicePixelRatio || 1,
            });
            appRef.current = app;
            pixiContainerRef.current.appendChild(app.view);

            const onResize = () => {
                const { offsetWidth, offsetHeight } = pixiContainerRef.current;
                app.renderer.resize(offsetWidth, offsetHeight);
            };

            window.addEventListener('resize', onResize);

            app.loader.add('bunny', 'https://pixijs.com/assets/bunny.png').load((loader, resources) => {
                const bunny = new PIXI.Sprite(resources.bunny.texture);
                bunny.anchor.set(0.5);
                bunny.x = width / 2;
                bunny.y = height / 2;
                bunny.vx = 0; // Initial velocity
                bunny.vy = 0; // Initial velocity
                bunny.interactive = true;
                bunny.buttonMode = true;

                bunny.on('pointerdown', () => {
                    bunny.vx = (Math.random() - 0.5) * 10;
                    bunny.vy = (Math.random() - 0.5) * 10;
                });

                app.stage.addChild(bunny);
                bunnyRef.current = bunny;

                app.ticker.add(() => {
                    if (!bunnyRef.current) return;

                    const bunny = bunnyRef.current;
                    bunny.x += bunny.vx;
                    bunny.y += bunny.vy;

                    // Bounds checking logic
                    if (bunny.x - bunny.width / 2 < 0 || bunny.x + bunny.width / 2 > app.renderer.width) {
                        bunny.vx *= -1;
                    }
                    if (bunny.y - bunny.height / 2 < 0 || bunny.y + bunny.height / 2 > app.renderer.height) {
                        bunny.vy *= -1;
                    }
                });
            });

            return () => {
                window.removeEventListener('resize', onResize);
                app.destroy(true, { children: true, texture: true, baseTexture: true });
            };
        }
    }, []);

    // The second useEffect for resize can be removed as it is redundant now
    // The logic is handled in the first useEffect

    return (
        <div className="main-container">
            <div ref={pixiContainerRef} className="pixi-container" />
            <LogoGrid />
        </div>
    );
};

export default Home;

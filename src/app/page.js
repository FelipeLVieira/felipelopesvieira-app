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

            const createParticles = (x, y, container) => {
                for (let i = 0; i < 10; i++) {
                    const particle = new PIXI.Graphics();
                    particle.beginFill(0x007BFF);
                    particle.drawCircle(0, 0, 5);
                    particle.endFill();
                    particle.x = x;
                    particle.y = y;

                    // Randomize the particle's velocity
                    const vx = Math.random() * 10 - 5;
                    const vy = Math.random() * 10 - 5;

                    app.ticker.add(() => {
                        particle.x += vx;
                        particle.y += vy;
                        particle.scale.x *= 0.95;
                        particle.scale.y *= 0.95;
                        if (particle.scale.x < 0.1) {
                            container.removeChild(particle); // Remove particle when it's small enough
                        }
                    });

                    container.addChild(particle);
                }
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
                    bunny.vx = (Math.random() - 0.5) * 5;
                    bunny.vy = (Math.random() - 0.5) * 5;

                    // Animation effect
                    bunny.scale.set(2); // Make the bunny slightly larger
                    setTimeout(() => {
                        bunny.scale.set(1); // Return to original size after a short delay
                    }, 100); // Adjust delay as needed
                    createParticles(bunny.x, bunny.y, app.stage);
                })

                app.stage.addChild(bunny);
                bunnyRef.current = bunny;

                app.ticker.add(() => {
                    if (!bunnyRef.current) return;

                    const bunny = bunnyRef.current;
                    bunny.x += bunny.vx;
                    bunny.y += bunny.vy;

                    // Adjust the bounds checking to consider the bunny's size
                    const halfWidth = bunny.width / 2;
                    const halfHeight = bunny.height / 2;

                    if (bunny.x - halfWidth < 0) {
                        bunny.x = halfWidth; // Reset position to the left edge
                        bunny.vx *= -1; // Reverse velocity
                    } else if (bunny.x + halfWidth > app.renderer.width) {
                        bunny.x = app.renderer.width - halfWidth; // Reset position to the right edge
                        bunny.vx *= -1; // Reverse velocity
                    }

                    if (bunny.y - halfHeight < 0) {
                        bunny.y = halfHeight; // Reset position to the top edge
                        bunny.vy *= -1; // Reverse velocity
                    } else if (bunny.y + halfHeight > app.renderer.height) {
                        bunny.y = app.renderer.height - halfHeight; // Reset position to the bottom edge
                        bunny.vy *= -1; // Reverse velocity
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

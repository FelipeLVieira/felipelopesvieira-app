"use client";
import React, {useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import LogoGrid with SSR disabled
const LogoGrid = dynamic(() => import('@/app/components/LogoGrid'), {ssr: false});

const Home = () => {
    const pixiContainerRef = useRef(null);
    const appRef = useRef(null); // Use ref to persist the PixiJS app instance

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const PIXI = require('pixi.js');

            const app = new PIXI.Application({
                background: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                resizeTo: window,
                resolution: window.devicePixelRatio || 1,
            });
            appRef.current = app;
            pixiContainerRef.current.appendChild(app.view);

            const loader = new PIXI.Loader();
            const textureIds = ['flowerTop', 'eggHead'];

            for (const textureId of textureIds) {
                if (PIXI.utils.TextureCache[textureId]) {
                    PIXI.utils.TextureCache[textureId].destroy(true);
                }
            }

            loader.add('flowerTop', 'https://pixijs.com/assets/flowerTop.png');
            loader.add('eggHead', 'https://pixijs.com/assets/eggHead.png');

            loader.load((loader, resources) => {
                const flower = new PIXI.Sprite(resources.flowerTop.texture);
                const eggHead = new PIXI.Sprite(resources.eggHead.texture);

                // Ensure appRef.current and its screen property are available
                if (appRef.current && appRef.current.screen) {
                    flower.anchor.set(0.5);
                    flower.x = appRef.current.screen.width / 2;
                    flower.y = appRef.current.screen.height / 2;
                    flower.visible = false;

                    eggHead.anchor.set(0.5);
                    eggHead.x = appRef.current.screen.width / 2;
                    eggHead.y = appRef.current.screen.height / 2;
                    eggHead.visible = true;

                    appRef.current.stage.addChild(flower);
                    appRef.current.stage.addChild(eggHead);

                    flower.interactive = true;
                    eggHead.interactive = true;

                    flower.on('mousedown', (e) => {
                        e.data.originalEvent.preventDefault();
                    });

                    eggHead.on('mousedown', (e) => {
                        e.data.originalEvent.preventDefault();
                    });

                    appRef.current.stage.interactive = true;
                    appRef.current.stage.on('pointerdown', () => {
                        flower.visible = !flower.visible;
                        eggHead.visible = !eggHead.visible;
                    });
                }
            });
        }

        return () => {
            if (appRef.current) {
                appRef.current.destroy(true, {children: true, texture: true, baseTexture: true});
                appRef.current = null;
            }
        };
    }, []);

    return (
        <div className="main-container">
            <div ref={pixiContainerRef} className="pixi-container"/>
            <div className="framer-motion-container">
                <LogoGrid/>
            </div>
        </div>
    );
};

export default Home;

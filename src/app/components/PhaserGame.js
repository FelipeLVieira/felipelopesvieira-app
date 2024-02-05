"use client";
import React, {useEffect, useCallback, useState} from 'react';
import 'phaser';
import logo from '@/app/assets/flv-logo-main.png';
import {useTheme} from "next-themes";

const PhaserGame = () => {
    const theme =  useTheme();
    const [ backgroundColor, setBackgroundColor] = useState(theme === 'dark' ? '#000000' : '#ffffff');
    const [config, setConfig] = useState({});

    // Wrap each function with useCallback
    const preload = useCallback(function() {
        this.load.image('logo', logo.src); // Adjust with your assets
    }, []);

    const create = useCallback(function() {
    }, []);

    const update = useCallback(function() {
        // Update logic here
    }, []);

    useEffect(() => {

        if(theme === 'dark') {
            setBackgroundColor('#000000');
        }
        else {
            setBackgroundColor( '#ffffff');
        }

        setConfig( {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            backgroundColor: backgroundColor,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload: function() {
                    this.load.image('logo', logo.src);
                },
                create: function() {
                    const logo = this.physics.add.image(this.cameras.main.width/4, this.cameras.main.height/4, 'logo');
                    logo.setVelocity(100, 100);
                    logo.setBounce(1, 1);
                    logo.setCollideWorldBounds(true);
                    logo.setScale(0.5, 0.5);


                },
                update: function() {
                    // Update logic here
                    this.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff'; // Dark theme background color
                },
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            input: {
                touch: true,
            },
        });

        const game = new Phaser.Game(config);

        const resizeGame = () => game.scale.resize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', resizeGame);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeGame);
            game.destroy(true);
        };
    }, [preload, create, update]); // Include dependencies here

    return <div id="phaser-game-container" style={{ width: '100%', height: '100%' }} />;
};

export default PhaserGame;

"use client";
import React, {useEffect, useCallback, useState} from 'react';
import 'phaser';
import {useTheme} from "next-themes";
import logo from '@/app/assets/flv-logo-main.png';

const PhaserGame = () => {
    const theme = useTheme();
    const [backgroundColor, setBackgroundColor] = useState(theme === 'dark' ? '#ffffff' : '#000000');
    const [game, setGame] = useState(null);

    const preload = useCallback(function () {
        this.load.image('logo', logo.src); // Adjust with the correct path
    }, []);

    const create = useCallback(function () {
        const logo = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
        logo.setVelocity(100, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        logo.setScale(0.5, 0.5);
    }, []);

    const update = useCallback(function () {
        // Update logic here
    }, []);

    useEffect(() => {
        if (game) {
            game.destroy(true);
        }

        if (theme.theme === 'dark') {
            setBackgroundColor('#ffffff');
        } else {
            setBackgroundColor('#000000');
        }

        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            backgroundColor: backgroundColor,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0},
                    debug: false,
                },
            },
            scene: {preload, create, update},
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            input: {
                touch: true,
            },
        };

        const newGame = new Phaser.Game(config);
        setGame(newGame);

        return () => newGame?.destroy(true);
    }, [theme.theme]); // React to theme changes

    return <div id="phaser-game-container" style={{width: '100%', height: '100%'}}/>;
};

export default PhaserGame;

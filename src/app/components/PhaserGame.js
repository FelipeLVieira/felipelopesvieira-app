"use client";
import React, { useEffect, useCallback } from 'react';
import 'phaser';
import logo from '@/app/assets/flv-logo-main.png';

const PhaserGame = ({ width = 800, height = 600 }) => {
    // Wrap each function with useCallback
    const preload = useCallback(function() {
        this.load.image('logo', logo.src); // Adjust with your assets
    }, []);

    const create = useCallback(function() {
        const logo = this.physics.add.image(width / 4, height / 4, 'logo');
        logo.setVelocity(100, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }, [width, height]);

    const update = useCallback(function() {
        // Update logic here
    }, []);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width,
            height,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
            parent: 'phaser-game-container',
            backgroundColor: '#8a8a8a',
            scale: {
                mode: Phaser.Scale.RESIZE, // Resize the game canvas
                autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the screen
            },
            input: {
                touch: true, // Enable touch screen input
            },
        };

        const game = new Phaser.Game(config);

        // Cleanup function
        return () => game.destroy(true);
    }, [preload, create, update, width, height]); // Include dependencies here

    return <div id="phaser-game-container" style={{ width, height }} />;
};

export default PhaserGame;

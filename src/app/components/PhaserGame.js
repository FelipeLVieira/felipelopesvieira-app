"use client";
import React, { useEffect, useCallback } from 'react';
import 'phaser';
import logo from '@/app/assets/flv-logo-main.png';

const PhaserGame = () => {
    // Wrap each function with useCallback
    const preload = useCallback(function() {
        this.load.image('logo', logo.src); // Adjust with your assets
    }, []);

    const create = useCallback(function() {
        const logo = this.physics.add.image(width / 4, height / 4, 'logo');
        logo.setVelocity(100, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }, []);

    const update = useCallback(function() {
        // Update logic here
    }, []);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            backgroundColor: '#8a8a8a',
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
                    const logo = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
                    logo.setVelocity(100, 100);
                    logo.setBounce(1, 1);
                    logo.setCollideWorldBounds(true);
                },
                update: function() {
                    // Update logic here
                },
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            input: {
                touch: true,
            },
        };

        const game = new Phaser.Game(config);

        const resizeGame = () => game.scale.resize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', resizeGame);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeGame);
            game.destroy(true);
        };
    }, [preload, create, update]); // Include dependencies here

    return <div id="phaser-game-container" />;
};

export default PhaserGame;

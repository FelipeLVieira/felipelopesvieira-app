"use client";
import React, {useEffect} from 'react';
import Phaser from 'phaser';
import logo from '@/app/assets/flv-logo-main.png';

const PhaserGame = ({width = 800, height = 600}) => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width,
            height,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0},
                    debug: false,
                },
            },
            scene: {
                preload,
                create,
                update,
            },
            parent: 'phaser-game-container',
            backgroundColor: '#8a8a8a',
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    function preload() {
        this.load.image('logo', logo.src); // Adjust with your assets
    }

    function create() {
        const logo = this.physics.add.image(width / 4, height / 4, 'logo');
        logo.setVelocity(100, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }

    function update() {
    }

    return <div id="phaser-game-container" style={{width, height}}/>;
};

export default PhaserGame;

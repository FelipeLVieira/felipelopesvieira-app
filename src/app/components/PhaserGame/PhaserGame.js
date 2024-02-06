import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import logo from '@/app/assets/flv-logo-main.png';
import styles from '@/app/styles/PhaserGame.css';

const PhaserGame = () => {
    const gameRef = useRef(null);
    const wsRef = useRef(null); // WebSocket reference

    useEffect(() => {

        // WebSocket setup
        wsRef.current = new WebSocket('ws://localhost:8080');

        wsRef.current.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        wsRef.current.onmessage = (event) => {
            console.log('Message from server:', event.data);
            // Here you can handle incoming messages, e.g., updating player position
            // This part depends on how your game is designed to react to messages
        };

        wsRef.current.onerror = (error) => {
            console.log('WebSocket error:', error);
        };

        wsRef.current.onclose = () => {
            console.log('Disconnected from the WebSocket server');
        };

        // Phaser game setup
        const preload = function () {
            this.load.image('logo', logo.src);
            // Assuming your GIF or sprite for the player is accessible at a URL or path
            // For a GIF, consider using a spritesheet or texture atlas if animation is needed
            this.load.spritesheet('player', 'path/to/your/player/gif/or/sprite.png', {
                frameWidth: 32, // Adjust based on your sprite's frame size
                frameHeight: 48,
            });
        };

        // Example utility functions to generate random properties
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const getRandomName = () => `Player${Math.floor(Math.random() * 1000)}`;

        const getRandomPosition = (gameWidth, gameHeight) => ({
            x: Math.floor(Math.random() * gameWidth),
            y: Math.floor(Math.random() * gameHeight),
        });

// Modified create function
        const create = function () {
            const logoImage = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
            logoImage.setVelocity(100, 100);
            logoImage.setBounce(1, 1);
            logoImage.setCollideWorldBounds(true);
            logoImage.setScale(0.5, 0.5);

            // Generate random properties for the player
            const color = getRandomColor();
            const name = getRandomName(); // You might use this for displaying or tracking purposes
            const { x, y } = getRandomPosition(this.cameras.main.width, this.cameras.main.height);

            // Create a circle for the player with random properties
            const player = this.physics.add.circle(x, y, 20, Phaser.Display.Color.HexStringToColor(color).color);
            player.setCollideWorldBounds(true);
            player.setBounce(0.8);
            player.setVelocity(100, 200);

            // Add collision with the logo
            this.physics.add.collider(player, logoImage, function (player, logoImage) {
                // This function is called when the player circle collides with the logo
                // Trigger a visual effect like flashing
                player.setAlpha(0.5); // Make the player semi-transparent to indicate a collision

                // Reset the alpha after a short delay to create a "flash" effect
                this.time.delayedCall(200, () => {
                    player.setAlpha(1); // Reset to fully opaque
                });
            }, null, this);
        };

        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#333',
            parent: 'phaser-game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload,
                create
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            input: {
                touch: true,
            },
        };

        if (!gameRef.current) {
            gameRef.current = new Phaser.Game(config);
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []); // Empty dependency array means this effect runs only once on mount

    // Ensure your CSS makes this div visible with set dimensions
    return <div id="phaser-game-container"></div>;
};

export default PhaserGame;

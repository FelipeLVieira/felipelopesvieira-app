import React, {useEffect, useRef, useState} from 'react';
import Phaser from 'phaser';
import logo from '@/app/assets/flv-logo-main.png';
import styles from '@/app/styles/PhaserGame.css';

const PhaserGame = () => {
    const gameRef = useRef(null);
    const wsRef = useRef(null); // WebSocket reference
    const [playerName, setPlayerName] = useState(`Player ${Math.floor(Math.random() * 1000)}`); // State for player name
    const playerNameRef = useRef(playerName); // Ref to keep track of player name without causing re-renders

    // Example utility functions to generate random properties
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomName = () => `Player ${Math.floor(Math.random() * 1000)}`;

    const getRandomPosition = (gameWidth, gameHeight) => ({
        x: Math.floor(Math.random() * gameWidth),
        y: Math.floor(Math.random() * gameHeight),
    });

    const connectWebSocket = () => {
        wsRef.current = new WebSocket('ws://localhost:8080');

        wsRef.current.onopen = () => console.log('Connected to the WebSocket server');
        wsRef.current.onmessage = (event) => console.log('Message from server:', event.data);
        wsRef.current.onerror = (error) => console.log('WebSocket error:', error);
        wsRef.current.onclose = () => console.log('Disconnected from the WebSocket server');
    };

    const initializePhaserGame = () => {
        const preload = function () {
            this.load.image('logo', logo.src);
        };

        const create = function () {
            const scene = this;
            const logoImage = scene.physics.add.image(scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'logo')
                .setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

            logoImage.setVelocity(100, 100);
            logoImage.setBounce(1, 1);
            logoImage.setCollideWorldBounds(true);
            logoImage.setScale(0.5, 0.5);

            // Generate random properties for the player
            const name = playerNameRef.current;
            const color = getRandomColor();
            const { x, y } = getRandomPosition(scene.cameras.main.width, scene.cameras.main.height);

            const playerBody = scene.physics.add.sprite(x, y, null).setCircle(20).setVisible(false);
            playerBody.setCollideWorldBounds(true);
            playerBody.setBounce(0.8);
            playerBody.setVelocity(300, 400);

            // Create a visual Arc that matches the playerBody position
            const playerVisual = scene.add.arc(x, y, 20, 0, 360, false, Phaser.Display.Color.HexStringToColor(color).color);

            scene.playerNameText = scene.add.text(x, y - 30, name, { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);

            scene.playerNameTextRef = playerNameRef;

            // During the 'worldstep', update the position of the playerNameText Phaser object, not the React ref.
            scene.physics.world.on('worldstep', function () {
                playerVisual.setPosition(playerBody.x, playerBody.y);
                scene.playerNameText.setPosition(playerBody.x, playerBody.y - 30); // Update the Phaser text object
            });

            // When the scene is resized, again update the Phaser text object.
            scene.scale.on('resize', function (gameSize) {
                const { width, height } = gameSize;
                scene.cameras.main.setViewport(0, 0, width, height);
                scene.playerNameText.setPosition(playerVisual.x, playerVisual.y - 30);
            });

            scene.physics.add.collider(playerBody, logoImage, () => {
                playerVisual.setAlpha(0.5); // Flash effect on collision
                scene.time.delayedCall(200, () => {
                    playerVisual.setAlpha(1);
                }, [], scene); // Passing this as the context for delayedCall
            });

            return () => {
                // Close the WebSocket connection if it's open
                wsRef.current?.close();

                // Destroy the Phaser game instance if it exists
                if (gameRef.current && typeof gameRef.current.destroy === 'function') {
                    gameRef.current.destroy(true);
                    gameRef.current = null;
                }
            };
        };

        // Ensure only one Phaser game instance is created
        if (!gameRef.current) {
            const config = {
                width: 1000,
                height: 500,
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
                }
            };

            gameRef.current = new Phaser.Game(config);
        }

        // WebSocket connection setup
        connectWebSocket();

        // Cleanup function for both WebSocket and Phaser game instance
        return () => {
            wsRef.current?.close();
            gameRef.current?.destroy(true);
            gameRef.current = null;
        };
    };

    useEffect(() => {
        initializePhaserGame();
        connectWebSocket();

        return () => {
            wsRef.current?.close();
            gameRef.current?.destroy(true);
            gameRef.current = null;
        };
    }, []);

    useEffect(() => {
        // Update the player's name in Phaser when it changes
        if (gameRef.current && gameRef.current.scene && gameRef.current.scene.scenes.length > 0) {
            const scene = gameRef.current.scene.scenes[0];
            if (scene && scene.playerNameText) {
                scene.playerNameText.setText(playerName);
            }
        }
    }, [playerName]); // This effect runs when playerName changes

    return (
        <div>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter Player Name"
                style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 100 }}
            />
            <div id="phaser-game-container"></div>
        </div>
    );
};

export default PhaserGame;

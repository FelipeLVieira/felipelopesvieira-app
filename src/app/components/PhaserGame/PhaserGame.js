import React, {useEffect, useRef, useState} from 'react';
import Phaser from 'phaser';
import logo from '@/app/assets/flv-logo-main.png';
import styles from '@/app/styles/PhaserGame.css';

const PhaserGame = () => {
    const gameRef = useRef(null);
    const wsRef = useRef(null); // WebSocket reference
    const [playerName, setPlayerName] = useState(`Player ${Math.floor(Math.random() * 1000)}`); // State for player name
    const playerNameRef = useRef(playerName); // Ref to keep track of player name without causing re-renders
    const [isAudioContextStarted, setIsAudioContextStarted] = useState(false);

    // Example utility functions to generate random properties
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomPosition = (gameWidth, gameHeight) => ({
        x: Math.floor(Math.random() * gameWidth),
        y: Math.floor(Math.random() * gameHeight),
    });

    const initializeWebSocket = () => {
        if (!wsRef.current) {
            wsRef.current = new WebSocket('ws://localhost:8080');

            wsRef.current.onopen = () => console.log('Connected to the WebSocket server');
            wsRef.current.onmessage = (event) => console.log('Message from server:', event.data);
            wsRef.current.onerror = (error) => console.log('WebSocket error:', error);
            wsRef.current.onclose = () => console.log('Disconnected from the WebSocket server');

            // Return a cleanup function that closes the WebSocket connection
            return () => {
                wsRef.current.close();
            };
        }
    }

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

            // Store references to playerBody and playerVisual in the scene for access in update method
            scene.playerBody = playerBody;
            scene.playerVisual = playerVisual;

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
                // Flash effect on collision
                playerVisual.setAlpha(0.5);
                scene.time.delayedCall(200, () => {
                    playerVisual.setAlpha(1);
                }, [], scene);

                // Reset or maintain velocity after collision
                // Here, we directly set the velocity back to its original state
                // You might want to adjust this based on your game's specific logic
                playerBody.setVelocity(300, 400);
            });
        };

        const update = function () {
            const cursorKeys = this.input.keyboard.createCursorKeys();
            const speed = 200; // Adjust speed as necessary

            if (cursorKeys.left.isDown) {
                this.playerBody.setVelocityX(-speed);
            } else if (cursorKeys.right.isDown) {
                this.playerBody.setVelocityX(speed);
            } else {
                this.playerBody.setVelocityX(0);
            }

            if (cursorKeys.up.isDown) {
                this.playerBody.setVelocityY(-speed);
            } else if (cursorKeys.down.isDown) {
                this.playerBody.setVelocityY(speed);
            } else {
                this.playerBody.setVelocityY(0);
            }
        };

        const config = {
            mode: Phaser.Scale.RESIZE,
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

        return () => {
            gameRef.current?.destroy(true);
            gameRef.current = null;
        };
    };

    useEffect(() => {
        if ((!gameRef.current)) {
            initializePhaserGame();
            initializeWebSocket(); // Store the WebSocket reference if needed
        }
    }, []);

    useEffect(() => {
        // Update playerName in Phaser game, this effect depends on the game being initialized first
        if (gameRef.current) {
            const scene = gameRef.current.scene.scenes[0];
            if (scene && scene.playerNameText) {
                scene.playerNameText.setText(playerName);
            }
        }
    }, [playerName]);

    return (
        <div>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter Player Name"
                style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
            />
            <div id="phaser-game-container"></div>
        </div>
    );
};

export default PhaserGame;

// Main entry point: Phaser 3 Game Configuration
import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import IntroScene from './scenes/IntroScene.js';
import KingdomScene from './scenes/KingdomScene.js';
import ForestScene from './scenes/ForestScene.js';
import CastleApproachScene from './scenes/CastleApproachScene.js';
import PortScene from './scenes/PortScene.js';
import IslandScene from './scenes/IslandScene.js';
import DarkForestScene from './scenes/DarkForestScene.js';
import BossScene from './scenes/BossScene.js';
import CityGateScene from './scenes/CityGateScene.js';
import CelebrationScene from './scenes/CelebrationScene.js';
import ReturnScene from './scenes/ReturnScene.js';
import EndingScene from './scenes/EndingScene.js';
import CreditScene from './scenes/CreditScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false,
        },
    },
    scene: [
        BootScene,
        PreloaderScene,
        IntroScene,
        KingdomScene,
        ForestScene,
        CastleApproachScene,
        PortScene,
        IslandScene,
        DarkForestScene,
        BossScene,
        CityGateScene,
        CelebrationScene,
        ReturnScene,
        EndingScene,
        CreditScene,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};

const game = new Phaser.Game(config);

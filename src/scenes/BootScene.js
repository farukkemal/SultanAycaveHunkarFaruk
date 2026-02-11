// BootScene: Generate all placeholder textures
import { createPlaceholderTextures } from '../utils/TextureGenerator.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        // Generate all placeholder textures
        createPlaceholderTextures(this);

        // Proceed to preloader
        this.scene.start('PreloaderScene');
    }
}

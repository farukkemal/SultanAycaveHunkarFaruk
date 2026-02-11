// InputManager: Handles WASD + Space + Mouse input
export default class InputManager {
    constructor(scene) {
        this.scene = scene;

        // WASD keys
        this.keys = {
            W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            SPACE: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            E: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        };

        // Mouse
        this.pointer = scene.input.activePointer;

        // Attack state
        this.attackPressed = false;
        scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.attackPressed = true;
            }
        });
    }

    get left() { return this.keys.A.isDown; }
    get right() { return this.keys.D.isDown; }
    get up() { return this.keys.W.isDown; }
    get down() { return this.keys.S.isDown; }
    get jump() { return Phaser.Input.Keyboard.JustDown(this.keys.SPACE); }
    get interact() { return Phaser.Input.Keyboard.JustDown(this.keys.E); }

    get attack() {
        if (this.attackPressed) {
            this.attackPressed = false;
            return true;
        }
        return false;
    }

    destroy() {
        // Clean up
        Object.values(this.keys).forEach(k => k.destroy?.());
    }
}

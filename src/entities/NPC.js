// NPC entity: Non-playable characters for dialogue
export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey, config = {}) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Static body

        this.name = config.name || 'NPC';
        this.dialogues = config.dialogues || [];
        this.interacted = false;
        this.interactionRange = config.interactionRange || 60;

        // Label
        this.nameLabel = scene.add.text(x, y - this.displayHeight / 2 - 15, this.name, {
            fontSize: '11px', color: '#00FF00', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(100);

        // Interaction prompt
        this.promptText = scene.add.text(x, y - this.displayHeight / 2 - 30, '[E] Konuş', {
            fontSize: '10px', color: '#FFFF00', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(100).setVisible(false);

        this.setDepth(5);
    }

    update(player) {
        if (!player || !this.active) return;

        const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        this.promptText.setVisible(dist < this.interactionRange && !this.interacted);
    }

    canInteract(player) {
        if (!player) return false;
        const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        return dist < this.interactionRange && !this.interacted;
    }

    interact() {
        this.interacted = true;
        this.promptText.setVisible(false);
        return this.dialogues;
    }

    resetInteraction() {
        this.interacted = false;
    }

    destroy(fromScene) {
        if (this.nameLabel) this.nameLabel.destroy();
        if (this.promptText) this.promptText.destroy();
        super.destroy(fromScene);
    }
}

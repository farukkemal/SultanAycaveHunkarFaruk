// HealthBar: Player (fixed UI) and Entity (floating) health bars
export class PlayerHealthBar {
    constructor(scene, x = 20, y = 20, maxHP = 100) {
        this.scene = scene;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.x = x;
        this.y = y;

        // Background
        this.bgBar = scene.add.rectangle(x + 75, y + 10, 150, 20, 0x333333);
        this.bgBar.setScrollFactor(0);
        this.bgBar.setDepth(900);
        this.bgBar.setOrigin(0.5, 0.5);

        // Health fill
        this.fillBar = scene.add.rectangle(x + 1, y + 1, 148, 18, 0x00FF00);
        this.fillBar.setScrollFactor(0);
        this.fillBar.setDepth(901);
        this.fillBar.setOrigin(0, 0);

        // Border
        this.border = scene.add.rectangle(x + 75, y + 10, 152, 22);
        this.border.setStrokeStyle(2, 0xFFFFFF);
        this.border.setFillStyle();
        this.border.setScrollFactor(0);
        this.border.setDepth(902);

        // Label
        this.label = scene.add.text(x, y - 14, '❤ Faruk', {
            fontSize: '14px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        });
        this.label.setScrollFactor(0);
        this.label.setDepth(902);

        // HP text
        this.hpText = scene.add.text(x + 75, y + 10, `${maxHP}/${maxHP}`, {
            fontSize: '11px', color: '#FFFFFF', fontFamily: 'Arial',
        });
        this.hpText.setOrigin(0.5, 0.5);
        this.hpText.setScrollFactor(0);
        this.hpText.setDepth(903);
    }

    setHP(value) {
        this.currentHP = Phaser.Math.Clamp(value, 0, this.maxHP);
        const ratio = this.currentHP / this.maxHP;
        this.fillBar.setSize(148 * ratio, 18);

        // Color based on health
        if (ratio > 0.6) this.fillBar.setFillStyle(0x00FF00);
        else if (ratio > 0.3) this.fillBar.setFillStyle(0xFFFF00);
        else this.fillBar.setFillStyle(0xFF0000);

        this.hpText.setText(`${Math.ceil(this.currentHP)}/${this.maxHP}`);
    }

    destroy() {
        this.bgBar.destroy();
        this.fillBar.destroy();
        this.border.destroy();
        this.label.destroy();
        this.hpText.destroy();
    }
}

export class EnemyHealthBar {
    constructor(scene, entity, maxHP = 50, width = 40) {
        this.scene = scene;
        this.entity = entity;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.barWidth = width;

        // Background
        this.bgBar = scene.add.rectangle(0, 0, width, 6, 0x333333);
        this.bgBar.setDepth(800);

        // Fill
        this.fillBar = scene.add.rectangle(0, 0, width, 6, 0xFF0000);
        this.fillBar.setDepth(801);

        this.visible = true;
    }

    setHP(value) {
        this.currentHP = Phaser.Math.Clamp(value, 0, this.maxHP);
        const ratio = this.currentHP / this.maxHP;
        this.fillBar.setSize(this.barWidth * ratio, 6);
    }

    update() {
        if (!this.entity || !this.entity.active) {
            this.setVisible(false);
            return;
        }
        const x = this.entity.x;
        const y = this.entity.y - this.entity.displayHeight / 2 - 12;

        this.bgBar.setPosition(x, y);
        this.fillBar.setPosition(x - (this.barWidth - this.fillBar.width) / 2, y);
    }

    setVisible(v) {
        this.visible = v;
        this.bgBar.setVisible(v);
        this.fillBar.setVisible(v);
    }

    destroy() {
        this.bgBar.destroy();
        this.fillBar.destroy();
    }
}

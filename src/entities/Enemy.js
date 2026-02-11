// Enemy entity: Basic hostile NPC
import { EnemyHealthBar } from '../ui/HealthBar.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey = 'enemy', config = {}) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        // Stats
        this.maxHP = config.maxHP || 40;
        this.hp = this.maxHP;
        this.speed = config.speed || 80;
        this.damage = config.damage || 10;
        this.detectionRange = config.detectionRange || 200;
        this.isDead = false;
        this.facingRight = false;

        // Patrol
        this.patrolLeft = x - (config.patrolRange || 100);
        this.patrolRight = x + (config.patrolRange || 100);
        this.patrolDirection = 1;

        // Label
        this.nameLabel = scene.add.text(x, y - 35, config.name || 'Düşman', {
            fontSize: '10px', color: '#FF4444', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(801);

        // Health bar
        this.healthBar = new EnemyHealthBar(scene, this, this.maxHP);

        this.setDepth(5);
    }

    update(player) {
        if (this.isDead || !this.active) return;

        // Update label & health bar
        this.nameLabel.setPosition(this.x, this.y - this.displayHeight / 2 - 18);
        this.healthBar.update();

        if (!player || player.isDead) {
            this.patrol();
            return;
        }

        // Check distance to player
        const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (dist < this.detectionRange) {
            // Chase player
            if (player.x < this.x) {
                this.setVelocityX(-this.speed);
                this.setFlipX(true);
                this.facingRight = false;
            } else {
                this.setVelocityX(this.speed);
                this.setFlipX(false);
                this.facingRight = true;
            }
        } else {
            this.patrol();
        }
    }

    patrol() {
        if (this.x <= this.patrolLeft) {
            this.patrolDirection = 1;
        } else if (this.x >= this.patrolRight) {
            this.patrolDirection = -1;
        }
        this.setVelocityX(this.speed * 0.5 * this.patrolDirection);
        this.setFlipX(this.patrolDirection < 0);
    }

    takeDamage(amount) {
        if (this.isDead) return;

        this.hp -= amount;
        this.healthBar.setHP(this.hp);

        // Flash
        this.setTint(0xFFFFFF);
        this.scene.time.delayedCall(100, () => {
            if (this.active) this.clearTint();
        });

        // Knockback
        const kbDir = this.facingRight ? -1 : 1;
        this.setVelocityX(200 * kbDir);
        this.setVelocityY(-100);

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.setTint(0x333333);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.body.enable = false;
        this.healthBar.setVisible(false);

        this.scene.tweens.add({
            targets: [this, this.nameLabel],
            alpha: 0,
            duration: 800,
            onComplete: () => {
                this.nameLabel.destroy();
                this.healthBar.destroy();
                this.destroy();
            },
        });
    }

    destroy(fromScene) {
        if (this.nameLabel) this.nameLabel.destroy();
        if (this.healthBar) this.healthBar.destroy();
        super.destroy(fromScene);
    }
}

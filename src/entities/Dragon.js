// Dragon Boss entity - reworked AI with landing/rest mechanic
import { EnemyHealthBar } from '../ui/HealthBar.js';

export default class Dragon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dragon');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        // Stats
        this.maxHP = 200;
        this.hp = 200;
        this.damage = 20;
        this.isDead = false;
        this.facingRight = false;

        // AI State: 'flying', 'shooting', 'landing', 'resting', 'recovering', 'dead'
        this.aiState = 'flying';
        this.shotsInCycle = 0;
        this.maxShotsPerCycle = 20; // increases: 20 -> 25 -> 30
        this.cycleCount = 0;
        this.restDuration = 3000;

        // Movement
        this.baseY = y;
        this.moveTimer = 0;
        this.flyTargetX = x;
        this.flyTargetY = y;

        // Ground Y for landing
        this.groundY = scene.scale.height - 60;

        // Label
        this.nameLabel = scene.add.text(x, y - 55, '🐉 Angara Ejderhası', {
            fontSize: '14px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(801);

        // Health bar (wider)
        this.healthBar = new EnemyHealthBar(scene, this, this.maxHP, 100);

        // Fireball group
        this.fireballs = scene.physics.add.group({
            defaultKey: 'fireball',
            maxSize: 35,
        });

        // Shot counter display
        this.shotCounter = scene.add.text(x, y + 50, '', {
            fontSize: '10px', color: '#FF8800', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(802);

        this.setDepth(5);

        // Start AI loop
        this.startAI();
    }

    startAI() {
        // Start with a brief fly, then begin shooting
        this.aiState = 'shooting';
        this.shootLoop();
        this.flyMovement();
    }

    flyMovement() {
        this.movementTimer = this.scene.time.addEvent({
            delay: 2500,
            callback: () => {
                if (this.isDead || this.aiState === 'resting' || this.aiState === 'landing') return;
                const w = this.scene.scale.width;
                this.flyTargetX = Phaser.Math.Between(100, w - 100);
                this.flyTargetY = Phaser.Math.Between(60, 180);
            },
            loop: true,
        });
    }

    shootLoop() {
        this.fireballTimer = this.scene.time.addEvent({
            delay: 800,
            callback: () => {
                if (this.isDead) return;
                if (this.aiState !== 'shooting') return;

                this.shootFireball();
                this.shotsInCycle++;

                this.shotCounter.setText(`${this.shotsInCycle}/${this.maxShotsPerCycle}`);

                if (this.shotsInCycle >= this.maxShotsPerCycle) {
                    this.startLanding();
                }
            },
            loop: true,
        });
    }

    shootFireball() {
        if (!this.scene || !this.scene.player) return;

        const player = this.scene.player;
        const fireball = this.fireballs.get(this.x, this.y + 20);
        if (!fireball) return;

        fireball.setActive(true);
        fireball.setVisible(true);
        fireball.body.setAllowGravity(false);

        // Aim at player
        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        const speed = 220;
        fireball.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );

        // Destroy after 4s
        this.scene.time.delayedCall(4000, () => {
            if (fireball.active) {
                fireball.setActive(false);
                fireball.setVisible(false);
                fireball.body.stop();
            }
        });
    }

    startLanding() {
        this.aiState = 'landing';
        this.shotCounter.setText('İniyor...');

        // Dragon descends to ground
        this.scene.tweens.add({
            targets: this,
            y: this.groundY,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.startResting();
            },
        });
    }

    startResting() {
        this.aiState = 'resting';
        this.setTint(0x888888); // Gray to show tired
        this.shotCounter.setText('⚡ Dinleniyor! SALDIRI!');
        this.shotCounter.setColor('#00FF00');

        // Vulnerable notification
        if (this.scene.dialogue && !this.scene.dialogue.isActive) {
            // Brief visual indicator only
        }

        // Rest for 3 seconds, then recover
        this.scene.time.delayedCall(this.restDuration, () => {
            if (this.isDead) return;
            this.startRecovery();
        });
    }

    startRecovery() {
        this.aiState = 'recovering';
        this.clearTint();
        this.shotCounter.setText('Toparlanıyor...');
        this.shotCounter.setColor('#FF8800');

        // Fly back up
        this.scene.tweens.add({
            targets: this,
            y: Phaser.Math.Between(80, 160),
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                if (this.isDead) return;

                // Increase shots for next cycle
                this.cycleCount++;
                if (this.cycleCount === 1) this.maxShotsPerCycle = 25;
                else if (this.cycleCount >= 2) this.maxShotsPerCycle = 30;

                this.shotsInCycle = 0;
                this.aiState = 'shooting';
                this.shotCounter.setColor('#FF8800');
            },
        });
    }

    update() {
        if (this.isDead) return;

        // Floating movement while flying/shooting
        if (this.aiState === 'shooting' || this.aiState === 'flying') {
            this.moveTimer += 0.015;
            // Smooth movement toward target
            const dx = this.flyTargetX - this.x;
            const dy = this.flyTargetY - this.y;
            this.setVelocityX(dx * 0.5);
            this.setVelocityY(dy * 0.5 + Math.sin(this.moveTimer) * 20);

            // Keep in bounds
            if (this.x < 80) this.flyTargetX = 150;
            if (this.x > this.scene.scale.width - 80) this.flyTargetX = this.scene.scale.width - 150;
        } else if (this.aiState === 'resting') {
            this.setVelocity(0, 0);
        } else if (this.aiState === 'landing') {
            this.setVelocityX(0);
        }

        // Update UI
        this.nameLabel.setPosition(this.x, this.y - 55);
        this.healthBar.update();
        this.shotCounter.setPosition(this.x, this.y + this.displayHeight / 2 + 10);
    }

    takeDamage(amount) {
        if (this.isDead) return;

        // Damage cooldown to prevent multiple hits in rapid succession
        const now = this.scene.time.now;
        if (this.lastDamageTime && now - this.lastDamageTime < 400) return;
        this.lastDamageTime = now;

        // During resting, take more damage (melee sword)
        const actualDamage = this.aiState === 'resting' ? amount * 2 : amount;
        this.hp -= actualDamage;
        this.healthBar.setHP(this.hp);

        // Flash red then back
        this.setTint(0xFF4444);
        this.scene.time.delayedCall(150, () => {
            if (this.active && !this.isDead) {
                if (this.aiState === 'resting') {
                    this.setTint(0x888888);
                } else {
                    this.clearTint();
                }
            }
        });

        // Damage number popup
        const dmgText = this.scene.add.text(this.x + Phaser.Math.Between(-20, 20), this.y - 30, `-${actualDamage}`, {
            fontSize: '14px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(900);
        this.scene.tweens.add({
            targets: dmgText, y: dmgText.y - 40, alpha: 0,
            duration: 800, onComplete: () => dmgText.destroy(),
        });

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.aiState = 'dead';
        this.setVelocity(0, 0);
        if (this.fireballTimer) this.fireballTimer.destroy();
        if (this.movementTimer) this.movementTimer.destroy();

        // Clear all fireballs
        this.fireballs.children.each(fb => {
            fb.setActive(false);
            fb.setVisible(false);
        });

        this.shotCounter.setText('');

        // Dragon falls to ground dramatically
        this.scene.tweens.add({
            targets: this,
            y: this.groundY,
            angle: 15,
            duration: 1500,
            ease: 'Bounce',
            onComplete: () => {
                this.setTint(0x333333);
                // Trigger boss defeated callback (which will do the sword finishing)
                if (this.scene.onBossDefeated) {
                    this.scene.onBossDefeated();
                }
            },
        });
    }

    destroy(fromScene) {
        if (this.fireballTimer) this.fireballTimer.destroy();
        if (this.movementTimer) this.movementTimer.destroy();
        if (this.nameLabel) this.nameLabel.destroy();
        if (this.healthBar) this.healthBar.destroy();
        if (this.shotCounter) this.shotCounter.destroy();
        super.destroy(fromScene);
    }
}

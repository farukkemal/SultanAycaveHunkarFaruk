// Player entity: Faruk with checkpoint respawn and arrow attack
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey = 'faruk-armor') {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        // Stats
        this.maxHP = 100;
        this.hp = 100;
        this.speed = 200;
        this.jumpForce = -400;
        this.attackDamage = 20;
        this.isAttacking = false;
        this.attackCooldown = false;
        this.isInvulnerable = false;
        this.facingRight = true;
        this.isDead = false;
        this.canControl = true;

        // Checkpoint
        this.checkpointX = x;
        this.checkpointY = y;
        this.respawnHP = 100;

        // Attack mode: 'melee' or 'arrow'
        this.attackMode = 'melee';

        // Arrow group (created when needed)
        this.arrows = null;

        // Label
        this.label = scene.add.text(x, y - 35, 'Faruk', {
            fontSize: '11px', color: '#FFD700', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(0.5);

        // Attack hitbox (for melee)
        this.attackHitbox = scene.add.rectangle(0, 0, 30, 40, 0xFF0000, 0);
        scene.physics.add.existing(this.attackHitbox, false);
        this.attackHitbox.body.setAllowGravity(false);
        this.attackHitbox.body.enable = false;

        this.setDepth(10);
    }

    setCheckpoint(x, y) {
        this.checkpointX = x;
        this.checkpointY = y;
        this.respawnHP = Math.max(this.hp, 50); // At least 50 HP on respawn
    }

    enableArrowMode() {
        this.attackMode = 'arrow';
        this.arrows = this.scene.physics.add.group({
            defaultKey: 'arrow',
            maxSize: 20,
        });
    }

    handleInput(input) {
        if (!this.canControl || this.isDead) return;

        // Horizontal movement
        if (input.left) {
            this.setVelocityX(-this.speed);
            this.facingRight = false;
            this.setFlipX(true);
        } else if (input.right) {
            this.setVelocityX(this.speed);
            this.facingRight = true;
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        // Jump
        if (input.jump && this.body.blocked.down) {
            this.setVelocityY(this.jumpForce);
        }

        // Attack
        if (input.attack && !this.attackCooldown) {
            if (this.attackMode === 'arrow') {
                this.shootArrow();
            } else {
                this.performAttack();
            }
        }
    }

    performAttack() {
        if (this.isAttacking || this.attackCooldown) return;

        this.isAttacking = true;
        this.attackCooldown = true;

        // Position hitbox
        const offsetX = this.facingRight ? 30 : -30;
        this.attackHitbox.setPosition(this.x + offsetX, this.y);
        this.attackHitbox.body.enable = true;

        // Visual flash
        this.setTint(0xFFFFFF);

        // Create swing visual
        const slash = this.scene.add.rectangle(
            this.x + offsetX, this.y, 30, 40, 0xFFFFFF, 0.5
        );
        slash.setDepth(11);

        this.scene.time.delayedCall(150, () => {
            this.attackHitbox.body.enable = false;
            this.isAttacking = false;
            slash.destroy();
            this.clearTint();
        });

        this.scene.time.delayedCall(400, () => {
            this.attackCooldown = false;
        });
    }

    shootArrow() {
        if (this.attackCooldown || !this.arrows) return;

        this.attackCooldown = true;

        // Get mouse world position
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);

        const arrow = this.arrows.get(this.x, this.y);
        if (!arrow) { this.attackCooldown = false; return; }

        arrow.setActive(true);
        arrow.setVisible(true);
        arrow.body.setAllowGravity(false);

        // Calculate angle to mouse
        const angle = Phaser.Math.Angle.Between(this.x, this.y, worldPoint.x, worldPoint.y);
        const arrowSpeed = 400;

        arrow.setVelocityX(Math.cos(angle) * arrowSpeed);
        arrow.setVelocityY(Math.sin(angle) * arrowSpeed);
        arrow.setRotation(angle);

        // Flip player to face mouse direction
        if (worldPoint.x < this.x) {
            this.facingRight = false;
            this.setFlipX(true);
        } else {
            this.facingRight = true;
            this.setFlipX(false);
        }

        // Auto-destroy after 3 seconds
        this.scene.time.delayedCall(3000, () => {
            if (arrow.active) {
                arrow.setActive(false);
                arrow.setVisible(false);
                arrow.body.stop();
            }
        });

        this.scene.time.delayedCall(300, () => {
            this.attackCooldown = false;
        });
    }

    // Melee sword attack (for boss finishing move)
    performSwordAttack() {
        this.isAttacking = true;

        const offsetX = this.facingRight ? 30 : -30;
        this.attackHitbox.setPosition(this.x + offsetX, this.y);
        this.attackHitbox.body.enable = true;

        // Create visible sword slash
        const swordImg = this.scene.add.image(this.x + offsetX, this.y - 5, 'sword').setDepth(12);
        const slash = this.scene.add.rectangle(
            this.x + offsetX, this.y, 35, 45, 0xFFFF00, 0.4
        ).setDepth(11);

        this.scene.time.delayedCall(200, () => {
            this.attackHitbox.body.enable = false;
            this.isAttacking = false;
            slash.destroy();
            swordImg.destroy();
        });
    }

    takeDamage(amount) {
        if (this.isInvulnerable || this.isDead) return;

        this.hp -= amount;
        this.isInvulnerable = true;

        // Flash red
        this.setTint(0xFF0000);

        // Knockback
        const kbX = this.facingRight ? -150 : 150;
        this.setVelocityX(kbX);
        this.setVelocityY(-150);

        // Update health bar
        if (this.scene.playerHealthBar) {
            this.scene.playerHealthBar.setHP(this.hp);
        }

        if (this.hp <= 0) {
            this.die();
            return;
        }

        // Invulnerability flashing
        let flashCount = 0;
        const flashTimer = this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                flashCount++;
                this.setAlpha(flashCount % 2 === 0 ? 1 : 0.3);
                if (flashCount >= 10) {
                    flashTimer.destroy();
                    this.setAlpha(1);
                    this.clearTint();
                    this.isInvulnerable = false;
                }
            },
            loop: true,
        });
    }

    die() {
        this.isDead = true;
        this.canControl = false;
        this.setVelocityX(0);
        this.setTint(0xFF0000);

        // Respawn at checkpoint after delay
        this.scene.time.delayedCall(1500, () => {
            this.respawnAtCheckpoint();
        });
    }

    respawnAtCheckpoint() {
        this.isDead = false;
        this.canControl = true;
        this.hp = this.respawnHP;
        this.setPosition(this.checkpointX, this.checkpointY);
        this.setVelocity(0, 0);
        this.clearTint();
        this.setAlpha(1);
        this.isInvulnerable = false;

        if (this.scene.playerHealthBar) {
            this.scene.playerHealthBar.setHP(this.hp);
        }

        // Brief invulnerability after respawn
        this.isInvulnerable = true;
        let flashCount = 0;
        const flashTimer = this.scene.time.addEvent({
            delay: 150,
            callback: () => {
                flashCount++;
                this.setAlpha(flashCount % 2 === 0 ? 1 : 0.4);
                if (flashCount >= 8) {
                    flashTimer.destroy();
                    this.setAlpha(1);
                    this.isInvulnerable = false;
                }
            },
            loop: true,
        });
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHP);
        if (this.scene.playerHealthBar) {
            this.scene.playerHealthBar.setHP(this.hp);
        }
    }

    update() {
        if (this.label && this.active) {
            this.label.setPosition(this.x, this.y - this.displayHeight / 2 - 10);
        }

        // Fall off world -> respawn
        if (this.y > this.scene.scale.height + 50 && !this.isDead) {
            this.hp -= 20;
            if (this.scene.playerHealthBar) {
                this.scene.playerHealthBar.setHP(this.hp);
            }
            if (this.hp <= 0) {
                this.die();
            } else {
                this.setPosition(this.checkpointX, this.checkpointY);
                this.setVelocity(0, 0);
            }
        }
    }

    destroy(fromScene) {
        if (this.label) this.label.destroy();
        if (this.attackHitbox) this.attackHitbox.destroy();
        super.destroy(fromScene);
    }
}

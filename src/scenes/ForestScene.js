// Scene 3: Forest Path - Action Platformer (must kill all enemies)
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import InputManager from '../utils/InputManager.js';
import DialogueBox from '../ui/DialogueBox.js';
import { PlayerHealthBar } from '../ui/HealthBar.js';

export default class ForestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ForestScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(3);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const worldWidth = width * 4;
        this.physics.world.setBounds(0, 0, worldWidth, height);

        // Dawn sky gradient
        this.cameras.main.setBackgroundColor('#2a4060');
        // Sun rising
        this.add.circle(worldWidth - 200, 80, 30, 0xFFAA44, 0.6);
        this.add.circle(worldWidth - 200, 80, 20, 0xFFCC66, 0.4);
        // Clouds
        for (let i = 0; i < 8; i++) {
            const cx = Phaser.Math.Between(0, worldWidth);
            this.add.ellipse(cx, Phaser.Math.Between(30, 80), Phaser.Math.Between(60, 120), 20, 0xffffff, 0.15);
        }

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 64) {
            this.platforms.create(x + 32, height - 16, 'ground').refreshBody();
        }

        // Elevated platforms
        this.createPlatformGroup(300, height - 100, 3);
        this.createPlatformGroup(600, height - 170, 2);
        this.createPlatformGroup(900, height - 120, 4);
        this.createPlatformGroup(1200, height - 200, 3);
        this.createPlatformGroup(1500, height - 130, 2);
        this.createPlatformGroup(1800, height - 180, 3);
        this.createPlatformGroup(2100, height - 100, 4);
        this.createPlatformGroup(2400, height - 160, 2);
        this.createPlatformGroup(2700, height - 200, 3);

        // Trees
        for (let i = 0; i < 25; i++) {
            const tx = Phaser.Math.Between(50, worldWidth - 50);
            this.add.image(tx, height - 65, 'tree').setDepth(1);
        }

        // Flowers
        for (let i = 0; i < 15; i++) {
            this.add.image(Phaser.Math.Between(50, worldWidth), height - 38, 'flower');
        }

        // Player
        this.player = new Player(this, 100, height - 80);
        this.physics.add.collider(this.player, this.platforms);

        // Camera
        this.cameras.main.setBounds(0, 0, worldWidth, height);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Checkpoints
        this.checkpoints = [];
        this.createCheckpoint(800, height - 50);
        this.createCheckpoint(1600, height - 50);
        this.createCheckpoint(2400, height - 50);

        // Enemies - must kill all to proceed!
        this.enemies = [];
        const positions = [
            { x: 500 }, { x: 900 }, { x: 1300 },
            { x: 1600 }, { x: 2000 }, { x: 2400 }, { x: 2800 },
        ];
        positions.forEach(ep => {
            const enemy = new Enemy(this, ep.x, height - 80, 'soldier', {
                name: 'Kale Askeri',
                patrolRange: 120, speed: 70,
            });
            this.physics.add.collider(enemy, this.platforms);
            this.enemies.push(enemy);
        });

        // Collisions
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(this.player.attackHitbox, enemy, (hitbox, e) => {
                if (this.player.isAttacking && !e.isDead) {
                    e.takeDamage(this.player.attackDamage);
                }
            });
            this.physics.add.overlap(this.player, enemy, (p, e) => {
                if (!e.isDead) this.player.takeDamage(e.damage);
            });
        });

        // Input
        this.input_mgr = new InputManager(this);

        // Health bar
        this.playerHealthBar = new PlayerHealthBar(this);

        // Dialogue
        this.dialogue = new DialogueBox(this);

        // Goal zone - LOCKED until all enemies dead
        this.goalZone = this.add.rectangle(worldWidth - 50, height - 100, 40, 120, 0xFF0000, 0.3);
        this.physics.add.existing(this.goalZone, true);

        this.goalText = this.add.text(worldWidth - 50, height - 170, '🔒 Düşmanları Yen!', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial',
        }).setOrigin(0.5);

        this.physics.add.overlap(this.player, this.goalZone, () => {
            if (this.allEnemiesDead()) this.reachGoal();
        });

        this.goalReached = false;

        // Enemy kill counter
        this.killCountText = this.add.text(width - 20, 50, '', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(900);

        // Intro
        this.time.delayedCall(500, () => {
            this.player.canControl = false;
            this.dialogue.showDialogue([
                { speaker: 'Anlatıcı', text: 'Hünkar Faruk, saraydan çıkıp orman yoluna girdi.' },
                { speaker: 'Anlatıcı', text: 'Düşman kale askerlerini yenmeden ilerleyemez! Tüm düşmanları yen!' },
                { speaker: 'Anlatıcı', text: 'Kontroller: WASD - Hareket | SPACE - Zıpla | SOL TIK - Saldır' },
            ], () => {
                this.player.canControl = true;
            });
        });
    }

    createPlatformGroup(startX, y, count) {
        for (let i = 0; i < count; i++) {
            this.platforms.create(startX + i * 64, y, 'ground').refreshBody();
        }
    }

    createCheckpoint(x, y) {
        const flag = this.add.image(x, y - 25, 'checkpoint');
        const zone = this.add.rectangle(x, y, 40, 60, 0x000000, 0);
        this.physics.add.existing(zone, true);

        const cp = { x, y, flag, zone, activated: false };
        this.checkpoints.push(cp);

        this.physics.add.overlap(this.player, zone, () => {
            if (!cp.activated) {
                cp.activated = true;
                flag.setTexture('checkpoint-active');
                this.player.setCheckpoint(x, y - 20);
                this.cameras.main.flash(200, 0, 255, 0);
            }
        });
    }

    allEnemiesDead() {
        return this.enemies.every(e => e.isDead);
    }

    reachGoal() {
        if (this.goalReached) return;
        this.goalReached = true;
        this.player.canControl = false;
        this.player.setVelocityX(0);

        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'Yolumu açtım! Kale önüne ulaşmalıyım.' },
        ], () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('CastleApproachScene');
            });
        });
    }

    update() {
        if (this.player && !this.player.isDead) {
            this.player.handleInput(this.input_mgr);
            this.player.update();
        }

        this.enemies.forEach(e => {
            if (!e.isDead) e.update(this.player);
        });

        // Update kill counter
        const alive = this.enemies.filter(e => !e.isDead).length;
        const total = this.enemies.length;
        this.killCountText.setText(`⚔ ${total - alive}/${total}`);

        // Update goal appearance
        if (this.allEnemiesDead() && !this.goalReached) {
            this.goalZone.setFillStyle(0x00FF00, 0.3);
            this.goalText.setText('→ İlerle!');
            this.goalText.setColor('#00FF00');
        }
    }
}

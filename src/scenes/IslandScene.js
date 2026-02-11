// Scene 6: Island Climb - Hard Action Platformer with Checkpoints
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import InputManager from '../utils/InputManager.js';
import DialogueBox from '../ui/DialogueBox.js';
import { PlayerHealthBar } from '../ui/HealthBar.js';

export default class IslandScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IslandScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(6);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const worldWidth = width * 3;
        this.physics.world.setBounds(0, 0, worldWidth, height);

        // Sunset sky
        this.cameras.main.setBackgroundColor('#663344');
        this.add.circle(worldWidth - 100, 100, 35, 0xFF6633, 0.6);
        for (let i = 0; i < 5; i++) {
            this.add.ellipse(Phaser.Math.Between(0, worldWidth), Phaser.Math.Between(20, 80),
                80, 15, 0xFF8866, 0.1);
        }

        // Ground platforms
        this.platforms = this.physics.add.staticGroup();

        // Section 1
        for (let x = 0; x < 500; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Gap then continue
        for (let x = 570; x < 900; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Floating platforms
        this.platforms.create(950, height - 90, 'stone-ground').refreshBody();
        this.platforms.create(1014, height - 90, 'stone-ground').refreshBody();
        this.platforms.create(1120, height - 140, 'stone-ground').refreshBody();
        this.platforms.create(1184, height - 140, 'stone-ground').refreshBody();

        // More ground
        for (let x = 1250; x < 1700; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Upper path
        this.platforms.create(1750, height - 80, 'stone-ground').refreshBody();
        this.platforms.create(1814, height - 80, 'stone-ground').refreshBody();
        this.platforms.create(1878, height - 130, 'stone-ground').refreshBody();
        this.platforms.create(1942, height - 130, 'stone-ground').refreshBody();

        // Final stretch
        for (let x = 2000; x < worldWidth; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Dark trees
        for (let i = 0; i < 15; i++) {
            this.add.image(Phaser.Math.Between(50, worldWidth - 50), height - 65, 'dark-tree').setDepth(1);
        }

        // Player
        this.player = new Player(this, 100, height - 80);
        this.physics.add.collider(this.player, this.platforms);

        // Camera
        this.cameras.main.setBounds(0, 0, worldWidth, height);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Checkpoints
        this.checkpoints = [];
        this.createCheckpoint(700, height - 50);
        this.createCheckpoint(1400, height - 50);
        this.createCheckpoint(2100, height - 50);

        // Monsters
        this.enemies = [];
        const positions = [
            { x: 400 }, { x: 750 }, { x: 1100 },
            { x: 1400 }, { x: 1650 }, { x: 2100 }, { x: 2400 },
        ];
        positions.forEach(ep => {
            const enemy = new Enemy(this, ep.x, height - 80, 'monster', {
                name: 'Ada Canavarı',
                patrolRange: 100, speed: 80,
            });
            this.physics.add.collider(enemy, this.platforms);
            this.enemies.push(enemy);
        });

        // Collisions
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(this.player.attackHitbox, enemy, (hitbox, e) => {
                if (this.player.isAttacking && !e.isDead) e.takeDamage(this.player.attackDamage);
            });
            this.physics.add.overlap(this.player, enemy, (p, e) => {
                if (!e.isDead) this.player.takeDamage(e.damage);
            });
        });

        // Input
        this.input_mgr = new InputManager(this);
        this.playerHealthBar = new PlayerHealthBar(this);
        this.dialogue = new DialogueBox(this);

        // Goal
        this.goalZone = this.add.rectangle(worldWidth - 50, height - 100, 40, 120, 0xFF0000, 0.3);
        this.physics.add.existing(this.goalZone, true);
        this.goalText = this.add.text(worldWidth - 50, height - 170, '🔒 Düşmanları Yen!', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.physics.add.overlap(this.player, this.goalZone, () => {
            if (this.allEnemiesDead()) this.reachGoal();
        });
        this.goalReached = false;

        this.killCountText = this.add.text(width - 20, 50, '', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(900);

        // Intro
        this.time.delayedCall(500, () => {
            this.player.canControl = false;
            this.dialogue.showDialogue([
                { speaker: 'Anlatıcı', text: 'Ejderha Adası\'na ulaştılar! Tehlikeli yaratıklar her yerde...' },
                { speaker: 'Hünkar Faruk', text: 'Ayça\'yı kurtarmak için bu canavarları da yeneceğim!' },
            ], () => {
                this.player.canControl = true;
            });
        });
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

    allEnemiesDead() { return this.enemies.every(e => e.isDead); }

    reachGoal() {
        if (this.goalReached) return;
        this.goalReached = true;
        this.player.canControl = false;
        this.player.setVelocityX(0);
        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'Karanlık ormana girdim. Ejderhanın ini yakın olmalı!' },
        ], () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('DarkForestScene');
            });
        });
    }

    update() {
        if (this.player && !this.player.isDead) {
            this.player.handleInput(this.input_mgr);
            this.player.update();
        }
        this.enemies.forEach(e => { if (!e.isDead) e.update(this.player); });

        const alive = this.enemies.filter(e => !e.isDead).length;
        this.killCountText.setText(`⚔ ${this.enemies.length - alive}/${this.enemies.length}`);

        if (this.allEnemiesDead() && !this.goalReached) {
            this.goalZone.setFillStyle(0x00FF00, 0.3);
            this.goalText.setText('→ İlerle!');
            this.goalText.setColor('#00FF00');
        }
    }
}

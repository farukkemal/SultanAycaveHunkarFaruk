// Scene 4: Castle Approach - NEW Battle Scene (kill all to proceed)
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import InputManager from '../utils/InputManager.js';
import DialogueBox from '../ui/DialogueBox.js';
import { PlayerHealthBar } from '../ui/HealthBar.js';

export default class CastleApproachScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CastleApproachScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(4);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const worldWidth = width * 3;
        this.physics.world.setBounds(0, 0, worldWidth, height);

        // Midday sky
        this.cameras.main.setBackgroundColor('#4488cc');
        this.add.circle(worldWidth * 0.7, 60, 25, 0xFFDD55, 0.9);
        // Clouds
        for (let i = 0; i < 6; i++) {
            const cloud = this.add.ellipse(
                Phaser.Math.Between(0, worldWidth), Phaser.Math.Between(30, 100),
                Phaser.Math.Between(80, 140), 25, 0xffffff, 0.25
            );
            this.tweens.add({
                targets: cloud, x: cloud.x + 60,
                duration: 8000, yoyo: true, repeat: -1,
            });
        }

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Castle walls in background
        for (let x = worldWidth - 500; x < worldWidth; x += 64) {
            for (let y = 0; y < height - 64; y += 64) {
                this.add.image(x + 32, y + 32, 'castle-wall').setAlpha(0.4);
            }
        }

        // Platforms
        this.createPlatformGroup(250, height - 110, 3);
        this.createPlatformGroup(500, height - 180, 2);
        this.createPlatformGroup(800, height - 130, 3);
        this.createPlatformGroup(1100, height - 160, 2);
        this.createPlatformGroup(1400, height - 200, 3);
        this.createPlatformGroup(1700, height - 120, 4);
        this.createPlatformGroup(2000, height - 170, 2);

        // Trees
        for (let i = 0; i < 15; i++) {
            this.add.image(Phaser.Math.Between(50, worldWidth - 500), height - 65, 'tree').setDepth(1);
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

        // Stronger enemies
        this.enemies = [];
        const positions = [
            { x: 400, name: 'Kale Muhafızı' },
            { x: 700, name: 'Zırhlı Asker' },
            { x: 1000, name: 'Kale Komutanı' },
            { x: 1300, name: 'Zırhlı Asker' },
            { x: 1600, name: 'Kale Muhafızı' },
            { x: 1900, name: 'Elit Muhafız' },
            { x: 2100, name: 'Kale Komutanı' },
            { x: 2300, name: 'Kale Şövalyesi' },
        ];
        positions.forEach(ep => {
            const enemy = new Enemy(this, ep.x, height - 80, 'soldier', {
                name: ep.name,
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

        // Input, health, dialogue
        this.input_mgr = new InputManager(this);
        this.playerHealthBar = new PlayerHealthBar(this);
        this.dialogue = new DialogueBox(this);

        // Goal - locked
        this.goalZone = this.add.rectangle(worldWidth - 50, height - 100, 40, 120, 0xFF0000, 0.3);
        this.physics.add.existing(this.goalZone, true);
        this.goalText = this.add.text(worldWidth - 50, height - 170, '🔒 Düşmanları Yen!', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.physics.add.overlap(this.player, this.goalZone, () => {
            if (this.allEnemiesDead()) this.reachGoal();
        });
        this.goalReached = false;

        // Kill counter
        this.killCountText = this.add.text(width - 20, 50, '', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(900);

        // Intro
        this.time.delayedCall(500, () => {
            this.player.canControl = false;
            this.dialogue.showDialogue([
                { speaker: 'Anlatıcı', text: 'Hünkar Faruk, düşman kalesinin önüne ulaştı!' },
                { speaker: 'Hünkar Faruk', text: 'Bu askerleri yenmeden limana ulaşamam. Kılıcım hazır!' },
                { speaker: 'Anlatıcı', text: 'Tüm düşmanları yenip kapıyı aç!' },
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
        this.checkpoints = this.checkpoints || [];
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
            { speaker: 'Hünkar Faruk', text: 'Kale askerleri yenildi! Şimdi limana!' },
        ], () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('PortScene');
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

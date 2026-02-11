// Scene 7: Dark Forest - NEW Battle Scene before boss (kill all to proceed)
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import InputManager from '../utils/InputManager.js';
import DialogueBox from '../ui/DialogueBox.js';
import { PlayerHealthBar } from '../ui/HealthBar.js';

export default class DarkForestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DarkForestScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(7);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const worldWidth = width * 3;
        this.physics.world.setBounds(0, 0, worldWidth, height);

        // Dark night sky
        this.cameras.main.setBackgroundColor('#0a0a1a');

        // Eerie stars
        for (let i = 0; i < 30; i++) {
            const star = this.add.image(
                Phaser.Math.Between(0, worldWidth),
                Phaser.Math.Between(10, height * 0.3),
                'star'
            ).setAlpha(Phaser.Math.FloatBetween(0.1, 0.4));
            this.tweens.add({
                targets: star, alpha: 0,
                duration: Phaser.Math.Between(500, 2000),
                yoyo: true, repeat: -1,
            });
        }

        // Red moon (ominous)
        this.add.circle(worldWidth * 0.7, 60, 22, 0xFF4444, 0.5);
        this.add.circle(worldWidth * 0.7, 58, 15, 0xFF6666, 0.3);

        // Fog effect
        for (let i = 0; i < 12; i++) {
            const fog = this.add.ellipse(
                Phaser.Math.Between(0, worldWidth),
                height - Phaser.Math.Between(40, 120),
                Phaser.Math.Between(100, 250), Phaser.Math.Between(20, 50),
                0x224422, 0.15
            );
            this.tweens.add({
                targets: fog, x: fog.x + Phaser.Math.Between(-40, 40),
                alpha: fog.alpha + 0.05,
                duration: Phaser.Math.Between(3000, 6000),
                yoyo: true, repeat: -1,
            });
        }

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Tricky platforms
        this.createPG(300, height - 100, 2);
        this.createPG(550, height - 160, 3);
        this.createPG(900, height - 120, 2);
        this.createPG(1200, height - 190, 3);
        this.createPG(1500, height - 130, 2);
        this.createPG(1800, height - 170, 3);
        this.createPG(2100, height - 110, 2);

        // Dark trees
        for (let i = 0; i < 20; i++) {
            this.add.image(Phaser.Math.Between(50, worldWidth - 50), height - 65, 'dark-tree').setDepth(1).setAlpha(0.8);
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

        // Strong monsters
        this.enemies = [];
        const positions = [
            { x: 350 }, { x: 600 }, { x: 900 }, { x: 1200 },
            { x: 1500 }, { x: 1800 }, { x: 2100 }, { x: 2300 },
        ];
        positions.forEach(ep => {
            const enemy = new Enemy(this, ep.x, height - 80, 'monster', {
                name: 'Gece Canavarı',
                patrolRange: 80, speed: 90,
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

        this.killCountText = this.add.text(width - 20, 50, '', {
            fontSize: '12px', color: '#FF4444', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(900);

        // Intro
        this.time.delayedCall(500, () => {
            this.player.canControl = false;
            this.dialogue.showDialogue([
                { speaker: 'Anlatıcı', text: 'Karanlık orman... Ejderhanın ininin önündeki son engel.' },
                { speaker: 'Hünkar Faruk', text: 'Buradaki yaratıklar çok güçlü! Lakin Sultan Ayça için yılmam!' },
                { speaker: 'Anlatıcı', text: 'Zinhar dikkat edin Hünkarım! Bu canavarlar tehlikelidir!' },
            ], () => {
                this.player.canControl = true;
            });
        });
    }

    createPG(startX, y, count) {
        for (let i = 0; i < count; i++) {
            this.platforms.create(startX + i * 64, y, 'stone-ground').refreshBody();
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

    allEnemiesDead() { return this.enemies.every(e => e.isDead); }

    reachGoal() {
        if (this.goalReached) return;
        this.goalReached = true;
        this.player.canControl = false;
        this.player.setVelocityX(0);
        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'İşte karşımda... Angara Ejderhası\'nın ini! Sultan Ayça, geliyorum!' },
        ], () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('BossScene');
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
            this.goalText.setText('→ Ejderha İni!');
            this.goalText.setColor('#00FF00');
        }
    }
}

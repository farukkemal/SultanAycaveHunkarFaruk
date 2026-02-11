// Scene 8: The Dragon's Lair - Boss Fight (Angara Ejderhası)
import Player from '../entities/Player.js';
import Dragon from '../entities/Dragon.js';
import InputManager from '../utils/InputManager.js';
import DialogueBox from '../ui/DialogueBox.js';
import { PlayerHealthBar } from '../ui/HealthBar.js';

export default class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(8);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Night sky with red tint
        this.cameras.main.setBackgroundColor('#0a0505');
        for (let i = 0; i < 20; i++) {
            const star = this.add.image(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(5, height * 0.2),
                'star'
            ).setAlpha(Phaser.Math.FloatBetween(0.1, 0.3));
            this.tweens.add({
                targets: star, alpha: 0,
                duration: Phaser.Math.Between(800, 2000),
                yoyo: true, repeat: -1,
            });
        }

        // Cave walls background
        for (let x = 0; x < width; x += 64) {
            for (let y = 0; y < height - 64; y += 64) {
                this.add.image(x + 32, y + 32, 'cave-wall').setAlpha(0.6);
            }
        }

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Platforms for dodging
        this.platforms.create(150, height - 120, 'stone-ground').refreshBody();
        this.platforms.create(214, height - 120, 'stone-ground').refreshBody();
        this.platforms.create(width - 150, height - 120, 'stone-ground').refreshBody();
        this.platforms.create(width - 214, height - 120, 'stone-ground').refreshBody();
        this.platforms.create(width / 2, height - 180, 'stone-ground').refreshBody();
        this.platforms.create(width / 2 + 64, height - 180, 'stone-ground').refreshBody();

        // Lava/fire glow at bottom
        for (let x = 0; x < width; x += 40) {
            const lava = this.add.rectangle(x + 20, height - 5, 40, 10, 0xFF4400, 0.3);
            this.tweens.add({
                targets: lava, alpha: 0.6,
                duration: 500 + Math.random() * 500,
                yoyo: true, repeat: -1,
            });
        }

        // Ayça
        this.ayca = this.add.image(width - 80, height - 50, 'ayca');
        this.ayca.setAngle(90);
        this.aycaLabel = this.add.text(width - 80, height - 85, 'Sultan Ayça 💤', {
            fontSize: '11px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Safe corner
        this.safeZone = this.add.rectangle(60, height - 60, 80, 80, 0x00FF00, 0.1);
        this.add.text(60, height - 110, 'Güvenli Alan', {
            fontSize: '9px', color: '#00FF00', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Player
        this.player = new Player(this, width / 2, height - 60);
        this.physics.add.collider(this.player, this.platforms);
        this.player.canControl = false;
        this.player.enableArrowMode();

        // Input, health, dialogue
        this.input_mgr = new InputManager(this);
        this.playerHealthBar = new PlayerHealthBar(this);
        this.dialogue = new DialogueBox(this);

        // State
        this.phase = 'intro';
        this.dragon = null;

        this.startIntro();
    }

    startIntro() {
        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'Sultan Ayça! Sultanım seni buldum!' },
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk, Sultan Ayça\'nın yanına koştu. Lakin Ayça baygındı...' },
        ], () => {
            this.tweens.add({
                targets: this.player,
                x: this.ayca.x - 30,
                duration: 1000,
                onComplete: () => this.tryWakeAyca(),
            });
        });
    }

    tryWakeAyca() {
        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'Sultanım! Uyan! Lütfen uyan canım Ayça! 😢' },
            { speaker: 'Anlatıcı', text: '...Sultan Ayça uyanmıyor. Lakin nefes alıyor. Hayatta!' },
            { speaker: 'Hünkar Faruk', text: 'Onu güvenli alana taşımalıyım. Sırtıma alacağım!' },
        ], () => this.carryAyca());
    }

    carryAyca() {
        const { width, height } = this.scale;

        this.ayca.setAngle(0);
        this.tweens.add({
            targets: this.ayca,
            x: this.player.x, y: this.player.y - 25,
            duration: 500,
        });

        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk, Sultan Ayça\'yı sırtına aldı. Güvenli köşeye taşımalı.' },
        ], () => {
            this.tweens.add({
                targets: [this.player],
                x: 60, duration: 1500,
                onComplete: () => {
                    this.tweens.add({
                        targets: this.ayca,
                        x: 60, y: height - 50, duration: 300,
                    });
                    this.aycaLabel.setPosition(60, height - 85);
                    this.aycaLabel.setText('Sultan Ayça (Güvende) 💤');

                    this.dialogue.showDialogue([
                        { speaker: 'Hünkar Faruk', text: 'Burada güvendesin Sultanım. Şimdi o ejderhayı yenmem gerekiyor!' },
                    ], () => this.spawnDragon());
                },
            });
        });
    }

    spawnDragon() {
        const { width, height } = this.scale;

        this.cameras.main.shake(1000, 0.03);
        this.cameras.main.flash(500, 255, 0, 0);

        this.dialogue.showDialogue([
            { speaker: 'Angara Ejderhası', text: '🔥🔥🔥 KİMSE BENDEN KAÇAMAZ! 🔥🔥🔥' },
            { speaker: 'Anlatıcı', text: 'Angara Ejderhası kükredi! Namı ala kötü bu yaratık, kraliçeleri kaçırır ve onları yer!' },
            { speaker: 'Hünkar Faruk', text: 'Gel bakalım canavar! Okumla ve kılıcımla seni yeneceğim!' },
            { speaker: 'Anlatıcı', text: 'Ejderha alev topları attıktan sonra yere inecek - o zaman kılıçla saldır!' },
            { speaker: 'Anlatıcı', text: 'SOL TIK = Ok at (mouse yönüne) | Ejderha yerdeyken yaklaş ve SOL TIK = Kılıç' },
        ], () => {
            this.dragon = new Dragon(this, width / 2, 120);

            // Arrow hits dragon
            this.physics.add.overlap(this.player.arrows, this.dragon, (arrow, dragon) => {
                if (arrow.active && !this.dragon.isDead) {
                    this.dragon.takeDamage(this.player.attackDamage);
                    arrow.setActive(false);
                    arrow.setVisible(false);
                    if (arrow.body) arrow.body.stop();
                }
            });

            // Melee on resting dragon
            this.physics.add.overlap(this.player.attackHitbox, this.dragon, () => {
                if (this.player.isAttacking && this.dragon.aiState === 'resting') {
                    this.dragon.takeDamage(this.player.attackDamage);
                }
            });

            // Dragon contact
            this.physics.add.overlap(this.player, this.dragon, () => {
                if (!this.dragon.isDead) this.player.takeDamage(this.dragon.damage);
            });

            // Fireballs
            this.physics.add.overlap(this.player, this.dragon.fireballs, (p, fireball) => {
                if (fireball.active) {
                    this.player.takeDamage(15);
                    fireball.setActive(false);
                    fireball.setVisible(false);
                    if (fireball.body) fireball.body.stop();
                }
            });

            this.phase = 'fight';
            this.player.canControl = true;
            this.player.x = width / 2;
            this.player.setCheckpoint(width / 2, height - 60);
        });
    }

    onBossDefeated() {
        this.phase = 'finishing';
        this.player.canControl = false;
        this.player.setVelocityX(0);

        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Angara Ejderhası yere düştü! Hünkar Faruk kılıcını çekti...' },
            { speaker: 'Hünkar Faruk', text: 'Bu kılıç darbesini Sultan Ayça için atıyorum! Zinhar affinı bekleme!' },
        ], () => {
            this.tweens.add({
                targets: this.player,
                x: this.dragon.x - 30, duration: 1200,
                onComplete: () => {
                    this.player.attackMode = 'melee';
                    this.player.performSwordAttack();
                    this.cameras.main.shake(500, 0.04);
                    this.cameras.main.flash(300, 255, 255, 255);

                    this.time.delayedCall(500, () => {
                        this.tweens.add({
                            targets: [this.dragon],
                            alpha: 0, scaleX: 0.5, scaleY: 0.5,
                            duration: 2000,
                            onComplete: () => {
                                if (this.dragon.healthBar) this.dragon.healthBar.setVisible(false);
                                if (this.dragon.nameLabel) this.dragon.nameLabel.setVisible(false);
                                this.victoryScene();
                            },
                        });
                    });
                },
            });
        });
    }

    victoryScene() {
        this.player.hp = 10;
        this.playerHealthBar.setHP(10);
        this.player.setTint(0xFF4444);

        let flashCount = 0;
        this.flashTimer = this.time.addEvent({
            delay: 500,
            callback: () => {
                flashCount++;
                this.player.setTint(flashCount % 2 === 0 ? 0xFF4444 : 0xFFFFFF);
                if (flashCount > 10 && this.flashTimer) this.flashTimer.destroy();
            },
            loop: true,
        });

        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk, Angara Ejderhası\'nı yendi! Lakin ağır yaralıydı...' },
            { speaker: 'Hünkar Faruk', text: 'Sultanım... Yaptım... Seni kurtardım...' },
        ], () => this.kissScene());
    }

    kissScene() {
        const { width, height } = this.scale;

        this.tweens.add({
            targets: this.player,
            x: this.ayca.x + 20, duration: 1500,
            onComplete: () => {
                for (let i = 0; i < 8; i++) {
                    const heart = this.add.image(
                        this.ayca.x + Phaser.Math.Between(-30, 30),
                        this.ayca.y - 20, 'heart'
                    ).setScale(0.5).setDepth(500);
                    this.tweens.add({
                        targets: heart, y: heart.y - 60, alpha: 0,
                        duration: 1500, delay: i * 200,
                    });
                }

                this.dialogue.showDialogue([
                    { speaker: 'Anlatıcı', text: 'Hünkar Faruk, Sultan Ayça\'yı öptü... ♥' },
                    { speaker: 'Sultan Ayça', text: '...H-Hünkarım? Sen... Benim için geldin mi?' },
                    { speaker: 'Hünkar Faruk', text: 'Elbette geldim Sultanım. Seni çok seviyorum. Zinhar seni bırakamazdım.' },
                    { speaker: 'Sultan Ayça', text: 'Hünkarım! Yaralısın! Allah\'ım ne oldu sana?! 😢' },
                    { speaker: 'Hünkar Faruk', text: 'Ehemmiyeti yok Sultanım. Önemli olan senin güvende olman.' },
                    { speaker: 'Sultan Ayça', text: 'Lakin Hünkarım, bu yaralarla nasıl döneceğiz?' },
                    { speaker: 'Hünkar Faruk', text: 'Aşk bana güç verir Sultanım. Hadi eve dönelim!' },
                ], () => {
                    this.ayca.setAngle(0);
                    this.ayca.y -= 10;
                    this.cameras.main.fadeOut(2000, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('CityGateScene');
                    });
                });
            },
        });
    }

    update() {
        if (this.player && !this.player.isDead && this.phase === 'fight') {
            if (this.dragon && this.dragon.aiState === 'resting') {
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.dragon.x, this.dragon.y);
                this.player.attackMode = dist < 80 ? 'melee' : 'arrow';
            } else {
                this.player.attackMode = 'arrow';
            }
            this.player.handleInput(this.input_mgr);
            this.player.update();
        }

        if (this.dragon && !this.dragon.isDead) {
            this.dragon.update();
        }
    }
}

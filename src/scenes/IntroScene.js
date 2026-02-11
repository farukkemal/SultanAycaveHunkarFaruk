// Scene 1: Intro - Romantic dinner, dragon attacks, stone hits Faruk, Ayça kidnapped
import DialogueBox from '../ui/DialogueBox.js';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(1);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Night sky
        this.cameras.main.setBackgroundColor('#0a0a2a');
        for (let i = 0; i < 30; i++) {
            const star = this.add.image(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(5, height * 0.4),
                'star'
            ).setAlpha(Phaser.Math.FloatBetween(0.2, 0.6));
            this.tweens.add({
                targets: star, alpha: 0.1,
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true, repeat: -1,
            });
        }
        // Moon
        this.add.circle(width - 100, 50, 22, 0xFFEECC, 0.6);

        // Floor
        for (let x = 0; x < width; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground');
        }

        // Castle walls
        for (let y = 0; y < height - 100; y += 64) {
            this.add.image(16, y + 32, 'castle-wall').setAlpha(0.5);
            this.add.image(width - 16, y + 32, 'castle-wall').setAlpha(0.5);
        }

        // Table at center
        this.table = this.add.image(width / 2, height - 60, 'table');

        // Food on the table
        this.food1 = this.add.image(width / 2 - 25, height - 72, 'food-plate').setScale(0.9);
        this.food2 = this.add.image(width / 2 + 25, height - 72, 'food-plate').setScale(0.9);
        this.goblet1 = this.add.image(width / 2 - 8, height - 72, 'goblet').setScale(0.8);
        this.goblet2 = this.add.image(width / 2 + 8, height - 72, 'goblet').setScale(0.8);

        // Candle glow
        const glow = this.add.circle(width / 2, height - 80, 50, 0xFFAA00, 0.1);
        this.tweens.add({
            targets: glow, alpha: 0.15, scaleX: 1.1, scaleY: 1.1,
            duration: 1000, yoyo: true, repeat: -1,
        });

        // Characters
        this.faruk = this.add.image(width / 2 - 50, height - 75, 'faruk').setScale(1.5);
        this.ayca = this.add.image(width / 2 + 50, height - 72, 'ayca').setScale(1.5);

        // Floating hearts between them
        this.time.addEvent({
            delay: 800,
            callback: () => {
                if (this.romanticsOver) return;
                const hx = width / 2 + Phaser.Math.Between(-20, 20);
                const heart = this.add.image(hx, height - 90, 'mini-heart')
                    .setScale(0.6).setAlpha(0.6);
                this.tweens.add({
                    targets: heart, y: heart.y - 40, alpha: 0,
                    duration: 1500, onComplete: () => heart.destroy(),
                });
            },
            loop: true,
        });

        // Labels
        this.add.text(width / 2 - 50, height - 110, 'Hünkar Faruk', {
            fontSize: '11px', color: '#44DD44', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.add.text(width / 2 + 50, height - 105, 'Sultan Ayça', {
            fontSize: '11px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5);

        this.romanticsOver = false;
        this.dialogue = new DialogueBox(this);

        this.time.delayedCall(500, () => this.romanticDinner());
    }

    romanticDinner() {
        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Osmanlı sarayının en güzel gecelerinden birinde, Hünkar Faruk ile Sultan Ayça başbaşa yemek yiyorlardı...' },
            { speaker: 'Hünkar Faruk', text: 'Sultanım, bu gece yıldızlar bile senin güzelliğini kıskanıyor.' },
            { speaker: 'Sultan Ayça', text: 'Aman Hünkarım, çok tatlı söylüyorsunuz. Lakin bu nefis yemekler de çok güzel olmuş! ♥' },
            { speaker: 'Hünkar Faruk', text: 'Zinhar güzelliğin yanında bu yemekler bile sönük kalır Sultanım.' },
            { speaker: 'Sultan Ayça', text: 'Hahaha! Çok abartıyorsunuz Hünkarım... Ama sevdim! ♥' },
        ], () => {
            this.romanticsOver = true;
            this.dragonAttack();
        });
    }

    dragonAttack() {
        const { width, height } = this.scale;

        // Camera shake
        this.cameras.main.shake(600, 0.015);

        // Dragon appears from top
        this.dragon = this.add.image(width / 2, -50, 'dragon').setScale(1.8).setDepth(10);
        this.tweens.add({
            targets: this.dragon,
            y: height * 0.25, duration: 1500, ease: 'Power2',
            onComplete: () => {
                // Debris falls from ceiling!
                for (let i = 0; i < 12; i++) {
                    const dx = Phaser.Math.Between(50, width - 50);
                    const debris = this.add.image(dx, -10, 'debris')
                        .setScale(Phaser.Math.FloatBetween(1, 3)).setDepth(20);
                    this.tweens.add({
                        targets: debris,
                        y: height - 40 + Phaser.Math.Between(-10, 10),
                        x: dx + Phaser.Math.Between(-30, 30),
                        angle: Phaser.Math.Between(-180, 180),
                        duration: Phaser.Math.Between(800, 1500),
                        delay: Phaser.Math.Between(0, 500),
                        onComplete: () => {
                            // Small impact
                            this.cameras.main.shake(100, 0.005);
                        },
                    });
                }

                // The KEY stone that hits Faruk's head!
                this.time.delayedCall(400, () => {
                    const stoneHit = this.add.image(this.faruk.x + 5, -20, 'debris')
                        .setScale(3).setTint(0x999999).setDepth(25);
                    this.tweens.add({
                        targets: stoneHit,
                        x: this.faruk.x,
                        y: this.faruk.y - 15, // hits head
                        duration: 600,
                        ease: 'Power3',
                        onComplete: () => {
                            // Stone hits! Flash + big shake
                            this.cameras.main.shake(400, 0.02);
                            this.cameras.main.flash(200, 255, 255, 255);

                            // Impact star effect
                            const impact = this.add.text(this.faruk.x, this.faruk.y - 30, '💥', {
                                fontSize: '24px',
                            }).setOrigin(0.5).setDepth(30);
                            this.tweens.add({
                                targets: impact, y: impact.y - 30, alpha: 0,
                                duration: 800, onComplete: () => impact.destroy(),
                            });

                            stoneHit.setAlpha(0.5);
                            this.tweens.add({
                                targets: stoneHit, y: stoneHit.y + 30, alpha: 0,
                                duration: 500,
                            });

                            this.stoneHitDialogue();
                        },
                    });
                });
            },
        });

        this.dialogue.showDialogue([
            { speaker: 'Sultan Ayça', text: 'AAAA! Bu da ne?! Hünkarım, çatı yıkılıyor!' },
            { speaker: 'Hünkar Faruk', text: 'SULTAN! DİKKAT!!' },
        ], () => { });
    }

    stoneHitDialogue() {
        // Faruk collapses - he got hit by stone
        this.tweens.add({
            targets: this.faruk,
            angle: 90, y: this.faruk.y + 15,
            duration: 800, ease: 'Power2',
        });

        // Dragon grabs Ayça
        this.time.delayedCall(600, () => {
            this.dialogue.showDialogue([
                { speaker: 'Sultan Ayça', text: 'HÜNKARIM! Bir taş kafana geldi! HÜNKARIM?! İyi misin?!' },
                { speaker: 'Anlatıcı', text: 'Hünkar Faruk, kafasına gelen taşla bayıldı... Ama Sultan Ayça\'nın çığlığını duyuyordu...' },
                { speaker: 'Sultan Ayça', text: 'HAYIIIR! BIRAK BENİ! HÜNKARIIIM! YARDIM ET!!! 😭' },
                { speaker: 'Anlatıcı', text: 'Angara Ejderhası, Sultan Ayça\'yı pençeleriyle kavradı ve gökyüzüne uçtu...' },
            ], () => {
                // Dragon carries Ayça away
                this.tweens.add({
                    targets: this.ayca,
                    y: this.dragon.y, x: this.dragon.x,
                    duration: 800,
                    onComplete: () => {
                        this.tweens.add({
                            targets: [this.dragon, this.ayca],
                            y: -100, x: this.scale.width + 50,
                            duration: 2000,
                            onComplete: () => {
                                // Screen goes dark as Faruk is unconscious
                                this.cameras.main.fadeOut(2000, 0, 0, 0);
                                this.cameras.main.once('camerafadeoutcomplete', () => {
                                    this.scene.start('KingdomScene');
                                });
                            },
                        });
                    },
                });
            });
        });
    }
}

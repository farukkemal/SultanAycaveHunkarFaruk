// Scene 10: Celebration March - People cheer as Faruk and Ayça walk to palace
import DialogueBox from '../ui/DialogueBox.js';

export default class CelebrationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CelebrationScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(10);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Bright day sky
        this.cameras.main.setBackgroundColor('#4499dd');
        this.add.circle(650, 40, 28, 0xFFDD44, 0.9);

        // Floor
        for (let x = 0; x < width; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground');
        }

        // Houses on sides
        for (let i = 0; i < 3; i++) {
            this.add.image(80 + i * 120, height - 70, 'house').setScale(1.2).setDepth(0);
            this.add.image(width - 80 - i * 120, height - 70, 'house').setScale(1.2).setDepth(0).setFlipX(true);
        }

        // LOTS of crowd people
        this.crowdPeople = [];
        for (let i = 0; i < 20; i++) {
            const side = i < 10 ? 'left' : 'right';
            const x = side === 'left'
                ? Phaser.Math.Between(30, width / 2 - 80)
                : Phaser.Math.Between(width / 2 + 80, width - 30);
            const y = height - Phaser.Math.Between(40, 55);
            const tex = Math.random() > 0.5 ? 'crowd-man' : 'crowd-woman';
            const person = this.add.image(x, y, tex)
                .setScale(Phaser.Math.FloatBetween(0.9, 1.3))
                .setDepth(2);

            // People cheer - bobbing
            this.tweens.add({
                targets: person,
                y: person.y - Phaser.Math.Between(3, 8),
                duration: Phaser.Math.Between(300, 600),
                yoyo: true, repeat: -1,
                delay: Phaser.Math.Between(0, 1000),
            });

            this.crowdPeople.push(person);
        }

        // Confetti!
        this.confettiTimer = this.time.addEvent({
            delay: 100,
            callback: () => {
                const cx = Phaser.Math.Between(0, width);
                const colors = ['confetti-pink', 'confetti-gold', 'confetti-blue'];
                const confetti = this.add.image(cx, -10, Phaser.Utils.Array.GetRandom(colors))
                    .setScale(Phaser.Math.FloatBetween(0.5, 1.5))
                    .setDepth(600);
                this.tweens.add({
                    targets: confetti,
                    y: height + 10,
                    x: cx + Phaser.Math.Between(-50, 50),
                    angle: Phaser.Math.Between(-360, 360),
                    alpha: 0,
                    duration: Phaser.Math.Between(2000, 4000),
                    onComplete: () => confetti.destroy(),
                });
            },
            loop: true,
        });

        // Hearts floating from crowd
        this.heartsTimer = this.time.addEvent({
            delay: 400,
            callback: () => {
                const hx = Phaser.Math.Between(50, width - 50);
                const heart = this.add.image(hx, height - 60, 'mini-heart')
                    .setScale(Phaser.Math.FloatBetween(0.5, 1.2))
                    .setAlpha(0.7).setDepth(500);
                this.tweens.add({
                    targets: heart,
                    y: heart.y - Phaser.Math.Between(60, 120),
                    alpha: 0, duration: 2000,
                    onComplete: () => heart.destroy(),
                });
            },
            loop: true,
        });

        // Faruk and Ayça walk down the center
        this.faruk = this.add.image(-30, height - 55, 'faruk-armor').setScale(1.5).setDepth(10);
        this.ayca = this.add.image(-60, height - 50, 'ayca').setScale(1.5).setDepth(10);

        this.add.text(width / 2, 20, '🎉 HÜNKAR VE SULTAN EVE DÖNDÜ! 🎉', {
            fontSize: '16px', color: '#FFD700', fontFamily: 'Georgia',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5).setDepth(700);

        // Dialogue
        this.dialogue = new DialogueBox(this);

        // Start the march
        this.time.delayedCall(500, () => this.startMarch());
    }

    startMarch() {
        const { width, height } = this.scale;

        // Walk in from left to center
        this.tweens.add({
            targets: this.faruk,
            x: width / 2 - 20, duration: 3000, ease: 'Power1',
        });
        this.tweens.add({
            targets: this.ayca,
            x: width / 2 + 20, duration: 3000, ease: 'Power1',
            onComplete: () => this.celebrationDialogue(),
        });

        // Crowd cheers text pop-ups
        const cheers = ['Yaşasın!', 'Hünkarımız!', 'Sultanımız!', 'Çok yaşa!', '♥♥♥', 'Mucize!'];
        for (let i = 0; i < 8; i++) {
            this.time.delayedCall(i * 500, () => {
                const cx = Phaser.Math.Between(50, width - 50);
                const cy = height - Phaser.Math.Between(70, 100);
                const cheer = this.add.text(cx, cy, Phaser.Utils.Array.GetRandom(cheers), {
                    fontSize: '11px', color: '#FFD700', fontFamily: 'Arial',
                    backgroundColor: '#00000088', padding: { x: 3, y: 1 },
                }).setOrigin(0.5).setDepth(500);
                this.tweens.add({
                    targets: cheer, y: cy - 40, alpha: 0,
                    duration: 2000, onComplete: () => cheer.destroy(),
                });
            });
        }
    }

    celebrationDialogue() {
        this.dialogue.showDialogue([
            { speaker: 'Halk', text: 'YAŞASIN HÜNKAR FARUK! YAŞASIN SULTAN AYÇA!' },
            { speaker: 'Halk', text: 'Ejderhayı yenmiş! Bu bir mucize! Çok yaşayın!' },
            { speaker: 'Sultan Ayça', text: 'Hünkarım, bak halk bizi nasıl seviyor... ♥' },
            { speaker: 'Hünkar Faruk', text: 'Sultanım, bu sevgi senin güzelliğin ve asaletin sayesindedir.' },
            { speaker: 'Sultan Ayça', text: 'Lakin asıl kahraman sensin Hünkarım. Sen olmasaydın...' },
            { speaker: 'Hünkar Faruk', text: 'Zinhar öyle söyleme Sultanım. Senin için her şeyi yaparım.' },
            { speaker: 'Halk', text: 'ÇOK YAŞA! ÇOK YAŞA! ÇOK YAŞA! 🎊🎉' },
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk ve Sultan Ayça, halkın alkışları ve sevinç gözyaşları arasında saraya doğru yürüdüler.' },
        ], () => {
            // Stop effects
            if (this.confettiTimer) this.confettiTimer.destroy();
            if (this.heartsTimer) this.heartsTimer.destroy();

            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('ReturnScene');
            });
        });
    }
}

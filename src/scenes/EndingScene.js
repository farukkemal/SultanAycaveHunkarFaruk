// Scene 12: Happy Ending - Palace interior, Şeker Ağa baklava scene, then romantic stargazing
import DialogueBox from '../ui/DialogueBox.js';

export default class EndingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndingScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(12);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Palace interior - warm candlelit walls
        this.cameras.main.setBackgroundColor('#1a0a10');

        // Palace walls (warm tone)
        for (let x = 0; x < width; x += 64) {
            for (let y = 0; y < height - 100; y += 64) {
                this.add.image(x + 32, y + 32, 'castle-wall').setAlpha(0.4).setTint(0xcc8866);
            }
        }

        // Ornate pillars
        for (let i = 0; i < 3; i++) {
            const px = 100 + i * 350;
            this.add.rectangle(px, height / 2, 16, height - 60, 0xCDAA7D, 0.5);
            this.add.rectangle(px, 20, 24, 12, 0xFFD700, 0.5); // capital
            this.add.rectangle(px, height - 35, 24, 12, 0xFFD700, 0.5); // base
        }

        // Floor
        for (let x = 0; x < width; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground').setTint(0xccaa88);
        }

        // Warm candle glows
        for (let i = 0; i < 5; i++) {
            const glow = this.add.circle(100 + i * 200, height - 80, 40, 0xFFAA00, 0.06);
            this.tweens.add({
                targets: glow, alpha: 0.1, scaleX: 1.2, scaleY: 1.2,
                duration: 1500 + i * 200, yoyo: true, repeat: -1,
            });
        }

        // Table center
        this.table = this.add.image(width / 2, height - 65, 'table');

        // Food and goblets on table
        this.add.image(width / 2 - 20, height - 78, 'food-plate').setScale(0.8);
        this.add.image(width / 2 + 20, height - 78, 'food-plate').setScale(0.8);
        this.goblet1 = this.add.image(width / 2 - 5, height - 78, 'goblet').setScale(0.7);
        this.goblet2 = this.add.image(width / 2 + 5, height - 78, 'goblet').setScale(0.7);

        // Faruk and Ayça sit at table
        this.faruk = this.add.image(width / 2 - 55, height - 80, 'faruk').setScale(1.5).setDepth(5);
        this.ayca = this.add.image(width / 2 + 55, height - 77, 'ayca-white').setScale(1.5).setDepth(5);

        this.add.text(width / 2 - 55, height - 118, 'Hünkar Faruk', {
            fontSize: '11px', color: '#44DD44', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(5);
        this.add.text(width / 2 + 55, height - 112, 'Sultan Ayça', {
            fontSize: '11px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(5);

        // Şeker Ağa and Sümbül - off to the side initially
        this.sekerAga = this.add.image(width - 80, height - 65, 'seker-aga').setScale(1.2).setDepth(5);
        this.sekerLabel = this.add.text(width - 80, height - 100, 'Şeker Ağa', {
            fontSize: '10px', color: '#FFA500', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(5);

        this.sumbul = this.add.image(width - 140, height - 62, 'sumbul-aga').setScale(1.2).setDepth(5);
        this.sumbulLabel = this.add.text(width - 140, height - 97, 'Sümbül Ağa', {
            fontSize: '10px', color: '#C0C0C0', fontFamily: 'Arial',
        }).setOrigin(0.5).setDepth(5);

        // Baklava tray in Şeker Ağa's hands
        this.baklava = this.add.image(this.sekerAga.x - 10, this.sekerAga.y - 15, 'baklava')
            .setScale(1.5).setDepth(6);

        // Dialogue
        this.dialogue = new DialogueBox(this);

        this.time.delayedCall(500, () => this.sekerAgaScene());
    }

    sekerAgaScene() {
        const { width, height } = this.scale;

        // Sümbül walks to Şeker Ağa
        this.tweens.add({
            targets: [this.sumbul, this.sumbulLabel],
            x: this.sekerAga.x - 40, duration: 800,
            onComplete: () => {
                this.dialogue.showDialogue([
                    { speaker: 'Sümbül Ağa', text: 'Şeker Ağa, o baklavalardan bir tepsi Hünkar ve Sultan için gidecek, sakın tırtıklama!' },
                    { speaker: 'Şeker Ağa', text: 'Aşk olsun Sümbül Ağa, ben nefsime hakimimdir!' },
                    { speaker: 'Sümbül Ağa', text: 'Belli belli, göbeğinden belli! 😂' },
                    { speaker: 'Şeker Ağa', text: 'Kes sesini Sümbül! Mutfağıma laf atma! Bu baklavaları kim yaptı sanıyorsun?!' },
                    { speaker: 'Sümbül Ağa', text: 'Hadi hadi, tamam. Al götür o tepsini Hünkarımıza. Ama bir tane bile eksik olmasın! 😤' },
                    { speaker: 'Şeker Ağa', text: '(Gizlice bir tane ağzına atar) Mmm... Kalite kontrol, şart!' },
                    { speaker: 'Sümbül Ağa', text: 'GÖRDÜM! BİR TANE YEDİN! 😡' },
                    { speaker: 'Şeker Ağa', text: 'Yok yok, sinek konmuştu, onu aldım! Heh heh... 😅' },
                ], () => {
                    // Şeker Ağa walks baklava to the table
                    this.tweens.add({
                        targets: [this.sekerAga, this.sekerLabel, this.baklava],
                        x: width / 2 + 10, duration: 1500,
                        onComplete: () => {
                            // Put baklava on table
                            this.tweens.add({
                                targets: this.baklava,
                                x: width / 2, y: height - 82,
                                duration: 500,
                            });

                            this.dialogue.showDialogue([
                                { speaker: 'Şeker Ağa', text: 'Hünkarım, Sultanım! Taze baklava hazırladım, afiyet olsun efendim!' },
                                { speaker: 'Sultan Ayça', text: 'Ohhh Şeker Ağa, çok güzel görünüyor! Teşekkür ederiz! ♥' },
                                { speaker: 'Hünkar Faruk', text: 'Ala! Ellerine sağlık Şeker Ağa!' },
                                { speaker: 'Şeker Ağa', text: 'Sağ olun efendim! İzninizle çekiliyorum...' },
                            ], () => {
                                // Şeker Ağa exits + Sümbül follows
                                this.tweens.add({
                                    targets: [this.sekerAga, this.sekerLabel],
                                    x: width + 50, duration: 1200,
                                    onComplete: () => {
                                        this.sekerAga.destroy();
                                        this.sekerLabel.destroy();
                                    },
                                });
                                this.tweens.add({
                                    targets: [this.sumbul, this.sumbulLabel],
                                    x: width + 50, duration: 1500,
                                    onComplete: () => {
                                        this.sumbul.destroy();
                                        this.sumbulLabel.destroy();
                                        // Transform to stargazing
                                        this.time.delayedCall(500, () => this.transformToStargazing());
                                    },
                                });
                            });
                        },
                    });
                });
            },
        });
    }

    transformToStargazing() {
        const { width, height } = this.scale;

        // Fade the palace walls to reveal stars - transition effect
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Remove palace elements
            this.children.removeAll();

            // Starry night sky
            this.cameras.main.setBackgroundColor('#0a0520');
            this.cameras.main.fadeIn(2000, 0, 0, 0);

            // Beautiful starfield
            for (let i = 0; i < 60; i++) {
                const star = this.add.image(
                    Phaser.Math.Between(0, width),
                    Phaser.Math.Between(5, height * 0.6),
                    'star'
                ).setAlpha(Phaser.Math.FloatBetween(0.2, 0.7));
                this.tweens.add({
                    targets: star, alpha: 0.1,
                    duration: Phaser.Math.Between(1000, 3000),
                    yoyo: true, repeat: -1,
                });
            }

            // Big moon
            this.add.circle(width - 90, 60, 30, 0xFFEECC, 0.7);
            this.add.circle(width - 85, 55, 25, 0xFFFFDD, 0.3);

            // Palace balcony railing
            for (let x = 0; x < width; x += 20) {
                this.add.rectangle(x + 10, height - 55, 4, 25, 0xCDAA7D, 0.6);
            }
            this.add.rectangle(width / 2, height - 42, width, 6, 0xFFD700, 0.4); // rail top
            this.add.rectangle(width / 2, height - 68, width, 4, 0xFFD700, 0.3); // rail bottom

            // Floor
            for (let x = 0; x < width; x += 64) {
                this.add.rectangle(x + 32, height - 16, 64, 32, 0x2a1a1a);
            }

            // Faruk and Ayça on the balcony
            this.faruk = this.add.image(width / 2 - 20, height - 85, 'faruk').setScale(2).setDepth(10);
            this.ayca = this.add.image(width / 2 + 20, height - 82, 'ayca-white').setScale(2).setDepth(10);

            this.add.text(width / 2 - 20, height - 130, 'Hünkar Faruk', {
                fontSize: '12px', color: '#44DD44', fontFamily: 'Arial',
            }).setOrigin(0.5).setDepth(11);
            this.add.text(width / 2 + 20, height - 125, 'Sultan Ayça', {
                fontSize: '12px', color: '#FF69B4', fontFamily: 'Arial',
            }).setOrigin(0.5).setDepth(11);

            // Baklava on small table
            this.add.rectangle(width / 2 + 70, height - 70, 40, 8, 0x8B5A2B);
            this.add.image(width / 2 + 70, height - 78, 'baklava').setScale(1.2);

            // Floating hearts
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    const hx = width / 2 + Phaser.Math.Between(-40, 40);
                    const heart = this.add.image(hx, height - 100, 'heart')
                        .setScale(Phaser.Math.FloatBetween(0.3, 0.7))
                        .setAlpha(0.6).setDepth(100);
                    this.tweens.add({
                        targets: heart,
                        y: heart.y - 80, x: hx + Phaser.Math.Between(-15, 15),
                        alpha: 0, duration: 2500,
                        onComplete: () => heart.destroy(),
                    });
                },
                loop: true,
            });

            // Mini hearts
            for (let i = 0; i < 6; i++) {
                const mh = this.add.image(
                    width / 2 + Phaser.Math.Between(-50, 50),
                    height - 100 + Phaser.Math.Between(-10, -30),
                    'mini-heart'
                ).setScale(0.7).setAlpha(0.4).setDepth(50);
                this.tweens.add({
                    targets: mh, y: mh.y - 25, alpha: 0,
                    duration: 2000, delay: i * 400,
                    yoyo: true, repeat: -1,
                });
            }

            // Confetti
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    const cx = Phaser.Math.Between(0, width);
                    const colors = ['confetti-pink', 'confetti-gold', 'confetti-blue'];
                    const confetti = this.add.image(cx, -5, Phaser.Utils.Array.GetRandom(colors))
                        .setScale(Phaser.Math.FloatBetween(0.5, 1.2)).setDepth(200);
                    this.tweens.add({
                        targets: confetti,
                        y: height + 10, angle: Phaser.Math.Between(-360, 360), alpha: 0,
                        duration: Phaser.Math.Between(2000, 3500),
                        onComplete: () => confetti.destroy(),
                    });
                },
                loop: true,
            });

            // New dialogue box
            this.dialogue = new DialogueBox(this);

            this.time.delayedCall(1000, () => this.romanticFinale());
        });
    }

    romanticFinale() {
        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Saray balkonunda, yıldızlar altında, baklavalar eşliğinde...' },
            { speaker: 'Sultan Ayça', text: 'Hünkarım, bu baklavalar çok nefis... Ama seni yanımda görmek daha tatlı. ♥' },
            { speaker: 'Hünkar Faruk', text: 'Sultanım, seni o canavardan kurtarmak hayatımın en zor ama en güzel savaşıydı.' },
            { speaker: 'Sultan Ayça', text: 'Sen benim için ejderhayla savaştın. Denizleri geçtin. Zinhar vazgeçmedin. ♥' },
            { speaker: 'Hünkar Faruk', text: 'Çünkü sen benim her şeyimsin Sultanım. Bu dünyada sensiz yaşamak zinhar mümkün değil.' },
            { speaker: 'Sultan Ayça', text: 'Lakin Hünkarım, o taş yarası hâlâ gözüküyor kafanda... Canın acımıyor mu? ♥' },
            { speaker: 'Hünkar Faruk', text: 'Bu yaralar aşkımızın nişanesidir Sultanım. Her biri senin uğruna.' },
            { speaker: 'Sultan Ayça', text: 'Seni çok seviyorum Hünkarım... Ebediyen seninleyim. ♥♥♥' },
            { speaker: 'Hünkar Faruk', text: 'Ben de seni çok seviyorum Sultan Ayça. Aşkımız yıldızlar kadar sonsuz olsun. ♥' },
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk ve Sultan Ayça, yıldızların altında, baklava yiyerek birbirlerine sarıldılar...' },
            { speaker: 'Anlatıcı', text: 'Ve sonsuza kadar mutlu yaşadılar. ♥' },
        ], () => {
            const { width, height } = this.scale;

            // Big heart animation
            const bigHeart = this.add.image(width / 2, height / 2, 'heart')
                .setScale(0).setDepth(1000).setAlpha(0);
            this.tweens.add({
                targets: bigHeart,
                scaleX: 8, scaleY: 8, alpha: 0.8,
                duration: 2000, ease: 'Power2',
                onComplete: () => {
                    const endText = this.add.text(width / 2, height / 2, 'SON ♥', {
                        fontSize: '40px', color: '#FFD700', fontFamily: 'Georgia',
                        fontStyle: 'bold', stroke: '#000', strokeThickness: 4,
                    }).setOrigin(0.5).setDepth(1001);

                    this.tweens.add({
                        targets: endText,
                        scaleX: 1.2, scaleY: 1.2,
                        duration: 1000, yoyo: true, repeat: 2,
                        onComplete: () => {
                            this.cameras.main.fadeOut(3000, 0, 0, 0);
                            this.cameras.main.once('camerafadeoutcomplete', () => {
                                this.scene.start('CreditScene');
                            });
                        },
                    });
                },
            });
        });
    }
}

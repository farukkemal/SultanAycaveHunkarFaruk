// Scene 9: City Gates - Guards surprised, fisherman blocked
import DialogueBox from '../ui/DialogueBox.js';

export default class CityGateScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CityGateScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(9);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Morning sky
        this.cameras.main.setBackgroundColor('#5588bb');
        this.add.circle(600, 50, 25, 0xFFDD55, 0.8);
        for (let i = 0; i < 4; i++) {
            this.add.ellipse(Phaser.Math.Between(50, width - 50), Phaser.Math.Between(20, 70),
                80, 18, 0xffffff, 0.3);
        }

        // Floor
        for (let x = 0; x < width; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground');
        }

        // Castle gate (big walls)
        for (let y = 0; y < height - 100; y += 64) {
            this.add.image(width / 2 - 60, y + 32, 'castle-wall').setAlpha(0.8);
            this.add.image(width / 2 + 60, y + 32, 'castle-wall').setAlpha(0.8);
        }
        // Gate opening
        this.add.rectangle(width / 2, height - 70, 60, 80, 0x3a2a1a);
        this.add.rectangle(width / 2, height - 100, 64, 8, 0xFFD700); // gold gate bar

        // Guards
        this.guard1 = this.add.image(width / 2 - 30, height - 60, 'guard').setScale(1.3);
        this.guard2 = this.add.image(width / 2 + 30, height - 60, 'guard').setScale(1.3).setFlipX(true);

        this.add.text(width / 2 - 30, height - 100, 'Koruma', {
            fontSize: '9px', color: '#87CEEB', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.add.text(width / 2 + 30, height - 100, 'Koruma', {
            fontSize: '9px', color: '#87CEEB', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Faruk + Ayça approach from left
        this.faruk = this.add.image(80, height - 50, 'faruk-armor').setScale(1.3);
        this.ayca = this.add.image(120, height - 50, 'ayca').setScale(1.3);
        this.fisherman = this.add.image(50, height - 50, 'fisherman').setScale(1.2);

        this.add.text(80, height - 90, 'Hünkar Faruk', {
            fontSize: '10px', color: '#FFD700', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.add.text(120, height - 90, 'Sultan Ayça', {
            fontSize: '10px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.fishermanLabel = this.add.text(50, height - 90, 'Balıkçı', {
            fontSize: '10px', color: '#8B7355', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Dialogue
        this.dialogue = new DialogueBox(this);

        // Start scene
        this.time.delayedCall(500, () => {
            // Walk towards gate
            this.tweens.add({
                targets: [this.faruk],
                x: width / 2 - 80, duration: 2000,
            });
            this.tweens.add({
                targets: [this.ayca],
                x: width / 2 - 60, duration: 2000,
            });
            this.tweens.add({
                targets: [this.fisherman, this.fishermanLabel],
                x: width / 2 - 110, duration: 2000,
                onComplete: () => this.gateDialogue(),
            });
        });
    }

    gateDialogue() {
        this.dialogue.showDialogue([
            { speaker: 'Koruma 1', text: 'DUR! Kim var orada?! ...A-aman Allahım!' },
            { speaker: 'Koruma 2', text: 'Bu... Bu Hünkar Faruk değil mi?! Ve Sultan Ayça?!' },
            { speaker: 'Koruma 1', text: 'İmkansız! Ejderha Adası\'ndan sağ dönenler mi var?! Zinhar inanamıyorum!' },
            { speaker: 'Hünkar Faruk', text: 'Evet, biziz. Allaha şükür sağ salim döndük.' },
            { speaker: 'Sultan Ayça', text: 'Hünkarım beni o canavardan kurtardı. Cesur yüreğiyle ejderhayı yendi!' },
            { speaker: 'Koruma 2', text: 'Ala! Bu büyük bir mucize! Hünkarımız çok yaşa!' },
        ], () => {
            // Guards move aside
            this.tweens.add({
                targets: this.guard1, x: this.guard1.x - 40, duration: 500,
            });
            this.tweens.add({
                targets: this.guard2, x: this.guard2.x + 40, duration: 500,
                onComplete: () => {
                    // Faruk and Ayça pass, fisherman tries to follow
                    this.tweens.add({
                        targets: this.faruk, x: this.faruk.x + 100, duration: 1000,
                    });
                    this.tweens.add({
                        targets: this.ayca, x: this.ayca.x + 100, duration: 1000,
                    });
                    this.tweens.add({
                        targets: [this.fisherman, this.fishermanLabel],
                        x: this.fisherman.x + 60, duration: 800,
                        onComplete: () => this.fishermanBlocked(),
                    });
                },
            });
        });
    }

    fishermanBlocked() {
        // Guards block fisherman
        this.tweens.add({
            targets: this.guard1, x: this.fisherman.x - 15, duration: 300,
        });
        this.tweens.add({
            targets: this.guard2, x: this.fisherman.x + 15, duration: 300,
        });

        this.dialogue.showDialogue([
            { speaker: 'Koruma 1', text: 'Dur sen! Burası saray kapısı. Sıradan halk giremez!' },
            { speaker: 'Balıkçı', text: 'Ama ben... Ben Hünkar ile geldim! Onu adaya götüren benim!' },
            { speaker: 'Koruma 2', text: 'Ha! Komik. Bir balıkçı Hünkar ile mi gelmiş? Hadi oradan!' },
            { speaker: 'Hünkar Faruk', text: 'DURUN! Bu adam benim hayatımı kurtardı!' },
            { speaker: 'Hünkar Faruk', text: 'O olmasaydı Ejderha Adası\'na gidemezdim. Lakin onu içeri alın hemen!' },
            { speaker: 'Koruma 1', text: 'Af edersiniz Hünkarım! Hemen efendim!' },
            { speaker: 'Koruma 2', text: 'Buyurun efendim, geçin! Affınıza sığınırız!' },
            { speaker: 'Balıkçı', text: 'T-teşekkür ederim Hünkarım... Çok asil bir insansınız!' },
        ], () => {
            // All enter
            this.tweens.add({
                targets: [this.faruk, this.ayca, this.fisherman, this.fishermanLabel],
                x: '+=60', duration: 800,
                onComplete: () => {
                    this.cameras.main.fadeOut(1500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('CelebrationScene');
                    });
                },
            });
        });
    }
}

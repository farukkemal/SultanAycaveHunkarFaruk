// Scene 2: Kingdom - Pargalı/Sümbül cutscene while Faruk is unconscious, then Faruk wakes up
import DialogueBox from '../ui/DialogueBox.js';
import Player from '../entities/Player.js';

export default class KingdomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'KingdomScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(2);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Night sky with stars
        this.cameras.main.setBackgroundColor('#0a0a2a');
        for (let i = 0; i < 40; i++) {
            const star = this.add.image(
                Phaser.Math.Between(0, 4000),
                Phaser.Math.Between(5, height * 0.35),
                'star'
            ).setAlpha(Phaser.Math.FloatBetween(0.2, 0.5));
            this.tweens.add({
                targets: star, alpha: 0.1,
                duration: Phaser.Math.Between(1500, 3000),
                yoyo: true, repeat: -1,
            });
        }
        // Moon
        this.add.circle(300, 40, 20, 0xFFEECC, 0.5);

        // Extended world
        const worldWidth = 4000;
        this.cameras.main.setBounds(0, 0, worldWidth, height);
        this.physics.world.setBounds(0, 0, worldWidth, height);

        // Ground
        this.platforms = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 64) {
            this.platforms.create(x + 32, height - 16, 'stone-ground').refreshBody();
        }

        // Scene setup: Faruk is unconscious on the ground in the saray corridor
        // --- CUTSCENE PHASE: Pargalı & Sümbül ---

        // Castle interior walls (first section only)
        for (let x = 0; x < 960; x += 64) {
            for (let y = 0; y < height - 100; y += 64) {
                this.add.image(x + 32, y + 32, 'castle-wall').setAlpha(0.3);
            }
        }

        // Faruk lying on ground (unconscious)
        this.farukLying = this.add.image(200, height - 55, 'faruk').setScale(1.4).setAngle(90).setAlpha(0.7);
        this.add.text(200, height - 95, '💫 (baygın)', {
            fontSize: '10px', color: '#AAAAAA', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Pargalı walking
        this.pargali = this.add.image(600, height - 60, 'pargali').setScale(1.3);
        this.pargaliLabel = this.add.text(600, height - 95, 'Pargalı İbrahim', {
            fontSize: '10px', color: '#FFD700', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Sümbül coming from the other direction
        this.sumbul = this.add.image(400, height - 57, 'sumbul-aga').setScale(1.2);
        this.sumbulLabel = this.add.text(400, height - 92, 'Sümbül Ağa', {
            fontSize: '10px', color: '#C0C0C0', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Houses along the path (beyond the palace)
        for (let i = 0; i < 8; i++) {
            this.add.image(1200 + i * 300, height - 55, 'house').setScale(1);
        }

        // Piri Reis's house (far end)
        const piriHouse = this.add.image(3600, height - 60, 'house').setScale(1.5).setTint(0x8888cc);
        this.add.text(3600, height - 100, '🏠 Piri Reis\'in Evi', {
            fontSize: '11px', color: '#87CEEB', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Piri Reis waiting at his house
        this.piriReis = this.add.image(3650, height - 55, 'piri-reis').setScale(1.3);
        this.add.text(3650, height - 90, 'Piri Reis', {
            fontSize: '10px', color: '#87CEEB', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Trees along path
        for (let i = 0; i < 10; i++) {
            this.add.image(1000 + i * 350, height - 55, 'tree').setAlpha(0.6);
        }

        // Dialogue
        this.dialogue = new DialogueBox(this);

        // Start with the Pargalı-Sümbül cutscene
        this.time.delayedCall(500, () => this.pargaliSumbulScene());
    }

    pargaliSumbulScene() {
        // Pargalı walks toward Sümbül
        this.tweens.add({
            targets: [this.pargali, this.pargaliLabel],
            x: 480, duration: 1000,
            onComplete: () => {
                this.dialogue.showDialogue([
                    { speaker: 'Pargalı İbrahim', text: 'Sümbül! Yine hangi deliğe giriyorsun böyle sinsi sinsi?' },
                    { speaker: 'Sümbül Ağa', text: '(Ellerini kavuşturup titreyerek) Aman Hünkarım, Paşam... Haşa! Harem-i Hümayun\'un işlerine koşturmaktayım, malumunuz işler kesat...' },
                    { speaker: 'Pargalı İbrahim', text: 'Sultan Ayça\'na söyle, o zehirli dilini sakınsın. Yoksa o dili koparırım!' },
                    { speaker: 'Sümbül Ağa', text: 'Hangi dil Paşam? Sultan Ayçamız melek gibidir, zinhar aklından kötülük geçmez...' },
                    { speaker: 'Anlatıcı', text: '(Sümbül Ağa gözlerini kaçırarak konuşur, yalan söylediği besbelli.)' },
                    { speaker: 'Pargalı İbrahim', text: '(Sümbül\'ü kovarak) Yıkıl karşımdan!' },
                    { speaker: 'Sümbül Ağa', text: '(Geri geri giderek, neredeyse takılıp düşecek şekilde) Emriniz başım üstüne Paşam, hemen yıkılıyorum... Yıkıldım bile!' },
                ], () => {
                    // Sümbül stumbles backward comedically
                    this.tweens.add({
                        targets: [this.sumbul, this.sumbulLabel],
                        x: 150, duration: 1500,
                        onComplete: () => {
                            // Sümbül "trips" near Faruk
                            this.sumbul.setAngle(15);
                            this.time.delayedCall(300, () => {
                                this.sumbul.setAngle(0);
                                // Sümbül sees Faruk
                                this.dialogue.showDialogue([
                                    { speaker: 'Sümbül Ağa', text: 'Aman Allah! Hünkar Faruk! Yerde yatıyor! Ne olmuş böyle?!' },
                                    { speaker: 'Sümbül Ağa', text: 'Yoksa... Ejderha mı geldi?! Sultan Ayça nerede?! Eyvah eyvah!' },
                                    { speaker: 'Pargalı İbrahim', text: '(Uzaktan, ilgisiz) Sultan gitti ya... Belki gidip dönmemesi daha hayırlıdır...' },
                                    { speaker: 'Sümbül Ağa', text: '(İçinden) Bu Pargalı bir halt karıştıracak yine... Hünkarımız uyanmalı!' },
                                ], () => {
                                    // Sümbül runs off, Pargalı walks away smugly
                                    this.tweens.add({
                                        targets: [this.sumbul, this.sumbulLabel],
                                        x: -50, alpha: 0, duration: 1000,
                                    });
                                    this.tweens.add({
                                        targets: [this.pargali, this.pargaliLabel],
                                        x: 700, duration: 1000,
                                        onComplete: () => this.farukWakesUp(),
                                    });
                                });
                            });
                        },
                    });
                });
            },
        });
    }

    farukWakesUp() {
        const { width, height } = this.scale;

        // Faruk wakes up with a flash
        this.cameras.main.flash(500, 255, 255, 255);

        // Remove lying Faruk
        this.farukLying.destroy();

        // Pargalı hears and runs back
        this.tweens.add({
            targets: [this.pargali, this.pargaliLabel],
            x: 300, duration: 800,
        });

        // Create player
        this.player = new Player(this, 200, height - 80);
        this.player.canControl = false;
        this.physics.add.collider(this.player, this.platforms);
        this.player.enableArrowMode();

        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: '(Başını tutarak kalkar) Ahh... Kafam... Bir taş geldi ve...' },
            { speaker: 'Hünkar Faruk', text: 'SULTAN AYÇA! Onu bağırırken duydum! O ses... çığlığı... Nerede o?!' },
            { speaker: 'Pargalı İbrahim', text: 'Hünkarım! Zinhar sakin olun! Bir ejderha geldi ve Sultan Ayça\'yı kaçırdı!' },
            { speaker: 'Hünkar Faruk', text: 'NE?! Ejderha mı?! Lakin... o çığlık... Onu kurtarmalıyım!' },
            { speaker: 'Pargalı İbrahim', text: 'Ala, sakin ol Hünkarım! Bu intihar olur! O ejderha Angara Ejderhası olabilir!' },
            { speaker: 'Hünkar Faruk', text: 'Zinhar umurumda değil! Sultanım için canımı veririm! Piri Reis\'e gitmem lazım!' },
            { speaker: 'Pargalı İbrahim', text: '(İçinden) Belki gidip de dönmemesi daha hayırlıdır...' },
        ], () => {
            this.player.canControl = true;

            // Camera follows player
            this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

            // Goal marker
            this.goalText = this.add.text(3600, height - 130, '➡️ Piri Reis\'in Evine Git', {
                fontSize: '12px', color: '#87CEEB', fontFamily: 'Arial',
                backgroundColor: '#00000088', padding: { x: 4, y: 2 },
            }).setOrigin(0.5);

            this.tweens.add({
                targets: this.goalText, y: this.goalText.y - 8,
                duration: 1000, yoyo: true, repeat: -1,
            });

            // Pargalı follows reluctantly
            this.pargaliFollowing = true;

            // NPC interaction zone at Piri Reis
            this.piriZone = this.add.zone(3600, height - 60, 100, 80);
            this.physics.add.existing(this.piriZone, true);
            this.physics.add.overlap(this.player, this.piriZone, () => {
                if (this.arrivedAtPiri) return;
                this.arrivedAtPiri = true;
                this.player.canControl = false;
                this.player.setVelocity(0, 0);
                this.piriReisDialogue();
            });

            // Input
            this.input_manager = this.input.keyboard.createCursorKeys();
            this.input_manager.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            this.arrivedAtPiri = false;
        });
    }

    piriReisDialogue() {
        // Pargalı catches up
        this.tweens.add({
            targets: [this.pargali, this.pargaliLabel],
            x: this.player.x - 60,
            duration: 1000,
        });

        this.time.delayedCall(500, () => {
            this.dialogue.showDialogue([
                { speaker: 'Pargalı İbrahim', text: 'Hünkarım, zinhar bu çılgınlıktan vazgeçin! O ejderhanın gücü...' },
                { speaker: 'Hünkar Faruk', text: 'SUS PARGALI! Sultan Ayça\'yı kurtaracağım, ölsem de!' },
                { speaker: 'Piri Reis', text: 'Hünkarım! Hoş geldiniz... Ala, yüzünüz kan içinde! Ne oldu?!' },
                { speaker: 'Hünkar Faruk', text: 'Piri Reis! Bir ejderha geldi, Sultan Ayça\'yı kaçırdı! Kafama bir taş geldi, bayıldım...' },
                { speaker: 'Piri Reis', text: 'Aman Allah! Bu Angara Ejderhası olmalı! Lakin çok tehlikeli!' },
                { speaker: 'Hünkar Faruk', text: 'Angara Ejderhası mı? Ne biliyorsun bu canavar hakkında?' },
                { speaker: 'Piri Reis', text: 'Ala, bu ejderha yüzyıllardır kraliçeleri kaçırır. Adası denizin ötesindedir.' },
                { speaker: 'Piri Reis', text: 'Haritalarımda yeri var ama zinhar giden geri dönmemiş!' },
                { speaker: 'Pargalı İbrahim', text: 'İşte! Diyorum ya, bu intihar! Hünkarım lütfen dinleyin!' },
                { speaker: 'Hünkar Faruk', text: 'Piri Reis, bana o haritayı ver. Ben gidip döneceğim. ÇÜnkü Sultan Ayça benim her şeyim!' },
                { speaker: 'Piri Reis', text: 'Cesaretin ala büyük Hünkarım! Bu yayı al, ejderhaya karşı lazım olur.' },
                { speaker: 'Piri Reis', text: 'SPACE tuşu ile ok atabilirsin. Ejderha yere inince kılıçla vur!' },
                { speaker: 'Pargalı İbrahim', text: '(İçinden konuşur) Umudun yok Faruk... Ama belki dönmemen daha iyi...' },
                { speaker: 'Anlatıcı', text: 'Hünkar Faruk, kılıcını kuşanıp yola çıktı. Ormandan geçip limana ulaşmalıydı...' },
            ], () => {
                this.cameras.main.fadeOut(1500, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('ForestScene');
                });
            });
        });
    }

    update() {
        if (!this.player || !this.player.canControl) return;

        const cursors = this.input_manager;
        this.player.handleInput({
            left: cursors.left.isDown,
            right: cursors.right.isDown,
            up: cursors.up.isDown,
            attack: cursors.attack.isDown,
        });
        this.player.update();

        // Pargalı follows (slowly, reluctantly)
        if (this.pargaliFollowing && this.pargali && this.pargali.active) {
            const dist = this.player.x - this.pargali.x;
            if (Math.abs(dist) > 120) {
                this.pargali.x += Math.sign(dist) * 1.2;
                this.pargaliLabel.x = this.pargali.x;
                this.pargali.setFlipX(dist < 0);
            }
        }
    }
}

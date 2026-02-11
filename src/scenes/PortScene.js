// Scene 5: The Port - Interaction + Fisherman boards boat
import DialogueBox from '../ui/DialogueBox.js';
import NPC from '../entities/NPC.js';
import InputManager from '../utils/InputManager.js';

export default class PortScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PortScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(5);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Daytime sky
        this.cameras.main.setBackgroundColor('#5599dd');
        this.add.circle(650, 60, 30, 0xFFDD44, 0.9);
        // Clouds
        for (let i = 0; i < 5; i++) {
            const cloud = this.add.ellipse(
                Phaser.Math.Between(0, width), Phaser.Math.Between(30, 80),
                Phaser.Math.Between(60, 100), 20, 0xffffff, 0.35
            );
            this.tweens.add({
                targets: cloud, x: cloud.x + 30,
                duration: 6000, yoyo: true, repeat: -1,
            });
        }

        // Water background
        for (let x = 0; x < width; x += 30) {
            const wave = this.add.rectangle(x + 15, height - 40, 30, 80, 0x1a5276, 0.8);
            this.tweens.add({
                targets: wave, y: wave.y + 5,
                duration: 1500 + Math.random() * 500,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
        }

        // Dock / Ground
        this.ground = this.physics.add.staticGroup();
        for (let x = 0; x < width * 0.6; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground');
            const gc = this.ground.create(x + 32, height - 16, 'stone-ground');
            gc.setVisible(false);
            gc.refreshBody();
        }

        // Dock planks
        for (let x = 0; x < width * 0.6; x += 40) {
            this.add.rectangle(x + 20, height - 32, 38, 4, 0x8B4513);
        }

        // Boat
        this.boat = this.add.image(width * 0.75, height - 55, 'boat').setScale(1.5);
        this.add.text(width * 0.75, height - 90, '⛵ Tekne', {
            fontSize: '12px', color: '#87CEEB', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Gold bag
        this.goldBag = this.add.image(200, height - 45, 'gold').setScale(2);
        this.add.text(200, height - 65, 'Altın Kesesi', {
            fontSize: '10px', color: '#FFD700', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Player
        this.faruk = this.physics.add.sprite(80, height - 60, 'faruk-armor');
        this.faruk.setCollideWorldBounds(true);
        this.physics.add.collider(this.faruk, this.ground);

        this.farukLabel = this.add.text(80, height - 95, 'Hünkar Faruk', {
            fontSize: '11px', color: '#FFD700', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Fisherman NPC
        this.fisherman = new NPC(this, width * 0.55, height - 60, 'fisherman', {
            name: 'Balıkçı',
            interactionRange: 80,
            dialogues: [
                { speaker: 'Hünkar Faruk', text: 'Selamünaleyküm! Beni denizlerin ortasındaki adaya götürebilir misin?' },
                { speaker: 'Balıkçı', text: 'Aleykümselam efendim. Ejderha Adası mı dediniz? Zinhar oraya gidilmez!' },
                { speaker: 'Balıkçı', text: 'Lakin o ada lanettlidir! Giden geri dönmez derler, efendim.' },
                { speaker: 'Hünkar Faruk', text: 'Param var. Tüm altınlarımı veririm. Lütfen, sultanım orada!' },
                { speaker: 'Balıkçı', text: 'Hmmm... Tüm altınlarınızı mı? Bu ala çok paradır...' },
                { speaker: 'Balıkçı', text: 'Peki be efendim, aşkın gücüne inanıyorum. Sizi götüreceğim!' },
                { speaker: 'Balıkçı', text: 'Ama dikkatli olun Hünkarım. O ada tehlikelerle doludur.' },
                { speaker: 'Hünkar Faruk', text: 'Teşekkürler! Hadi gidelim, zinhar vakit kaybetmeyelim!' },
            ],
        });

        // Input
        this.input_mgr = new InputManager(this);
        this.dialogue = new DialogueBox(this);

        this.canControl = true;
        this.interactionDone = false;

        // Intro
        this.time.delayedCall(500, () => {
            this.canControl = false;
            this.dialogue.showDialogue([
                { speaker: 'Anlatıcı', text: 'Hünkar Faruk limana ulaştı. Ejderha Adası\'na gidecek bir tekne bulmalı.' },
                { speaker: 'Anlatıcı', text: 'Balıkçı ile konuşmak için yanına git ve [E] tuşuna bas.' },
            ], () => {
                this.canControl = true;
            });
        });
    }

    update() {
        if (!this.canControl) return;

        if (this.input_mgr.left) {
            this.faruk.setVelocityX(-150);
            this.faruk.setFlipX(true);
        } else if (this.input_mgr.right) {
            this.faruk.setVelocityX(150);
            this.faruk.setFlipX(false);
        } else {
            this.faruk.setVelocityX(0);
        }

        if (this.input_mgr.jump && this.faruk.body.blocked.down) {
            this.faruk.setVelocityY(-350);
        }

        this.farukLabel.setPosition(this.faruk.x, this.faruk.y - 35);
        this.fisherman.update(this.faruk);

        if (this.input_mgr.interact && !this.interactionDone) {
            if (this.fisherman.canInteract(this.faruk)) {
                this.canControl = false;
                const dialogues = this.fisherman.interact();
                this.dialogue.showDialogue(dialogues, () => {
                    this.interactionDone = true;
                    this.sailAway();
                });
            }
        }
    }

    sailAway() {
        const { width, height } = this.scale;

        // Move gold to fisherman
        this.tweens.add({
            targets: this.goldBag,
            x: this.fisherman.x, y: this.fisherman.y,
            alpha: 0, duration: 800,
        });

        // Move Faruk to boat
        this.tweens.add({
            targets: [this.faruk, this.farukLabel],
            x: this.boat.x - 15,
            duration: 1000, delay: 500,
            onComplete: () => {
                // FISHERMAN ALSO BOARDS THE BOAT!
                this.tweens.add({
                    targets: [this.fisherman, this.fisherman.nameLabel],
                    x: this.boat.x + 15,
                    duration: 800,
                    onComplete: () => {
                        this.dialogue.showDialogue([
                            { speaker: 'Balıkçı', text: 'Haydi Hünkarım, yola çıkalım! Allaha emanet!' },
                            { speaker: 'Anlatıcı', text: 'Faruk ve balıkçı tekneye bindiler. Yolculuk başladı...' },
                        ], () => {
                            // Both sail away
                            this.tweens.add({
                                targets: [this.boat, this.faruk, this.farukLabel, this.fisherman, this.fisherman.nameLabel],
                                x: width + 200,
                                duration: 3000, ease: 'Power1',
                                onComplete: () => {
                                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                                    this.cameras.main.once('camerafadeoutcomplete', () => {
                                        this.scene.start('IslandScene');
                                    });
                                },
                            });
                        });
                    },
                });
            },
        });
    }
}

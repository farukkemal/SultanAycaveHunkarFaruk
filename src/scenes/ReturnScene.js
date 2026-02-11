// Scene 11: Return + Betrayal - Pargalı jailed, Sümbül Ağa, fisherman rewarded
import DialogueBox from '../ui/DialogueBox.js';

export default class ReturnScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ReturnScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(11);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Palace interior
        this.cameras.main.setBackgroundColor('#2a1a3a');

        // Throne room walls
        for (let x = 0; x < width; x += 64) {
            for (let y = 0; y < height - 64; y += 64) {
                this.add.image(x + 32, y + 32, 'castle-wall').setAlpha(0.5).setTint(0x9966aa);
            }
        }

        // Floor
        for (let x = 0; x < width; x += 64) {
            this.add.image(x + 32, height - 16, 'stone-ground');
        }

        // Throne (simple)
        this.add.rectangle(width / 2, height - 90, 50, 60, 0xFFD700);
        this.add.rectangle(width / 2, height - 120, 40, 20, 0xFF0000);
        this.add.text(width / 2, height - 140, '👑', { fontSize: '20px' }).setOrigin(0.5);

        // Characters
        this.faruk = this.add.image(width / 2 - 20, height - 65, 'faruk-armor').setScale(1.3);
        this.ayca = this.add.image(width / 2 + 20, height - 60, 'ayca').setScale(1.3);

        this.pargali = this.add.image(width * 0.2, height - 55, 'pargali').setScale(1.2);
        this.fisherman = this.add.image(width * 0.75, height - 55, 'fisherman').setScale(1.2);

        // Sümbül Ağa starts offscreen
        this.sumbul = this.add.image(width + 50, height - 55, 'sumbul-aga').setScale(1.2);

        // Labels
        const lStyle = { fontSize: '10px', fontFamily: 'Arial' };
        this.add.text(width / 2 - 20, height - 100, 'Hünkar Faruk', { ...lStyle, color: '#FFD700' }).setOrigin(0.5);
        this.add.text(width / 2 + 20, height - 95, 'Sultan Ayça', { ...lStyle, color: '#FF69B4' }).setOrigin(0.5);
        this.pargaliLabel = this.add.text(width * 0.2, height - 90, 'Pargalı İbrahim', { ...lStyle, color: '#FF6600' }).setOrigin(0.5);
        this.add.text(width * 0.75, height - 90, 'Balıkçı', { ...lStyle, color: '#8B7355' }).setOrigin(0.5);
        this.sumbulLabel = this.add.text(width + 50, height - 90, 'Sümbül Ağa', { ...lStyle, color: '#888899' }).setOrigin(0.5);

        // Dialogue
        this.dialogue = new DialogueBox(this);

        this.time.delayedCall(500, () => this.throneRoomDialogue());
    }

    throneRoomDialogue() {
        this.dialogue.showDialogue([
            { speaker: 'Anlatıcı', text: 'Hünkar Faruk ve Sultan Ayça saraya döndüler. Lakin bazı hesaplar sorulacaktı...' },
            { speaker: 'Hünkar Faruk', text: 'Pargalı! Gel bakalım buraya. Seninle bir konuşmamız var.' },
            { speaker: 'Pargalı İbrahim', text: 'H-Hünkarım, hoş geldiniz efendim. Çok sevindim ki sağ salim...' },
            { speaker: 'Sultan Ayça', text: 'Çok mu sevindim? Biz yokken tahtı ele geçirmeye çalıştığını duyduk!' },
            { speaker: 'Pargalı İbrahim', text: 'N-ne?! Zinhar Sultanım, öyle bir şey yapmadım! Kim söyledi bunu?!' },
            { speaker: 'Hünkar Faruk', text: 'Korumalar her şeyi anlattı Pargalı. Sen benim gitmeyi istememin sebebini şimdi anlıyorum.' },
            { speaker: 'Hünkar Faruk', text: '"Belki gidip dönmemesi daha hayırlıdır" demişsin! Zinhar yalan söyleme!' },
            { speaker: 'Pargalı İbrahim', text: '...Hünkarım, affınızı dilerim. Şeytan beni yoldan çıkardı.' },
            { speaker: 'Sultan Ayça', text: 'İhanet eden vezire merhamet edilmez! Zindana atılsın!' },
            { speaker: 'Hünkar Faruk', text: 'Muhafızlar! Pargalı İbrahim\'i zindana atın! Baş vezirliktenbir de azledilmiştir!' },
        ], () => {
            // Pargalı dragged away animation
            this.tweens.add({
                targets: [this.pargali, this.pargaliLabel],
                x: -50, alpha: 0,
                duration: 2000,
                onComplete: () => this.sumbulArrives(),
            });

            // Pargalı struggle effect
            this.tweens.add({
                targets: this.pargali,
                y: this.pargali.y - 5,
                duration: 200, yoyo: true, repeat: 5,
            });
        });
    }

    sumbulArrives() {
        const { width, height } = this.scale;

        // Sümbül Ağa walks in
        this.tweens.add({
            targets: [this.sumbul, this.sumbulLabel],
            x: width * 0.2, duration: 1500,
            onComplete: () => {
                this.dialogue.showDialogue([
                    { speaker: 'Sümbül Ağa', text: 'Hünkarım, Sultanım! Huzurlarınıza geldim efendim.' },
                    { speaker: 'Hünkar Faruk', text: 'Sümbül Ağa, sen her zaman sadık kaldın. Seni yeni Baş Vezir ilan ediyorum!' },
                    { speaker: 'Sümbül Ağa', text: 'Aman efendim! Bu büyük şeref... Zinhar hakettiğimden fazla!' },
                    { speaker: 'Sultan Ayça', text: 'Hak ediyorsun Sümbül Ağa. Sadakatin ala büyüktür.' },
                    { speaker: 'Sümbül Ağa', text: 'Emredersiniz Hünkarım! Canla başla hizmet edeceğim!' },
                ], () => this.rewardFisherman());
            },
        });
    }

    rewardFisherman() {
        this.dialogue.showDialogue([
            { speaker: 'Hünkar Faruk', text: 'Şimdi sıra bu cesur balıkçı dostumuzda!' },
            { speaker: 'Hünkar Faruk', text: 'Bu adam, zinhar korkusuzca beni Ejderha Adası\'na götürdü. Hayatımı borçluyum.' },
            { speaker: 'Balıkçı', text: 'Estağfurullah Hünkarım, siz bana zaten 3 kese altın verdiniz...' },
            { speaker: 'Sümbül Ağa', text: 'Hünkarım, izninizle bu cesur adama 3 kese daha altın verelim!' },
            { speaker: 'Hünkar Faruk', text: 'Ala fikir Sümbül Ağa! 3 değil, 5 kese daha altın versin hazine!' },
            { speaker: 'Balıkçı', text: 'Y-yani toplamda 8 kese altın mı?! Aman Allahım! Ben zengin oldum!' },
            { speaker: 'Sultan Ayça', text: 'Hahahaha! Çok mutlu oldum senin için balıkçı efendi! ♥' },
            { speaker: 'Balıkçı', text: 'Karımın yüzü gülecek! Çocuklarım okula gidecek! Allahım şükürler olsun!' },
            { speaker: 'Sümbül Ağa', text: 'Hünkarım, komik bir şey söyleyebilir miyim? 😄' },
            { speaker: 'Hünkar Faruk', text: 'Söyle Sümbül Ağa, gülmeye ihtiyacımız var!' },
            { speaker: 'Sümbül Ağa', text: 'Efendim, Pargalı zindandan bağırıyor "Ben masum um!" diye. Muhafızlar kulaklarını tıkamış! 😂' },
            { speaker: 'Sultan Ayça', text: 'Hahahaha! Zinhar sussun artık o hain! 🤣' },
            { speaker: 'Hünkar Faruk', text: 'Ahahahaha! İyi olmuş! Hadi hayatım, kutlamamıza devam edelim! 😄' },
            { speaker: 'Balıkçı', text: 'Ben de gidip karıma müjdeyi vereyim! Ne desem az Hünkarım, çok sağ olun!' },
        ], () => {
            // Gold bags appear and go to fisherman
            for (let i = 0; i < 5; i++) {
                const goldBag = this.add.image(
                    this.sumbul.x + (i - 2) * 15,
                    this.sumbul.y - 20, 'gold'
                ).setScale(1.5).setDepth(100);
                this.tweens.add({
                    targets: goldBag,
                    x: this.fisherman.x, y: this.fisherman.y - 20,
                    duration: 800, delay: i * 200,
                    onComplete: () => {
                        this.tweens.add({
                            targets: goldBag, alpha: 0.5,
                            duration: 500,
                        });
                    },
                });
            }

            this.time.delayedCall(3000, () => {
                this.cameras.main.fadeOut(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('EndingScene');
                });
            });
        });
    }
}

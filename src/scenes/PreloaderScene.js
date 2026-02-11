// PreloaderScene: Title screen with pink hearts background
export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Pink gradient background
        this.cameras.main.setBackgroundColor('#2a0a1e');

        // Floating hearts background animation
        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(height, height + 200);
            const heart = this.add.image(x, y, 'mini-heart')
                .setScale(Phaser.Math.FloatBetween(0.5, 1.5))
                .setAlpha(Phaser.Math.FloatBetween(0.2, 0.6))
                .setDepth(0);

            this.tweens.add({
                targets: heart,
                y: -20,
                x: heart.x + Phaser.Math.Between(-40, 40),
                alpha: 0,
                duration: Phaser.Math.Between(4000, 8000),
                delay: Phaser.Math.Between(0, 3000),
                repeat: -1,
                onRepeat: () => {
                    heart.x = Phaser.Math.Between(0, width);
                    heart.y = height + 20;
                    heart.setAlpha(Phaser.Math.FloatBetween(0.2, 0.6));
                },
            });
        }

        // Pink ambient glow particles
        for (let i = 0; i < 10; i++) {
            const glow = this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height),
                Phaser.Math.Between(20, 60),
                0xFF69B4, 0.05
            );
            this.tweens.add({
                targets: glow,
                alpha: 0.12,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
            });
        }

        // Title
        const title = this.add.text(width / 2, height * 0.15, "⚔️ Hünkar Faruk'un Macerası ⚔️", {
            fontSize: '30px', color: '#FFD700', fontFamily: 'Georgia',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(width / 2, height * 0.28, 'Sultan Ayça İçin\nEjderha Adası Efsanesi', {
            fontSize: '18px', color: '#FF69B4', fontFamily: 'Georgia',
            fontStyle: 'italic', align: 'center', lineSpacing: 4,
        }).setOrigin(0.5);

        // Decorative line
        this.add.rectangle(width / 2, height * 0.38, 200, 2, 0xFFD700, 0.5);

        // Heart decoration
        const heart = this.add.image(width / 2, height * 0.50, 'heart').setScale(3);
        this.tweens.add({
            targets: heart,
            scaleX: 3.5, scaleY: 3.5,
            duration: 800,
            yoyo: true, repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Characters preview
        const farukImg = this.add.image(width / 2 - 50, height * 0.67, 'faruk-armor').setScale(2);
        const aycaImg = this.add.image(width / 2 + 50, height * 0.67, 'ayca').setScale(2);

        // Character labels
        this.add.text(width / 2 - 50, height * 0.67 + 35, 'Hünkar Faruk', {
            fontSize: '10px', color: '#FFD700', fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.add.text(width / 2 + 50, height * 0.67 + 35, 'Sultan Ayça', {
            fontSize: '10px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Gentle bobbing
        this.tweens.add({ targets: farukImg, y: farukImg.y - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: aycaImg, y: aycaImg.y - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: 300 });

        // Start prompt
        const startText = this.add.text(width / 2, height * 0.84, '💖 Başlamak için tıklayın... 💖', {
            fontSize: '16px', color: '#FFFFFF', fontFamily: 'Arial',
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true, repeat: -1,
        });

        // Credits
        this.add.text(width / 2, height * 0.94, '❤ Sevgililer Günü Hediyesi ❤', {
            fontSize: '13px', color: '#e94560', fontFamily: 'Arial',
        }).setOrigin(0.5);

        // Click to start
        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('IntroScene');
            });
        });
    }
}

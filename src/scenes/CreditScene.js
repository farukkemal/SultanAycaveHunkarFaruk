// Scene 13: Credits - Black screen with "To be continued" and "Dedektif Ayça" button
export default class CreditScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditScene' });
    }

    create() {
        const { width, height } = this.scale;

        if (window.setActiveChapter) window.setActiveChapter(13);

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#000000');

        // Floating mini hearts in background
        for (let i = 0; i < 15; i++) {
            const heart = this.add.image(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(height, height + 100),
                'mini-heart'
            ).setScale(Phaser.Math.FloatBetween(0.3, 0.8))
                .setAlpha(0.15).setDepth(0);

            this.tweens.add({
                targets: heart,
                y: -20, alpha: 0,
                duration: Phaser.Math.Between(5000, 10000),
                delay: Phaser.Math.Between(0, 5000),
                repeat: -1,
                onRepeat: () => {
                    heart.x = Phaser.Math.Between(0, width);
                    heart.y = height + 10;
                    heart.setAlpha(0.15);
                },
            });
        }

        // Phase 1: "To be continued" message
        const continueText = this.add.text(width / 2, height / 2 - 20,
            'Hünkar Faruk ve Sultan Ayça aşkı\nyeni hikayeler ile devam edecek...', {
            fontSize: '18px',
            color: '#FFD700',
            fontFamily: 'Georgia',
            fontStyle: 'italic',
            align: 'center',
            lineSpacing: 8,
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        const heartEmoji = this.add.text(width / 2, height / 2 + 40, '♥', {
            fontSize: '30px', color: '#FF69B4',
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        // Fade in the "to be continued" text
        this.tweens.add({
            targets: continueText,
            alpha: 1, duration: 2000,
        });
        this.tweens.add({
            targets: heartEmoji,
            alpha: 1, duration: 2000, delay: 1000,
        });

        // Heart pulse
        this.tweens.add({
            targets: heartEmoji,
            scaleX: 1.3, scaleY: 1.3,
            duration: 800, yoyo: true, repeat: -1, delay: 2000,
        });

        // After 5 seconds, transition to Dedektif screen
        this.time.delayedCall(6000, () => {
            this.tweens.add({
                targets: [continueText, heartEmoji],
                alpha: 0, duration: 1500,
                onComplete: () => this.showDetectiveScreen(),
            });
        });
    }

    showDetectiveScreen() {
        const { width, height } = this.scale;

        // Dedektif Ayça Ç. centered
        const titleText = this.add.text(width / 2, height / 2 - 60,
            '🔍 Dava seni bekliyor... 🔍', {
            fontSize: '14px', color: '#87CEEB', fontFamily: 'Arial',
            fontStyle: 'italic',
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        const detectiveText = this.add.text(width / 2, height / 2 - 20,
            'Dedektif Ayça Ç.', {
            fontSize: '28px', color: '#FFD700', fontFamily: 'Georgia',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        const subtitle = this.add.text(width / 2, height / 2 + 20,
            'Yeni bir macera başlıyor!', {
            fontSize: '14px', color: '#FF69B4', fontFamily: 'Arial',
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        // Fade in
        this.tweens.add({ targets: titleText, alpha: 1, duration: 1000 });
        this.tweens.add({ targets: detectiveText, alpha: 1, duration: 1500, delay: 500 });
        this.tweens.add({ targets: subtitle, alpha: 1, duration: 1000, delay: 1000 });

        // Pulse effect on title
        this.tweens.add({
            targets: detectiveText,
            scaleX: 1.05, scaleY: 1.05,
            duration: 1200, yoyo: true, repeat: -1, delay: 2000,
        });

        // "Davaya Git" button
        const btnBg = this.add.rectangle(width / 2, height / 2 + 70, 180, 40, 0xe94560, 0.9)
            .setDepth(10).setAlpha(0).setInteractive({ useHandCursor: true });
        const btnBorder = this.add.rectangle(width / 2, height / 2 + 70, 184, 44, 0xFFD700, 0)
            .setDepth(9).setAlpha(0);
        const btnText = this.add.text(width / 2, height / 2 + 70, '🔍 Davaya Git', {
            fontSize: '16px', color: '#FFFFFF', fontFamily: 'Arial', fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(11).setAlpha(0);

        // Fade in button
        this.tweens.add({
            targets: [btnBg, btnBorder, btnText],
            alpha: 1, duration: 1000, delay: 2000,
        });

        // Hover effect
        btnBg.on('pointerover', () => {
            btnBg.setFillStyle(0xFF69B4, 1);
            btnBorder.setAlpha(0.8);
        });
        btnBg.on('pointerout', () => {
            btnBg.setFillStyle(0xe94560, 0.9);
            btnBorder.setAlpha(0);
        });

        // Click to go to detective game
        btnBg.on('pointerdown', () => {
            window.open('https://farukkemal.github.io/Aycam/', '_blank');
        });

        // Credits at bottom
        this.time.delayedCall(3000, () => {
            this.add.text(width / 2, height - 40, '❤ Sevgililer Günü\'n Kutlu Olsun Ayça! ❤', {
                fontSize: '14px', color: '#e94560', fontFamily: 'Georgia', fontStyle: 'italic',
            }).setOrigin(0.5).setDepth(10);

            this.add.text(width / 2, height - 20, '~ Seni çok seviyorum ~', {
                fontSize: '11px', color: '#FF69B4', fontFamily: 'Arial',
            }).setOrigin(0.5).setDepth(10);
        });
    }
}

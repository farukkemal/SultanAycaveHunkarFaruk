// DialogueBox: Typewriter text dialogue system with speaker-specific colors
export default class DialogueBox {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.queue = [];
        this.currentText = '';
        this.displayedText = '';
        this.charIndex = 0;
        this.typewriterTimer = null;
        this.onCompleteCallback = null;
        this.isTyping = false;
        this.speakerName = '';

        // Speaker color map
        this.speakerColors = {
            'Hünkar Faruk': '#44DD44',
            'Sultan Ayça': '#FF69B4',
            'Pargalı İbrahim': '#FFD700',
            'Piri Reis': '#87CEEB',
            'Balıkçı': '#CD853F',
            'Sümbül Ağa': '#C0C0C0',
            'Şeker Ağa': '#FFA500',
            'Angara Ejderhası': '#FF4444',
            'Anlatıcı': '#AAAAAA',
            'Halk': '#FFD700',
            'Koruma 1': '#4499BB',
            'Koruma 2': '#55AACC',
        };

        // Create UI elements (fixed to camera)
        this.createUI();
    }

    getSpeakerColor(name) {
        return this.speakerColors[name] || '#FFFFFF';
    }

    createUI() {
        const { width, height } = this.scene.scale;
        const boxHeight = 120;

        // Background box
        this.bg = this.scene.add.rectangle(
            width / 2, height - boxHeight / 2 - 10,
            width - 40, boxHeight,
            0x000000, 0.85
        );
        this.bg.setStrokeStyle(2, 0xFFD700);
        this.bg.setScrollFactor(0);
        this.bg.setDepth(1000);

        // Speaker name
        this.nameText = this.scene.add.text(
            40, height - boxHeight - 2,
            '', { fontSize: '16px', fontFamily: 'Arial', color: '#FFD700', fontStyle: 'bold' }
        );
        this.nameText.setScrollFactor(0);
        this.nameText.setDepth(1001);

        // Speaker color indicator (small circle)
        this.colorDot = this.scene.add.circle(28, height - boxHeight + 6, 5, 0xFFD700);
        this.colorDot.setScrollFactor(0);
        this.colorDot.setDepth(1001);

        // Dialogue text
        this.dialogueText = this.scene.add.text(
            40, height - boxHeight + 14,
            '', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            wordWrap: { width: width - 80 },
            lineSpacing: 4,
        }
        );
        this.dialogueText.setScrollFactor(0);
        this.dialogueText.setDepth(1001);

        // Continue indicator
        this.continueText = this.scene.add.text(
            width - 60, height - 25,
            '▼', { fontSize: '14px', color: '#FFD700' }
        );
        this.continueText.setScrollFactor(0);
        this.continueText.setDepth(1001);

        // Blinking animation
        this.scene.tweens.add({
            targets: this.continueText,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });

        // Hide initially
        this.hide();

        // Click / Enter to advance
        this.scene.input.on('pointerdown', () => {
            if (!this.isActive) return;
            this.advance();
        });

        const enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        enterKey.on('down', () => {
            if (!this.isActive) return;
            this.advance();
        });
    }

    advance() {
        if (this.isTyping) {
            this.skipTypewriter();
        } else if (this.queue.length > 0) {
            this.showNext();
        } else {
            this.hide();
            if (this.onCompleteCallback) {
                const cb = this.onCompleteCallback;
                this.onCompleteCallback = null;
                cb();
            }
        }
    }

    showDialogue(messages, onComplete = null) {
        this.queue = [...messages];
        this.onCompleteCallback = onComplete;
        this.isActive = true;
        this.show();
        this.showNext();
    }

    showNext() {
        if (this.queue.length === 0) {
            this.advance();
            return;
        }

        const msg = this.queue.shift();
        this.speakerName = msg.speaker || '';
        this.currentText = msg.text || '';
        this.displayedText = '';
        this.charIndex = 0;

        // Set speaker-specific colors
        const speakerColor = this.getSpeakerColor(this.speakerName);
        this.nameText.setText(this.speakerName);
        this.nameText.setColor(speakerColor);
        this.colorDot.setFillStyle(Phaser.Display.Color.HexStringToColor(speakerColor).color);
        this.bg.setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(speakerColor).color);

        this.dialogueText.setText('');
        this.continueText.setVisible(false);

        this.startTypewriter();
    }

    startTypewriter() {
        this.isTyping = true;
        if (this.typewriterTimer) this.typewriterTimer.destroy();

        this.typewriterTimer = this.scene.time.addEvent({
            delay: 25,
            callback: () => {
                if (this.charIndex < this.currentText.length) {
                    this.displayedText += this.currentText[this.charIndex];
                    this.dialogueText.setText(this.displayedText);
                    this.charIndex++;
                } else {
                    this.isTyping = false;
                    this.typewriterTimer.destroy();
                    this.typewriterTimer = null;
                    this.continueText.setVisible(true);
                }
            },
            loop: true,
        });
    }

    skipTypewriter() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null;
        }
        this.displayedText = this.currentText;
        this.dialogueText.setText(this.displayedText);
        this.isTyping = false;
        this.continueText.setVisible(true);
    }

    show() {
        this.bg.setVisible(true);
        this.nameText.setVisible(true);
        this.colorDot.setVisible(true);
        this.dialogueText.setVisible(true);
        this.continueText.setVisible(true);
    }

    hide() {
        this.isActive = false;
        this.bg.setVisible(false);
        this.nameText.setVisible(false);
        this.colorDot.setVisible(false);
        this.dialogueText.setVisible(false);
        this.continueText.setVisible(false);
    }

    destroy() {
        if (this.typewriterTimer) this.typewriterTimer.destroy();
        this.bg.destroy();
        this.nameText.destroy();
        this.colorDot.destroy();
        this.dialogueText.destroy();
        this.continueText.destroy();
    }
}

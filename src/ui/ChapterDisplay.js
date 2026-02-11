export default class ChapterDisplay {
    constructor(scene, chapterNumber, chapterTitle) {
        this.scene = scene;
        this.chapterNumber = chapterNumber;
        this.chapterTitle = chapterTitle;

        this.create();
    }

    create() {
        const { width } = this.scene.scale;

        // Container for the chapter display (top right or top left)
        // User asked for "side of the game screen", let's put it top-left fixed

        // Background
        const bg = this.scene.add.rectangle(10, 10, 180, 50, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(999);

        // Border
        const border = this.scene.add.rectangle(10, 10, 180, 50)
            .setOrigin(0, 0)
            .setStrokeStyle(2, 0xFFD700)
            .setScrollFactor(0)
            .setDepth(1000);

        // Chapter Number Text
        const numText = this.scene.add.text(20, 15, `BÖLÜM ${this.chapterNumber}`, {
            fontSize: '12px',
            color: '#FFD700',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        })
            .setScrollFactor(0)
            .setDepth(1001);

        // Chapter Title Text
        const titleText = this.scene.add.text(20, 32, this.chapterTitle, {
            fontSize: '14px',
            color: '#FFFFFF',
            fontFamily: 'Arial'
        })
            .setScrollFactor(0)
            .setDepth(1001);

        // Store references
        this.elements = [bg, border, numText, titleText];
    }

    destroy() {
        this.elements.forEach(el => el.destroy());
    }
}

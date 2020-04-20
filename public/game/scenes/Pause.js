class Pause extends Phaser.Scene{
    constructor(){
        super('pause');
    }

    create(){
        this.pauseText = this.add.text(screen.width / 2, screen.height / 2, 'PAUSE', {
            'font-family': 'Arial',
            'color':'#ffffff'
        })
    }
}
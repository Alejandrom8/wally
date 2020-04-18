var config = {
    parent: 'game',
    type: Phaser.AUTO,
    canvas: document.getElementById('game'),
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth - 3,
        height: window.innerHeight - 4.01
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }
        }
    },
    scene: Game
};

let game;

function initGame(){
    game = new Phaser.Game(config);
    window.gameInitialized = true; 
}
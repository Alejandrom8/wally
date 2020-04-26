/**
 * @type { Game }
 * @extends {Phaser.Scene}
 */
class Game extends Phaser.Scene{
    constructor(){
        super('game');
    }

    init(){
        //multiplayer session
        this.session = new MultiplayerSession(this);
        this.session.addAllPlayers(window.room.players);
        // other settings
        this.input.keyboard.removeAllListeners();
    }

    preload(){
        let progressBar = this.add.graphics(),
        progressBox = this.add.graphics();
    
        var width = screen.width;
        var height = screen.height;

        let cw = width/2, ch = height/2;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(cw, ch, 320, 50);

        var loadingText = this.make.text({x: cw,y: ch - 50,text: 'Loading...',style: {font: '20px monospace',fill: '#ffffff'}});
        var percentText = this.make.text({x: cw,y: ch - 5,text: '0%',style: {font: '18px monospace',fill: '#ffffff'}});
        var assetText = this.make.text({x: cw,y: ch + 50,text: '',style: {font: '18px monospace',fill: '#ffffff'}});

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(cw + 10, ch + 10, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.setBaseURL(`${generalURL}/game/assets`);

        //Sprites
        this.load.spritesheet('boxMan', 'sprites/Sprite_Dr_WallaceRv2.png', { frameWidth: 280, frameHeight: 360});
        this.load.image('laser', 'spriteAdds/laser_1.png');

        //enemies
        this.load.spritesheet('gobo', 'sprites/gobo_sprite_full@3x.png', {frameWidth: 39, frameHeight: 14 * 3});
        //worldObjects
        this.load.image('space', 'backgrounds/espacio_lavel1_v3.jpg');
        this.load.image('moon_tileset', 'maps/level_1/level_1_stylesheet.png');
        this.load.tilemapTiledJSON('moon_floor', 'maps/level_1/moon.json');
    }

    create(){
        //General settings
        // this.cameras.main.backgroundColor.setTo(200,200,200);
        this.cameras.main.setBounds(0, 0, screen.width, screen.height);
        this.physics.world.setBounds(0, 0, screen.width, screen.height);

        //world
        this.space = this.add.tileSprite(0, 0, 16000, 1500, 'space');

        const platforms = this.make.tilemap({key:'moon_floor'})
        const tileset = platforms.addTilesetImage('moon', 'moon_tileset');

        this.worldLayer = platforms.createDynamicLayer('moon', tileset, 0, 500);
        this.worldLayer.setScale(0.75)
        this.worldLayer.setCollisionByProperty({collision: true}, true)

        this.add.text(10,10,'hola so monta tomos');

        //player
        this.userIteractions = this.input.keyboard.createCursorKeys();
        
        //multiplayer session
        this.session.init();
        //fuego amigo
        // this.session.addCollisions(this.session.playerBullets, async (player, bullet) => {
        //     bullet.destroy();
        //     if(!player.life.decreaseLife(10)) await this.session.die(player.id);
        // });

        //enemies
        this.spawn = new Spawner(this, new Coords(0, 565), 'right');
        this.spawn2 = new Spawner(this, new Coords(window.innerWidth, 500), 'left');
        // this.spawn = new Spawner(this, new Coords(window.width -100, 565), 'left');
    }
}
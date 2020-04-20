/**
 * @type {Player} - This object generate an instance of a local player with his controls 
 * and his settings like number of bullets or coords in the scenario.
 */
const playerConfig = {
    bullets: 100,
    life: 10
};

class Player{
    /**
     * 
     * @param {Phaser.Scene} scene - the scene where will be displayed the player
     * @param {Coords} coords - the position where will be displayed
     * @param {JSON} playerData - a json containing the player data
     */
    constructor(id, scene, coords, playerData){
        this.id = id;
        this.scene = scene;
        this.coords = coords
        this.playerData = playerData
        this.direction = 'right';
        this.life = playerConfig.life;
    }

    create(){
        this.addPlayer(this.coords);
        this.bullets = new Bullets(this.scene, 100, this.id);
    }
    
    /**
     * 
     * @param {String} nickname - the player nickname
     * @param {Coords} coords - the position where will be displayed
     */
    addPlayer(coords){
        this.playerObject = new PlayerContainer(this.scene, coords, this.playerData)
    }

    shot(){
        this.bullets.fireBullet(this.playerObject.x, this.playerObject.y, this.direction);
    }

    jump(){
        if(this.playerObject.isTouchingDown()){
            this.playerObject.body.setVelocityY(-280)
        }
    }

    walkRight(){
        this.direction = 'right';
        this.playerObject.body.setVelocityX(200)
        this.playerObject.sprite.anims.play('right', true)
    }

    walkLeft(){
        this.direction = 'left';
        this.playerObject.body.setVelocityX(-200)
        this.playerObject.sprite.anims.play('left', true)
    }

    stopWalk(){
        this.playerObject.body.setVelocityX(0)
        this.playerObject.sprite.anims.play('still', true)
    }
}
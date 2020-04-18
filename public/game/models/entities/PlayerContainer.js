/**
 * @type {PlayerContainer} - the object that contains the nickname and the sprite of the player
 */
class PlayerContainer extends Phaser.GameObjects.Container{
    /**
     * 
     * @param {Phaser.Scene} scene - the scene where will be displayed the container
     * @param {Coords} coords - the coordinates where will be displayed the container
     * @param {JSON} playerData - the object that contains the user data
     */
    constructor(scene, coords, {id, nickname}){
        super(scene, coords.x, coords.y);
        this.scene = scene;
        this.coords = coords;
        this.id = id;

        //setting up this object
        this.body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.scene.physics.world.enableBody(this, 0)
        this.body.setCollideWorldBounds(true)

        //setting up the elements that will contain this object
        /** life */
        this.life = new LifeBar(scene, 10, -5);
        /** nickname */
        this.nickname = this.scene.add.text(12.5, 0, nickname)

        /** sprite */
        this.sprite = new PlayerSprite(scene, new Coords(31.5, 45))
        this.sprite.anims.play('right', true)
        this.sprite.anims.stop()
        this.add([this.nickname,this.sprite, this.life])
        this.body.setBounce(0);

        this.scene.physics.add.collider(this, scene.worldLayer)
        //showing the object
        this.scene.add.existing(this)
    }

    isTouchingDown(){
        if(this.body.blocked.down || this.body.touching.down){
            return true;
        }
        return false;
    }
}
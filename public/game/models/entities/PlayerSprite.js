class PlayerSprite extends Phaser.Physics.Arcade.Sprite{

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Coords.x} x 
     * @param {Coords.y} y 
     */
    constructor(scene, { x = 0, y = 0}){
        super(scene, 0, 0, 'boxMan', 3)
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.setScale(0.13)
        this.setAnimations(8)
        this.scene.add.existing(this)
    }
    
    setAnimations(velocity){

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 1, end: 2}),
            frameRate: velocity,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 6, end: 7}),
            frameRate: velocity,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'still',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 4, end: 5}),
            frameRate: 0.5,
            repeat: -1
        })
    }
}
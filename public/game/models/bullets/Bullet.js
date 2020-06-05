class Bullet extends Phaser.Physics.Arcade.Sprite{

    /**
     * 
     * @param {Phaser.Scene} scene - the Phaser.Scene where the bullets have to appear.
     * @param {number} x - the x position where the bullets will be generated.
     * @param {number} y - the y position where the bullets will be generated.
     */
    constructor(scene){
        super(scene, 0, 0, 'laser')
        this.scene = scene;

        let custom_body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.body = custom_body;
        this.body.setBounce(0);
        this.scene.physics.world.enableBody(this, 0);
    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {string} direction - in wich direction will be shot
     * @param {*} who - who has shoted this bullet, its the player id;
     */
    fire({x = 0, y = 0, direction = '', who = null, to = null} = {}){
        this.who = who;
        this.body.setAllowGravity(false)
        this.body.reset(x, y)
        this.setActive(true)
        this.setVisible(true)

        if(to){
            let pendiente = Math.atan((to.y - this.y) / (to.x - this.x));
            this.setRotation(pendiente)
            this.scene.physics.moveTo(this, to.x, to.y, 700);
        }else{
            this.setVelocityX(direction == 'right' ? 800 : - 800)
        }

        super.fireTime = this.scene.time.now + 300;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta)
    }
}
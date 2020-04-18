class Bullets extends Phaser.Physics.Arcade.Group{

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} quantity
     */
    constructor(scene, quantity, who){
        super(scene.physics.world, scene)
        this.fireTime = 200;
        this.scene = scene;
        this.lastFired = 0;
        this.who = who;

        this.createMultiple({
            frameQuantity: quantity,
            key: 'laser',
            active: false,
            visible: false,
            classType: Bullet,
            setAlpha: 0.5,
        })

        this.scene.physics.add.collider(this, this.scene.worldLayer, (bullet) => {
            bullet.destroy()
        });

        // this.setAll('checkWorldBounds', true)
        // this.setAll('outOfBoundsKill', true)
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} direction 
     */
    fireBullet(x, y, direction){
        let bullet;
        if(this.scene.time.now > this.lastFired){
            bullet = this.getFirstDead(false)
            if(bullet){
                bullet.fire({x:x, y: y, direction: direction, who: this.who});
                this.lastFired = this.scene.time.now + this.fireTime;
            }
        }
    }
}
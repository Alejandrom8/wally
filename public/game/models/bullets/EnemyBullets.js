class EnemyBullets extends Phaser.Physics.Arcade.Group{

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} quantity
     */
    constructor(scene){
        super(scene.physics.world, scene)
        this.fireTime = 2000;
        this.scene = scene;
        this.lastFired = 0;

        this.createMultiple({
            frameQuantity: 300,
            key: 'laser',
            active: false,
            visible: false,
            classType: Bullet,
            setAlpha: 0.5,
        })

        this.scene.physics.add.collider(this, this.scene.worldLayer, (bullet) => {
            bullet.destroy()
        });
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} direction 
     */
    fireBullet(x, y, to){
        let bullet;
        if(this.scene.time.now > this.lastFired){
            bullet = this.getFirstDead(false)
            if(bullet){
                bullet.fire({x:x, y:y, to: to});
                this.lastFired = this.scene.time.now + this.fireTime;
            }
        }
    }
}
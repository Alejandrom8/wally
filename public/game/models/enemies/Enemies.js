class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(scene, total, players, bullets){
        super(scene.physics.world, scene);
        this.scene = scene;

        for(let i  = 0; i < total; i++){
            this.add(new Enemy(this.scene, new Coords(Phaser.Math.Between(100, screen.width), 100)));
        }

        this.scene.physics.add.collider(this, players);
        this.setBulletCollision(bullets);
    }

    hurt(gobo, bullet){
        bullet.destroy();
        gobo.anims.play('heart', true);
        setTimeout(() => {
            gobo.anims.stop();
            gobo.setFrame(1);
        }, 1000);
    }

    setBulletCollision(bullets){
        this.scene.physics.add.collider(this, bullets, this.hurt);
    }
}
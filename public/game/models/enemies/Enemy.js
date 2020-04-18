class Enemy extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Coords} coords
     */
    constructor(scene, {x, y}, players, bullets){
        super(scene, x, y, 'gobo', 1);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.bullets = new EnemyBullets(this.scene);
        this.life = 100;
        this.lastDirection = 'right';

        this.body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this);
        this.scene.physics.world.enableBody(this, 0);
        this.body.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this, this.scene.worldLayer);
        this.scene.physics.add.collider(this, players);
        this.setBulletCollision(bullets);
        
        this.setAnimations();
        this.scene.add.existing(this)
    }

    setAnimations(){
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('gobo', {start: 1, end: 0}),
            frameRate: 3,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'right_gobo',
            frames: this.scene.anims.generateFrameNumbers('gobo', {start: 1, end: 4}),
            frameRate: 6,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'left_gobo',
            frames: this.scene.anims.generateFrameNumbers('gobo', {start: 14, end: 11}),
            frameRate: 6,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'heart',
            frames: this.scene.anims.generateFrameNumbers('gobo', {start: 6, end: 7}),
            duration: 500,
            repeat: 2,
        })
    }

    walk(){
        if(this.lastDirection == 'right'){
            this.walkRight();
        }else{
            this.walkLeft();
        }
    }

    walkRight(){
        this.anims.play('right_gobo', true);
        this.setVelocityX(60);
    }

    walkLeft(){
        this.anims.play('left_gobo', true);
        this.setVelocityX(-60);
    }

    jump(){
        this.anims.play('jump', true);
        this.body.setVelocityY(-280);
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

    shot(to){
        this.lastDirection = this.x - to.x < 0 ? 'right' : 'left';
        this.bullets.fireBullet(this.x, this.y, to);
    }

    atackAndWatch(players){
        let target = this.getTarget(players);
        if(target){
            this.shot(target);
            this.setVelocity(0);
            this.anims.stop();
            this.setFrame(1);
        }else{ 
            if(this.body.blocked.left || this.body.blocked.right){
                this.jump();
            }
            this.walk();
        }
    }

    /**
     * 
     * @param {[Phaser.GameObjects.Container]} players
     */
    getTarget(players){
        let maxDistance = 200;
        let minDistance = this.getDistanceBetween(players[0]);
        let player = players[0];

        for(let pl in players){
            let distance = this.getDistanceBetween(pl);
            if(distance < minDistance){
                minDistance = distance;
                player = pl;
            }
        }

        if(minDistance <= maxDistance && player){
            return player;
        }

        return null;
    }

    getDistanceBetween(player){
        let goboCoords = new Coords(this.x, this.y);
        let playerCoords = new Coords(player.x, player.y);
        let distance = Math.sqrt(Math.pow((playerCoords.x - goboCoords.x), 2) + Math.pow((playerCoords.y - goboCoords.y), 2));
        return distance;
    }
}
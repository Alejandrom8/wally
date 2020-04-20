class EnemyGenerator extends Phaser.GameObjects.GameObjectFactory{
    constructor(scene, coords){
        super(scene);
        this.scene = scene;
        this.spawn = coords;
    }

    /**
     * 
     * @param {number} time - the time in minutes wich it's going to be generated a round of enemies. 
     */
    generateEnemies(time){
        time *= 1000 * 60;

        let first = true;
        if(first) this.createEnemies(3);
        this.loop = setInterval(() => {
            this.createEnemies(3);
            first = false;
        }, time);
    }

    createEnemies(amount, side){
        let counter = 0;
        let spawner = setInterval(() => {
            let enemy = new Enemy(this.scene, new Coords(this.spawn.x, this.spawn.y), side);
            counter++;
            if(counter == amount) clearInterval(spawner);
        }, 1.5 * 1000);
    }
}
class Spawner extends EnemyGenerator{
    constructor(scene, coords, side){
        super(scene, coords);
        this.scene = scene;
        this.coords = coords;

        this.createEnemies(3, side);
    }

    awaitNextRaound(){
        setTimeout(() => {
            this.countDown();
            this.createEnemies(3);
        }, 3 * 1000 * 60);
    }

    countDown(){
        let number = this.scene.add.text(window.innerWidth/2, window.innerHeight/2, '3', {
            fontFamily: 'arial',
            fontSize: '40px',
            color: '#ffffff'
        });
        let index = 2;
        let counter = setInterval(() => {
            if(index > 0){
                number.setText(index);
                index--;
            }else{
                clearInterval(counter);
            }
        }, 1000);
    }
}
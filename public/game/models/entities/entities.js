
class Coords{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class LifeBar extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene = scene;
        this.amount = 100;

        this.outBar = new Phaser.GameObjects.Graphics(this.scene);
        this.outBar.fillStyle(0x222222);
        this.outBar.fillRect(0, 0, 110, 16);
        this.outBar.setScale(0.4);

        this.innerBar = new Phaser.GameObjects.Graphics(this.scene);
        this.innerBar.fillStyle(0x00FF00);
        this.innerBar.fillRect(5, 3, this.amount, 10);
        this.innerBar.setScale(0.4);

        this.add([this.outBar,this.innerBar]);
        this.scene.add.existing(this);
    }

    decreaseLife(amount){
        if(this.amount > 0){
            this.amount = this.amount -amount;

            let green = 0x00FF00;
            let yellow = 0xFFFF00;
            let red = 0xFF0000;
            let color;

            if(this.amount >= 60){
                color = green;
            }else if(this.amount >= 30){
                color = yellow;
            }else{
                color = red;
            }

            this.innerBar.clear();
            this.innerBar.fillStyle(color);
            this.innerBar.fillRect(5, 3, this.amount, 10);
            this.innerBar.setScale(0.4);

            if(this.amount > 0) return true;
        }

        return false;
    }
}
class MultiplayerSession{

    constructor(scene, players =  {}){
        this.scene = scene;
        this.players = players;
    }

    get playerContainers(){
        let containers = [];
        for(let id in this.players){
            let player = this.players[id];
            containers.push(player.playerObject);
        }

        return containers;
    }

    get playerBullets(){
        let bullets = [];
        for(let id in this.players){
            let player = this.players[id];
            bullets.push(player.bullets);
        }
        return bullets;
    }

    randomOperation(num1, num2){
        let operators = [{
            sign: "+",
            method: function(a,b){ return a + b; }
        },{
            sign: "-",
            method: function(a,b){ return a - b; }
        }];
    
        let selectedOperator = Math.floor(Math.random()*operators.length);
        let operator = operators[selectedOperator];
        return operator.method(num1, num2);
    }

    addAllPlayers(players){
        let keys = Object.keys(players);

        for(let playerIndex = 0; playerIndex < keys.length; playerIndex++){
            let player = players[keys[playerIndex]];
            this.addPlayer({
                id: player.id,
                nickname: player.nickname,
                x: Math.floor(window.innerWidth / 2),
                y: 0
            });
        }
    }

    addPlayer({id, nickname, x, y}){
        let player = new Player(id, this.scene, new Coords(x, y), {'id': id, 'nickname': nickname});
        this.players[id] = player;
        console.log(`${nickname} has joined to the game`);       
    }

    removePlayer(id){
        if(this.players[id]){
            this.players[id].playerObject.destroy();
            delete this.players[id];
            console.log(`A player has left the room.`);
        }
        return
    }

    searchPlayer(id){
        if(this.players[id]){
            return this.players[id];
        }
        return
    }

    showPlayersInScene(){
        for(let playerID in this.players){
            let player = this.players[playerID];
            player.create();
        }
    }

    die(id){
        this.removePlayer(id);
    }

    /**
     * 
     * @param {*} object 
     * @param {*} handler 
     */
    addCollisions(object, handler){
        this.scene.physics.add.collider(this.playerContainers, object, handler);
    }

    init(){
        //estado que muestra a todos los jugadores e inicia el juego
        this.showPlayersInScene();

        window.socket.on('shot', data =>  {
            let { id } = data;
            this.players[id].shot();
        });

        window.socket.on('jump', data => {
            let { id } = data;
            this.players[id].jump();
        });

        window.socket.on('move', data => {
            let { id, direction } = data;
            let player = this.players[id];
            direction == 'right' ? player.walkRight() : player.walkLeft();
        });

        window.socket.on('stop', data => {
            let { id } = data;
            this.players[id].stopWalk();
        });

        window.socket.on('remove', data => {
            let { id } = data;
            this.removePlayer(id);
            window.room.removePlayer(window.room.players[id]);
        });
    }
}
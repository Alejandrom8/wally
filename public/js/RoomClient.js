class RoomClient{
    constructor({id = '', name = '', maxPlayers = 0} = {}){
        this.id = id;
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.players = {};
    }

    currentPlayers(){
        return Object.keys(this.players).length;
    }

    addPlayer(id, nickname, score){
        this.players[id] = new PlayerClient(id, nickname, score);
        console.log(this.players);
    }

    removePlayer(player){
        if(this.players[player.id]){
            const name = this.players[player.id].nickname;
            delete this.players[player.id];
            console.log(`El jugador ${name} ha abandonado el cuarto`);
        }
    }

    checkAvailableSlots(){
        let playerSlots = document.querySelectorAll('.player');
        let available;

        for(let indexPS = 0; indexPS < playerSlots.length;indexPS++){
            let ps = playerSlots[indexPS];
            if(ps.classList.contains('player-of')){
                available = ps;
                break;
            }
        }
        return available;
    }
}

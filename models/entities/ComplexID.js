const {player} = require('../../config')

class ComplexID{
    constructor(complexID){
        let room_id_size = player.id_size[0],
            player_id_size = player.id_size[1];
            
        this.complexID = complexID;
        this.roomID = complexID.slice(0, room_id_size);
        this.playerID = complexID.slice(room_id_size, room_id_size + player_id_size);
    }
}

module.exports = ComplexID;
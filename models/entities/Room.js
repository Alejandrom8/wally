const PlayerServer = require('./PlayerServer');
const UUID = require('uuid-random');
const List = require('./List');

//solo es un control
class Room{
    /**
     * 
     * @param {String} id - the room id
     * @param {String} simplifedID - a part of the id that facilitate the user join to a room.
     * @param {Number} maxusers - the limit of the room
     * @param {[PlayerServer]} users - a list containing the users
     */
    constructor({anfitrion, name = '', maxusers = 0} = {}){
        this.createRoomID();
        this.anfitrion = anfitrion;
        this.name = name;
        this.maxusers = maxusers;
        this.users = new List();
    }

    static onPlayerConnection(io, socket){
        socket.on('newPlayer', (name, roomID) => {
            //buscamos en lista
            //si existe el cuarto, se verifica que aun halla espacio
            //se crea un nuevo jugador y se ingresa al cuarto.
            //se emite a todos los jugadores que ha ingresado un nuevo jugador.
            let room = Room.searchRoom(roomID);
            if(room){
                if(Object.keys(room.users).length <= room.maxusers){
                    socket.join(room.name);
                    let player = new PlayerServer({id: socket.id, nickname: name, score: 0});
                    generalList.list[room.id].users.addElement(player);
                    socket.emit('successRegist', room.id);
                    io.to(room.anfitrion).emit('newPlayer', player);
                    console.log('A player has been created');
                }else{
                    //se emite un error diciendo que el limite de jugadores ha llegado
                    socket.emit('roomLimitExceded', room.maxusers);
                }
            }else{
                //el cuarto indicado no existe
                socket.emit('roomDosntExists');
            }
        });
    }

    static disconnectPlayer(io, socket, rooms){
        if(generalList.list){

            let keys = Object.keys(rooms);
            let roomName = keys[1];
            let room = Room.searchRoomByName(roomName);

            if(room){
                let player = generalList.list[room.id].users.list[socket.id];
                io.to(room.anfitrion).emit('remove', player);
                delete generalList.list[room.id].users.list[socket.id];
                console.log('A player has been removed');
            }else{
                console.log('se intento borrar a un usuario pero no se encontro el cuarto indicado');
            }
        }
    }

    static searchRoom(id){
        const rooms = Object.keys(generalList.list);
        let room;

        for(let i = 0; i < rooms.length; i++){
            let currentRoom = generalList.list[rooms[i]];
            if(currentRoom.id == id || currentRoom.simplifiedID == id){
                room = currentRoom;
                break;
            }
        }
        return room;
    }

    static searchRoomByName(name){
        const rooms = Object.keys(generalList.list);
        let room;

        for(let i = 0; i < rooms.length; i++){
            let currentRoom = generalList.list[rooms[i]];
            if(currentRoom.name == name){
                room = currentRoom;
                break;
            }
        }

        return room;
    }

    createRoomID(){
        const id = UUID();
        this.id = id;
        const simplifiedID = id.slice(0, id_size[0]);
        this.simplifiedID = simplifiedID;
    }
}

module.exports = Room;
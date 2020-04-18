class PlayerServer{

    /**
     * This class manage all the interactions of the control, and then send's it as an event to the 
     * main screen - the game -.
     * @param {String} id - the player socket.io id.
     * @param {String} nickname - the player name of this user.
     * @param {Name} score - the score of the player.
     */
    constructor({id, nickname = '', score} = {}){
        this.id = id;
        this.nickname = nickname;
        this.score = score;
    }

    /**
     * This static method it's the intermediary between the 
     * @param {SocketIO.Server} io - the socket.io server created at the main file 
     * @param {SocketIO.Socket} socket - the socket created at the execution of the 'connection' event.
     */
    static onMove(io, socket){
        socket.on('move', (roomID, direction) => {
            let room = generalList.list[roomID];
            if(room){
                let anfitrion = room.anfitrion;
                io.to(anfitrion).emit('move', {id: socket.id, direction: direction});
            }
        });
    }

    /**
     * 
     * @param {SocketIO.Server} io - the socket.io server created at the main file 
     * @param {SocketIO.Socket} socket - the socket created at the execution of the 'connection' event.
     */
    static onJump(io, socket){
        socket.on('jump', roomID => {
            if(generalList.list[roomID]){
                let anfitrion = generalList.list[roomID].anfitrion;
                io.to(anfitrion).emit('jump', {id: socket.id});
            }
        });
    }

    /**
     * 
     * @param {SocketIO.Server} io - the socket.io server created at the main file 
     * @param {SocketIO.Socket} socket - the socket created at the execution of the 'connection' event.
     */
    static onStop(io, socket){
        socket.on('stop', roomID => {
            if(generalList.list[roomID]){
                let anfitrion = generalList.list[roomID].anfitrion;
                io.to(anfitrion).emit('stop', {id: socket.id});
            }
        });
    }

    static onShot(io, socket){
        socket.on('shot', roomID => {
            if(generalList.list[roomID]){
                let anfitrion = generalList.list[roomID].anfitrion;
                io.to(anfitrion).emit('shot', {id: socket.id});
            }
        });
    }
}

module.exports = PlayerServer;
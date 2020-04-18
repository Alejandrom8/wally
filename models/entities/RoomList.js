const List = require('./List');
const Room = require('./Room');


class RoomList extends List{

    /**
     * RoomList - the roomList class will manage the list of rooms and include a set of methods
     * that let search, update, create and delete rooms. At the first time, look's like it's an object
     * that do all about the rooms, but this just manage a 'virtual list', socket.io manage the real
     * connections, as you can see, this is not a persistant data type. and will be removed at the same time
     * when the server it's turned off.
     * constructor - does not need information to be created, this just create an empty
     * object that will be the room list.
     */
    constructor(){
        super();
    }

    /**
     * A static method to create a room acording to the socket.io client side event, public.
     * @param {SocketIO.Socket} socket - the created socket.
     */
    static onCreateRoom(socket){
        socket.on('createRoom', roomData => {
            let room = new Room({anfitrion: socket.id, name: roomData.roomName, maxusers: roomData.playerLimit});
            generalList.addElement(room);
            socket.join(room.roomName);
            socket.emit('roomCreated', room);
        });    
    }
}

module.exports = RoomList;
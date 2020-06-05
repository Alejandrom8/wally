//dependencies
const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      socket_io = require('socket.io');

//main objects
const app = express();
const io = socket_io();
app.io = io;

/**global variables**/
const RoomList = require('./models/entities/RoomList');
//the main manager of the rooms
global.generalList = new RoomList;
//io like global variabla for it's use in other methods.
global.io = io;

//route files - the files that perform express routes
const control = require('./routes/control');
const game = require('./routes/game');

//Socket Handlers - the files that manage the socket's events
const PlayerServer = require('./models/entities/PlayerServer');
const Room = require('./models/entities/Room');

//midlewares - preprocessing data
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/frwks', express.static(path.join(__dirname, 'node_modules')))

//views - configuring the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Routes - setting routes
app.use('/control', control);
app.use('/', game);

//sockets - managing sockets
io.on('connection', socket => {
    //Room events
    RoomList.onCreateRoom(socket);
    Room.onPlayerConnection(io, socket);
    Room.onPause(io, socket);
    Room.onResume(io, socket);
    //player events
    PlayerServer.onMove(io, socket);
    PlayerServer.onJump(io, socket);
    PlayerServer.onStop(io, socket);
    PlayerServer.onShot(io, socket);

    let rooms = socket.rooms;
    socket.on('disconnect', () => {
        Room.disconnectPlayer(io, socket, rooms);
    });
});

module.exports = app;
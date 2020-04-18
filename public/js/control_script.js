window.onbeforeunload = () => {
    return 'Estas seguro de querer abandonar? se perdera la conexión establecida con el cuarto'
};

const registrationSection = document.getElementById('ip_registration');
const controlSection = document.getElementById('control');
const debug = document.getElementById('errors');

if(roomID){
    let room = document.getElementById('roomID');
    room.value = roomID;
    document.getElementById('room_section').style.display = 'none';
}

socket.on('todoOk', (message) => {
    console.log(message);
});

function toJSONString(form){
    let obj = {};
    let elements = form.querySelectorAll( "input, select, textarea" );

    elements.forEach(element => {
        let name = element.name;
        let value = element.value;
        if(name) obj[name] = value;
    });

    return obj;
}

//entrar a un cuarto
const join_room_form = document.getElementById('join_room_form');
join_room_form.addEventListener('submit', function(e){
    e.preventDefault();
    let data = toJSONString(join_room_form);
    sessionStorage.setItem('nickname', data.nickname);
    sessionStorage.setItem('roomID', data.roomID);
    socket.emit('newPlayer', data.nickname, data.roomID);
});

socket.on('roomLimitExceded', () => {
    debug.innerHTML = '<p>El cuarto ha llegado a su limite</p>'
});

socket.on('roomDosntExists', () =>{ 
    debug.innerHTML = '<p>No existe el cuarto especificado</p>'
});

socket.on('successRegist', roomID => {
    window.roomID = roomID;
    registrationSection.style.display= 'none';
    controlSection.style.display = 'block';
});

//movement registration
const shot = document.getElementById('shot');
const jump = document.getElementById('jump');

shot.addEventListener('click', () => {
    socket.emit('shot', window.roomID);
});

jump.addEventListener('click', () => {
    socket.emit('jump', window.roomID);
});

socket.on('reconnect', () => {
    //usar este metodo para manejar la ida de internet del usuario
    let nickname = sessionStorage.getItem('nickname'),
        roomID = sessionStorage.getItem('roomID');
    socket.emit('newPlayer', nickname, roomID);
});



//joystick

var options_d = {
    zone: document.getElementById('seeJoystick'),
    mode: 'static',
    position: {left: '25%', top: '32%'},
    color: 'purple',
    size: 150
};

// var manager_direction = nipplejs.create(options_d);

// manager_direction.on('move', (data) => {
    
// });

var options_m = {
    zone: document.getElementById('moveJoystick'),
    mode: 'dynamic',
    position: {right: '25%', top: '32%'},
    color: 'blue',
    size: 100
};

var manager_movement = nipplejs.create(options_m);

manager_movement.on('plain:left', (data) => {
    let direction = data.direction;
    socket.emit('move', window.roomID, 'left');
});

manager_movement.on('plain:right', (data) => {
    let direction = data.direction;
    socket.emit('move', window.roomID, 'right');
});

// manager_movement.on('dir:up', (data) => {
//     let direction = data.direction;
//     socket.emit('move', window.roomID, direction);
// });

// manager_movement.on('dir:down', (data) => {
//     let direction = data.direction;
//     socket.emit('move', window.roomID, direction);
// });

manager_movement.on('end', () => {
    socket.emit('stop', window.roomID);
});
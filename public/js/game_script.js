window.gameInitialized = false;
window.onbeforeunload = () => {
    return 'Estas seguro de querer abandonar? se perdera la conexión establecida con el cuarto'
};

let startButton; //the button that starts the game

//main slider
const gameSlider = new Slider(document.querySelectorAll('.mainBlock'));

//select join optin section
const create_room_button = document.getElementById('create_room');
const join_room_button = document.getElementById('join_room');
const return_button = document.querySelectorAll('.return');
const room_inner_slider = new Slider(document.querySelectorAll('.secondBlock'));

return_button.forEach(rebut => {
    rebut.addEventListener('click', (e) => {
        room_inner_slider.presentWindow(0);
    });
});

create_room_button.addEventListener('click', (e) => {
    room_inner_slider.presentWindow(1);
});

join_room_button.addEventListener('click', (e) => {
    room_inner_slider.presentWindow(2);
});

//create room section
const create_room_form_element = document.getElementById('create_room_form');
const debug_area = document.getElementById('debug_area');

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

create_room_form_element.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = toJSONString(create_room_form_element);
    data.playerLimit = parseInt(data.playerLimit);
    window.socket.emit('createRoom', data);
});

window.socket.on('roomCreated', (room) => {
    //configuring the game
    window.room.maxPlayers = room.maxusers;
    window.room.name = room.name;
    window.room.id = room.simplifiedID;

    //this process generates the players grid
    let times = window.room.maxPlayers > 3 ? 2 : 1;
    let cellsConstructed_firstRow = window.room.maxPlayers >= 3 ?  3 : window.room.maxPlayers;
    let cellsConstructed_secondRow = window.room.maxPlayers >= 3 && window.room.maxPlayers <= 6 ? window.room.maxPlayers-3 : 0;
    let cellSize = window.room.maxPlayers >= 3 ? 4 : 6;
    let playerCounter = 1;

    let finalView = `<div id="info_section" class='col-lg-12 row'>
        <div class="col-lg-4 centeredContent">
            <img src='https://chart.googleapis.com/chart?cht=qr&chl=${generalURL}/control?roomID=${window.room.id}&chs=250x250'>
        </div>
        <div class="col-lg-8 text-center centeredContent">
            <div>
                <h2>${window.room.name}</h2>
                <h3>Código: ${window.room.id}</h3>
                <p>Número de jugadores: ${window.room.maxPlayers}</p>
                <p>Jugadores actuales: <span id="playerCounter">${window.room.currentPlayers()}</span></p>
                <button id="initGame" class="btn btn-success btn-lg" disabled>Iniciar Juego</button>
            </div>
        </div>
    </div>
    <section id="playersContainer" class="col-lg-12 row">`;


    for(let rows = 0; rows < times; rows++){
        finalView += `<div class="col-lg-12 row" style="height:auto;padding:2% 0;">`;
        let cells_build = rows == 0 ? cellsConstructed_firstRow : cellsConstructed_secondRow;
        for(let cell = 0; cell < cells_build; cell++){
            finalView += `<div id="player_${playerCounter}" class="player centeredContent player-of col-md-${cellSize}">
                <div class="playerBox">
                    <img class="player_photo" src="/img/wally.png">
                    <h3 class="player_nickname">jugador ${playerCounter}</h3>
                    <div class="connectionStatus">Esperando jugador...</div>
                </div>
            </div>`;
            playerCounter++;
        }
        finalView += '</div>';
    }

    finalView += `</section><div class="col-lg-12 text-center bigText bg-dark p-4">Si el codigo anterior no funciono, ingresa a 
    <a href="${generalURL}/control">${generalURL}/control</a> desde tu telefono e 
    introduce este codigo: <span class="code">${window.room.id}</span></div>`;

    let section = document.getElementById('playersSection');
    section.innerHTML = finalView;
    startButton = document.getElementById('initGame');
    startButton.addEventListener('click', () => {
        initGame();
        gameSlider.next();
    });

    gameSlider.next();
});

let playerCounterSection;
let section;

window.socket.on('newPlayer', (playerData) => {
    //room logic
    let currentPlayers = window.room.currentPlayers() + 1;
    window.room.addPlayer(playerData.id, currentPlayers, playerData.nickname, playerData.score);
    playerCounterSection = document.getElementById('playerCounter');
    playerCounterSection.innerText = currentPlayers;

    //visual logic
    let availableSlot = window.room.checkAvailableSlots();
    section = availableSlot ? availableSlot : document.getElementById(`player_${currentPlayers}`);
    section.classList.remove('player-of');
    section.classList.add('player-on');
    let innerSection = section.querySelector('.playerBox');
    let sectionName = innerSection.querySelector('.player_nickname');
    let connectionStatus = innerSection.querySelector('.connectionStatus');
    sectionName.innerText = playerData.nickname;
    connectionStatus.style.backgroundColor = 'greenyellow';
    connectionStatus.innerText = 'Conectado';

    //if all players is on the room, the play button is abilitated
    if(currentPlayers == window.room.maxPlayers) startButton.removeAttribute('disabled');
});

window.socket.on('remove', (playerData) => {
    if(!window.gameInitialized){
        let playerDisconnected = window.room.players[playerData.id];
        let playerSection = document.getElementById(`player_${playerDisconnected.index}`);
        let innerSectionPD = playerSection.querySelector('.playerBox');
        let nameSection = innerSectionPD.querySelector('.player_nickname');
        let connectionStatus = innerSectionPD.querySelector('.connectionStatus');

        playerSection.classList.remove('player-on');
        playerSection.classList.add('player-of');

        nameSection.innerText = 'Jugador ' + playerDisconnected.index;
        connectionStatus.style.backgroundColor = 'red';
        connectionStatus.innerText = 'El jugador '+ playerDisconnected.index +' se ha desconectado';

        window.room.removePlayer(playerData);
        let currentPlayers = window.room.currentPlayers();
        playerCounterSection.innerText = currentPlayers;

        startButton.addAttribute('disabled');
    }
})
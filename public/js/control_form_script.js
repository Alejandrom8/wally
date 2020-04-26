const registration_form = document.getElementById('registration');
const complexID = document.getElementById('complexID');
const errorArea = document.getElementById('errors');
const registrationSection = document.getElementById('ip_registration');
const controlSection = document.getElementById('control');

async function performShipping(data){
    try{
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        const credentials = {
            method: 'post',
            headers: headers,
            cache: 'default',
            body: JSON.stringify(data)
        };

        const response = await fetch(generalURL + '/control/registration', credentials);

        if(response.ok){
            return await response.json();
        }else{
            throw new Error('No se logro correctamente la comunicación con el servidor');
        }

    }catch(e){
        console.error(e);
    }
}

function handleResponse(res){
    if(res.success){
        const lgps = registrationSection.style;
        lgps.opacity = 0;
        lgps.webkitAnimation = 'fadeout 3s';
        lgps.animation = 'fadeout 3s';
        controlSection.style.display  = 'block';
    }else{
        errorArea.innerHTML = `<p>${res.errors}</p>`;
    }
}

async function sendData(e){
    e.preventDefault();
    const id_value = complexID.value;
    const result = await performShipping({
        complexID: id_value,
        socket: socket.id
    });
    handleResponse(result);
}

registration_form.addEventListener('submit', sendData);
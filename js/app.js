const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    const inputCiudad = document.querySelector('#ciudad').value;
    const inputPais = document.querySelector('#pais').value;
    //Validar
    if(inputCiudad === '' || inputPais === '') {
        mostrarError('Ambos campos son abligatorios');
        return;
    }

    //Consultaremos la API

    consultarAPI(inputCiudad,inputPais);
}

function mostrarError(mensaje) {
    const alertaAviso = document.querySelector('.alerta');
    if(!alertaAviso) {

        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded' , 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    
        alerta.innerHTML = `
            <strong>Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);

        //se elimine la alerta

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
    
    }


function consultarAPI(ciudad, pais) {
     const appId = '378f0514d0bab2d82f4724e684b5aa2d';
     
     const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
     
     Spinner();

     fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //Limpiar HTML
            if(datos.cod === "404") {
                mostrarError('Ciudad no econtrada');
                return;
            }
            mostrarClima(datos);
        })
    
}

function mostrarClima(datos) {
    const { name, main: {temp, temp_max, temp_min} } = datos;

    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');


    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${centigrados} &#8451; `;
    tempActual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

//function kelvinCentigrados(grados){
    //return parseInt(grados - 273.15);
    
//}

const kelvinCentigrados = grados => parseInt(grados - 273.15);
 
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    resultado.appendChild(divSpinner);
}
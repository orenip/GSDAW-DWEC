// Establecer el título de la página
document.title = "Lotería Primitiva";

// Establecer el estilo del documento
const estilo = document.createElement("style");
estilo.textContent = `
    .numero {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        margin: 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .seleccionado {
        background-color: lightblue;
    }
    .contenedor-numeros {
        display: grid;
        grid-template-columns: repeat(7, 30px);
        gap: 0;
    }
    .numero-grande {
        width: 50px;
        height: 50px;
        font-size: 20px; /* Puedes ajustar el tamaño de la fuente según tus preferencias */
    }
`;
document.head.appendChild(estilo);

// Crear los números aleatorios y mostrarlos en los campos deshabilitados
const numerosAleatorios = generarNumerosAleatorios();
mostrarNumerosAleatorios(numerosAleatorios);

// Crear los números del 1 al 49 y permitir al usuario seleccionar/deseleccionar
const contenedorNumeros = document.createElement('div');
contenedorNumeros.id = 'contenedorNumeros';
contenedorNumeros.className = 'contenedor-numeros';
document.body.appendChild(contenedorNumeros);

// Bucle para crear elementos 'div' representando los números del 1 al 49
for (let i = 1; i <= 49; i++) {
    const elementoNumero = document.createElement('div');
    elementoNumero.classList.add('numero');
    elementoNumero.textContent = i;
    elementoNumero.addEventListener('click', () => alternarNumero(i));
    contenedorNumeros.appendChild(elementoNumero);
}

// Crear el contenedor de mensajes
const contenedorMensajes = document.createElement('div');
contenedorMensajes.id = 'contenedorMensajes';
document.body.appendChild(contenedorMensajes);

// Función para generar 6 números aleatorios diferentes entre 1 y 49
function generarNumerosAleatorios() {
    const numerosAleatorios = [];
    while (numerosAleatorios.length < 6) {
        const numeroAleatorio = Math.floor(Math.random() * 49) + 1;
        if (!numerosAleatorios.includes(numeroAleatorio)) {
            numerosAleatorios.push(numeroAleatorio);
        }
    }
    return numerosAleatorios.sort((a, b) => a - b);
}

// Función para mostrar los números aleatorios en los campos deshabilitados
function mostrarNumerosAleatorios(numeros) {
    for (let i = 0; i < numeros.length; i++) {
        const inputElemento = document.createElement('input');
        inputElemento.type = 'text';
        inputElemento.id = `numero${i + 1}`;
        inputElemento.disabled = true;
        inputElemento.value = numeros[i];
        document.body.appendChild(inputElemento);
    }
}

// Función para alternar la selección/deselección de un número
function alternarNumero(numero) {
    const elementoNumero = document.querySelector(`.numero:nth-child(${numero})`);
    const numerosSeleccionados = obtenerNumerosSeleccionados();

    if (elementoNumero.classList.contains('seleccionado')) {
        // Deseleccionar número
        elementoNumero.classList.remove('seleccionado');
    } else if (numerosSeleccionados.length < 6) {
        // Seleccionar número solo si no se han seleccionado 6 números
        elementoNumero.classList.add('seleccionado');
    }

    // Actualizar el mensaje con los números seleccionados
    actualizarMensaje(obtenerNumerosSeleccionados());
}

// Función para obtener los números seleccionados
function obtenerNumerosSeleccionados() {
    return Array.from(document.querySelectorAll('.seleccionado')).map(elemento => parseInt(elemento.textContent));
}

// Función para actualizar el mensaje según la comparación de los números seleccionados con los aleatorios
function actualizarMensaje(numerosSeleccionados) {
    const numerosAleatoriosOrdenados = numerosAleatorios.slice().sort((a, b) => a - b);
    const coinciden = compararArrays(numerosSeleccionados.sort((a, b) => a - b), numerosAleatoriosOrdenados);
    contenedorMensajes.textContent = coinciden ? '¡Felicidades! Has acertado.' : 'Sigue intentando.';
}

// Función para comparar dos arrays
function compararArrays(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

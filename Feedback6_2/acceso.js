document.addEventListener("DOMContentLoaded", function () {
    // Crear contenedor para codeInput
    const contenedorCodigo = document.createElement("div");

    // Crear elementos
    const contenedorPrincipal = document.createElement("div");
    const campoCodigo = document.createElement("input");
    const campoResultado = document.createElement("input");
    const contenedorBotones = document.createElement("div");
    const botonEliminar = document.createElement("button");
    const botonValidar = document.createElement("button");
    const contenedorResultados = document.createElement("div");

    // Configurar atributos y estilos del contenedor de código
    contenedorCodigo.style.gridColumn = "span 4"; // Span 4 para que ocupe toda la fila
    contenedorCodigo.style.textAlign = "left"; // Alinea el contenido a la izquierda

    // Configurar atributos y estilos del contenedor principal
    contenedorPrincipal.style.display = "grid";
    contenedorPrincipal.style.gridTemplateRows = "auto auto 1fr auto";
    contenedorPrincipal.style.gap = "10px";
    contenedorPrincipal.style.justifyContent = "center"; // Alinea el contenido hacia el centro
    //contenedorPrincipal.style.border = "2px solid #000";

    // Configurar atributos y estilos del campo de código
    campoCodigo.type = "text";
    campoCodigo.disabled = true;
    campoCodigo.id = "campoCodigo";

    // Configurar atributos y estilos del campo de resultado
    campoResultado.type = "password";
    campoResultado.disabled = true;

    // Configurar atributos y estilos del contenedor de botones
    contenedorBotones.id = "contenedorBotones";
    contenedorBotones.style.display = "grid";
    contenedorBotones.style.gridTemplateColumns = "repeat(3, 1fr)";
    contenedorBotones.style.gap = "5px";

    // Configurar atributos y estilos del botón de eliminación
    botonEliminar.textContent = "X";
    botonEliminar.onclick = eliminarUltimoCaracter;

    // Configurar atributos y estilos del botón de validación
    botonValidar.textContent = "Validar";
    botonValidar.onclick = validarCodigo;

    // Configurar atributos y estilos del contenedor de resultados
    contenedorResultados.id = "contenedorResultados";

    // Agregar elementos a los contenedores
    contenedorCodigo.appendChild(campoCodigo);
    contenedorPrincipal.appendChild(campoResultado);
    contenedorPrincipal.appendChild(contenedorBotones);
    contenedorPrincipal.appendChild(botonEliminar);
    contenedorPrincipal.appendChild(botonValidar);
    contenedorPrincipal.appendChild(contenedorResultados);

    // Agregar contenedores al cuerpo del documento
    document.body.appendChild(contenedorCodigo);
    document.body.appendChild(contenedorPrincipal);

    // Generar código y botones
    generarCodigoAleatorio();
    generarBotonesAleatorios();

    // Función para generar un código aleatorio
    function generarCodigoAleatorio() {
        const caracteresPermitidos = "123456ABC";
        let codigoAleatorio = "";
        for (let i = 0; i < 5; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
            codigoAleatorio += caracteresPermitidos[indiceAleatorio];
        }
        campoCodigo.value = codigoAleatorio;
    }

    // Función para generar botones con caracteres aleatorios
    function generarBotonesAleatorios() {
        const caracteresPermitidos = "123456ABC";
        const caracteresDesordenados = caracteresPermitidos.split('').sort(() => Math.random() - 0.5);

        for (let i = 0; i < caracteresDesordenados.length; i++) {
            const boton = document.createElement("button");
            boton.textContent = caracteresDesordenados[i];
            boton.onclick = function () {
                campoResultado.value += "*";
                campoResultado.value = campoResultado.value.slice(0, -1) + caracteresDesordenados[i];
            };
            contenedorBotones.appendChild(boton);
        }
    }

    // Función para eliminar el último carácter del resultado
    function eliminarUltimoCaracter() {
        campoResultado.value = campoResultado.value.slice(0, -1);
    }

    // Función para validar el código introducido
    function validarCodigo() {
        const codigoUsuario = campoResultado.value;
        const codigoGenerado = campoCodigo.value;

        if (codigoUsuario === codigoGenerado) {
            contenedorResultados.textContent = "¡Código correcto!";
            contenedorResultados.style.color = "green";
        } else {
            contenedorResultados.textContent = "Código incorrecto. Inténtalo de nuevo.";
            contenedorResultados.style.color = "red";
        }
    }
});

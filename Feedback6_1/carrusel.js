// Array que contiene las rutas de las imágenes de la galería
var imagenes = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"];

// Índice que representa la imagen actual en la galería
let indiceActual = 0;

// Tiempo en milisegundos para el avance automático de la galería
var tiempoAvanceAutomatico = 5000;

// Variable para almacenar el ID del intervalo de avance automático
let intervalId;

// Evento que se ejecuta cuando se carga el contenido del DOM
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el elemento 'body'
    var body = document.querySelector('body');

    // Crear un div para la galería con un identificador 'gallery'
    var galleryDiv = document.createElement("div");
    galleryDiv.id = "gallery";

    // Crear un botón para mostrar la galería
    var button = document.createElement("button");
    button.textContent = "Mostrar galería";
    button.onclick = mostrarGaleria;

    // Agregar los elementos al 'body'
    body.appendChild(galleryDiv);
    body.appendChild(button);

    // Función que se ejecuta al hacer clic en el botón "Mostrar galería"
    function mostrarGaleria() {
        // Limpiar el contenido previo del div de la galería
        galleryDiv.innerHTML = "";

        // Crear elementos 'img' para la imagen anterior, actual y siguiente
        var imgAnterior = document.createElement("img");
        var imgActual = document.createElement("img");
        var imgSiguiente = document.createElement("img");

        // Tamaños de las imágenes central y lateral
        var tamanoImagenCentral = "70%";
        var tamanoImagenLateral = "15%";

        // Configurar las propiedades de las imágenes
        imgAnterior.src = obtenerRutaImagen(indiceActual - 1);
        imgAnterior.style.width = tamanoImagenLateral;

        imgActual.src = obtenerRutaImagen(indiceActual);
        imgActual.style.width = tamanoImagenCentral;

        imgSiguiente.src = obtenerRutaImagen(indiceActual + 1);
        imgSiguiente.style.width = tamanoImagenLateral;

        // Agregar las imágenes al div de la galería
        galleryDiv.appendChild(imgAnterior);
        galleryDiv.appendChild(imgActual);
        galleryDiv.appendChild(imgSiguiente);

        // Capturar eventos de teclado para la navegación
        document.addEventListener("keydown", manejadorTeclado);

        // Configurar el avance automático
        clearInterval(intervalId); // Limpiar cualquier intervalo anterior
        intervalId = setInterval(function () {
            cambiarImagen(1);
        }, tiempoAvanceAutomatico);
    }

    // Función para manejar los eventos de teclado
    function manejadorTeclado(event) {
        if (event.key === "ArrowLeft") {
            cambiarImagen(-1);
        } else if (event.key === "ArrowRight") {
            cambiarImagen(1);
        }
    }

    // Función para obtener la ruta de la imagen en función del índice
    function obtenerRutaImagen(indice) {
        var totalImagenes = imagenes.length;
        if (indice < 0) {
            return imagenes[(totalImagenes + indice) % totalImagenes];
        } else {
            return imagenes[indice % totalImagenes];
        }
    }

    // Función para cambiar la imagen en la galería en una dirección dada
    function cambiarImagen(direccion) {
        indiceActual += direccion;
        mostrarGaleria();
    }
});

var imagenes = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"];
let indiceActual = 0;
var tiempoAvanceAutomatico = 5000;
let intervalId; // Variable para almacenar el ID del intervalo

document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector('body');
    
    var galleryDiv = document.createElement("div");
    galleryDiv.id = "gallery";
    
    var button = document.createElement("button");
    button.textContent = "Mostrar galería";
    button.onclick = mostrarGaleria;

    body.appendChild(galleryDiv);
    body.appendChild(button);

    function mostrarGaleria() {
        galleryDiv.innerHTML = "";

        var imgAnterior = document.createElement("img");
        var imgActual = document.createElement("img");
        var imgSiguiente = document.createElement("img");

        var tamanoImagenCentral = "70%";
        var tamanoImagenLateral = "15%";

        imgAnterior.src = obtenerRutaImagen(indiceActual - 1);
        imgAnterior.style.width = tamanoImagenLateral;

        imgActual.src = obtenerRutaImagen(indiceActual);
        imgActual.style.width = tamanoImagenCentral;

        imgSiguiente.src = obtenerRutaImagen(indiceActual + 1);
        imgSiguiente.style.width = tamanoImagenLateral;

        galleryDiv.appendChild(imgAnterior);
        galleryDiv.appendChild(imgActual);
        galleryDiv.appendChild(imgSiguiente);

        // Capturar eventos de teclado
        document.addEventListener("keydown", manejadorTeclado);

        // Avance automático
        clearInterval(intervalId); // Limpiar cualquier intervalo anterior
        intervalId = setInterval(function () {
            cambiarImagen(1);
        }, tiempoAvanceAutomatico);
    }

    function manejadorTeclado(event) {
        if (event.key === "ArrowLeft") {
            cambiarImagen(-1);
        } else if (event.key === "ArrowRight") {
            cambiarImagen(1);
        }
    }

    function obtenerRutaImagen(indice) {
        var totalImagenes = imagenes.length;
        if (indice < 0) {
            return imagenes[(totalImagenes + indice) % totalImagenes];
        } else {
            return imagenes[indice % totalImagenes];
        }
    }

    function cambiarImagen(direccion) {
        indiceActual += direccion;
        mostrarGaleria();
    }
});

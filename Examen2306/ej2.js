// Variables para las URLs de las API
const baseUrl = "https://my-json-server.typicode.com/luismiguel-fernandez/examen/";
const cancionesUrl = baseUrl + "songs";
const playlistsUrl = baseUrl + "playlists";

// Elementos del DOM
const divPlaylists = document.querySelector("#playlists");
const tbody = document.querySelector("tbody");

// Variable para almacenar las listas de reproducción
let playlists;

// Función para cargar las listas de reproducción
function cargarPlaylists() {
    fetch(playlistsUrl)
        .then(response => response.json())
        .then(data => {
            playlists = data;
            data.forEach(playlist => {
                const divPlaylist = document.createElement("div");
                divPlaylist.classList.add("playlist");
                const h5 = document.createElement("h5");
                h5.innerHTML = playlist.name;
                const p = document.createElement("p");
                p.innerHTML = `Autor: ${playlist.author}`;
                divPlaylist.appendChild(h5);
                divPlaylist.appendChild(p);

                // Añadir evento de clic a la lista de reproducción
                divPlaylist.addEventListener("click", () => seleccionarPlaylist(playlist));
                
                divPlaylists.appendChild(divPlaylist);
            });
        })
        .catch(error => console.error("Error al cargar las listas de reproducción:", error));
}

// Función para seleccionar una lista de reproducción y mostrar sus canciones
function seleccionarPlaylist(playlist) {
    // Limpiar tabla de canciones previamente seleccionadas
    tbody.innerHTML = "";

    playlist.songs.forEach(songId => {
        const cancion = canciones.find(song => song.id === songId);
        mostrarCancion(cancion);
    });
}

// Función para mostrar una canción en la tabla
function mostrarCancion(cancion) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${cancion.title}</td>
        <td>${cancion.artist}</td>
        <td>${formatoTiempo(cancion.length)}</td>
    `;
    tbody.appendChild(tr);
}

// Función para convertir la duración de la canción a formato "mm:ss"
function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
}

// Inicialización
cargarPlaylists();

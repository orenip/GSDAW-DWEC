//Poner el nombre
// Seleccionar el elemento h3 dentro del div con id "footer"
const authorElement = document.querySelector("#footer h3");

// Define tu nombre
const tuNombre = "José Antonio López Piñero";

// Asignar al elemento.
authorElement.textContent = `Author: ${tuNombre}`;

// Recuperamos el DIV del html
const divSongList = document.querySelector("#songList");

// Recuperar la url de la base
let urlbase = "https://my-json-server.typicode.com/luismiguel-fernandez/examen/";

// Declaramos las variables songs y playlist para usarlas en todo el programa
let songs;
let playlist;

// Recuperar la tabla songs con llamadas asincronas fetch y se listan en formato tarjeta de disposicion de 5 columnas
fetch(urlbase + "songs")
    .then(response => response.json())
    .then(json => {
        songs = json
        // Recuperar tabla playlist con llamadas asincronas fetch y se listan en formato lista de filas
        fetch(urlbase + "playlists")
        .then(response => response.json())
        .then(json => {
            playlist = json; // Desempaquetamos el json en la variable playlist
            mostrarPlaylist(); // Llamar a la función para mostrar la playlist una vez que se haya cargado el JSON
            calcularMetricas(); // Llamar a la función para calcular las métricas una vez que se haya cargado el JSON
        });
        // Desempaquetamos el json en la variable songs
        mostrarCanciones(songs); // Llamar a la función para mostrar las canciones una vez que se haya cargado el JSON
    });

// Mostrar las canciones en tarjetas de 5 columnas
function mostrarCanciones(songs) {
    // Limpiar contenido previo antes de mostrar las canciones

    divSongList.innerHTML = ""; // Limpiar el contenido del divSongList
    
    // Creamos el contenedor de canciones
    let nuevoDivCols = document.createElement("div");
    nuevoDivCols.classList.add("row", "row-cols-md-5");
    divSongList.appendChild(nuevoDivCols); // Agregar el contenedor al divSongList

    // Crear tarjetas para cada canción y agregarlas al contenedor
    songs.forEach(song => {
        let divEnvoltorio = document.createElement("div");
        divEnvoltorio.innerHTML = `
            <div class="card text-center bg-light mb-2 mr-2">
                <div class="card-body">
                    <h5 class="card-title">${song.title}</h5>
                    <span>${song.artist}</span>
                    <p class="card-text">${formatDuration(song.length)}</p>
                    <button type="button"  class="btn btn-outline-info"  id="${song.id}">Add to playlist</button>
                </div>
            </div>
        `;
        nuevoDivCols.appendChild(divEnvoltorio); // Agregar la tarjeta al contenedor
    });
}

// Función para mostrar todas las playlist con el nuevo template
function mostrarPlaylist() {
    // Recuperamos el DIV del html con el id "playlists"
    const divPlaylists = document.querySelector("#playlists");

    // Limpiamos el contenido previo antes de mostrar las playlists
    divPlaylists.querySelector("ul").innerHTML = "";

    // Iteramos sobre cada playlist y creamos un elemento <li> para cada una
    playlist.forEach(playlist => {
        // Creamos el elemento <li> para la playlist
        let liPlaylist = document.createElement("li");
        liPlaylist.classList.add("list-group-item");

        // Creamos la estructura del elemento <li> con los datos de la playlist
        liPlaylist.innerHTML = `
            <h5>Playlist: ${playlist.name}</h5>
            <h6>Author: ${playlist.author}</h6>
            <h6>Songs: ${playlist.songs.join(", ")}</h6>
        `;

        // Agregamos el elemento <li> al contenedor de la lista de reproducción
        divPlaylists.querySelector("ul").appendChild(liPlaylist);
    });
}


//Al ir escribiendo va mostrando las canciones que coinciden con la busqueda, tanto por atista como por cancion 
 // Obtener el input de búsqueda
const searchInput = document.querySelector('#search input');

// Agregar un evento de entrada al campo de búsqueda con pulsacion de teclas
searchInput.addEventListener('keyup', function(event) {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas para hacer comparaciones sin distinción entre mayúsculas y minúsculas
    const searchText = event.target.value.toLowerCase();
    // Filtrar las canciones que coincidan con el texto de búsqueda, ya sea por título o por artista
    let cancionesFiltradas
    cancionesFiltradas = songs.filter(song => {
        return song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText);
    });

    // Mostrar las canciones filtradas
    mostrarCanciones(cancionesFiltradas);
});

// Modificar el evento de escucha para el clic en el divSongList
divSongList.addEventListener("click", function(event) {
    // Verificar si se hizo clic en el botón "Add to playlist"
    if (event.target.classList.contains("btn-outline-info")) {
        // Obtener el id de la canción seleccionada
        const songId = event.target.id;
        // Añadir la canción a la playlist
        añadirCancionAPlaylist(songId)
    }
});


// Función para añadir una canción a la última playlist y mostrar la playlist actualizada
// No se pueden meter songId repetidas
function añadirCancionAPlaylist(songId) {
    // Obtener la última playlist del arreglo de playlists
    const lastPlaylist = playlist[playlist.length - 1];
    // Verificar si la songId ya está en la lista de canciones de la última playlist
    if (!lastPlaylist.songs.includes(songId)) {
        // Si no está repetida, agregar la songId a la lista de canciones de la última playlist
        lastPlaylist.songs.push(songId);
    } else {
        // Si ya está repetida, mostrar un mensaje de error en la consola (APARTADO 6)
        console.log("La canción ya está en la playlist.");
    }

     // Mostrar la playlist actualizada
    mostrarPlaylist();
    // Calcular y mostrar las métricas
    calcularMetricas();
}


// Función para calcular y mostrar las métricas
function calcularMetricas() {
    // En el id stat1 se muestra el número total de canciones
    document.getElementById("stat1").innerHTML = songs.length;
    // En el id stat2 se muestra el número de playlists
    document.getElementById("stat2").innerHTML = playlist.length;
    // En el id stat3 se muestra el promedio de la suma de todas las canciones de cada playlists dividido entre 4 que son las play list
    const averageLength = playlist.reduce((total, current) => total + current.songs.length, 0) / 4;
    document.getElementById("stat3").innerHTML = averageLength;
    // En el id stat4 se muestra el número de artistas
    const uniqueArtists = new Set();
    songs.forEach(song => uniqueArtists.add(song.artist));
    document.getElementById("stat4").innerHTML = uniqueArtists.size;
    // En el id stat5 se muestra la canción con más length
    const songWithLongestLength = songs.reduce((max, song) => max.length > song.length ? max : song);
    document.getElementById("stat5").innerHTML = `"${songWithLongestLength.title}" , ${songWithLongestLength.artist} - (${songWithLongestLength.length}")`;
}


// Función para formatear la duración de la canción en mm:ss que viene en segundos
function formatDuration (cancion) {
    const minutes = Math.floor(cancion / 60);
    const seconds = cancion % 60;
    //si es segundo menor de 10 que tengan un 0 delante
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }
    var str = minutes + ':' + seconds;
    //console.log(str);
    return str;
}


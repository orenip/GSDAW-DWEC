// Función para obtener los datos de las playlists desde la API
async function obtenerPlaylists() {
    const response = await fetch('https://my-json-server.typicode.com/luismiguel-fernandez/examen/playlists');
    const data = await response.json();
    return data;
  }
  
  // Función para obtener los datos de las canciones desde la base de datos local
  async function obtenerCanciones() {
    const response = await fetch('https://my-json-server.typicode.com/luismiguel-fernandez/examen/db');
    const data = await response.json();
    return data.songs;
  }
  
  // Función principal para mostrar las playlists y las canciones
  async function mostrarPlaylistsYCanciones() {
    try {
      // Obtener datos de playlists y canciones
      const playlists = await obtenerPlaylists();
      const canciones = await obtenerCanciones();
  
      // Mostrar las playlists y sus canciones
      playlists.forEach(playlist => {
        console.log(`Playlist: ${playlist.name} (Autor: ${playlist.author})`);
        console.log("Canciones:");
        playlist.songs.forEach(songId => {
          const cancion = canciones.find(song => song.id === songId);
          console.log(`- ${cancion.title} by ${cancion.artist}`);
        });
        console.log(""); // Salto de línea para separar las playlists
      });
  
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
  
  // Llamar a la función principal para ejecutar el programa
  mostrarPlaylistsYCanciones();

  

  // Variables para las URLs de las API
const baseUrl = "https://my-json-server.typicode.com/luismiguel-fernandez/examen/";
const categoriasUrl = baseUrl + "categorias";
const cancionesUrl = baseUrl + "songs";
const playlistsUrl = baseUrl + "playlists";

// Elementos del DOM
const divArticulos = document.querySelector("#articulos");
const tbody = document.querySelector("tbody");

// Variable para almacenar las categorías
let categorias;

// Función para cargar las categorías de canciones
function cargarCategorias() {
    fetch(categoriasUrl)
        .then(response => response.json())
        .then(data => {
            categorias = data;
            data.forEach(cat => {
                const h5 = document.createElement("H5");
                const div = document.createElement("div");
                div.classList.add("row", "row-cols-5");
                div.dataset.id = cat.id;
                h5.innerHTML = cat.name;
                divArticulos.appendChild(h5);
                divArticulos.appendChild(div);
            });
            cargarCanciones();
        })
        .catch(error => console.error("Error al cargar las categorías:", error));
}

// Función para cargar las canciones y mostrarlas en sus categorías correspondientes
function cargarCanciones() {
    fetch(cancionesUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(cancion => {
                const divArticuloCategoria = document.querySelector(`div[data-id="${cancion.category}"]`);
                if (divArticuloCategoria) {
                    const divArticulo = document.createElement("div");
                    divArticulo.classList.add("card", "text-center", "bg-light", "mb-2", "mr-2");
                    divArticulo.addEventListener("click", () => seleccionarCancion(cancion));
                    const imagen = document.createElement("img");
                    imagen.src = cancion.image;
                    imagen.alt = cancion.title;
                    imagen.classList.add("card-img-top");
                    const cardBody = document.createElement("div");
                    const nombre = document.createElement("p");
                    const precio = document.createElement("p");
                    cardBody.classList.add("card-body");
                    nombre.innerHTML = cancion.title;
                    nombre.classList.add("card-title");
                    precio.innerHTML = cancion.price + "€";
                    precio.classList.add("card-text");
                    divArticulo.appendChild(imagen);
                    divArticulo.appendChild(cardBody);
                    cardBody.appendChild(nombre);
                    cardBody.appendChild(precio);
                    divArticuloCategoria.appendChild(divArticulo);
                }
            });
        })
        .catch(error => console.error("Error al cargar las canciones:", error));
}

// Función para seleccionar una canción y agregarla a la lista
function seleccionarCancion(cancion) {
    // Aquí puedes implementar la lógica para agregar la canción a la lista de reproducción
    console.log("Canción seleccionada:", cancion);
}

// Inicialización
cargarCategorias();

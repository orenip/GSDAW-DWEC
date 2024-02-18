document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const divCategorias = document.querySelector("#categorias");
    const divCanciones = document.querySelector("#canciones");
    const tablaResumen = document.querySelector("#tabla-resumen tbody");

    // Variables
    let cancionesSeleccionadas = [];

    // Función para cargar las canciones por categoría
    function cargarCancionesPorCategoria() {
        // Vaciar elementos anteriores
        divCategorias.innerHTML = "";
        divCanciones.innerHTML = "";

        fetch("https://my-json-server.typicode.com/luismiguel-fernandez/examen/songs")
            .then(response => response.json())
            .then(canciones => {
                // Obtener todas las categorías únicas
                const categoriasUnicas = [...new Set(canciones.map(cancion => cancion.category))];

                // Mostrar las categorías
                categoriasUnicas.forEach(categoria => {
                    const categoriaDiv = document.createElement("div");
                    categoriaDiv.innerHTML = `<h2>${categoria}</h2>`;
                    divCategorias.appendChild(categoriaDiv);

                    // Filtrar canciones por categoría
                    const cancionesCategoria = canciones.filter(cancion => cancion.category === categoria);

                    // Mostrar las canciones de la categoría
                    cancionesCategoria.forEach(cancion => {
                        const cancionDiv = document.createElement("div");
                        cancionDiv.innerHTML = `
                            <p>${cancion.title} - ${cancion.artist}</p>
                            <button data-id="${cancion.id}">Seleccionar</button>
                        `;
                        divCanciones.appendChild(cancionDiv);

                        // Manejar la selección de canciones
                        const botonSeleccionar = cancionDiv.querySelector("button");
                        botonSeleccionar.addEventListener("click", () => seleccionarCancion(cancion));
                    });
                });
            })
            .catch(error => console.error("Error al cargar las canciones:", error));
    }

    // Función para seleccionar una canción
    function seleccionarCancion(cancion) {
        // Verificar si la canción ya está seleccionada
        const indice = cancionesSeleccionadas.findIndex(c => c.id === cancion.id);

        if (indice !== -1) {
            // Si ya está seleccionada, quitarla de la lista
            cancionesSeleccionadas.splice(indice, 1);
        } else {
            // Si no está seleccionada, agregarla a la lista
            cancionesSeleccionadas.push(cancion);
        }

        // Actualizar la tabla resumen
        actualizarTablaResumen();
    }

    // Función para actualizar la tabla resumen
    function actualizarTablaResumen() {
        // Limpiar la tabla resumen
        tablaResumen.innerHTML = "";

        // Mostrar las canciones seleccionadas en la tabla resumen
        cancionesSeleccionadas.forEach(cancion => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${cancion.title}</td>
                <td>${cancion.artist}</td>
            `;
            tablaResumen.appendChild(fila);
        });
    }

    // Cargar las canciones por categoría al cargar la página
    cargarCancionesPorCategoria();
});

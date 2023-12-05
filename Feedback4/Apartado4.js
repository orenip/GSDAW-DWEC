class Asignatura {
    constructor(nombre) {
        this.nombre = nombre;
        this.alumnos = [];
        this.maximo = 10;
    }

    modificarMaximo(nuevoMaximo) {
        this.maximo = nuevoMaximo;
    }

    agregarAlumno(alumno) {
        if (this.alumnos.length < this.maximo) {
            this.alumnos.push(alumno);
            return `Alumno ${alumno} añadido a la asignatura.`;
        } else {
            return "Error: No se puede añadir más alumnos. Se ha alcanzado el número máximo.";
        }
    }

    listarAlumnos() {
        const lista = this.alumnos.map((alumno, index) => `${index + 1}. ${alumno}`);
        return [`Lista de alumnos en la asignatura ${this.nombre}:`, ...lista];
    }

    eliminarAlumno(indice) {
        if (indice >= 0 && indice < this.alumnos.length) {
            const alumnoEliminado = this.alumnos.splice(indice, 1);
            return `Alumno ${alumnoEliminado} eliminado de la asignatura.`;
        } else {
            return "Error: Índice de alumno no válido.";
        }
    }
}

// Declarar la variable fuera del ámbito de una función
let asignaturas = []; // Array para almacenar las asignaturas

function crearAsignatura() {
    const nombreAsignatura = document.getElementById("nombreAsignatura").value;
    const nuevaAsignatura = new Asignatura(nombreAsignatura);
    asignaturas.push(nuevaAsignatura);

    // Actualizar la lista de asignaturas en el formulario
    actualizarListaAsignaturas();
}

function actualizarListaAsignaturas() {
    const selectAsignaturas = document.getElementById("selectAsignaturas");
    selectAsignaturas.innerHTML = ""; // Limpiar el contenido previo

    asignaturas.forEach((asignatura, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = asignatura.nombre;
        selectAsignaturas.add(option);
    });
}

// Obtener referencias a elementos HTML
const nombreAsignaturaInput = document.getElementById("nombreAsignatura");
const nombreAlumnoInput = document.getElementById("nombreAlumno");
const indiceEliminarInput = document.getElementById("indiceEliminar");
const maximoAlumnosInput = document.getElementById("maximoAlumnos");

const outputDiv = document.getElementById("output");
const listarAlumnosDiv = document.getElementById("listarAlumnos");
const errorOutput = document.getElementById("errorOutput");

function manejarError(mensaje) {
    errorOutput.innerHTML = `Error: ${mensaje}`;
}

function agregarAlumno() {
    const nombreAlumno = document.getElementById("nombreAlumno").value;
    const indiceAsignatura = document.getElementById("selectAsignaturas").value;

    if (indiceAsignatura !== "") {
        const asignaturaSeleccionada = asignaturas[indiceAsignatura];
        const mensaje = asignaturaSeleccionada.agregarAlumno(nombreAlumno);
        manejarError(mensaje);
        // Actualizar la lista de alumnos en el formulario
        listarAlumnos();
    } else {
        manejarError("Debes seleccionar una asignatura.");
    }
}

function eliminarAlumno() {
    const indiceAsignatura = document.getElementById("selectAsignaturas").value;
    const indiceEliminar = document.getElementById("indiceEliminar").value-1;

    if (indiceAsignatura !== "") {
        const asignaturaSeleccionada = asignaturas[indiceAsignatura];
        const mensaje = asignaturaSeleccionada.eliminarAlumno(indiceEliminar);
        manejarError(mensaje);
        // Actualizar la lista de alumnos en el formulario
        listarAlumnos();
    } else {
        manejarError("Debes seleccionar una asignatura.");
    }
}

function modificarMaximo() {
    const nuevoMaximo = parseInt(document.getElementById("maximoAlumnos").value);
    const indiceAsignatura = document.getElementById("selectAsignaturas").value;

    if (indiceAsignatura !== "") {
        const asignaturaSeleccionada = asignaturas[indiceAsignatura];
        asignaturaSeleccionada.modificarMaximo(nuevoMaximo);
    } else {
        manejarError("Debes seleccionar una asignatura.");
    }
}

function listarAlumnos() {
    const indiceAsignatura = document.getElementById("selectAsignaturas").value;

    if (indiceAsignatura !== "") {
        const asignaturaSeleccionada = asignaturas[indiceAsignatura];
        const mensajes = asignaturaSeleccionada.listarAlumnos();
        const output = document.getElementById("listarAlumnos");
        output.innerHTML = mensajes.map(mensaje => `<p>${mensaje}</p>`).join('');
    } else {
        manejarError("Debes seleccionar una asignatura.");
    }
}
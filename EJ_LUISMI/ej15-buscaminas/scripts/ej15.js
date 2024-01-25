let ANCHO_TABLERO = 8
let ALTO_TABLERO = 8
let NUM_MINAS = 10
const ANCHO_CELDA = 30

const tablero = document.querySelector("#tablero")
const selectModo = document.querySelector("#modo")
const labelTiempo = document.querySelector("#tiempo")
const labelFila = document.querySelector("#fila")
const labelCol = document.querySelector("#columna")
const labelMina = document.querySelector("#mina")

let tablaRecords = []

let celdasVaciasPorClicar = ANCHO_TABLERO * ALTO_TABLERO - NUM_MINAS


function generarTablero(ancho,alto){
    tablero.style.width = ANCHO_CELDA * ancho + "px"
    for (let i = 0; i < ancho*alto; i++) {
        let newCelda = document.createElement("DIV")
        newCelda.classList.add("celda")
        newCelda.dataset.fila = Math.floor(i / ancho)
        newCelda.dataset.col = i % ancho
        newCelda.dataset.mina = false
        newCelda.dataset.clicada = false
        tablero.append(newCelda)
    }
}

function colocarMinas(ancho,alto,numMinas) {
    let minasPorColocar = numMinas
    while (minasPorColocar) {
        let posicion = Math.floor( Math.random() * ancho * alto )
        if (todasLasCeldas[posicion].dataset.mina == "false") {
            todasLasCeldas[posicion].dataset.mina = true
            //todasLasCeldas[posicion].classList.add("mina")
            minasPorColocar--
        }
    }
}

function calcularMinasAlrededor(f,c) {
    let contador = 0
    for (let i = f-1; i <= f+1; i++) {
        for (let j = c-1; j <= c+1; j++) {
            if (i>=0 && i<=ALTO_TABLERO-1 && j>=0 && j<=ANCHO_TABLERO-1) {
                let posicion = i*ANCHO_TABLERO + j
                if (todasLasCeldas[posicion].dataset.mina == "true") contador++
            }
        }
    }
    return contador
}

function bloquearTablero() {
    todasLasCeldas.forEach( celda => {
        celda.dataset.clicada = true
        if (celda.dataset.mina == "true") {
            celda.classList.add("mina")
        }
    })
}

function imprimirRecords() {
    const cuerpo = document.querySelector("#tablaPuntuaciones>tbody")
    cuerpo.innerHTML = ""
    tablaRecords.forEach( (r,i) => {
        let nuevaFila = cuerpo.insertRow()
        let celda1 = nuevaFila.insertCell()
        let celda2 = nuevaFila.insertCell()
        let celda3 = nuevaFila.insertCell()
        celda1.textContent = i + 1
        celda2.textContent = "Luismi"
        celda3.textContent = r
    })
}


/* ************************************************************** */
/*    Código que se ejecuta automáticamente al cargar la página   */
/* ************************************************************** */

if (localStorage.getItem("records")) {
    tablaRecords = JSON.parse( localStorage.getItem("records") )
    imprimirRecords()
}

//Poner el SELECT en su primera opción de manera predeterminada por si el navegador no lo resetea
selectModo.selectedIndex = 0

generarTablero(ANCHO_TABLERO, ALTO_TABLERO)
let todasLasCeldas = tablero.querySelectorAll("div.celda")
colocarMinas(ANCHO_TABLERO, ALTO_TABLERO, NUM_MINAS)

labelTiempo.textContent = 0
let crono = setInterval( ()=>{labelTiempo.textContent++} , 1000)

tablero.addEventListener("mouseover",function(ev){
    if (ev.target.classList.contains("celda")) {
        labelFila.textContent = ev.target.dataset.fila
        labelCol.textContent = ev.target.dataset.col
        labelMina.textContent = ev.target.dataset.mina
    }
})

tablero.addEventListener("click",function(ev){
    if (ev.target.classList.contains("celda")) {
        //descartar los clics en celdas con bandera
        if (ev.target.classList.contains("celda_bandera")) {
            return
        }
        //comprobar si ya ha sido clicada la celda previamente
        if (ev.target.dataset.clicada == "false") {
            ev.target.dataset.clicada = true
            //comprobar si explota mina
            if (ev.target.dataset.mina == "true") {
                //fin de la partida:
                //cambiar el aspecto de la mina clicada
                ev.target.classList.add("mina_explotada")
                //detener el crono
                clearInterval(crono)
                //detener la posibilidad de que el usuario siga clicando
                // y mostrar todas las minas
                bloquearTablero()

            } else {
                //si no has explotado mina
                let minasAlrededor = calcularMinasAlrededor(parseInt(ev.target.dataset.fila) , parseInt(ev.target.dataset.col))
                ev.target.classList.add("celda_clicada" + minasAlrededor)
                //contar si has ganado
                celdasVaciasPorClicar--
                console.log(celdasVaciasPorClicar)
                if (celdasVaciasPorClicar == 0) {
                    //victoria:
                    clearInterval(crono)
                    tablaRecords.push(parseInt(labelTiempo.textContent))
                    tablaRecords.sort( (a,b) => a-b )
                    localStorage.setItem("records", JSON.stringify(tablaRecords) )
                    console.log(tablaRecords)
                    bloquearTablero()
                    imprimirRecords()
                }
            }
        }
    }
})

tablero.addEventListener("contextmenu",function(ev){
    //impedir que se muestre el menú contextual típico del botón derecho
    ev.preventDefault()
    if (ev.target.classList.contains("celda")) {
        if (ev.target.dataset.clicada == "false") {
            ev.target.classList.toggle("celda_bandera")
        }
    }
})

selectModo.addEventListener("change",function(ev){
    switch (this.value) {
        case "easy":
            ANCHO_TABLERO = 8
            ALTO_TABLERO = 8
            NUM_MINAS = 10
            break;
        case "medium":
            ANCHO_TABLERO = 16
            ALTO_TABLERO = 16
            NUM_MINAS = 40       
            break;
        case "hard":
            ANCHO_TABLERO = 30
            ALTO_TABLERO = 16
            NUM_MINAS = 99       
            break;
    }
    //destruir tablero y volverlo a construir
    tablero.innerHTML = ""
    generarTablero(ANCHO_TABLERO, ALTO_TABLERO)
    todasLasCeldas = tablero.querySelectorAll("div.celda")
    colocarMinas(ANCHO_TABLERO, ALTO_TABLERO, NUM_MINAS)
    labelTiempo.textContent = 0
    clearInterval(crono)
    crono = setInterval( ()=>{labelTiempo.textContent++} , 1000)
})



/* 
let contador = 0
if (f>0 && c>0) {
    //consulto si hay mina en la celda de arr-izq
    let posicion = (f-1) * 8 + (c-1)
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (f>0) {
    //consulto si hay mina en la celda de arr
    let posicion = (f-1) * 8 + c
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (f>0 && c < ANCHO_TABLERO-1) {
    //consulto si hay mina en la celda de arr-der
    let posicion = (f-1) * 8 + (c+1)
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (c>0) {
    //consulto si hay mina en la celda de izq
    let posicion = (f) * 8 + c-1
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (c < ANCHO_TABLERO-1) {
    //consulto si hay mina en la celda de izq
    let posicion = f * 8 + c+1
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (f>0 && c>0) {
    //consulto si hay mina en la celda de aba-izq
    let posicion = (f-1) * 8 + (c-1)
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (f>0) {
    //consulto si hay mina en la celda de aba
    let posicion = (f-1) * 8 + c
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
}
if (f>0 && c < ANCHO_TABLERO-1) {
    //consulto si hay mina en la celda de aba-der
    let posicion = (f-1) * 8 + (c+1)
    if (todasLasCeldas[posicion].dataset.mina == "true") contador++
} */
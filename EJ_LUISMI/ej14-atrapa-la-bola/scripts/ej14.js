//0. Darle dimensiones al tablero y la bola
const tablero = document.querySelector("#tablero")
const bola = document.querySelector("#bola")
const ANCHURA_TABLERO = 600
const ALTURA_TABLERO = 300
const DIAMETRO_BOLA = 30
tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"
bola.style.width = DIAMETRO_BOLA + "px"
bola.style.height = DIAMETRO_BOLA + "px"

const tiempo = document.querySelector("#tiempo")
const puntos = document.querySelector("#puntos")
const btnEmpezar = document.querySelector("#btnEmpezar")

let cuentaAtras //interval para el marcador de tiempo
let agitador  //interval para mover la bola
let partidaEnMarcha = false

let records = localStorage.getItem("atrapaBolaRecords")
if (records) {
    records = JSON.parse(records)
} else {
    records = [
        {name: "Andrew", points: 10},
        {name: "Pamela", points: 8},
        {name: "Elisabeth", points: 6},
        {name: "George", points: 4},
        {name: "Caroline", points: 2}
    ]
}
imprimirRecords()

//1. El botón EMPEZAR pone una partida en marcha
btnEmpezar.addEventListener("click",function(){
    //Acciones que ocurren cuando empieza una partida:
    // a) Inicializar una cuenta atrás de 10 segundos
    tiempo.textContent = 10
    puntos.textContent = 0
    
    clearInterval(cuentaAtras) //por si ya había una partida en marcha
    cuentaAtras = setInterval(decrementarSegundos,1000)
    
    clearInterval(agitador)
    agitador = setInterval(moverBola,1000)
    
    moverBola()
    partidaEnMarcha = true
})

//2. Cada segundo que avanza la cuenta atrás, la bola cambia de sitio al azar.
//  Al llegar a 0, se detiene (pista: clearInterval)
function decrementarSegundos() {
    tiempo.textContent--
    if (tiempo.textContent == "0") {
        clearInterval(cuentaAtras)
        clearInterval(agitador)
        partidaEnMarcha = false
        //comprobar si mis puntos mejoran el peor de los records
        if (puntos.textContent > records[records.length-1].points) {
            let nick = prompt("Escribe tu nombre (12 caracteres)")
            if (!nick) nick = "Anónimo"
            nick = nick.trim().substring(0,11)
            records.push({name: nick, points: parseInt(puntos.textContent) })
            records.sort(function(a,b){
                if (a.points < b.points) {
                    return 1;
                } else if (a.points > b.points) {
                    return -1;
                }
                return 0;
            })
            records.pop()
            imprimirRecords()
            //guardar la tabla de records en LocalStorage para que no se pierdan
            localStorage.setItem("atrapaBolaRecords",JSON.stringify(records))
        } // if puntos en record
    } // if tiempo es 0
}

//3. Que la bola sea clicable para sumar puntos SOLO con la partida en marcha 
bola.addEventListener("click",function(){
    if (partidaEnMarcha) {
        puntos.textContent++
        //recolocamos la bola y reiniciamos el agitador (interval que mueve bola)
        moverBola()
        clearInterval(agitador)
        agitador = setInterval(moverBola,1000)
    }
})

function moverBola() {
    bola.style.top = Math.random() * (ALTURA_TABLERO - DIAMETRO_BOLA) + "px"
    bola.style.left = Math.random() * (ANCHURA_TABLERO - DIAMETRO_BOLA) + "px"
}

function imprimirRecords() {
    const cuerpo = document.querySelector("#records>tbody")
    cuerpo.innerHTML = ""
    records.forEach( (r,i) => {
        let nuevaFila = cuerpo.insertRow()
        let celda1 = nuevaFila.insertCell()
        let celda2 = nuevaFila.insertCell()
        let celda3 = nuevaFila.insertCell()
        celda1.textContent = i + 1
        celda2.textContent = r.name
        celda3.textContent = r.points
    })
}
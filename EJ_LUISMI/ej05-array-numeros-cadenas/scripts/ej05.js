let entrada = document.getElementById("entrada")
let numerosTA = document.getElementById("numeros")
let cadenasTA = document.getElementById("cadenas")
let promedioNum = document.getElementById("promedioNum")
let promedioCad = document.getElementById("promedioCad")

numerosTA.disabled = true
cadenasTA.disabled = true
promedioNum.disabled = true
promedioCad.disabled = true

let numeros = []
let cadenas = []

function analizarEntrada() {
    let texto = entrada.value.trim()
    let expReg = /\s+/g
    texto = texto.replace(expReg,' ')
    console.log(texto)
    if (!texto.length) return
    if (!isNaN(texto)) {
        numeros.push(parseFloat(texto))
        numerosTA.value = numeros
        //recalcular promedio
        let acumulador = 0
        for (let i=0; i<numeros.length; i++) {
            acumulador += numeros[i]
        }
        acumulador /= numeros.length
        promedioNum.value = acumulador
    } else {
        cadenas.push(texto)
        cadenasTA.value = cadenas
        //recalcular promedio de longitudes de cadenas
        let acumulador = 0
        for (let i=0; i<cadenas.length; i++) {
            acumulador += cadenas[i].length
        }
        acumulador /= cadenas.length
        promedioCad.value = acumulador
    }

    //vaciar caja entrada
    entrada.value = ""
    //poner el foco de nuevo en la caja
    entrada.focus()
}




//localizar repeticiones de espacios internos


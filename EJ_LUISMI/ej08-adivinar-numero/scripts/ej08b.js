const inputIntentos = document.getElementById("inputIntentos")
const botonComprobar = document.getElementById("botonComprobar")
const textareaSalida = document.getElementById("textareaSalida")

let secreto = Math.floor(Math.random()*100)+1
let numIntentos = 6
console.log(secreto)

botonComprobar.addEventListener("click", comprobarIntento )

function comprobarIntento() {
    let intento = parseInt(inputIntentos.value.trim() )
    if (isNaN(intento) || intento < 1 || intento > 100) {
        textareaSalida.value += "Debes escribir un nº entero entre 1 y 100.\n"
        return
    }

    numIntentos--
    //comprobar si lo que ha escrito el usuario es un número entero entre 1 y 100
    if (intento == secreto) {
        textareaSalida.value += "Enhorabuena, has acertado\n"
        inputIntentos.disabled = true
        botonComprobar.disabled = true
        return
    } else if (intento > secreto) {
        textareaSalida.value += "Con el " + intento + " te has pasado. Te quedan " + numIntentos + " intentos.\n"
    } else {
        textareaSalida.value += "Con el " + intento + " te has quedado corto. Te quedan " + numIntentos + " intentos.\n"
    }

    if (numIntentos == 0) {
        textareaSalida.value += "Se han agotado los intentos\n"
        inputIntentos.disabled = true
        botonComprobar.disabled = true
    }
}

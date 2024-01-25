let salida = document.getElementById("salida")

//1. pedir al usuario un número
let numero = parseFloat(prompt("Escribe un número (a ser posible, entero)"))
//1b. Comprobar que lo que ha escrito el usuario es un número
if ( isNaN(numero) ) {
    //En caso de que no sea nº se advierte y abortamos la ejecuc.
        //console.log("mensaje normal")
        //console.warn("mensaje advertencia")
        //console.error("mensaje error")
    salida.value = "¡Debes introducir un número! Has escrito: " + numero
}
else {
    //En caso de que sea nº se hace el paso 2
    //2. mostrar en el textarea su tabla de multiplicar
    let tabla = ""
    for (let i=0; i<11; i++) {
        tabla += numero + " x " + i + " = " + numero*i + "\n"
    }
    salida.value = tabla
}
   




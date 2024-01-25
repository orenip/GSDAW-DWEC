/*
1. Usando un bucle, rellena un array con los números del 1 al 10.
2. Usando un bucle, rellena un array con 10 números aleatorios.
3. Crea una copia del array anterior.
4. Ordena de menor a mayor el array de números aleatorios.
5. Crea un array con 6 nombres de personas y ordénalo alfabéticamente.
6. Crea una función que recibe un array de números como parámetro y devuelve un
nuevo array donde cada elemento original ha sido multiplicado por 2. Intenta
resolverlo de la manera clásica (bucle) y con la nueva función “map” de arrays
*/

let ej1 = []
for (let i=1; i<=10; i++) {
    ej1[i] = i
}

let ej2 = []
for (let i=0; i<10; i++) {
    ej2[i] = Math.floor(Math.random()*100+1)
}

let ej3 = ej2.slice()

ej3.sort() //modifica el array original, no hace copia
            //lo ordena alfabéticamente, por lo que está mal

ej3.sort(function(a,b){
    if (a < b) return -1
    else return 1
})
console.log(ej3)

/* for (let i=0; i<ej3.length; i++) {
    ej3[i] *= 2
} */
let ej6 = ej3.map(x => x * 2) //map SÍ CREA UNA COPIA
console.log(ej6)


let ej7 = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio"]
console.log(ej7)
/*
Imprime la clasificación actual.
El concurso continúa y se van modifican esas posiciones anteriores. Debemos
cambiar en el array:
• Celia adelanta a Raúl.
*/
let temp = ej7[2]
ej7[2] = ej7[3]
ej7[3] = temp
console.log(ej7)
/*
• Antonio es descalificado y se elimina del concurso.
*/

//siendo el último:
//let ultimoelemento = ej7.pop()
//si no es el último
ej7.splice(5,1)
console.log(ej7)

/*
• Detrás de Ana y antes de Oswaldo se clasifican dos nuevos concursantes:
Roberto y Amaya, en ese orden.
*/
ej7.splice(1,0,"Roberto")
ej7.splice(2,0,"Amaya")
console.log(ej7)
/*
• Hay una nueva participante que pasa a encabezar la clasificación: Marta.
*/
ej7.unshift("Marta")
console.log(ej7)
/*
• Imprime la clasificación actualizada y comprueba que se ha hecho
correctamente.
*/

/*
• Inserta en un array 5 objetos diferentes siguiendo la estructura dada:
o fabricante: “Toyota”,
o modelo: “Auris”,
o precio: “22900”
*/
let ej8 = []
ej8.push({
    fabricante: "Toyota",
    modelo: "Auris",
    precio: 22500
})
ej8.push({
    fabricante: "Toyota",
    modelo: "Prius",
    precio: 25500
})
ej8.push({
    fabricante: "Seat",
    modelo: "León",
    precio: 21500
})
ej8.push({
    fabricante: "Skoda",
    modelo: "Fabia",
    precio: 15500
})
ej8.push({
    fabricante: "Kia",
    modelo: "Ceris",
    precio: 18500
})
/*
• Ordena y muestra en pantalla por precio descendente.
*/
ej8.sort(function(a,b){
    if (a.precio > b.precio) return -1
    else return 1
})
console.log(ej8)
/*
• Ordena y muestra en pantalla por fabricante.
*/
ej8.sort(function(a,b){
    if (a.fabricante < b.fabricante) return -1
    else if (a.fabricante > b.fabricante) return 1
    else {
        if (a.precio > b.precio) return -1
        else return 1
    }
})
console.log(ej8)
/*
• Filtra y muestra en pantalla aquellos que sean de 1 fabricante dado.
*/

let cochesToyoya = ej8.filter(coche => coche.fabricante == "Toyota" || coche.fabricante == "Seat")
console.log(cochesToyoya)
/*
• Filtra y muestra en pantalla aquellos que superen los 20000 euros.
*/
let limitePrecio = prompt("Diga cuál es su presupuesto")
if (!isNaN(limitePrecio)) {
    let cochesBaratos = ej8.filter(coche => coche.precio < limitePrecio)
    console.log(cochesBaratos)
} else {
    document.write("Debes introducir un número")
}
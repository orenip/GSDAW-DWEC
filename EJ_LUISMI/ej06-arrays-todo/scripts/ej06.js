let nombres1 = ["Ana","Jose","Toñi","Jesús"]
let nombres2 = []
let coches1 = [
    {fab:"Toyota",mod:"Corolla",precio:26000,tec:"hibrido"},
    {fab:"Seat",mod:"Ibiza",precio:22000,tec:"combustion"},
    {fab:"Tesla",mod:"Model Y",precio:44000,tec:"electrico"},
    {fab:"Opel",mod:"Astra",precio:21000,tec:"combustion"}
]

//copiar los elementos del array 1 al array 2
for (let i=0; i<nombres1.length; i++) {
    nombres2.push(nombres1[i])
}
nombres2 = nombres1.slice()
nombres1[0] = "Anne"
console.log("nombres1= ",nombres1)
console.log("nombres2= ",nombres2)

coches2 = coches1.slice()
coches1[0].precio = 36000
console.log("coches1= ",coches1)
console.log("coches2= ",coches2)


// //filtrar (quedarme con) aquellos nombres que empiezan por J
// let nombres3 = nombres1.filter(nombre => nombre.charAt(0) == "J")
// console.log("nombres3= "+nombres3)





// //filtrar los coches que cuestan más de 25000
// let coches2 = coches1.filter(c => c.precio > 25000)
// console.log("Coches2: ", coches2)

// //filtrar los coches que sean eléctricos puros
// let coches3 = coches1.filter(c => c.tec == "electrico")
// console.log("Coches3: ", coches3)

// //ordenar alfabéticamente el array 1
// function comparaCochesPorPrecio(coche1, coche2) {
//     if (coche1.precio < coche2.precio) {
//       return -1;
//     } else if (coche1.precio > coche2.precio) {
//       return 1;
//     }
//     return 0;
// }
// let coches4 = coches1.slice().sort(comparaCochesPorPrecio)
// console.log("Coches1: ", coches1)
// console.log("Coches4: ", coches4)

// function comparaCochesPorFabricante(coche1, coche2) {
//     if (coche1.fab < coche2.fab) {
//       return -1;
//     } else if (coche1.fab > coche2.fab) {
//       return 1;
//     }
//     return 0;
// }
// let coches5 = coches1.slice().sort(comparaCochesPorFabricante)
// console.log("Coches5: ", coches5)

// /* let extraccion = coches1.splice(2,1)
// console.log(coches1) */

// let cochenuevo1 = {fab:"Renault",mod:"Clio",precio:25500,tec:"hibrido"}
// let cochenuevo2 = {fab:"Peugeot",mod:"2008",precio:28500,tec:"hibrido"}
// coches1.splice(2,1,cochenuevo1,cochenuevo2)
// console.log(coches1)

// coches2
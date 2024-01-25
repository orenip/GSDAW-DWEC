const premioPuntos = [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
let constructores = []
let todasFilasPilotos
const tablaPilotos = document.querySelector("#clasiPilotos tbody")
const tablaConstructores = document.querySelector("#clasiConstructores tbody")
const urlBase = "http://my-json-server.typicode.com/luismiguel-fernandez/examen"
fetch(urlBase + "/constructores")
.then( resp => resp.json() )
.then( json => {
    constructores = json
    imprimirConstructores(json)
    fetch(urlBase + "/pilotos")
    .then( resp => resp.json() )
    .then( json => {
        imprimirPilotos(json)
    })
})
function imprimirPilotos(json) {
    tablaPilotos.innerHTML = ""
    json.forEach( (p,index) => {
        let newPiloto = tablaPilotos.insertRow()
        let newCelda1 = newPiloto.insertCell()
        let newCelda2 = newPiloto.insertCell()
        let newCelda3 = newPiloto.insertCell()
        let newCelda4 = newPiloto.insertCell()
        let newCelda5 = newPiloto.insertCell()
        newCelda1.innerHTML = `<th scope="col">${index+1}</th>`
        newCelda2.textContent = p.nombre
        newCelda3.textContent = constructores[p.constructor-1].nombre
        newCelda4.textContent = index < 10 ? premioPuntos[index] : 0
        newCelda5.innerHTML = '<button class="btn btn-success">Up</button>'
        newCelda5.innerHTML += '<button class="btn btn-danger">Down</button>'
        newCelda5.querySelector("button.btn-success").addEventListener("click",function(){
            if (index > 0) {
                let tempP = todasFilasPilotos[index-1].children[1].textContent
                todasFilasPilotos[index-1].children[1].textContent = todasFilasPilotos[index].children[1].textContent
                todasFilasPilotos[index].children[1].textContent = tempP
                let tempC = todasFilasPilotos[index-1].children[2].textContent
                todasFilasPilotos[index-1].children[2].textContent = todasFilasPilotos[index].children[2].textContent
                todasFilasPilotos[index].children[2].textContent = tempC
                calcularPuntosConstructores()
            }
        })
        newCelda5.querySelector("button.btn-danger").addEventListener("click",function(){
            if (index < todasFilasPilotos.length - 1) {
                let tempP = todasFilasPilotos[index+1].children[1].textContent
                todasFilasPilotos[index+1].children[1].textContent = todasFilasPilotos[index].children[1].textContent
                todasFilasPilotos[index].children[1].textContent = tempP
                let tempC = todasFilasPilotos[index+1].children[2].textContent
                todasFilasPilotos[index+1].children[2].textContent = todasFilasPilotos[index].children[2].textContent
                todasFilasPilotos[index].children[2].textContent = tempC
                calcularPuntosConstructores()
            }
        })
    })
    todasFilasPilotos = document.querySelectorAll("#clasiPilotos tbody tr")
    calcularPuntosConstructores()
}
function imprimirConstructores(json) {
    tablaConstructores.innerHTML = ""
    json.forEach( (c,index) => {
        let newConstructor = tablaConstructores.insertRow()
        let newCelda1 = newConstructor.insertCell()
        let newCelda2 = newConstructor.insertCell()
        let newCelda3 = newConstructor.insertCell()
        newCelda1.innerHTML = `<th scope="col">${index+1}</th>`
        newCelda2.textContent = c.nombre
        newCelda3.textContent = c.puntos
    })
}
function calcularPuntosConstructores() {
    constructores.forEach( c => {
        c.puntos = 0
        for (let i=0; i<premioPuntos.length; i++) {
            let c1 = todasFilasPilotos[i].children[2].textContent
            let c2 = c.nombre
            if (c1 == c2) {
                c.puntos += parseInt(todasFilasPilotos[i].children[3].textContent)
            }
        }
    })
    constructores.sort( (a,b) => b.puntos - a.puntos)
    imprimirConstructores(constructores)
}
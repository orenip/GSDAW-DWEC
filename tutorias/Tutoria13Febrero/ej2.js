const urlBase = "https://my-json-server.typicode.com/luismiguel-fernandez/examen/"
let pilotos = []
let constructores = []
const lista = document.querySelector("#lista")


fetch(urlBase + "pilotos")
.then( resp => resp.json() )
.then( json => {
    pilotos = json
    fetch(urlBase + "constructores")
    .then( resp => resp.json() )
    .then( json => {
        constructores = json
        mostrarListado(pilotos,"nombre","constructor")
    }).catch( error => {
        alert("ha fallado el fetch 2º con código: " + error.message)
    })
}).catch( error => {
    alert("ha fallado el fetch de asdasdasd con código: " + error.message)
})

function mostrarListado(listado,campo1,campo2){
    listado.forEach( e => {
        let nuevoLI = document.createElement("LI")
        
        nuevoLI.textContent = e[campo1]
        //nuevoLI.textContent = e.nombre

        lista.append(nuevoLI)
        
        let constructor = constructores.find( c => c.id == e.constructor )
        let nombreConstructor = constructor ? constructor.nombre : "no encontrado"

        nuevoLI.dataset[campo2] = nombreConstructor
        //nuevoLI.dataset.constructor = e.constructor
        nuevoLI.dataset.pais = e.pais

        // nuevoLI.addEventListener("click",function(){
        //     alert(this.dataset.constructor)
        // })
    })
}

//delegación de eventos para el clic que muestra el constructor de un piloto
lista.addEventListener("click",function(ev){
    if (ev.target.nodeName.toLowerCase() == "li") {
        alert("constructor: " + ev.target.dataset.constructor + "\npais: " + ev.target.dataset.pais)
    }
})

/*
fetch(urlBase + "constructores")
.then( resp => resp.json() )
.then( json => {
    constructores = json
    mostrarListado(pilotos,"nombre","constructor")
})

fetch(urlBase + "constructores")
.then( resp => resp.text() )
.then( xmlString => {
    const parseador = new DOMParser()
    const xmlDoc = parseador.parseFromString(xmlString, "text/xml")
    xmlDoc.querySelectorAll("piloto")

    // <pilotos>
    //     <piloto>
    //         <nombre>Alonso</nombre>
    //         <pais>España</pais>
    //         <constructor>4</constructor>
    //     </piloto>

})

*/












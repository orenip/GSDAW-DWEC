const urlBase = "https://my-json-server.typicode.com/luismiguel-fernandez/examen/"
let pilotos = []
let constructores = []
const lista = document.querySelector("#lista")

fetch(urlBase + "pilotos")
.then(response => response.json())
.then( json => {
    pilotos = json
    fetch(urlBase + "constructores")
    .then(response => response.json())
    .then(json => {
        constructores = json
        mostrarListado(pilotos, "nombre", "constructor")
    })
})

function mostrarListado(listado, campo1, campo2) {
    listado.forEach(e => {
       let nuevoLi = document.createElement("LI")
         
       nuevoLi.textContent = e[campo1]
           
        lista.append(nuevoLi)
        
        let constructor = constructores.find(c => c.id == e.constructor)
        let nombreConstructor = constructor ? constructor.nombre : "no encontrado"
            //nuevoLi.dataset.constructor = nombreConstructor.nombre
         
            //nuevoLi.dataset.constructor = e[campo2]
            nuevoLi.dataset[campo2] = nombreConstructor
            nuevoLi.dataset.pais = e.pais
                     
    })
}


//delegacion de eventos oara el clic que muestra el constructor de pilotos
lista.addEventListener("click",function(ev) {
    if (ev.target.nodeName.toLowerCase() == "li") {
        //Mostrar en alert el nombre del piloto y el constructor
        alert(`El piloto ${ev.target.textContent} corre para el constructor ${ev.target.dataset.constructor} y es de ${ev.target.dataset.pais}`)
        //alert("constructor: " + ev.target.dataset.constructor + "\npais: " + ev.target.dataset.pais)
        
    }
})
/*
//JSON
fetch(urlBase + "constructores")
    .then(response => response.json())
    .then(json => {
        constructores = json
    })
    mostrarListado(pilotos, "nombre", "constructor")
})

//XML
fetch(urlBase + "constructores")
    .then(response => response.text()) //cambia a text
    .then(xmlCrudo => {  //XML no navegable
       const parseador = new DOMParser()
       const xmlNavegable = parseador.parseFromString(xmlCrudo, "text/xml")
       xmlNavegable.querySelectorAll("piloto")

    //    <piloto>
    //      <nombre>Carlos Sainz</nombre>
    //         <edad>26</edad>
    //         <constructor>McLaren</constructor>
    //     </piloto>
       })
})*/
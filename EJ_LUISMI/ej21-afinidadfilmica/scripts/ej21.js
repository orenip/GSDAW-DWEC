const buscadorR = document.querySelector("#buscadorR")

const las3listas = document.querySelectorAll("#divResultadosR>ul")
const listaPel = las3listas[0]
const listaAct = las3listas[1]
const listaDir = las3listas[2]

function imprimirResultadosR(listado) {
    listaPel.innerHTML = ""
    listaAct.innerHTML = ""
    listaDir.innerHTML = ""
    listado.forEach( e => {
        let nuevoLi = document.createElement("LI")
        nuevoLi.textContent = e.texto
        if (e.tipo == "tit") {
            listaPel.append(nuevoLi)
        } else if (e.tipo == "act") {
            listaAct.append(nuevoLi)
        } else if (e.tipo == "dir") {
            listaDir.append(nuevoLi)
        }
        nuevoLi.addEventListener("click",function(){
            
        })
    });
}

buscadorR.addEventListener("keyup", function() {
    console.log("entra")
    if (this.value.trim().length) {
        fetch("server/search.php?p=" + this.value.trim())
        .then( resp => resp.json() )
        .then( json => {
            imprimirResultadosR(json)
        })
    }
})

/* ************************************************************* */
/*                    SOLUCIÓN DE LA IZQUIERDA                   */
/* ************************************************************* */
const buscadorL = document.querySelector("#buscadorL")
const tipoL = document.querySelector("#divBuscadorL select")
const divResultadosL = document.querySelector("#divResultadosL")
const seleccionadosL = document.querySelector("#divSeleccionadosL tbody")

const todosBotones = document.querySelectorAll("#divSeleccionadosL tfoot button")

function addResultado(texto,tipo) {
    let nuevoResul = document.createElement("DIV")
    nuevoResul.textContent = texto
    divResultadosL.append(nuevoResul)
    nuevoResul.classList.add("resul")
    nuevoResul.dataset.tipo = tipo
}

function buscar(patron) {
    fetch("server/search.php?p=" + patron)
//    fetch("https://192.168.32.100/dwec/1.Javascript/javascript23-24/ej21-afinidadfilmica/server/search.php?p=" + patron)
    .then( resp => resp.json() )
    .then( json => {
        json.forEach( r => {
            switch (tipoL.value) {
                case "0": addResultado(r.texto,r.tipo); break
                case "1": if (r.tipo == "tit") addResultado(r.texto,r.tipo); break
                case "2": if (r.tipo == "act") addResultado(r.texto,r.tipo); break
                case "3": if (r.tipo == "dir") addResultado(r.texto,r.tipo); break
            }
        })
    } )
}

buscadorL.addEventListener("keyup",function(){
    let patron = this.value.trim()
    divResultadosL.innerHTML = ""
    if (patron != "") buscar(patron)
})

tipoL.addEventListener("change",function(){
    let patron = buscadorL.value.trim()
    divResultadosL.innerHTML = ""
    if (patron != "") buscar(patron)
})

divResultadosL.addEventListener("click",function(ev){
    if (ev.target.classList.contains("resul")) {
        let nuevoTR = seleccionadosL.insertRow()
        let nuevoTD1 = nuevoTR.insertCell()
        let nuevoTD2 = nuevoTR.insertCell()
        nuevoTD2.textContent = ev.target.textContent
        let nuevoCB = document.createElement("INPUT")
        nuevoCB.type = "checkbox"
        nuevoTD1.append(nuevoCB)
        nuevoTR.dataset.tipo = ev.target.dataset.tipo
    }
})

document.querySelector("#divSeleccionadosL thead input").addEventListener("change",function(){
    let todosCB = seleccionadosL.querySelectorAll('input[type="checkbox"]')
    todosCB.forEach( cb => cb.checked = this.checked )
})

todosBotones[3].addEventListener("click",function(){
    let todasFilas = seleccionadosL.querySelectorAll("tr")
    todasFilas.forEach( fila => {
        let filaCB = fila.querySelector("input")
        if (filaCB.checked) fila.remove()
    })
})

todosBotones[0].addEventListener("click",function(){
    marcarFilas("tit")
})
todosBotones[1].addEventListener("click",function(){
    marcarFilas("act")
})
todosBotones[2].addEventListener("click",function(){
    marcarFilas("dir")
})

function marcarFilas(tipo) {
    let todasFilas = seleccionadosL.querySelectorAll("tr")
    todasFilas.forEach( fila => {
        if (fila.dataset.tipo == tipo)
            fila.querySelector("input").checked = true
    })
}
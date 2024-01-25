const buscador = document.querySelector("#buscador")
const bodyResul = document.querySelector("#tableResultados>tbody")

function mostrarResultados(json) {
    bodyResul.innerHTML = ""
    json.forEach( resultado => {
        let newTR = bodyResul.insertRow()
        let celda1 = newTR.insertCell()
        let celda2 = newTR.insertCell()
        let celda3 = newTR.insertCell()
        celda1.textContent = resultado.titulo
        celda2.textContent = resultado.precio
        let btnAdd = document.createElement("BUTTON")
        btnAdd.textContent = "Añadir"
        btnAdd.addEventListener("click",() => addToCart( resultado ) )
        celda3.append(btnAdd)
    })
}

buscador.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        //solicitamos la recuperación de un recurso en la red (PHP de consulta)
        fetch("server/gpushop.php?pattern="+this.value)
        //cuando el fetch reciba respuesta del servidor, la desempaquetamos (HTTP)
        .then( resp => resp.json() )
        //cuando acabe el parseo de los datos útiles de la respuesta, los procesamos
        .then( json => mostrarResultados(json) )
    }
})

const form = document.querySelector("#formEnvios")
const refPedido = document.querySelector("#refPedido")
const peso = document.querySelector("#peso")
const refPedidoError = document.querySelector("#refPedidoError")
const pesoError = document.querySelector("#pesoError")

const boton = document.querySelector("#boton")

form.action = "server/todoOK.html"

form.addEventListener("submit", function(ev) {
    ev.preventDefault()
    if ( todoOK() )
        this.submit()
})

boton.addEventListener("click",function(){
    alert("click de ratón en el botón")
})
boton.addEventListener("mouseenter",function(){
    console.warn("el raton acaba de entrar en el area del boton")
})

function todoOK() {
    let todook = true
    //comprobar el input del nº de referencia
    let ref = refPedido.value
    let expRegNumRef = /^[A-E]\d{4}$/
    if ( !expRegNumRef.test(ref) ) {
        todook = false
        refPedidoError.textContent = "El nº de ref no sigue el formato"
    } else {
        refPedidoError.textContent = ""
    }
    //comprobar el input del peso del paquete
    let valuePeso = peso.value
    let expRegPeso = /^\d{1,2}[.,]\d$/
    if ( !expRegPeso.test(valuePeso) ) {
        todook = false
        pesoError.textContent = "El peso no sigue el formato"
    } else {
        pesoError.textContent = ""
    }
    return todook
}


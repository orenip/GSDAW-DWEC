let formulario = document.getElementById("miForm")
formulario.addEventListener("submit",function(objetoEvento){
    objetoEvento.preventDefault()
    if (comprobarFormulario()) {
        this.submit()
    } else {
        //alert("Hay errores en uno o más campos del formulario")
    }
},true)

function comprobarFormulario() {
    let todoOK = true
    /* let nick = formulario.elements["nick"]
    let nick = formulario.nick */
    let nick = formulario.querySelector("input")
    let pais = formulario.querySelector("select")
    let acepto = formulario.querySelector("input[type='checkbox']")
    //comprobar INPUT TEXT
    if (nick.value.trim().length < 3) {
        //advertir del error
        nick.classList.add("inputError")
        todoOK = false
    } else {
        //retirar posibles mensajes de error de este campo
        nick.classList.remove("inputError")
    }
    //comprobar SELECT
    if (pais.value == "") {
        //advertir del error
        pais.classList.add("inputError")
        todoOK = false
    } else {
        //retirar posibles mensajes de error de este campo
        pais.classList.remove("inputError")
    }
    //comprobar CHECKBOX
    if (!acepto.checked) {
        //advertir del error en el checkbox: borde rojo, tooltip...
        todoOK = false
    } else {
        //retirar posibles mensajes de error de este campo

    }
    return todoOK
}

let nick = formulario.querySelector("input")
nick.addEventListener("keyup",function(ev){
    console.log(this.value)
    if (ev.key == "Enter") {
        console.log("Has pulsado Enter")
    }
})



let pais = formulario.querySelector("select")
pais.addEventListener("change",function(){
    
})

document.addEventListener("mousedown",function(ev){
    console.log(ev.button)
        ev.target

        
})
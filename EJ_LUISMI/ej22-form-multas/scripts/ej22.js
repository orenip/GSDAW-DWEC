const formu = document.querySelector("form")
const conductor = document.querySelector("#conductor")
const conductorError = document.querySelector("#conductorError")

function comprobarNombre() {
    let expreg = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚÇç]{2,}$/
    if (conductor.value.trim().length >= 2 && expreg.test(conductor.value.trim())) {
        //vaciar conductorError
        conductorError.textContent = ""
        return true
    } else {
        //mostrar error en conductorError
        conductorError.textContent = "El nombre no es válido"
        return false
    }
}

formu.addEventListener("submit",function(ev){
    //impedir que se envíe el formulario siempre
    ev.preventDefault()

    let todoOK = true
    //comprobaciones de los campos del formulario
    if (!comprobarNombre()) todoOK = false
    //if (!comprobarDNI()) todoOK = false

        //si algo falla advertir al usuario


    //si todas las comprobaciones han ido bien...
    if (todoOK) this.submit()
})
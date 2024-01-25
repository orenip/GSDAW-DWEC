//-------------------------------------
//Declaración de variables y constantes
//-------------------------------------
const studentName = document.querySelector("#studentName")
const choice1 = document.querySelector("#choice1")
const choice2 = document.querySelector("#choice2")
const insertButton = document.querySelector("#insertButton")
const studentsChoices = document.querySelector("#studentsChoices>tbody")
let cleanStudentName = true

let empresas = ["Apple","Google","IBM","Microsoft","Nvidia","Intel","Embargos a lo bestia"]

let preferencias = localStorage.getItem("preferencias")
if (preferencias) {
    preferencias = JSON.parse(preferencias)
    imprimirPreferencias()
} else
    preferencias = []



//----------------------------------------------------------------------------
//Estas líneas se ejecutan automáticamente al cargar la página en el navegador
//----------------------------------------------------------------------------
studentName.focus()
choice2.disabled = true
insertButton.disabled = true

//----------------------------------------------------------------------------
//Rellenar automáticamente el primer SELECT choice1
//----------------------------------------------------------------------------
empresas.forEach( (empresa,indice) => {
    let newOption = document.createElement("OPTION")
    newOption.textContent = empresa
    newOption.value = indice + 1
    choice1.append(newOption)
})

//----------------------------------------------------------------------------
//El INPUT debe escuchar el evento KEYUP
//----------------------------------------------------------------------------
studentName.addEventListener("keyup",keyPressed )
function keyPressed() {
    if (studentName.value.trim().length)
        cleanStudentName = false
    else
        cleanStudentName = true

    checkButtonDisable()
}

//----------------------------------------------------------------------------
//El SELECT choice1 debe escuchar el evento CHANGE
//----------------------------------------------------------------------------
choice1.addEventListener("change",fillChoice2 )
function fillChoice2() {
    //vaciar las empresas de choice2, por si existiera alguna
    choice2.innerHTML = '<option value="0">(choose one)</option>'
    //comprobar si hay que habilitar o deshabilitar el botón
    checkButtonDisable()
    //si el usuario elige la opción nula (value = 0) en choice1...
    if (choice1.value == 0) {
        choice2.disabled = true
        return 
    }
    //añadir todas las empresas EXCEPTO la elegida en choice1
    empresas.forEach( (empresa,indice) => {
        if ( choice1.value != indice + 1 ) {
            let newOption = document.createElement("OPTION")
            newOption.textContent = empresa
            newOption.value = indice + 1
            choice2.append(newOption)
        }
    })
    //decidir si habilitar o deshabilitar choice2
    choice2.disabled = false
}

//----------------------------------------------------------------------------
//El SELECT choice2 también debe escuchar el evento CHANGE
//----------------------------------------------------------------------------
choice2.addEventListener("change",checkButtonDisable)
function checkButtonDisable() {
    if (cleanStudentName == false
            && choice1.value != 0
                    && choice2.value != 0)

        insertButton.disabled = false
    else
        insertButton.disabled = true
}

//----------------------------------------------------------------------------
//El botón de insertar debe escuchar el evento CLICK e insertar en un array
// el nombre del estudiante y sus preferencias de empresas
//----------------------------------------------------------------------------
insertButton.addEventListener("click",insertarNuevasPreferencias)
function insertarNuevasPreferencias() {
    let nombreAlumno = studentName.value.trim()
    //recuperar el texto del OPTION seleccionado en choice1
    let nombreEmpresa1 = choice1.options[choice1.selectedIndex].textContent
    //recuperar el texto del OPTION seleccionado en choice2
    let nombreEmpresa2 = choice2.options[choice2.selectedIndex].textContent
    //insertar en el array preferencias un nuevo objeto con los 3 datos introducidos por usuario
    preferencias.push({
        alumno: nombreAlumno,
        empresa1: nombreEmpresa1,
        empresa2: nombreEmpresa2
    })
    //Llevar el array preferencias de nuevo al localStorage
    localStorage.setItem("preferencias",JSON.stringify(preferencias))
    //mostrar en la consola para depurar programa
    console.table(preferencias)
    //por último, una vez insertada la nueva info en el array, hay que mostrarlo
    // en el HTML, en la tabla vacía que hay en la parte de abajo de la web
    imprimirPreferencias()
}

//----------------------------------------------------------------------------
//Esta función muestra en el HTML toda la información que tenemos en el array
// de prefencias de los estudiantes
//----------------------------------------------------------------------------
function imprimirPreferencias() {
    studentsChoices.innerHTML = ""
    preferencias.forEach( (pref,indice) => {
        let newTR = studentsChoices.insertRow()
        let newTD1 = newTR.insertCell()
        let newTD2 = newTR.insertCell()
        let newTD3 = newTR.insertCell()
        let newTD4 = newTR.insertCell()
        newTD1.textContent = pref.alumno
        newTD2.textContent = pref.empresa1
        newTD3.textContent = pref.empresa2
        let newButton = document.createElement("button")
        newButton.classList.add("btn","btn-danger")
        newButton.textContent = "Delete"
        newTD4.append(newButton)
        //falta hacer que el botón escuche el evento CLICK
        newButton.addEventListener("click",function(){
            preferencias.splice(indice,1)
            //imprimirPreferencias() //redibuja todo, podría ser ineficienteç
            newTR.remove()
            localStorage.setItem("preferencias",JSON.stringify(preferencias))
        })
        //falta también insertar otros botones para otras acciones
        //botón SUBIR
        let newButtonUp = document.createElement("button")
        newButtonUp.classList.add("btn","btn-info")
        newButtonUp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>`
        newTD4.append(newButtonUp)
        newButtonUp.addEventListener("click",function(){
            //bajar en el array = aumentar su índice
            if (indice == 0) return
            let temp = pref
            preferencias[indice] = preferencias[indice-1]
            preferencias[indice-1] = temp
            localStorage.setItem("preferencias",JSON.stringify(preferencias))
            //modificar TABLE
            imprimirPreferencias()
        })
        //botón BAJAR
        let newButtonDown = document.createElement("button")
        newButtonDown.classList.add("btn","btn-info")
        newButtonDown.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/></svg>`
        newTD4.append(newButtonDown)
        //clic en botón Bajar (bajar la fila en tabla HTML)
        newButtonDown.addEventListener("click",function(){
            //bajar en el array = aumentar su índice
            if (indice == preferencias.length - 1) return
            let temp = pref
            preferencias[indice] = preferencias[indice+1]
            preferencias[indice+1] = temp
            localStorage.setItem("preferencias",JSON.stringify(preferencias))
            //modificar TABLE
            imprimirPreferencias()
        })
    })
}
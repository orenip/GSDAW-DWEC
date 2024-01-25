let phonebook = [
    { name: 'Luismi', number: '666333999'},
    { name: 'antonia', number: '555123456'},
    { name: 'Hulk Hogan', number: '987654321'},
    { name: 'Donald Trump', number: '666666666'}
]

const INPUTNAME = document.querySelector("#inputName")
const INPUTNUMBER = document.querySelector("#inputNumber")
const BTNADD = document.querySelector("#btnAdd")
const INPUTSEARCH = document.querySelector("#inputSearch")
const CUERPO = document.querySelector("#phonebooktable>tbody")

INPUTNAME.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        INPUTNUMBER.focus()
    }
})

INPUTNUMBER.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        insertContact()
        listarContactos(phonebook)
    }
})

BTNADD.addEventListener("click",function(){
    insertContact()
    listarContactos(phonebook)
})

INPUTSEARCH.addEventListener("keyup",function(){
    //se ha pulsado una tecla, voy a ver si hay algo escrito en el INPUT
    let termino = this.value.trim().toLowerCase() //aquí en esta función "this" apunta a INPUTSEARCH
    let filtrados = phonebook.filter( contacto => contacto.name.toLowerCase().includes(termino)
                                                    || contacto.number.includes(termino) )
    listarContactos(filtrados)
})

//ORDENAR POR NOMBRE
const THNAME = document.querySelector("#phonebooktable th")
THNAME.addEventListener("click",function(){
    phonebook = phonebook.sort(ordenadoAlfabetico)

    listarContactos(phonebook)
})
function ordenadoAlfabetico(a,b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    else return -1
}


function insertContact() {
    let newName = INPUTNAME.value.trim()
    let newNumber = INPUTNUMBER.value.trim()
    if (newName != "" && newNumber != "") {
        phonebook.push({ name: newName, number: newNumber})
        
        INPUTNAME.value = ""
        INPUTNUMBER.value = ""
        INPUTNAME.focus()
    }
}
function listarContactos(listado) {
    //vaciar la tabla, por si tiene resultados anteriores
    CUERPO.innerHTML = ""
    //recorrer el listado para mostrar los elementos en la tabla
    listado.forEach( contacto => {
        //crear una fila y 2 celdas
        let nuevaFila = CUERPO.insertRow()
        let nuevaCelda1 = nuevaFila.insertCell()
        let nuevaCelda2 = nuevaFila.insertCell()
        let nuevaCelda3 = nuevaFila.insertCell()
        //escribir dentro de las celdas la info del contacto
        nuevaCelda1.textContent = contacto.name
        nuevaCelda2.textContent = contacto.number
        nuevaCelda3.innerHTML = "<button class='btn btn-danger'>X</button>"
        let boton = nuevaCelda3.querySelector("button")
        boton.addEventListener("click",function(){
            //falta borrar el contacto del array
            let posicion = phonebook.findIndex(c => c.name == contacto.name && c.number == contacto.number)
            phonebook.splice(posicion,1)
            //borramos el TR del botón pulsado
            boton.parentNode.parentNode.remove()
        })
    })
}
listarContactos(phonebook)
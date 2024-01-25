const chat = document.querySelector("#chat")
const nick = document.querySelector("#nick")
const teclado = document.querySelector("#teclado")
const btnEnviar = document.querySelector("#enviar")
let ultimo = 0

function enviarMensaje() {
    if (nick.value.trim().length == 0 || teclado.value.trim().length == 0) return

    let params = new URLSearchParams("nick="+nick.value+"&texto="+teclado.value)
    let opciones = {
        method: "POST",
        body: params
    }
    fetch("server/chat_insert_post.php",opciones)
    .then( resp => {
        if (resp.status != 200) alert("error al insertar")
    })
    teclado.value = ""
    teclado.focus()
}

function recibirMensajes(){
    fetch("server/chat_select_get_xml.php?ultimo="+ultimo)
    .then( respuesta => respuesta.text())
    .then( xmlplano => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(xmlplano,"text/xml")
        let arrayMensajes = xml.querySelectorAll("mensaje")
        arrayMensajes.forEach(m => {
            let newP = document.createElement("P")
            let nick = m.children[1].textContent
            let texto = m.children[2].textContent
            ultimo = parseInt(m.children[0].textContent)
            newP.innerHTML = "<b>" + nick + "</b>" + ": " + texto
            chat.append(newP)
        })
        chat.scrollTop = chat.scrollHeight
    })
}

teclado.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") enviarMensaje()
})

btnEnviar.addEventListener("click",enviarMensaje)

setInterval(recibirMensajes,3000)
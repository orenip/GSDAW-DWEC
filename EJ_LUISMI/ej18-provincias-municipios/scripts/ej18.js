const selProvincias = document.querySelector("#provincias")
const selMunicipios = document.querySelector("#municipios")

//OJO CON LA RUTA Y EN EL NAVEGADOR ABRIR COMO: http://localhost/GSDAW-DWEC/EJ_LUISMI/ej18-provincias-municipios/ej18.html y no con server 5500..
fetch("/GSDAW-DWEC/EJ_LUISMI/ej18-provincias-municipios/server/cargaProvinciasXML.php")
.then( respuestaHTTP => respuestaHTTP.text() )
.then( xmlTextoPlano => {
    //el XML llega en texto plano, hay que parsearlo para convertirlo en un árbol navegable
    // 1. definir un objeto parseador (clase DOMParser)
    let parser = new DOMParser()
    // 2. de ese objeto parseador, invocamos el método "parseFromString()""
    let xmlFinal = parser.parseFromString(xmlTextoPlano,"text/xml")
    // 3. xmlFinal ya es navegable, podemos usar querySelector y querySelectorAll para localizar info
    let provincias = xmlFinal.querySelectorAll("provincia")


    provincias.forEach( p => {
        let newOption = document.createElement("OPTION")
        //el textContent del OPTION quiero que sea el nombre de la provincia,
        // que es el hijo NOMBRE en el XML
        newOption.textContent = p.querySelector("nombre").textContent
        //el value del OPTION quiero que sea el código de la provincia,
        // que es el hijo CODIGO en el XML
        newOption.value = p.querySelector("codigo").textContent
        selProvincias.append(newOption)
    })
})

selProvincias.addEventListener("change",function(){
    if (this.value != "0") {
        fetch("/GSDAW-DWEC/EJ_LUISMI/ej18-provincias-municipios/server/cargaMunicipiosXML.php?provincia=" + this.value)
        .then( respuesta => respuesta.text() )
        .then( datos => {
            selMunicipios.innerHTML = "<option value='0'>(Elige municipio)</option>"
            let parser = new DOMParser()
            let xml = parser.parseFromString(datos, "text/xml")
            let todosLosMuni = xml.querySelectorAll("municipio")
            todosLosMuni.forEach( m => {
                let newOption = document.createElement("OPTION")
                newOption.textContent = m.lastChild.textContent
                newOption.value = m.firstChild.textContent
                selMunicipios.append(newOption)
            })
        } )
    }
})
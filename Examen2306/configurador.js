var articulos = document.querySelector("#articulos");
var url = "https://my-json-server.typicode.com/luismiguel-fernandez/angular2022/"
const divArticulos = document.querySelector("#articulos")
var categorias;
var tbody = document.querySelector("tbody");//Cuerpo de la tabla
var filaTotal = tbody.lastElementChild;
var precioTotal = filaTotal.querySelector("td");
precioTotal.innerHTML = 0 + "€";

    //Comprobamos si en el localStorage tenemos algún elemento guardado
    if (localStorage.getItem("tbodyContent")) {
        tbody.innerHTML = localStorage.getItem("tbodyContent")
    }

//Hace el fetch de las categorías
fetch(url + "categorias")
    .then(response => response.json())
    .then(data => {
        //Guardamos las categorías en una variable para poder usarlo en el otro fetch
        categorias = data;
        //Por cada categoría, creamos el título H5 y el div que contendrá cada categoría de artículos
        data.forEach(cat => {
            const h5 = document.createElement("H5");
            const div = document.createElement("div");
            div.classList.add("row", "row-cols-5");
            div.dataset.id = cat.id;
            h5.innerHTML = cat.nombre;
            divArticulos.appendChild(h5);
            divArticulos.appendChild(div);
        })
        fetch(url + "articulos")
            .then(response => response.json())
            .then(data => {
                data.forEach(articulos => {
                    for (let i = 1; i <= categorias.length; i++) {
                        aniadirArticulos(i, articulos);//LLamamos a la función para los artículos que están en la categoría deseada
                    }
                })
                colorearSeleccionados();
            })

    })

function aniadirArticulos(numero, articulos) {
    if (articulos.cat == numero) {
        var divArticuloCategoria = document.querySelector('div[data-id="' + numero + '"]');//Llamamos a aquel div que en su dataset tenga el valor que buscamos
        var divArticulo = document.createElement("div");
        divArticulo.classList.add("card", "text-center", "bg-light", "mb-2", "mr-2");
        divArticuloCategoria.appendChild(divArticulo);

        var imagen = document.createElement("img")
        imagen.src = articulos.imagen; imagen.alt = articulos.nombre; imagen.classList.add("card-img-top");
        divArticulo.appendChild(imagen)

        var cardBody = document.createElement("div");
        var nombre = document.createElement("P");
        var precio = document.createElement("P");
        cardBody.classList.add("card-body");
        nombre.innerHTML = articulos.nombre;
        nombre.classList.add("card-title");
        precio.innerHTML = articulos.precio + "€";
        nombre.classList.add("card-text");
        divArticulo.appendChild(cardBody);
        cardBody.appendChild(nombre)
        cardBody.appendChild(precio)
        
        divArticulo.addEventListener("click", function () {
            if(this.classList.contains("bg-light")){
            for(let i=0;i<this.parentNode.childNodes.length;i++){
               if(this.parentNode.childNodes[i].classList.contains('bg-info')){//Comprobamos los hijos del nodo padre del nodo en el que nos encontramos 
                this.parentNode.childNodes[i].classList.remove('bg-info')//Quitamos la clase de color de fondo azul
                this.parentNode.childNodes[i].classList.add('bg-light')//Ponemos la clase de color de fondo blanca
               }
            }
            seleccionarArticulo(articulos)//Añadimos a la tabla de abajo de la web
            this.classList.remove("bg-light")//Quitamos el color de fondo blanco
            this.classList.add("bg-info")//Ponemos el color de fondo azul

        } else {
            this.classList.remove("bg-info")//Quitamos el color de fondo azul
            this.classList.add("bg-light")//Ponemos el color de fondo blanco

            var nombreArt = this.querySelector(".card-text");
            var art = tbody.getElementsByTagName("TD");
            var filaTabla;
            for (var i = 0; i < art.length; i++) {
                if (nombreArt.innerHTML === art[i].innerHTML){
                    filaTabla = art[i].parentNode
                }
            }

            if(filaTabla){
                var casillas = filaTabla.getElementsByTagName("TD")
                for(let i=1;i<casillas.length;i++){
                   casillas[i].innerHTML = ""
                }
            }
            sumaTotal();
            guardarLocalStorage();
        }
        })

    }
}

function seleccionarArticulo(articulos) {
    var fila = tbody.querySelectorAll("tr")[(articulos.cat - 1)];//Fila de la tabla inferior que corresponda a la categoria del artículo clicado
    var td1 = fila.querySelectorAll("td")[1];//Recogemos las tres celdas de la fila
    var td2 = fila.querySelectorAll("td")[2];//Recogemos las tres celdas de la fila
    var td3 = fila.querySelectorAll("td")[3];//Recogemos las tres celdas de la fila
    td1.innerHTML = articulos.nombre //Insertamos el valor del nombre
    td2.innerHTML = articulos.precio + "€" //Insertamos el valor del precio
    td2.dataset.precio = articulos.precio;
    var botonQuitar = document.createElement("BUTTON")
    var inputCantidad = document.createElement("INPUT")
    inputCantidad.setAttribute("type","number")
    inputCantidad.setAttribute("min","1")
    inputCantidad.style.width = "3em"
    botonQuitar.innerHTML="Quitar artículo"
    if(td3.innerHTML == ""){
        td3.appendChild(botonQuitar)
        td3.appendChild(inputCantidad)
    }
    sumaTotal();
    guardarLocalStorage();
    tbody.addEventListener("click",function(e){
        if(e.target.tagName ==="BUTTON"){
        quitarArticulo(e.target);
        guardarLocalStorage();
    }

    tbody.addEventListener("change",function(e){
        if(e.target.tagName === "INPUT"){
            console.log(e.target)
        }
    })
    })
}


function sumaTotal() {

    var suma = 0;
    var filaPrecios = tbody.querySelectorAll("tr") //Precio en [2]
    var todasVacias = true;
    for (let i = 0; i < filaPrecios.length; i++) {

        var casillaPrecio = filaPrecios[i].querySelectorAll("td")[2]
        if (casillaPrecio && casillaPrecio.innerHTML) {
            var precio = parseFloat(casillaPrecio.innerHTML.replace("€", ""));

            suma += precio

            todasVacias = false;
        }
    }
    var filaTotal = tbody.lastElementChild;
    var precioTotal = filaTotal.querySelector("td");
    precioTotal.innerHTML = todasVacias ? "0€" : suma + "€";
}

function guardarLocalStorage() {
    localStorage.setItem("tbodyContent", tbody.innerHTML);
}

function colorearSeleccionados() {
    var articulos = document.getElementById("articulos");
    var cardTitles = articulos.querySelectorAll(".card-title");//Nombres de los artículos en los divs
    var nombresSel = tbody.getElementsByTagName("TD");
    //Definimos los nombres de la lista que hay en la tabla de abajo
    var nombresLista = [nombresSel[1].innerHTML,nombresSel[5].innerHTML,nombresSel[9].innerHTML,nombresSel[13].innerHTML,nombresSel[17].innerHTML,nombresSel[21].innerHTML]

        cardTitles.forEach(elemento =>{
            if(nombresLista.includes(elemento.innerHTML)){
                elemento.parentNode.parentNode.classList.remove("bg-light")
                elemento.parentNode.parentNode.classList.add("bg-info")    
            }
        })
}



function quitarArticulo(e) {
    if (e && e.parentNode) {
        var td = e.parentNode.parentNode.getElementsByTagName("TD")[1];
        var cardTitles = articulos.querySelectorAll(".card-title");
        cardTitles.forEach((articulos) => {
            if (td.innerHTML && td.innerHTML == articulos.innerHTML) {
                articulos.parentNode.parentNode.classList.remove("bg-info");
                articulos.parentNode.parentNode.classList.add("bg-light");
                var casillasAVaciar = td.parentNode.getElementsByTagName("TD");
                for (let i = 1; i < casillasAVaciar.length; i++) {
                    casillasAVaciar[i].innerHTML = "";
                }
            }
        });

    }
}

tbody.addEventListener("change",function(e){
    if(e.target.tagName === "INPUT"){
        let multiplicador = parseInt(e.target.value)
        if(multiplicador != 0){
            console.log("e.target.parentNode.parentNode.children[3].dataset.precio",parseFloat(e.target.parentNode.parentNode.children[3].dataset.precio))
            console.log("e.target.parentNode.parentNode.children[3].innerHTML", e.target.parentNode.parentNode.children[3].innerHTML)
            e.target.parentNode.parentNode.children[3].innerHTML = parseFloat(e.target.parentNode.parentNode.children[3].dataset.precio) * multiplicador +"€"

            sumaTotal();
            guardarLocalStorage();
        }
    }else{
        return;
    }
})

tbody.addEventListener("click",function(e){
            if(e.target.tagName ==="BUTTON"){
            quitarArticulo(e.target);
            sumaTotal();
            guardarLocalStorage();
        }
        })

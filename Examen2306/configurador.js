/*
Estructura pedida:
fetch()
.then
.then(
    fetch()
    .then()
    .then(
        mostrar articulos  ordenados por categorias //Al hacerlo aqui dentro nos aseguramos de tener todos los datos
        )
    )
)*/ 
//COMENZAMOS COGIENDO LA URL BASE
let urlbase= "https://my-json-server.typicode.com/luismiguel-fernandez/angular2022/"
//Declaramos la variable articulos y categorias para usarla en todo el programa
let articulos;
let categorias;
//Recuperamos el DIV del html
const divArticulos = document.querySelector("#articulos")
//Recuperamos los tr desde configuracion para que indique que tr es el 0
const filas = document.querySelectorAll("#configuracion tr") //Dentro del contenedor que se llama configuracion, queremos todos los tr (recuperamelos)

    //Comprobamos si en el localStorage tenemos algún elemento guardado
    if (localStorage.getItem("configuracion")) {
        document.querySelector("#configuracion tbody").innerHTML = localStorage.getItem("configuracion")
    }

//Hacemos el fetch de los articulos
fetch(urlbase+"articulos")
.then(response=>response.json())
.then(json=> {
    articulos=json //Desempaquetamos el json en la variable articulos
    fetch(urlbase+"categorias")
    .then(response=>response.json())
    .then(json=> {
        categorias=json //Desempaquetamos el json en la variable categorias
        //creamos la funcion para mostra los articulos ordenados por categorias
        mostrarArticulosOrdenadosPorCategorias()
    })
})

//! PARTE 1
/*El programa muestra en pantalla los componentes de la base de datos clasificados por categoría. 
Es decir, primero las placas base; después, los procesadores; a continuación, las memorias RAM; y así sucesivamente.
*/
//Creamos la funcion para mostrar los articulos ordenados por categorias
function mostrarArticulosOrdenadosPorCategorias(){
    //Bucle forEach para arbol DOM
    categorias.forEach(cat => {
        //Creamos un HG segun el template
        let nuevoH5 = document.createElement("H5")
        //Queremos que su textContent sea:
        nuevoH5.textContent = cat.nombre  //este nombre sale del json de categorias //YA NOS DEBEN APARECER LAS CATEGORIAS
        //Le añadimos el nombre de la categoria
        divArticulos.append(nuevoH5)
        //Creamos el Div con sus clases si tiene en el template
        let nuevoDivCols = document.createElement("div")
        nuevoDivCols.classList.add("row", "row-cols-5") 
        //Le añadimos el div con las clases
        divArticulos.append(nuevoDivCols) //Inspeccionamos y vemos que ya tenemos las clases
        //Llenar el subcontenido con un filtro de articulos
        articulos.filter (a=>a.cat==cat.id) //Solo queremos los articulos que tengan el id de la categoria
        .forEach(a => {
            //Añadimos el template pero sin machacar sino añadiendo -- CON ESTO YA SE DEBE MOSTRAR TODOS
            //Generar su div generado del template
            //nuevoDivCols.innerHTML+=
            //!PARA APARTADO 2 PODEMOS METER AQUI UN EVENTO ONCLICK
            // `<div onclick="seleccionarArticulo(${a.cat})" class="card text-center bg-light mb-2 mr-2">
            //         <img src="${a.imagen}" class="card-img-top" alt="foto">
            //         <div class="card-body">
            //             <p class="card-title">${a.nombre}</p>
            //             <p class="card-text">${a.precio}</p>
            //         </div>
            //     </div>
            // </div>` 
            //Generar un div para alojar el div,card y su contenido
            let divEnvoltorio = document.createElement("div")
            //Le añadimos las clases
            nuevoDivCols.append(divEnvoltorio)
            //Le añadimos el template
            divEnvoltorio.innerHTML=
            `<div  class="card text-center bg-light mb-2 mr-2">
                    <img src="${a.imagen}" class="card-img-top" alt="foto">
                    <div class="card-body">
                        <p class="card-title">${a.nombre}</p>
                        <p class="card-text">${a.precio}</p>
                    </div>
                </div>
            </div>` 
            //Añadimos el evento click
            divEnvoltorio.addEventListener("click", function(){
                seleccionarArticulo(a)
                
                cambiarColor()
                
            }) 
            
     
        })

})
}

//! PARTE 2
/*El programa permite al usuario elegir un único componente de cada categoría. Es decir, el usuario elegirá una única placa base, un único procesador, 
y así con cada categoría. Los componentes elegidos y sus precios individuales se van mostrando en la tabla resumen de la parte inferior de la web.*/
function seleccionarArticulo(articulo){
    //DEPURAMOS
    //console.log(cat)
    //Queremos las filas de la categoria y guardarlas en celdas// Queremos recuperarle su 2 td y su 3 td para poner nombre y precio
    const celdasDeLaFila = filas[articulo.cat].querySelectorAll("td") //Queremos todos los td
    //Queremos ponerle el nombre y el precio
    celdasDeLaFila[1].textContent = articulo.nombre //El nombre del articulo
    celdasDeLaFila[2].textContent = articulo.precio //El precio del articulo
    //Llamamos a la funcion recalculartotal
    recalculartotal()
    //Llamamos a la funcion guardarLocalStorage
    guardarLocalStorage()

    

}

//! PARTE 3
/*El programa calcula automáticamente el precio total del equipo que el usuario va creando al elegir los componentes.*/
  // Función para calcular el precio total
function recalculartotal() {
        let total = 0;
        const filasPrecios = document.querySelector("#configuracion tbody").querySelectorAll("tr");
        // Recorremos todas las filas de la tabla con forEach
        filasPrecios.forEach(fila => {
            const casillaPrecio = fila.querySelector("td:nth-child(4)"); // Seleccionamos la cuarta celda que contiene el precio
            if (casillaPrecio && casillaPrecio.innerHTML) {
                const precio = parseFloat(casillaPrecio.innerHTML.replace("€", "").trim()); // Eliminamos el símbolo € y cualquier espacio en blanco alrededor del precio
                total += precio; // Sumamos el precio al total       
            }
        });
        // Actualizamos el precio total en la última fila de la tabla
        let filaFinal = document.querySelector("#configuracion tbody").lastElementChild;
        // Seleccionamos la última fila de la tabla
        let precioTotal = filaFinal.querySelector("td");
        // Seleccionamos la celda que contiene el precio total
        precioTotal.innerHTML = total.toFixed(2) + "€";
}
//!PARTE 4
// El programa utiliza LocalStorage para almacenar y recuperar la configuración actual de componentes ya elegidos por el usuario.
//Funcion para guardar en localstorage
function guardarLocalStorage() {
    //Guardamos el tbody
   localStorage.setItem("configuracion", document.querySelector("#configuracion tbody").innerHTML);
}

//!PARTE 5
//El programa muestra alguna indicación visual en los artículos seleccionados por el usuario. Por ejemplo, se le aplica un borde o cambia de color de fondo.
//Funcion para cambiar color al card seleccionado
function cambiarColor() {
    //El div selecionado
    let cardSeleccionado = event.target.closest(".card");
    // Verificamos si ya está seleccionado
    if (!cardSeleccionado.classList.contains("bg-info")) {
        // Si no está seleccionado, cambiamos el color
        cardSeleccionado.classList.remove("bg-light");
        cardSeleccionado.classList.add("bg-info");
    }
}






    /*var suma = 0;
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
    precioTotal.innerHTML = todasVacias ? "0€" : suma.toFixed(2) + "€";;
*/
   

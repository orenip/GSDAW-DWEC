let articulos;
let categorias;
const divArticulos = document.querySelector("#articulos");
const filas = document.querySelectorAll("#configuracion tr");

const urlbase = "https://my-json-server.typicode.com/luismiguel-fernandez/angular2022/";

fetch(urlbase + "articulos")
    .then(response => response.json())
    .then(json => {
        articulos = json;
        fetch(urlbase + "categorias")
            .then(response => response.json())
            .then(json => {
                categorias = json;
                mostrarArticulosPorCategoria();
            });
    });

function mostrarArticulosPorCategoria() {
    categorias.forEach(c => {
        let nuevoH5 = document.createElement("H5");
        nuevoH5.textContent = c.nombre;
        divArticulos.append(nuevoH5);
        let nuevoDivCols = document.createElement("div");
        nuevoDivCols.classList.add("row", "row-cols-5");
        divArticulos.append(nuevoDivCols);
        articulos.filter(a => a.cat == c.id).forEach(a => {
            let divEnvoltorio = document.createElement("div");
            nuevoDivCols.append(divEnvoltorio);
            divEnvoltorio.innerHTML = `<div class="card text-center bg-light mb-2 mr-2">
            <img src="${a.imagen}" class="card-img-top" alt="foto">
            <div class="card-body">
                <p class="card-title">${a.nombre}</p>
                <p class="card-text">${a.precio}€</p>
            </div>
        </div>`;
            divEnvoltorio.addEventListener("click", function() {
                seleccionarArticulo(a);
            });
        });
    });
    
}

function seleccionarArticulo(articulo) {
    const celdasDeLaFila = filas[articulo.cat].querySelectorAll("td");
    if (celdasDeLaFila[1].textContent == articulo.nombre) {
        celdasDeLaFila[1].textContent = "";
        celdasDeLaFila[2].textContent = "";
    } else {
        celdasDeLaFila[1].textContent = articulo.nombre;
        celdasDeLaFila[2].textContent = articulo.precio + "€";
    }
    sumaTotal(); // Llamar a sumaTotal() cada vez que se selecciona un artículo
}

function sumaTotal() {
    let total = 0;
    const filasPrecios = document.querySelector("#configuracion tbody").querySelectorAll("tr");
    let todasVacias = true;
    for (let i = 0; i < filasPrecios.length; i++) {
        const casillaPrecio = filasPrecios[i].querySelector("td:nth-child(4)"); // Seleccionamos la cuarta celda que contiene el precio
        if (casillaPrecio && casillaPrecio.innerHTML) {
            const precio = parseFloat(casillaPrecio.innerHTML.replace("€", "").trim()); // Eliminamos el símbolo € y cualquier espacio en blanco alrededor del precio
            if (!isNaN(precio)) { // Comprobamos si el precio es un número válido
                total += precio;
                todasVacias = false;
            }
        }
    }
    const filaTotal = document.querySelector("#configuracion tbody tr:last-child");
    const precioTotal = filaTotal.querySelector("td");
    precioTotal.innerHTML = todasVacias ? "0€" : total.toFixed(2) + "€";
}

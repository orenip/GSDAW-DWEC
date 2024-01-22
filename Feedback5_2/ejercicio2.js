    document.addEventListener('DOMContentLoaded', function () {
        // 1. Un encabezado de nivel 2 con tu nombre.
        var encabezado = document.createElement('h2');
        encabezado.textContent = 'JOSE ANTONIO LÓPEZ PIÑERO';
        document.body.appendChild(encabezado);

        // 2. Un elemento contenedor, que contendrá los artículos de la tienda.
        var contenedorArticulos = document.createElement('div');
        contenedorArticulos.id = 'contenedor-tienda';
        document.body.appendChild(contenedorArticulos);

        // 3.Obtén los datos desde datos.js
        datos.forEach(function (articulo) {
            
            // Verificar si el precio es numérico
            var precioNumerico = parseFloat(articulo.precio);

            // Crear un artículo
            var nuevoArticulo = document.createElement('div');
            nuevoArticulo.className = 'articulo';

            // Nombre del artículo
            var nombreArticulo = document.createElement('h3');
            nombreArticulo.textContent = articulo.nombre;
            nuevoArticulo.appendChild(nombreArticulo);

            // Descripción del artículo
            var descripcionArticulo = document.createElement('p');
            descripcionArticulo.textContent = articulo.descripcion;
            nuevoArticulo.appendChild(descripcionArticulo);

            // Precio del artículo
            var precioArticulo = document.createElement('p');
            // Verificar si el precio es numérico antes de intentar formatearlo
            precioArticulo.textContent = isNaN(precioNumerico) ? 'Precio no válido' : 'Precio: $' + precioNumerico.toFixed(2);
            nuevoArticulo.appendChild(precioArticulo);

            // Imagen del artículo
            var imagenArticulo = document.createElement('img');
            imagenArticulo.src = articulo.imagen;
            imagenArticulo.alt = articulo.nombre;
            nuevoArticulo.appendChild(imagenArticulo);

            // Pie que indica si hay stock o no
            var pieStock = document.createElement('p');
            pieStock.textContent = articulo.stock ? 'En stock' : 'Agotado';
            pieStock.className = articulo.stock ? 'stock-disponible' : 'stock-agotado';
            nuevoArticulo.appendChild(pieStock);

            //4. Añadir clases desde estilos.css
            nuevoArticulo.classList.add('articulo');
            contenedorArticulos.classList.add('contenedor');
            nombreArticulo.classList.add('encabezado');
            descripcionArticulo.classList.add('parrafo');
            imagenArticulo.classList.add('imagen');
            
            // Añadir el nuevo artículo al contenedor
            contenedorArticulos.appendChild(nuevoArticulo);
        });

    });

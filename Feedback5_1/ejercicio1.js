//REALIZADO DE FORMA SECUENCIAL
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el botón por su ID
    var botonCambiar = document.createElement('button');
    botonCambiar.textContent = 'CAMBIAR';
    document.body.appendChild(botonCambiar);

    // Variable para llevar el seguimiento del estado actual
    var estadoActual = 0;

    // Acciones a realizar en cada clic
    botonCambiar.addEventListener('click', function () {
        switch (estadoActual) {
            case 0:
                // Modificar el contenido del título por el nombre.
                document.title = 'JOSE ANTONIO LÓPEZ PIÑERO';
                var tituloPrincipal = document.querySelector('h1#titulo');
                if (tituloPrincipal) {
                    tituloPrincipal.textContent = 'JOSE ANTONIO LÓPEZ PIÑERO';
                }
                break;
            case 1:
                // Cambiar la imagen del segundo artículo
                var segundaImagen = document.querySelector('article:nth-child(2) img');
                if (segundaImagen) {
                    segundaImagen.src = 'Ciberseguridad.jpg';
                }
                break;
            case 2:
                // Ocultar los artículos 2, 4 y 6
                var articulos = document.querySelectorAll('article');
                articulos.forEach(function (articulo, index) {
                    if (index === 1 || index === 3 || index === 5) {
                        articulo.style.display = 'none';
                    }
                });
                break;
            case 3:
                // Añadir el número de noticia al inicio del titular
                var titulares = document.querySelectorAll('article div:first-child');
                titulares.forEach(function (titular, index) {
                    var numeroNoticia = index + 1;
                    titular.textContent = numeroNoticia + '. ' + titular.textContent;
                });
                break;
            case 4:
                // Añadir clases a los divs de cada artículo
                var divsPrincipales = document.querySelectorAll('article div');
                divsPrincipales.forEach(function (div, index) {
                    if (index % 2 === 0) {
                        // Clase "cabecera" al primer DIV
                        div.classList.add('cabecera');
                    } else {
                        // Clase "desarrollo" al segundo DIV
                        div.classList.add('desarrollo');
                    }
                });
                break;
            case 5:
                // Reemplazar la cadena "Región" por "Región de Murcia" en todos los artículos
                var todosLosArticulos = document.querySelectorAll('article');
                todosLosArticulos.forEach(function (articulo) {
                    articulo.innerHTML = articulo.innerHTML.replace(/Región/g, 'Región de Murcia');
                });
                break;
            default:
                // Restablecer el estado al final de las acciones
                estadoActual = -1;
        }

        // Incrementar el estado para la próxima vez
        estadoActual++;
    });
});

//REALIZADO DE FORMA DIRECTA AL PULSAR EL BOTON
// document.addEventListener('DOMContentLoaded', function () {
//     // Obtener el botón por su ID
//     var botonCambiar = document.createElement('button');
//     botonCambiar.textContent = 'CAMBIAR';
//     document.body.appendChild(botonCambiar);

//     // Agregar un evento de clic al botón
//     botonCambiar.addEventListener('click', function () {
//         // 1. Modificar el contenido del título por el nombre.
//         document.title = 'JOSE ANTONIO LÓPEZ PIÑERO';

//         var tituloPrincipal = document.querySelector('h1#titulo');
//         if (tituloPrincipal) {
//             tituloPrincipal.textContent = 'JOSE ANTONIO LÓPEZ PIÑERO';
//         }

//         // 2. Cambiar la imagen del segundo artículo
//         var segundaImagen = document.querySelector('article:nth-child(3) img');
//         if (segundaImagen) {
//             segundaImagen.src = 'Ciberseguridad.jpg';
//         }

//         // 3. Ocultar artículos numero 2, 4 y 6
//         var articulos = document.querySelectorAll('article');
//         articulos.forEach(function (articulo, index) {
//             if (index === 1 || index === 3 || index === 5) {
//                 articulo.style.display = 'none';
//             }
//         });

//         // 4. Añadir el número de noticia al inicio del titular
//         var titulares = document.querySelectorAll('article div:first-child');
//         titulares.forEach(function (titular, index) {
//             var numeroNoticia = index + 1;
//             titular.textContent = numeroNoticia + '. ' + titular.textContent;
//         });

//         // 5. Añadir clases a los divs de cada artículo
//         var divsPrincipales = document.querySelectorAll('article div');
//         divsPrincipales.forEach(function (div, index) {
//             if (index % 2 === 0) {
//                 // Clase "cabecera" al primer DIV
//                 div.classList.add('cabecera');
//             } else {
//                 // Clase "desarrollo" al segundo DIV
//                 div.classList.add('desarrollo');
//             }
//         });

//         // 6. Reemplazar la cadena "Región" por "Región de Murcia" en todos los artículos
//         var todosLosArticulos = document.querySelectorAll('article');
//         todosLosArticulos.forEach(function (articulo) {
//             articulo.innerHTML = articulo.innerHTML.replace(/Región/g, 'Región de Murcia');
//         });
//     });
// });
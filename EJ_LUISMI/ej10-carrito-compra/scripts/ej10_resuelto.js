const txtAdd = document.querySelector("#txtAdd")
const mylist = document.querySelector("#mylist")
const mycart = document.querySelector("#mycart")
const btnAdd = document.querySelector("#btnAdd")

//Obj.1: Que se añadan a la 1ª UL los items escritos en el INPUT
//oreja CLICK al BUTTON btnAdd
btnAdd.addEventListener("click",addItemToList)
//oreja KEYUP al INPUT txtAdd
txtAdd.addEventListener("keyup",function(evento){
    if (evento.key == "Enter")
        addItemToList()
})

function addItemToList(){
    let texto = txtAdd.value.trim()
    if (texto.length) {
        //añadir elemento a la lista
        const nuevoLI = document.createElement("LI")
        nuevoLI.textContent = texto
        mylist.append(nuevoLI)
        //quiero que el LI escuche CLICS
        nuevoLI.addEventListener("click",function(){
            /* if (this.classList.contains("seleccionado"))
                this.classList.remove("seleccionado")
            else
                this.classList.add("seleccionado") */
            //estas ultimas 4 lineas equivalen a...
            this.classList.toggle("seleccionado")
        })
        //vaciar la caja de texto y darle el foco de nuevo
        txtAdd.value = ""
        txtAdd.focus()
    }
}
//Recuperar los 5 botones de acciones de la lista de la compra
const btnSelAll = document.querySelector("#btnSelAll")
const btnSelNot = document.querySelector("#btnSelNot")
const btnInvSel = document.querySelector("#btnInvSel")
const btnMovSel = document.querySelector("#btnMovSel")
const btnDelSel = document.querySelector("#btnDelSel")

btnSelAll.addEventListener("click",function(){
    let lis = mylist.querySelectorAll("li")
    lis.forEach( li => li.classList.add("seleccionado") )
})
btnSelNot.addEventListener("click",function(){
    let lis = mylist.querySelectorAll("li")
    lis.forEach( li => li.classList.remove("seleccionado") )
})
btnInvSel.addEventListener("click",function(){
    let lis = mylist.querySelectorAll("li")
    lis.forEach( li => li.classList.toggle("seleccionado") )
})



btnMovSel.addEventListener("click",function(){
    let lis = mylist.querySelectorAll("li.seleccionado")
    lis.forEach( li => { 
        const nuevoLi = document.createElement("LI")
        nuevoLi.textContent = li.textContent
        mycart.append(nuevoLi)
        li.remove()
    } )
})
btnDelSel.addEventListener("click",function(){
    let lis = mylist.querySelectorAll("li.seleccionado")
    lis.forEach( li => { li.remove() } )
})
btnEmpCar.addEventListener("click",function(){
    mycart.innerHTML = ""
})






// const btnEmpCar = document.querySelector("#btnEmpCar")

// /* ***********
//     BOTONES
// ************** */


// btnSelAll.addEventListener("click",function(){
//     let todosLosLI = document.querySelectorAll("#mylist>li")
//     todosLosLI.forEach(li => li.classList.add("seleccionado"))
// })
// btnSelNot.addEventListener("click",function(){
//     let todosLosLI = document.querySelectorAll("#mylist>li")
//     todosLosLI.forEach(li => li.classList.remove("seleccionado"))
// })
// btnInvSel.addEventListener("click",function(){
//     let todosLosLI = document.querySelectorAll("#mylist>li")
//     todosLosLI.forEach(li => li.classList.toggle("seleccionado"))
// })
// btnMovSel.addEventListener("click",function(){
//     let selectedLIS = document.querySelectorAll("#mylist>li.seleccionado")
//     selectedLIS.forEach(li => {
//         //mycart.append(li) //lo corta y lo pega en la lista de abajo
//         // pero sigue siendo clicable y no es lo que deseamos

//         let nuevoLI = document.createElement("LI")
//         nuevoLI.textContent = li.textContent
//         mycart.append(nuevoLI)
//         li.remove()
//     })
// })
// btnDelSel.addEventListener("click",function(){
//     let selectedLIS = document.querySelectorAll("#mylist>li.seleccionado")
//     selectedLIS.forEach(li => li.remove())
// })
// btnEmpCar.addEventListener("click",function(){
//     mycart.innerHTML = ""
// })



// /* *******************************
//     CÓDIGO PRINCIPAL DE LA PÁGINA
// ************************************  */
txtAdd.focus()

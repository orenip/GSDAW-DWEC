let cadena = document.querySelector("#cadena")
let guardar = document.querySelector("#guardar")
let recuperar = document.querySelector("#recuperar")

let listaCadenas

if (localStorage.getItem("coleccionCadenas")) {
	listaCadenas = JSON.parse(localStorage.getItem("coleccionCadenas"))
	console.log(listaCadenas.length)
	console.log(listaCadenas.sort())
} else {
	listaCadenas = []
}


guardar.addEventListener("click",function(){
	listaCadenas.push(cadena.value)
	localStorage.setItem("coleccionCadenas",JSON.stringify(listaCadenas))
})
recuperar.addEventListener("click",function(){
	alert(listaCadenas)
	//alert(localStorage.getItem("coleccionCadenas"))
})
let nombre = "lorena"
localStorage.setItem("nombreUsuario",nombre)

let edad = 18
localStorage.setItem("edadUsuario",edad)

let vehiculos = {
    motor: "seat panda",
    pedales: "orbea 500xl"
}
localStorage.setItem("vehiculosUsuario", JSON.stringify(vehiculos) )

let hermanos = [ "antonia", "faustino" ]
localStorage.setItem("hermanosUsuario", JSON.stringify(hermanos) )

document.querySelector("button").addEventListener("click",function(){
    console.log("tu nombre es ", localStorage.getItem("nombreUsuario"))
    console.log("tu edad es ", localStorage.getItem("edadUsuario"))
    console.log("tus vehiculos son ", JSON.parse(localStorage.getItem("vehiculosUsuario")))
    console.log("tus hermanos son ", JSON.parse(localStorage.getItem("hermanosUsuario")))
    console.log(JSON.parse(localStorage.getItem("vehiculosUsuario")).pedales)
    console.log(JSON.parse(localStorage.getItem("hermanosUsuario"))[1])
})
const divGame = document.querySelector("#divGame")
const game = document.querySelector("#game")
const expRegGame1 = /[a-zA-ZñÑ]/
const expRegGame2 = /^[a-zA-Z0-9ñÑ -]*$/
game.addEventListener("keyup",comprobarJuego)
function comprobarJuego() {
    let texto = game.value.trim()
    if (texto && expRegGame1.test(texto) && expRegGame2.test(texto)) {
        divGame.querySelector("div").classList.replace("is-invalid","is-valid")
        divGame.querySelector("input").classList.replace("is-invalid","is-valid")
        return true
    } else {
        divGame.querySelector("div").classList.replace("is-valid","is-invalid")
        divGame.querySelector("input").classList.replace("is-valid","is-invalid")
        return false
    }
}
const divYear = document.querySelector("#divYear")
const year = document.querySelector("#year")
const expRegYear = /^\d{4}$/
year.addEventListener("keyup",comprobarAnyo)
function comprobarAnyo() {
    let texto = year.value.trim()
    let anyoActual = (new Date()).getFullYear()
    if (texto && expRegYear.test(texto) && parseInt(texto)>=1950 && parseInt(texto)<= anyoActual) {
        divYear.querySelector("div").classList.replace("is-invalid","is-valid")
        divYear.querySelector("input").classList.replace("is-invalid","is-valid")
        return true
    } else {
        divYear.querySelector("div").classList.replace("is-valid","is-invalid")
        divYear.querySelector("input").classList.replace("is-valid","is-invalid")
        return false
    }
}
const divPlatform = document.querySelector("#divPlatform")
const platform = document.querySelector("#platform")
platform.addEventListener("change",comprobarPlataforma)
function comprobarPlataforma() {
    if (parseInt(platform.value) >= 0) {
        divPlatform.querySelector("div").classList.replace("is-invalid","is-valid")
        divPlatform.querySelector("select").classList.replace("is-invalid","is-valid")
        return true
    } else {
        divPlatform.querySelector("div").classList.replace("is-valid","is-invalid")
        divPlatform.querySelector("select").classList.replace("is-valid","is-invalid")
        return false
    }
}
const formu = document.querySelector("form")
formu.action = "server/todoOK.html"
formu.addEventListener("submit",function(ev){
    ev.preventDefault()
    if (comprobarJuego() && comprobarAnyo() && comprobarPlataforma())
        this.submit()
})
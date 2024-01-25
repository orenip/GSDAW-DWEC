const ANCHURA_TABLERO = 800
const ALTURA_TABLERO = 500
const DIAMETRO_BOLA = 30
const divTablero = document.querySelector("#tablero")
const addBallBtn = document.querySelector("#addBallBtn")
const add10BallsBtn = document.querySelector("#add10BallsBtn")
const bolas = []

divTablero.style.width = ANCHURA_TABLERO + "px"
divTablero.style.height = ALTURA_TABLERO + "px"

addBallBtn.addEventListener("click", ()=>addBalls(1) )

add10BallsBtn.addEventListener("click", ()=>addBalls(10) )

function addBalls(numBalls){
    for (let i=0; i<numBalls; i++) {
        //crear y unir un DIV para representar una bola
        let newBall = document.createElement("DIV")
        divTablero.append(newBall)
        newBall.classList.add("bola")
        let r = Math.floor(Math.random()*255)
        let g = Math.floor(Math.random()*255)
        let b = Math.floor(Math.random()*255)
        newBall.style.backgroundColor = `rgb(${r},${g},${b})`
        
        let posx = Math.random()*(ANCHURA_TABLERO-DIAMETRO_BOLA)
        let posy = Math.random()*(ALTURA_TABLERO-DIAMETRO_BOLA)
        let velx = Math.random()*2 - 1
        let vely = Math.random()*2 - 1
        let ball = new Bola(newBall,posx,posy,velx,vely)
        bolas.push(ball)
    }
}

function moveBalls() {
    bolas.forEach( bola => {
        bola.posX += bola.velX
        if (bola.posX <=0 || bola.posX >= ANCHURA_TABLERO - DIAMETRO_BOLA)
            bola.velX = -bola.velX
        if (bola.posY <=0 || bola.posY >= ALTURA_TABLERO - DIAMETRO_BOLA)
            bola.velY = -bola.velY

        bola.posY += bola.velY
        bola.bola.style.top = bola.posY + "px"
        bola.bola.style.left = bola.posX + "px"
    })
}

setInterval(moveBalls,10)
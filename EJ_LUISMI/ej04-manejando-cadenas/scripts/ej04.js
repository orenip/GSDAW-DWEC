let dnis = ["12345678Z","32165487B","98745612Q"]

//Mostrar por consola, en formato columna, la siguiente tabla:
//DNI original        Parte num       Letra        Correcto

console.log("DNI original\tParte num\tLetra\tCorrecto")
for (let i=0; i<dnis.length; i++) {
    let partenum = dnis[i].slice(0,8)
    let letra = dnis[i].slice(8)
    //let letra = dnis[i].charAt(8)
    
    let letras = "TRWAGMYFPDXBNJZSQVHLCKE"

    let resto = partenum % 23
    if ( letra.toLowerCase() == letras.charAt(resto).toLowerCase() )
        console.log(dnis[i]+"\t"+partenum+"\t"+letra+"\t"+"OK")
    else
        console.log(dnis[i]+"\t"+partenum+"\t"+letra+"\t"+"corresponde letra "+ letras.charAt(resto))
        /* versión alternativa con comillas inversas ``
        console.log( `${dnis[i]\t}${partenum}\t${letra}\tcorresponde letra ${letras.charAt(resto)}` )
        */
}
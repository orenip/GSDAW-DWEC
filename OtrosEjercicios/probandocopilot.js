// función para calcular días entre dos fechas no funciona introducir fechas por pantalla
function calcularDiasEntreFechas() {
    console.log("hola");
    var fecha1 = document.getElementById("fecha1").value;
    var fecha2 = document.getElementById("fecha2").value;
    var fecha1 = new Date(fecha1);
    var fecha2 = new Date(fecha2);
    var diasDif = fecha2.getTime() - fecha1.getTime();
    var dias = Math.round(diasDif / (1000 * 60 * 60 * 24));
    document.getElementById("resultado").innerHTML = dias;
}

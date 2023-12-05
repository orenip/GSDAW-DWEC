//console.log("funciona")

class Paquete {
    constructor(nombre, peso) {
        this.nombre = nombre;
        this.peso = peso;
    }
}

class AdminPaquetes {
    constructor() {
        this.paquetes = [];
    }

    agregarPaquete(nombre, peso) {

        let expregdesc= /^\S[\s\S]*$/
        nombre =prompt("Escribe el nombre")
        if(expregdesc.test(nombre)){
            
            let expregpeso=/^\d{1,2}\.\d$/
            peso= prompt("Introduce peso del paquete")
            if (!expregpeso.test(peso)) {
                        alert("Error: Peso no válido.");
                        return;
                    }
            const paquete = new Paquete(nombre, peso);
                    this.paquetes.push(paquete);
        }else{
            alert("Error: Descripcion no válida.");
        }
 
    }

    listarPaquetes() {
        let paquetes = "";
        for (let i = 0; i < this.paquetes.length; i++) {
            let paquete = this.paquetes[i];
            paquetes += `${i + 1}. ${paquete.nombre} - ${paquete.peso} kg\n`;
        }
        
        alert(paquetes || "No hay paquetes registrados.");
    }

    borrarPaquete() {
        //this.listarPaquetes(); // Call the listarPaquetes() method to display the list of packages
        
        let npaquete = parseInt(prompt("Paquete a borrar: " + this.paquetes.map((paquete, index) => `${index + 1}. ${paquete.nombre} - ${paquete.peso} kg`).join("\n")));

        if (npaquete >= 1 && npaquete <= this.paquetes.length) {
            this.paquetes.splice(npaquete - 1, 1);
            alert("Paquete: "+npaquete+" borrado");
        } else {
            alert("No existe ese paquete");
        }
    }
    filtrarPaquetes(peso) {
        peso= prompt("Introduce peso del paquete")
        let expregpeso=/^\d{1,2}\.\d$/
        if (!expregpeso.test(peso)) {
            alert("Error: Peso no válido.");
            return;
        }

        const paquetes = this.paquetes.filter(paquete => paquete.peso >= peso);
        paquetes.sort((a, b) => b.peso - a.peso);
        let paquetesFiltrados = "";
        for (let paquete of paquetes) {
            paquetesFiltrados += `${paquete.nombre} - ${paquete.peso} kg\n`;
        }
        alert(paquetesFiltrados || "No hay paquetes que cumplan el criterio.");
    }
}

const adminPaquetes = new AdminPaquetes();

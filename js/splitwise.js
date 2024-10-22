class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    calcularDeuda() {

    }

    sumarGasto(gasto) {
        this.gastos.push(gasto)
    }
    // Completar con los métodos necesarios
}


class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
    // Completar con los métodos necesarios
}


let inputTitulo = document.getElementById('titulo');
let inputImporte = document.getElementById('importe');
let inputFecha = document.getElementById('fecha');
let botonAniadir = document.getElementById('aniadir');
let selectorUsuario = document.getElementById('usuario');

let todoOk = false;
let participantes = [new Usuario("Juan", "/img\\usuarios/avatar_a.png"), new Usuario("Pepe", "/img\\usuarios/avatar_b.png"), new Usuario("Maria", "/img\\usuarios/avatar_c.png")];





function checkTitulo(element) {
    let regexTitulo = /^[a-zA-Z0-9]{1,20}$/;

    comprobarRegex(element, regexTitulo);
}

function checkImporte(element) {
    let regexImporte = /^(1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
    comprobarRegex(element, regexImporte);
}

function checkFecha(element) {
    let regexFecha = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(202[0-4])$/;
    comprobarRegex(element, regexFecha);
}


function comprobarRegex(element, regex) {

    if (element.value == "") {
        element.removeAttribute('class');
    } else {
        if (regex.test(element.value)) {
            element.setAttribute('class', 'verde');
        } else {
            element.setAttribute('class', 'rojo');
        }
    }

}

function comprobarCampos() {

    checkTitulo(inputTitulo);
    checkImporte(inputImporte);
    checkFecha(inputFecha);

    if (inputTitulo.getAttribute('class') == 'rojo' || inputImporte.getAttribute('class') == 'rojo' || inputFecha.getAttribute('class') == 'rojo') {
        alert("Rellene todos los campos")
        todoOk = false;
    } else if (selectorUsuario.value == "") {
        alert("Seleccione un usuario para introducir el gasto")
        todoOk = false;
    } else {
        todoOk = true;
        console.log("todo ok")
    }


}

function aniadirGasto() {
    comprobarCampos();

    if (todoOk) {

        switch (selectorUsuario.value) {
            case "Juan":
                participantes.at(0).sumarGasto(inputImporte);
                break;
            case "Pepe":
                participantes.at(1).sumarGasto(inputImporte);
                break;
            case "Maria":
                participantes.at(2).sumarGasto(inputImporte);
                break;
            default:
                break;
        }

    }
}

function actualizarCampos() {
    
}


botonAniadir.onclick = aniadirGasto;




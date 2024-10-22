class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    calcularDeuda() {
        let parteProporcional = montoTotal/3;
        return parteProporcional - this.calculaGastosTotal;
    }

    calculaGastosTotal(){
        let totalPagado = 0;
        this.gastos.forEach(element => {
            totalPagado+=element;
        });
        return totalPagado;
    }

    calculaCuantoLeDeben(){
        let parteProporcional = montoTotal/3;
        return this.calculaGastosTotal - parteProporcional ;
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
let elemento3 = document.getElementById('elemento3')

let todoOk = false;
let participantes = [new Usuario("Juan", "../img/usuarios/avatar_a.png"), new Usuario("Pepe", "../img/usuarios/avatar_b.png"), new Usuario("Maria", "../img/usuarios/avatar_c.png")];
let montoTotal=0;





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
                participantes.at(0).sumarGasto(inputImporte.value);
                break;
            case "Pepe":
                participantes.at(1).sumarGasto(inputImporte.value);
                break;
            case "Maria":
                participantes.at(2).sumarGasto(inputImporte.value);
                break;
            default:
                break;
        }

    }

    actualizarCampos;
}

function actualizarCampos() {
    let contenedorElemento3 = document.createElement('div');
    contenedorElemento3.setAttribute('class','card mb-12 espacio');
    let elemento3Row = document.createElement('div');
    elemento3Row.setAttribute('class', 'row g-0');
    let elemento3img = document.createElement('img');
    elemento3img.setAttribute('class', 'img-fluid rounded-start');
    let imagenE3 = document.createElement('img');
    let elemento3info = document.createElement('div');
    elemento3info.setAttribute('class','col-md-10');
    let elemento3cuerpo = document.createElement('div');
    elemento3cuerpo.setAttribute('class', 'card-body');
    let h5Elemento3 = document.createElement('h5');
    h5Elemento3.setAttribute('class','card-title');
    let textoElemento3 = document.createElement('p');
    textoElemento3.setAttribute('class', 'card-text');

    participantes.forEach(element => {
        debugger
        imagenE3.setAttribute('src',`${element.pathImg}`);
        h5Elemento3.textContent = `${element.nombre}`;
        let deuda = element.calcularDeuda();
        let calculoGastosTotalElemento = element.calculaGastosTotal();
        if (deuda<0) {
            textoElemento3.textContent= `Ha pagado ${calculoGastosTotalElemento}. Se le deben ${element.calculaCuantoLeDeben} `;
        }else{
            textoElemento3.textContent= `Ha pagado ${element.calculaGastosTotal}. Debe ${element.calcularDeuda} `;
        }

        elemento3cuerpo.append(h5Elemento3,textoElemento3);
        elemento3info.append(elemento3cuerpo);

        elemento3Row.append(elemento3img,elemento3info);
        contenedorElemento3.append(elemento3Row);

        elemento3.append(contenedorElemento3);
    });


}

/*<div class="card mb-12 espacio">
<div class="row g-0">
  <div class="col-md-2">
    <img src="img/usuarios/avatar_c.png" class="img-fluid rounded-start">
  </div>
  <div class="col-md-10">
    <div class="card-body">
      <h5 class="card-title">Juan</h5>
      <p class="card-text">Ha pagado XX€ se le debe XX€.</p>
    </div>
  </div>
</div>
</div>

*/

actualizarCampos();
botonAniadir.onclick = aniadirGasto;




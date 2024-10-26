//Creamos el usuario
class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    //Funcion que nos devuelve lo que debe el usuario
    calcularDeuda() {
        let parteProporcional = montoTotal / 3;
        let pagado = this.calculaGastosTotal();
        let resultado = parteProporcional - pagado;
        return resultado;
    }

    //Funcion que devuelve el total de gastos hechos entre todos los usuarios
    calculaGastosTotal() {
        let totalPagado = 0;
        this.gastos.forEach(element => {
            totalPagado += element.monto;
        });
        return totalPagado;
    }

    //Funcion que calcula cuanto le deben al usuario
    calculaCuantoLeDeben() {
        let parteProporcional = montoTotal / 3;
        return this.calculaGastosTotal() - parteProporcional;
    }

    //Funcion que añade un gasto al array del usuario
    sumarGasto(gasto) {
        this.gastos.push(gasto)
    }
    
}

//Creamos los gastos
class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
    
}

//Tomamos todos los elementos del html que necesitamos
let inputTitulo = document.getElementById('titulo');
let inputImporte = document.getElementById('importe');
let inputFecha = document.getElementById('fecha');
let botonAniadir = document.getElementById('aniadir');
let selectorUsuario = document.getElementById('usuario');
let elemento3 = document.getElementById('elemento3')
let elemento1 = document.getElementById('elemento1')

//Inicializamos las variables que vamos a usar
let todoOk = false;
let participantes = [new Usuario("Juan", "img/usuarios/avatar_a.png"), new Usuario("Pepe", "img/usuarios/avatar_b.png"), new Usuario("Maria", "img/usuarios/avatar_c.png")];
let montoTotal = 0;

//Funciones que comprueban los regex para introducir un gasto
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

//funcion que pone borde rojo o verde al comprobar los campos
function comprobarRegex(element, regex) {

    if (element.value == "") {
        element.removeAttribute('class');
        element.setAttribute('class', 'rojo');
    } else {
        if (regex.test(element.value)) {
            element.setAttribute('class', 'verde');
        } else {
            element.setAttribute('class', 'rojo');
        }
    }
}

//Funcion que nos devuelve si todoOk es true para poder introducir el gasto
function comprobarCampos() {

    checkTitulo(inputTitulo);
    checkImporte(inputImporte);
    checkFecha(inputFecha);

    if (inputTitulo.getAttribute('class') == 'rojo' || inputImporte.getAttribute('class') == 'rojo' || inputFecha.getAttribute('class') == 'rojo') {
        alert("Rellene todos los campos correctamente")
        todoOk = false;
    } else if (selectorUsuario.value == "") {
        alert("Seleccione un usuario para introducir el gasto")
        todoOk = false;
    } else {
        todoOk = true;
    }
}

//Funcion que nos añade un gasto (se activara con un onclick)
function aniadirGasto() {

    //comprobamos que los campos esten bien rellenos
    comprobarCampos();

    if (todoOk) {
        let gastoNuevo = new Gasto(inputTitulo.value, parseFloat(inputImporte.value), inputFecha.value);
        montoTotal += parseFloat(inputImporte.value);
        switch (selectorUsuario.value) {
            case "Juan":
                participantes.at(0).sumarGasto(gastoNuevo);
                break;
            case "Pepe":
                participantes.at(1).sumarGasto(gastoNuevo);
                break;
            case "Maria":
                participantes.at(2).sumarGasto(gastoNuevo);
                break;
            default:
                break;
        }

        //actualizamos los campos de la parte inferior(Cuenta)
        actualizaCampos();

        //añadimos un nuevo elemento al doom de la parte resumen
        aniadirCartaResumen(selectorUsuario.value,gastoNuevo);

        //Reseteamos los campos del input
        inputTitulo.value = "";
        inputImporte.value = "";
        inputFecha.value = "";
        selectorUsuario.value = "";
        //mostramos un mensaje para que el usuario sepa que se ha añadido correctamente
        alert("Gasto añadido correctamente")
    }
}

//Funcion que crea cada elemento de la parte de cuenta
function creaCampos() {
    participantes.forEach(element => {
        let contenedorElemento3 = document.createElement('div');
        contenedorElemento3.setAttribute('class', 'card mb-12 espacio');

        let elemento3Row = document.createElement('div');
        elemento3Row.setAttribute('class', 'row g-0');

        let elemento3ContenedorImg = document.createElement('div');
        elemento3ContenedorImg.setAttribute('class', 'col-md-2');

        let elemento3img = document.createElement('img');
        elemento3img.setAttribute('class', 'img-fluid rounded-start');

        let elemento3info = document.createElement('div');
        elemento3info.setAttribute('class', 'col-md-10');

        let elemento3cuerpo = document.createElement('div');
        elemento3cuerpo.setAttribute('class', 'card-body');

        let h5Elemento3 = document.createElement('h5');
        h5Elemento3.setAttribute('class', 'card-title');

        let textoElemento3 = document.createElement('p');
        textoElemento3.setAttribute('class', 'card-text');
        textoElemento3.setAttribute('id', `id${element.nombre}`)

        elemento3img.src = element.pathImg;
        h5Elemento3.textContent = element.nombre;

        //Iniciamos el mensaje con lo siguiente
        textoElemento3.textContent = 'Ha pagado 0€. Debe 0€';


        elemento3cuerpo.append(h5Elemento3, textoElemento3);
        elemento3info.append(elemento3cuerpo);
        elemento3ContenedorImg.append(elemento3img);
        elemento3Row.append(elemento3ContenedorImg, elemento3info);
        contenedorElemento3.append(elemento3Row);
        elemento3.append(contenedorElemento3);
    });
}

//Funcion que añade un elemento a la parte de Resumen
function aniadirCartaResumen(usuario, gasto) {
    let contenedorElemento1 = document.createElement('div');
    contenedorElemento1.setAttribute('class', 'card mb-12 espacio');

    let elemento1Row = document.createElement('div');
    elemento1Row.setAttribute('class', 'row g-0');

    let elemento1ContenedorImg = document.createElement('div');
    elemento1ContenedorImg.setAttribute('class', 'col-md-2');

    let elemento1img = document.createElement('img');
    elemento1img.setAttribute('class', 'img-fluid rounded-start');

    let elemento1info = document.createElement('div');
    elemento1info.setAttribute('class', 'col-md-10');

    let elemento1cuerpo = document.createElement('div');
    elemento1cuerpo.setAttribute('class', 'card-body');

    let h5Elemento1 = document.createElement('h5');
    h5Elemento1.setAttribute('class', 'card-title');

    let textoElemento1 = document.createElement('p');
    textoElemento1.setAttribute('class', 'card-text');

    //Buscamos el usuario que queremos poner en el gasto
    let usr = participantes[0];
    participantes.forEach(element => {
        if(usuario==element.nombre){
            usr=element;
        }
    });

    elemento1img.src = usr.pathImg;
    h5Elemento1.textContent = usr.nombre;

    textoElemento1.textContent = 'Pagó '+gasto.monto+'€ el '+gasto.fecha;


    elemento1cuerpo.append(h5Elemento1, textoElemento1);
    elemento1info.append(elemento1cuerpo);
    elemento1ContenedorImg.append(elemento1img);
    elemento1Row.append(elemento1ContenedorImg, elemento1info);
    contenedorElemento1.append(elemento1Row);
    elemento1.append(contenedorElemento1);
}

//Funcion que actualiza los campos de la parte de Cuenta por cada usuario
function actualizaCampos() {
    participantes.forEach(element => {
        let textoAModificar = document.getElementById(`id${element.nombre}`);
        let calculoGastosTotalElemento = element.calculaGastosTotal();
        let deuda = element.calcularDeuda();
        if (isNaN(deuda)) {
            deuda = 0;
        }
        if (deuda < 0) {
            textoAModificar.textContent = 'Ha pagado ' + calculoGastosTotalElemento + '€. Se le deben ' + element.calculaCuantoLeDeben().toFixed(2) + '€';
        } else if(deuda > 0){
            textoAModificar.textContent = 'Ha pagado ' + element.calculaGastosTotal().toFixed(2) + '€. Debe ' + deuda.toFixed(2) + '€';
        }else{
            textoAModificar.textContent = 'Ha pagado ' + element.calculaGastosTotal().toFixed(2) + '€. Su deuda está saldada';
        }
    });
}

//Creamos los campos iniciales
creaCampos();

//Funcion que añade gastos al darle al boton
botonAniadir.onclick = aniadirGasto;




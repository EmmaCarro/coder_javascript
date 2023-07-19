// BIENVENIDA
alert ("Bienvenido a VeranoFeel Reservas. A continuacion le pediremos datos de contacto y luego podrá elegir sus reservas.")

// INGRESAR DATOS DE CONTACTO

let operacionDatos = false  // definicion para hacer bucle con el confirm
let usuariorray = [];   //array vacio para llenarlo con datos del usuario en el bucle

// clase constructora para crear objeto con los datos
class Usuario {
    constructor (nombre, email, telefono, adultos, ninios, mascotas) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.adultos = adultos;
        this.ninios = ninios;
        this.mascotas = mascotas;
  }
}
// alerta reusable para prompts mal ingresados
function alertaDatoInvalido() {
    alert("Ingrese un dato válido");
}

do {  // Inicio del bucle global

    let nombre;
    let email;
    let telefono;
    let adultos;
    let ninios;
    let mascotas;

    // Bucles individuales para cada dato
    while (true) {
        nombre = prompt("Ingrese su nombre:");
        if (/^[a-zA-Z]+$/.test(nombre)) {
        break;
        }
        alertaDatoInvalido();
    };

    while (true) {
        email = prompt("Ingrese su email. Debe ser un email valido:");
        if (/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
        break;
        }
        alertaDatoInvalido();
    };
    
    while (true) {
        telefono = parseInt(prompt("Ingrese su numero de contacto:"));
        if (/^\d+$/.test(telefono)) {
        break;
        }
        alertaDatoInvalido();
    };

    while (true) {
        adultos = parseInt(prompt("Ingrese cantidad de adultos:"));
        if (/^\d+$/.test(adultos)) {
        break;
        }
        alertaDatoInvalido();
    };

    while (true) {
        ninios = parseInt(prompt("Ingrese cantidad de menores:"));
        if (/^\d+$/.test(ninios)) {
        break;
        }
        alertaDatoInvalido();
    };

    while (true) {
        mascotas = parseInt(prompt("Ingrese cantidad de mascotas:"));
        if (/^\d+$/.test(mascotas)) {
        break;
        }
        alertaDatoInvalido();
    };

// Verificacion de todos los datos ingresados. Negarlo reinicia el bucle. Aceptarlo ejecuta el if siguiente.
operacionDatos = confirm("¿Son estos datos correctos?" + "\nNombre: " + nombre + "\nEMail: " + email + "\nTelefono: " + telefono + "\nAdultos: " + adultos + "\nNiños: " + ninios + "\nMascotas: " + mascotas );

// if para agregar datos al array con un .push si se confirma el confirm anterior
if (operacionDatos) {
    usuariorray.push(new Usuario(nombre, email, telefono, adultos, ninios, mascotas));
    console.log("Usuario registrado: ", usuariorray[0]);
};

} while (!operacionDatos || (operacionDatos == null) || (operacionDatos == "ESC"));  // Fin del bucle



// MENU DE RESERVAS INTERACTIVO

// Se define otraReserva que interactua para hacer el ciclo repetitivo en conjunto con funcionMes()
let otraReserva = false;

// reserva inicial debe ser siempre 0 pesos porque no tenemos base de datos
let reserva = 0;
let reservaTotal = 0;

// se definen los numeros de inicio y fin de reserva a elegir en blanco
// var eneInicial = 0;
// var eneFinal = 0;

// var febInicial = 0;
// var febFinal = 0;

// Se reemplazaron definiciones individuales por un array de objetos para cada mes del año
// Se definen dias de inicio y fin totales como numeros que van a ser usados para saber si hay reservas anteriores
// Se los define al reves para dar espacio a los dias de cada mes en el calculo de los whiles
const meses = [
    { nombre: "ENERO", dias: 31, inicialTotal: 32, finalTotal: 0 },
    { nombre: "FEBRERO", dias: 28, inicialTotal: 29, finalTotal: 0 },
    { nombre: "MARZO", dias: 31, inicialTotal: 32, finalTotal: 0 },
    { nombre: "ABRIL", dias: 30, inicialTotal: 31, finalTotal: 0 },
    { nombre: "MAYO", dias: 31, inicialTotal: 32, finalTotal: 0 },
    { nombre: "JUNIO", dias: 30, inicialTotal: 31, finalTotal: 0 },
    { nombre: "JULIO", dias: 31, inicialTotal: 32, finalTotal: 0 },
    { nombre: "AGOSTO", dias: 31, inicialTotal: 32, finalTotal: 0 },
    { nombre: "SEPTIEMBRE", dias: 30, inicialTotal: 31, finalTotal: 0 },
    { nombre: "NOVIEMBRE", dias: 30, inicialTotal: 31, finalTotal: 0 },
    { nombre: "DICIEMBRE", dias: 31, inicialTotal: 32, finalTotal: 0 },
];

// se definen el precio final total, modificable al agregar mas reservas, y uno fijo que se usa en la alerta
let precio = 8000;
const fijo = 8000;

// Definiciones para evitar errores
let mensajeReserva = "";
let mensajeTotal = "";
// elegirMes = "";

// alerta de bienvenida donde dice el precio por noche, llamamos al .nombre del usuario registrado en el indice [0] del array usuariorray
alert("¡Hola " + usuariorray[0].nombre + "!\nTu estadia actual por noche es de $" + fijo + "\nAhora continuemos hacia su reserva...")


// Ciclo que repite la reserva
function funcionMes () {
    do {

        // Se definen variables a usar, comenzando mesValido como falso
        let elegirMes;
        let mesValido = false;

        // Se pide ingresar el mes a reservar dentro del while para que inicie en bucle si el resultado es falso (empieza en falso)
        while (!mesValido) {
            // este prompt debe ir en toUpperCase porque el .nombre del array es todo uppercase
            elegirMes = prompt("Escriba el mes en el que desea hacer la reserva a continuacion:").toUpperCase();
            
            // se usa el metodo .some para verificar que el nombre sea valido
            mesValido = meses.some((mes) => mes.nombre === elegirMes);

            // se agrega un if para dar una alerta si el resultado es falso. Se movio la funcion mensajes hasta aca
            if (!mesValido) {
            errorMes = elegirMes + " no es un mes valido. Por favor ingrese un nombre de mes valido."
            mensajes(errorMes,errorMes);
            }
        }
        
        // usando find para encontrar el .nombre del mes que sea igual al prompt anterior
        const mesSeleccionado = meses.find ( (mes) => mes.nombre === elegirMes );

        // se ejecuta un bucle con la funcion de elegir los dias del mes
        if (mesSeleccionado) {
            elegirDias(mesSeleccionado);
        } else {                 
            otraReserva = confirm("Error en los datos ingresados. ¿Reiniciar?");
        }

        otraReserva = confirm("¿Desea realizar otra reserva?");
    } while (otraReserva);
}

// Eleccion de los dias llamado por el ciclo, segun el mes elegido
function elegirDias(mes) {
    
    // Definicion de mensajes reutilizables para inicio y fin de la reserva. Se eliminaron un par redundantes para acortar codigo gracias al array
    const mensajeInicio = `Reservando en mes de ${mes.nombre} \n\nIngrese el dia de inicio de su reserva:`;
    const mensajeFin = `Reservando en mes de ${mes.nombre} \n\nIngrese el dia final de su reserva:`;
    
    // Se reemplazo el switch por simples whiles, acortando el codigo a la mitad gracias al uso del array de objetos
    // se piden dia inicial y final chequeando que sean validos segun la cantidad de dias de ese mes
    let inicial = Number.parseInt(prompt(mensajeInicio));
    while ( 
            inicial === "" || 
            inicial === null || 
            Number.isNaN(Number(inicial)) || 
            inicial < 1 ||
            inicial > mes.dias ||
            (inicial >= mes.inicialTotal && inicial <= mes.finalTotal)
        ) {
            alert(`El día de reserva inicial de ${mes.nombre} ingresado no es válido.`);
            inicial = Number.parseInt(prompt(mensajeInicio));
    }

    let final = Number.parseInt(prompt(mensajeFin));
    while (
            final === "" ||
            final === null ||
            Number.isNaN(Number(final)) ||
            final < 1 ||
            final > mes.dias ||
            final < inicial ||
            (final >= mes.inicialTotal && final <= mes.finalTotal)
        ) {
            alert(`El día de reserva final de ${mes.nombre} ingresado no es válido.`);
            final = Number.parseInt(prompt(mensajeFin));
    }

    // calculo del precio total. La reservaTotal suma todas las reservas hasta el momento.
    let reserva = (final - inicial) * precio;
    reservaTotal += reserva;

    const mensajeReserva = `Reservaste tu estadía de ${final - inicial} días desde el ${inicial} hasta el ${final} de ${mes.nombre} por un total de $${reserva}.`;
    const mensajeTotal = `\nTu estadia completa es por un total de $${reservaTotal}.`;
    mensajes(mensajeReserva,mensajeReserva);
    mensajes(mensajeTotal,mensajeTotal);

    // Se define que el total de dias es igual a los dias que se han reservado antes durante bucles de esta funcion
    mes.inicialTotal += inicial;
    mes.finalTotal += final;
}

// Para los mensajes de consola y alertas, tipo echo
function mensajes(alerta,consola) {
    alert(alerta);
    console.log(consola);
}


// Llamado al ciclo de la reserva para iniciar todo
funcionMes ();

// Despedida
if (otraReserva === false) {
    alert("¡Muchas gracias por elegirnos!\n  - VeranoFeel");
} else {
    console.log("Reiniciando.")
}
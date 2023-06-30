// BIENVENIDA
alert ("Bienvenido a VeranoFeel Reservas. A continuacion le pediremos datos de contacto y luego podrá elegir sus reservas.")


// INGRESAR DATOS DE CONTACTO

// Declaracion de la operacion de datos de contacto completa para el bucle entero
let operacionDatos = false

// Declaracion de Nombre
let nombre = prompt ("Ingrese su nombre");

// Chequeo de error del nombre... mientras nombre sea nada, null o un numero, se repite el while
while ((nombre == "") || (nombre === null) || (Number(nombre)) ) {
    alert ("Ingrese un nombre valido");
    nombre = prompt ("Ingrese su nombre");
};

// Inicio de un bucle global para verificacion de datos de contacto ingresados (abarca todo el ingreso de datos de contacto y sus while)
do {

// Declaracion de email
let email = prompt ("Ingrese su e-mail");

// Chequeo de error de email... funcionamiento igual al de chequeo error de nombre
while ((email == "") || (email === null) || (Number(email)) ) {
    alert ("Ingrese un email valido");
    email = prompt ("Ingrese su email");
};

// Declaracion de telefono
let telefono = parseInt ( prompt ("Ingrese su numero de contacto"));

// Chequeo de error de telefono... funcionamiento igual al chequeo de error de edad
while ( (telefono == "") || (telefono == null) || (Number.isNaN(Number(telefono))) ) {
    alert ("Ingrese un telefono valido");
    telefono = parseInt ( prompt ("Ingrese su numero de contacto"));
};

// Declaracion de adultos
let adultos = parseInt ( prompt ("Ingrese cantidad de adultos"));

// Chequeo de error de edad... mientras edad sea nada, null, no un numero (NaN), menor o igual a 17, mayor o igual a 100, se repite el while
while ( (adultos == "") || (adultos == null) || (Number.isNaN(Number(adultos))) ) {
    alert ("Ingrese una cantidad valida");
    adultos = parseInt ( prompt ("Ingrese cantidad de adultos"));
};

// Declaracion de niños
let ninios = parseInt ( prompt ("Ingrese cantidad de niños"));

// Chequeo de error de edad... mientras edad sea nada, null, no un numero (NaN), menor o igual a 17, mayor o igual a 100, se repite el while
while ( (ninios == "") || (ninios == null) || (Number.isNaN(Number(ninios))) ) {
    alert ("Ingrese una cantidad valida");
    ninios = parseInt ( prompt ("Ingrese cantidad de niños"));
};

// Verificacion de datos ingresados... muestra los datos, y junto al fin del -do while- global debajo y la declaracion operacionDatos = false al principio, confirmar finaliza el -do while- completo, y cancelar lo repite
operacionDatos = confirm("¿Son estos datos correctos?" + "\nNombre: " + nombre + "\nEMail: " + email + "\nTelefono: " + telefono + "\nAdultos: " + adultos + "\nNiños: " + ninios )

// Registro de consola para imprimir datos ingresados
console.log ( "Usuario registrado como:" + "\nNombre: " + nombre + "\nEMail: " + email + "\nTelefono: " + telefono + "\nAdultos: " + adultos + "\nNiños: " + ninios );

// Fin del bucle de datos de contacto completo (abarca todo el ingreso de datos de contacto y sus while)
} while ((operacionDatos == false) || (operacionDatos == null) || (operacionDatos == "ESC"));


// MENU DE RESERVAS INTERACTIVO

// Se define otraReserva que interactua para hacer el ciclo repetitivo en conjunto con funcionMes()
let otraReserva = false;

// reserva inicial debe ser siempre 0 pesos porque no tenemos base de datos
var reserva = 0;
var reservaTotal = 0;

// se definen los numeros de inicio y fin de reserva a elegir en blanco
var eneInicial = 0;
var eneFinal = 0;

var febInicial = 0;
var febFinal = 0;

// Se definen dias de inicio y fin totales como numeros que van a ser usados para saber si hay reservas anteriores. Se los define al reves para dar espacio a los dias de cada mes en el calculo del switch
let eneInicialTotal = 32;
let eneFinalTotal = 0;
let febInicialTotal = 29;
let febFinalTotal = 0;

// se definen el precio final total, y uno fijo que se usa en la alerta
var precio = 8000;
const fijo = 8000;

// Definiciones para evitar errores
mensajeReserva = "";
mensajeTotal = "";
elegirMes = "NINGUNO";

// alerta de bienvenida donde dice el precio por noche
alert("¡Hola " + nombre + "!\nLa estadia actual por noche es de $" + fijo + "\nAhora continuemos hacia su reserva...")

// Ciclo que repite la reserva
function funcionMes () {
    do {
        // Elegi hacer solo enero y febrero para agregar un switch, y porque se lo considera la temporada de verano para los alquileres en la costa
        elegirMes = prompt("Elija el mes donde sera la reserva. Escriba 'ENERO' o 'FEBRERO' a continuacion:")
        
        // Este if evita el error que daria ejecutar la funcion elegirDias habiendo cancelado el prompt elegirMes anterior, dando el resultado de NULL
        if (elegirMes == "enero" || elegirMes == "febrero") {
            // se ejecuta a continuacion la funcion de elegir los dias con el dato del mes que se dio anteriormente
            elegirDias();
                                    
            // si se confirma se repite el ciclo de la reserva
            otraReserva = confirm("¿Desea realizar otra reserva?")
        } else {                                    
            // si se confirma se repite el ciclo de la reserva
            otraReserva = confirm("Error en los datos ingresados. ¿Reiniciar?")
        }

    } while (otraReserva)
}

// Eleccion de los dias llamado por el ciclo, segun el mes elegido.
function elegirDias() {
    
    // Definicion de mensajes reutilizables para inicio y fin de la reserva
    mensajeReserva = "";
    mensajeInicio = "Reservando en mes de " + elegirMes + "\n\nIngrese el dia de inicio de su reserva:";
    mensajeFin = "Reservando en mes de " + elegirMes + "\n\nIngrese el dia final de su reserva:";
    mensajeMalInicio = "El dia de reserva inicial de " + elegirMes + " ingresado no es valido.";
    mensajeMalFinal = "El dia de reserva final de " + elegirMes + " ingresado no es valido."
    
    switch (elegirMes.toLowerCase()) {
        case "enero":
            // se pide el numero de dia inicial a reservar
            eneInicial = Number.parseInt(prompt(mensajeInicio));
            
            // se chequea que ese numero inicial pedido sea valido. Se repetira el pedido si el numero es nulo, letras, fuera del rango de los dias del mes, o ya fue reservado previamente
            while ( (eneInicial == "") || (eneInicial === null) || (Number.isNaN(Number(eneInicial))) || (eneInicial < 1 || eneInicial > 31) || (eneInicial >= eneInicialTotal && eneInicial <= eneFinalTotal)) {                  
                alert(mensajeMalInicio);
                eneInicial = Number.parseInt(prompt(mensajeInicio));
            };

            // se pide el numero de dia final a reservar
            eneFinal = Number.parseInt(prompt(mensajeFin));

            // se chequea que ese numero final sea valido. En este caso se suma tambien que el numero final ingresado debe ser mayor al inicial ingresado anteriormente.
            while ( (eneFinal == "") || (eneFinal === null) || (Number.isNaN(Number(eneFinal))) || (eneFinal < 1 || eneFinal > 31) || (eneFinal < eneInicial) || (eneFinal >= eneInicialTotal && eneFinal <= eneFinalTotal)) {
                alert(mensajeMalFinal);
                eneFinal = Number.parseInt(prompt(mensajeFin));
            };

            // calculo del precio total, sumando 
            reserva = ((eneFinal - eneInicial) * precio);
            reservaTotal = (reserva + reservaTotal);
            mensajeTotal = "\nTu estadia de Enero es por un total de $" + reservaTotal + ".";

            // definicion de mensaje para alerta de Enero
            mensajeReserva = "Reservaste tu estadia de " + (eneFinal - eneInicial) + ` dias desde el ${eneInicial} hasta el ${eneFinal} de ` + elegirMes + " por un total de $" + reserva + ".";      
            mensajes(mensajeReserva,mensajeReserva);
            mensajes(mensajeTotal,mensajeTotal);
            break;
        
        // se repite todo lo mismo para febrero
        case "febrero":
            // se pide el numero de dia inicial a reservar
            febInicial = Number.parseInt(prompt(mensajeInicio));
            
            // se chequea que ese numero inicial pedido sea valido. Se repetira el pedido si el numero es nulo, letras, fuera del rango de los dias del mes, o ya fue reservado previamente
            while ( (febInicial == "") || (febInicial === null) || (Number.isNaN(Number(febInicial))) || (febInicial < 1 || febInicial > 28) || (febInicial >= febInicialTotal && febInicial <= febFinalTotal)) {
                                
                alert(mensajeMalInicio);
                febInicial = Number.parseInt(prompt(mensajeInicio));
            };

            // se pide el numero de dia final a reservar
            febFinal = Number.parseInt(prompt(mensajeFin));

            // se chequea que ese numero final sea valido. En este caso se suma tambien que el numero final ingresado debe ser mayor al inicial ingresado anteriormente.
            while ( (febFinal == "") || (febFinal === null) || (Number.isNaN(Number(febFinal))) || (febFinal < 1 || febFinal > 28) || (febFinal < febInicial) || (febFinal >= febInicialTotal && febFinal <= febFinalTotal)) {
                alert(mensajeMalFinal);
                febFinal = Number.parseInt(prompt(mensajeFin));
            };

            // calculo del precio total, sumando 
            reserva = ((febFinal - febInicial) * precio);
            reservaTotal = (reserva + reservaTotal);
            mensajeTotal = "\nTu estadia de Febrero es por un total de $" + reservaTotal + ".";

            // definicion de mensaje para alerta de Febrero
            mensajeReserva = "Reservaste tu estadia de " + (febFinal - febInicial) + ` dias desde el ${febInicial} hasta el ${febFinal} de ` + elegirMes + " por un total de $" + reserva + ".";      
            mensajes(mensajeReserva,mensajeReserva);
            break;

        default:
            errorMes = elegirMes + " no es un mes valido. Por favor ingrese 'ENERO' o 'FEBRERO'."
            mensajes(errorMes,errorMes);
            break;
    }

    // Se define que el total de dias es igual a los dias que se han reservado durante esta funcion, para sus proximos usos y calcular que no esten ya reservados
    eneInicialTotal = (eneInicial + eneInicialTotal);
    eneFinalTotal = (eneFinal + eneFinalTotal);
    febInicialTotal = (febInicial + febInicialTotal);
    febFinalTotal = (febFinal + febFinalTotal);
}

// Para los mensajes de consola y alertas, tipo echo
function mensajes(alerta,consola) {
    alert(alerta);
    console.log(consola);
}


// Llamado al ciclo de la reserva para iniciar todo
funcionMes ();

// Despedida
if (otraReserva == false) {
    alert("¡Muchas gracias por elegirnos!\n  - VeranoFeel");
} else {
    console.log("Reiniciando.")
}
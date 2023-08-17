// Se reemplazo el localStorage por el uso de un .json teorico

// Hacemos el formulario visible al clickear el boton "Reservar". El formulario se limpia al aparecer.
document.getElementById("reservar").addEventListener("click", mostrarFormulario);
document.getElementById("reservar2").addEventListener("click", mostrarFormulario);
function mostrarFormulario(event) {
    event.preventDefault();
    document.querySelector(".contenedor-formulario").style.display = "block";
    document.getElementById("formulario").style.display = "block";
    document.querySelector(".fondo-oscuro").style.display = "block";
  }

// Definimos la reserva inicial, y el precio por noche
let nuevaReserva = 0;
let reservaTotal = 0;
const precio = 8000;
let reservasArray = []; // Definimos el array vacio para reservas. 

// Se reemplazó el uso del localStorage con el servidor de pruebas json. 
// No hay diferencia de funcionalidad, se guardan los datos hasta cerrar el html, porque para que los datos sean permanentes requerimos un backend que no tenemos
// Se puede reemplazar el link al jsonplaceholder por un archivo local con un array vacio (solo corchetes "[]") sin embargo al no ser un servidor nos daria errores de CORS
function obtenerReservasJSON() { // Funcion para obtener datos del JSON
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .catch(() => {
      return []; // Devuelve un array vacío en caso de error
    });
}

function guardarReservasEnJSON() {  //Funcion para guardar datos en el JSON que usaremos en la logica global
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservasArray),
  });
}

obtenerReservasJSON()
  .then(data => {
    reservasArray = data;  // Cargamos los datos del archivo JSON. Y si no existe, se continua igual con un array vacio.
  })
  .then(() => {  //inicio de toda la logica global
 

// Llamamos al boton "enviar" del formulario y hacemos que se ejecute todo cuando lo clickeamos
document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault();  //evitamos que se ejecute la funcion original del boton que indica el html

  // Definimos variables
  let nombres = document.getElementById("nombres").value.trim();
  let apellidos = document.getElementById("apellidos").value.trim();
  let email = document.getElementById("email").value.trim();
  let telefono = parseInt(document.getElementById("telefono").value.trim());
  let adultos = parseInt(document.getElementById("adultos").value.trim());
  let ninios = parseInt(document.getElementById("ninios").value.trim());
  let fechaDesde = parseInt(document.getElementById("fecha-desde").value.trim());
  let fechaHasta = parseInt(document.getElementById("fecha-hasta").value.trim());
  let mesSeleccionado = document.getElementById("select-mes").value;

  // Chequeamos que todos los campos del formulario esten completos y sean validos.
  // Originalmente habia un solo if con un mensaje generico, pero lo separe aunque fuera mas codigo para poder identificar donde hay un problema
  if (!nombres || !apellidos || !email || !telefono || !adultos || !ninios || !fechaDesde || !fechaHasta) {
    mostrarError("Algunos de los campos están vacíos.");
    console.log("Algunos de los campos están vacíos.")
    return;}
  if (!esNumeroEntero(adultos) || !esNumeroEntero(ninios) || !esNumeroEntero(fechaDesde) || !esNumeroEntero(fechaHasta)) {
    mostrarError("Los numeros ingresados no pueden tener decimales.");
    console.log("Los numeros ingresados no pueden tener decimales.")
    return;}
  if (adultos <= 0) {
    mostrarError("Debe haber un mínimo de un adulto en cada reserva.");
    console.log("Debe haber un mínimo de un adulto en cada reserva.")
    return;}
  if (!/^[a-zA-Z]+$/.test(nombres) || !/^[a-zA-Z]+$/.test(apellidos) || !/^[\w.-]+@[\w.-]+\.\w+$/.test(email) || !/^\d+$/.test(telefono)) {
    mostrarError("Algunos datos ingresados no son válidos.\nNombres y Apellidos deben contener letras.\nEmail debe ser válido. Telefono debe contener numeros.");
    console.log("Nombres y Apellidos deben contener letras. Email debe ser válido. Telefono debe contener numeros.")
    return;}
  if (fechaDesde < 1 || fechaDesde > fechaHasta) {
    mostrarError("La fecha inicial de reserva no puede ser mayor a la final ni menor a 1.");
    console.log("La fecha inicial de reserva no puede ser mayor a la final ni menor a 1.")
    return;}
  if (fechaDesde > obtenerDiasDelMes(mesSeleccionado) || fechaHasta > obtenerDiasDelMes(mesSeleccionado)) {
    mostrarError("Las fechas no pueden estar fuera del rango de dias del mes elegido.");
    console.log("Las fechas no pueden estar fuera del rango de dias del mes elegido.")
    return;}

  // Verificar si ya existe una reserva para el mes seleccionado
  const reservaExistente = reservasArray.find((reserva) => 
    reserva.mesSeleccionado === mesSeleccionado 
  );

  // If que se ejecuta si reservaExistente es true por encontrar que hay reservas en el mes seleccionado con el .find anterior
  // Se comprueba si las fechas reservadas coinciden con las del formulario que escribio el usuario, es decir si intersectan
  if (reservaExistente) {
    const intersectanDias = reservasArray.some((reserva) =>
        reserva.mesSeleccionado === mesSeleccionado &&
        ((fechaDesde <= reserva.fechaHasta && fechaHasta >= reserva.fechaDesde) || 
         (fechaHasta <= reserva.fechaHasta && fechaHasta >= reserva.fechaDesde))
      );
      // Si los dias intersectan, se ejecuta el error
      if (intersectanDias) {
        mostrarError("Algunos de los días elegidos ya están reservados.");
        console.log("Algunos de los días elegidos ya están reservados.")
        return;
      }
  }
  
  // Calcular el precio de la reserva total. La reservaTotal suma todas las reservas hasta el momento. Y le agrego +precio una vez por reserva para que sume la ultima noche que omite el calculo de resta
  let nuevaReserva = precio + (fechaHasta - fechaDesde) * precio;
  reservaTotal += nuevaReserva;

  // Mostrar cartel de confirmación de reserva
  mostrarConfirmacion(nombres, fechaDesde, fechaHasta, reservaTotal);

  // Agregar la nueva reserva al array de reservas y guardar en el archivo .json
  reservasArray.push({mesSeleccionado, fechaDesde, fechaHasta});
  guardarReservasEnJSON()
  });
}); //fin de la logica global

// Funcion para obtener el numero maximo de dias de cada mes, para el chequeo correcto de "fechaDesde" y "fechaHasta". Lo hice con un else if porque ocupaba menos caracteres que un switch
// Destructuracion del if para acortar aun mas el codigo
function obtenerDiasDelMes(mesSeleccionado) { 
    return mesSeleccionado === "febrero" ? 28 : mesSeleccionado === "noviembre" ? 30 : 31;
  }
  
// Defino funciones utiles que voy a reusar
// Para chequear que sean numeros enteros
function esNumeroEntero(valor) {
    return /^\d+$/.test(valor);
  }
  
// Funcion para cerrar carteles de error
function cerrarCartel() {
  const carteles = document.querySelectorAll(".alert");
  carteles.forEach(carte => carte.remove());
}

// Para crear una ventana de error con un "mensaje" customizado. Lo mantuve en vez de reemplazarlo por un SweetAlert, para tener ambos metodos incluidos en el proyecto.
//el style="white-space: pre-line;" fuerza a que funcione el uso de "\n"
function mostrarError(mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.style.zIndex = "1001";
    errorDiv.style.position = "fixed";
    errorDiv.style.top = "50%";
    errorDiv.style.left = "50%";
    errorDiv.style.transform = "translate(-50%, -50%)";
    errorDiv.innerHTML = `
    <p style="white-space: pre-line;">${mensaje}</p><br>
    <button style="display: block; margin: 0 auto;" onclick="cerrarCartel()">Reintentar</button>
    `;
    document.body.appendChild(errorDiv);
  }

// Funcion para cerrar cartel de confirmacion y formulario
function cerrarTodo() {
  const carteles = document.querySelectorAll(".alert");
  carteles.forEach(carte => carte.remove());
  document.querySelector(".contenedor-formulario").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.querySelector(".fondo-oscuro").style.display = "none";
}

// Funcion asincronica para utilizar el toast. El toast elegido usaba "await" y tiene el "timer" integrado, por lo que preferi utilizar async en vez del metodo new promise
async function ejecutarToast() {
  const Toast = Swal.mixin({ // Llamamos a un toast de la libreria SweetAlert2
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,  //le damos un poco mas de tiempo en pantalla que 1500
    timerProgressBar: true
  })
  await Toast.fire({
    icon: 'success',
    title: 'Reserva registrada!'  //modificamos el mensaje
  })
}
  
// Funcion para crear cartel de confirmacion al crear una reserva correctamente. Lo mantuve en vez de reemplazarlo por un SweetAlert, para tener ambos metodos incluidos en el proyecto.
function mostrarConfirmacion(nombres, fechaDesde, fechaHasta, reservaTotal) {
  let mesArreglo = document.getElementById("select-mes").value.toUpperCase();
  const confirmacionDiv = document.createElement("div");
  confirmacionDiv.className = "alert alert-success";
  confirmacionDiv.style.zIndex = "1000";
  confirmacionDiv.style.position = "fixed";
  confirmacionDiv.style.top = "50%";
  confirmacionDiv.style.left = "50%";
  confirmacionDiv.style.transform = "translate(-50%, -50%)";
  confirmacionDiv.innerHTML = `
  <p>¡Reserva realizada para ${nombres}!</p>
  <p>Desde el ${fechaDesde} hasta el ${fechaHasta} de ${mesArreglo}</p>
  <p>Precio total de todas las reservas: $${reservaTotal}</p>
  <button style="display: block; margin: 0 auto;" onclick="cerrarTodo()">Aceptar</button>
  `;
  document.body.appendChild(confirmacionDiv);
  console.log(`Se realizo una reserva desde el ${fechaDesde} hasta el ${fechaHasta} de ${mesArreglo}, y el total hasta ahora es $${reservaTotal}`)
  ejecutarToast();  //llamamos al toast de sweetalert2
}
 

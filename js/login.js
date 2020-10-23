//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    // Función que se ejecuta una vez que se hace click en el botón
    document.getElementById("botonIngreso").addEventListener("click", function() {
        validar();
    });
    
});


let inputUsuario = document.getElementById("usuario");
let inputContrasena = document.getElementById("contrasena");

// Función que valida si se ingresó usuario y contraseña al hacer click en el botón
function validar() {

    if (!inputUsuario.value) { //== null || usuario.value == "") {
        document.getElementById("alerta").innerHTML = "Introduzca su Usuario";
        inputUsuario.focus();
        return false;
    }
    if (!inputContrasena.value) { //== null || contrasena.value == "") {
        document.getElementById("alerta").innerHTML = "Introduzca su contraseña";
        inputContrasena.focus();
        return false;
    }
    else {  
        alert("Ingreso Correcto");
        guardar(inputUsuario.value);
        redirigir();
    }
}

//Función que guarda el nombre de usuario
function guardar(user) {  
    localStorage.setItem("Usuario", user);
}

// Función que direcciona a la homepage luego de haber validado y guardado usuario
function redirigir() {
    window.location.href = "index.html";
}


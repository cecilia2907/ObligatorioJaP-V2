
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    agregarMenu();
   
});



function agregarMenu() {
  
    let html = "";
    
    if(usuario) {
  
      html+= `
      <a class="dropdown-item py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
      <a class="dropdown-item py-2 d-none d-md-inline-block" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item py-2 d-none d-md-inline-block" id="cerrarSesion" onclick="cerrarSesion()">Cerrar sesión</a>
      `
      document.getElementById("agregarMenu").innerHTML = html;
    }
    else {
  
      html+= `
      <a class="dropdown-item py-2 d-none d-md-inline-block" href="home.html">Inicia sesión</a>
      `
      document.getElementById("agregarMenu").innerHTML = html;
    }
}

/*Función que guarda los datos del perfil*/
function guardarPerfil() {

    const inputNombre = document.getElementById("inputNombre").value;
    const inputEdad = document.getElementById("inputEdad").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputTel = document.getElementById("inputTel").value;
    const inputFoto = document.getElementById("inputFoto").value;

    //Se crea el objeto JS
    let perfil = {
        nombre: inputNombre,
        edad: inputEdad,
        email: inputEmail,
        telefono: inputTel,
        foto: inputFoto,
    }
    //Se lo transforma en un objeto JSON
    let perfilJSON = JSON.stringify(perfil);
    //Se guarda el json en el LocalStorage
    localStorage.setItem('Perfil', perfilJSON);
}

/*Función que setea los datos del perfil guardados en el HTML*/
function setearPerfil() {

    //Se trae el objeto JSON guardado y se lo traduce en un objeto JS
    let perfilGuardado = JSON.parse(localStorage.getItem('Perfil'));

    //Si hay datos guardados, se los escribe en el HTML
    if (perfilGuardado) {

        document.getElementById("nombre").innerHTML = perfilGuardado.nombre;
        document.getElementById("edad").innerHTML = perfilGuardado.edad;
        document.getElementById("email").innerHTML = perfilGuardado.email;
        document.getElementById("telefono").innerHTML = perfilGuardado.telefono;

        //Se setea la fuente de la imagen si se cargó url, de lo contrario se setea foto por defecto

        if (perfilGuardado.foto) {
            document.getElementById("fotoPerfil").src = perfilGuardado.foto;
        }else {
            document.getElementById("fotoPerfil").src = "img/Foto de Perfil.png"
        }
        
        //Se resetea el formulario
        document.getElementById("formPerfil").reset();
    }
    
}


/*Validar el modal*/

let botonGuardar = document.getElementById("guardarPerfil");
let formPerfil = document.getElementById("formPerfil");
let inputPerfil = formPerfil.getElementsByTagName("input");

let validarPerfil = false;

function validarModalPerfil() {

    for (let input of inputPerfil) {

        if(!input.value) {
            input.classList.add("is-invalid");
            validarPerfil = false;
            botonGuardar.removeAttribute("data-dismiss","modal");
        }
        else {
            input.classList.remove("is-invalid");
            validarPerfil = true;
        }
    }
}

/*Si se cierra el modal sin completar, se resetea el formulario y se eliminan clases*/
document.getElementById("perfilCerrar").addEventListener("click", function(){
    document.getElementById("formPerfil").reset();
    for (let input of inputPerfil) {

        input.classList.remove("is-invalid");
    }
})

let botonEditar = document.getElementById("editarPerfil");

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //Si el usuario está logueado, permite setear y modificar perfil
    if(usuario) {

        botonEditar.setAttribute("data-toggle", "modal");
        botonEditar.setAttribute("data-target", "#perfilModal");

        botonGuardar.addEventListener("click", function () {

            validarModalPerfil();
            if(validarPerfil == true) {
                botonGuardar.setAttribute("data-dismiss","modal");
                guardarPerfil();
                setearPerfil();
            }
        })
        setearPerfil();       
    }
    else {

        botonEditar.addEventListener("click", function () {

            let html ="";

            html += `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Debes ingresar para poder editar tu perfil 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `

            document.getElementById("errorEditar").innerHTML=html;

        })
    }
});



const CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

let CartArticles = [];
var subTotalArticulo =0;
var subtotal = 0;
var total = 0;
var envio = 0;
let porcentaje = 0;
let inputCant = document.getElementsByClassName("articleCount");

/* Función que muestra el carrito. Esto incluye: los artículos traídos del json, los subtotales por artículo, el subtotal y total de la compra */

function showCart(array) {
    
    let htmlContentToAppend = "";

    for(let i=0; i<array.length; i++){
    
        htmlContentToAppend += `

        <tr>
            <td>
                <img class="img" src="${CartArticles[i].src}" width="100px">
            </td>
            <td>${CartArticles[i].name}</td>
            <td class="unitCost">${CartArticles[i].currency} ${CartArticles[i].unitCost}</td>
            <td><input class="form-control articleCount" style="width:60px;" type="number" value=${CartArticles[i].count} min="1"></td>
            <td>UYU <span class="subtotalArticulo">${calcularSubtotal(CartArticles[i].count, i)}</span></td>
        </tr>`
    }    
    
    //Se muestran los artículos con sus datos
    document.getElementById("mostrarArticulosAca").innerHTML = htmlContentToAppend;

    //En la sección facturación, se muestran los subtotales y totales.
    actualizarSubtotalArticulo();
    subtotalCompra();
    totalCompra();
}

/* Función que calcula el subtotal por artículo y lo expresa en pesos, según: cantidad de artículos y precio unitario. Esta función se usará en la función actualizarSubtotalArticulo() */
function calcularSubtotal (cantidad, indice) {

    if (CartArticles[indice].currency === "UYU") {
        subTotalArticulo = cantidad * CartArticles[indice].unitCost
    }
    if (CartArticles[indice].currency === "USD") {
        subTotalArticulo = cantidad * CartArticles[indice].unitCost * 40;
    }
    return subTotalArticulo;
}

/* Función que actualiza los subtotales por artículo, el subtotal de compra y el total, al aumentar o disminuir la cantidad por artículo */

let mostrarSubtotal = document.getElementsByClassName("subtotalArticulo");

function actualizarSubtotalArticulo() {

    for (let i=0; i<CartArticles.length; i++) {

        inputCant[i].addEventListener("change", function(){

            mostrarSubtotal[i].innerHTML = calcularSubtotal(inputCant[i].value, i);

            subtotalCompra();
            actualizarCostoEnvio ();
            totalCompra();
        })
    }
};

/*Función que suma los subtotales por artículo y actualiza la variable "subtotal"*/ 
function subtotalCompra() {

    subtotal=0;

    for(let i=0; i<CartArticles.length; i++) {
        
        subtotal += parseInt(mostrarSubtotal[i].innerHTML, 10)

        costoEnvio();
    }
    document.getElementById("subtotal").innerHTML = subtotal;
}

/* Función que setea el porcentaje según el envío seleccionado y actualiza el costo del envío*/

let inputEnvio = document.getElementsByClassName("envio");

function costoEnvio() {

    for(let i=0; i<3; i++) {

        inputEnvio[i].addEventListener("click", function() {

            if(inputEnvio[i].value === "1") {
                porcentaje=0.15;
            }
            if(inputEnvio[i].value === "2") {
                porcentaje = 0.07;
            }
            if(inputEnvio[i].value === "3") {
                porcentaje= 0.05;
            }
            actualizarCostoEnvio();
        })
    }
}

/* Función que actualiza el costo del envío y el total de la compra*/

function actualizarCostoEnvio () {

    envio = porcentaje*subtotal;
    document.getElementById("costoDeEnvio").innerHTML = envio;
    totalCompra();
}

/* Función que calcula el total de la compra, teniendo en cuenta el subtotal de la compra y el costo de envío, y actualiza la variable "total" */
function totalCompra() {

    total = envio + subtotal;
    document.getElementById("total").innerHTML = total;
}


// VALIDACIONES //


/*VALIDAR MÉTODO DE ENVÍO*/

let validarEnvio = false;

let direccionEnvio = document.getElementById("direccionEnvio");
let inputDireccion = direccionEnvio.getElementsByTagName("input");

let premium = document.getElementById("premium");
let express = document.getElementById("express");
let standard = document.getElementById("standard");

function validarMetodoEnvio(){

    if ((!premium.checked) && (!express.checked) && (!standard.checked) ) {
        
        let html = "";

        html = `
        <p class="alert-danger">Debes seleccionar una opción de envío</p>
        `
        document.getElementById("alertaEnvio").innerHTML = html;

        validarEnvio = false

    } else {
        validarEnvio = true;
    }  

    /* Evento que elimina la alerta si se seleccionó método de envío*/
    for ( let input of inputEnvio) {
        input.addEventListener("click", function(){
            document.getElementById("alertaEnvio").innerHTML = "";
        })
    }

    for(let input of inputDireccion) {

        if (!input.value) {
            input.classList.add("is-invalid");
            validarEnvio = false;
        }
        else {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            validarEnvio = true;   
        }
    }
    
    /* Evento que elimina la clase "is-invalid" al completar los imput del formulario direccion*/
    for(let input of inputDireccion) {

        input.addEventListener("keypress", function(){
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        })
    }
}

/*VALIDAR MÉTODO DE PAGO*/

/* Funciones que invalidan formularios según el método de pago que se haya elegido */

let tarjeta = document.getElementById("tarjetaDeCredito");
let transf = document.getElementById("transferencia");

let formTarjeta = document.getElementById("formTarjeta");
let inputTarjeta = formTarjeta.getElementsByTagName("input");

let formTransf =  document.getElementById("formTransferencia");
let inputTransf = formTransf.getElementsByTagName("input");

/*Función que invalida los input del formulario "transferencia" al seleccionar método de pago: tarjeta de crédito*/
tarjeta.addEventListener("click", function(){

    document.getElementById("alertaModal").innerHTML = " ";

    for (let input of inputTarjeta) {
        input.disabled = false;
    }
    for (let input of inputTransf) {
        
        input.disabled = true;

        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");

        input.value = "";
    }
})

/*Función que invalida los input del formulario "tarjeta de crédito" al seleccionar método de pago: transferencia*/
transf.addEventListener("click", function(){

    document.getElementById("alertaModal").innerHTML = " ";

    for (let input of inputTarjeta) { 
        input.disabled = true;
        
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");

        input.value = "";
    }
    for (let input of inputTransf) {
        input.disabled = false;
    }
})

/*Función que valida que se haya completado el modal*/

let botonPago = document.getElementById("botonMetodoPago");

let validarTarjeta = false;
let validarTransf = false;

function validarModal() {

    if(!tarjeta.checked && !transf.checked) {

        document.getElementById("alertaModal").innerHTML = "Debes seleccionar un método de pago"

        validarTarjeta = false;
        validarTransf = false;
    }

    else {

        if(tarjeta.checked) {

            document.getElementById("alertaModal").innerHTML = " ";

            for (let input of inputTarjeta) {
    
                if(!input.value) {
                    input.classList.add("is-invalid");
                    validarTarjeta = false;
                }
                else {
                    input.classList.add("is-valid");
                    input.classList.remove("is-invalid");
                    validarTarjeta = true;
                }
            }
        }
        else if (transf.checked) {

            document.getElementById("alertaModal").innerHTML = " ";

            for (let input of inputTransf) {
    
                if(!input.value) {
                    input.classList.add("is-invalid");
                    validarTransf = false;
                }
                else {
                    input.classList.add("is-valid");
                    input.classList.remove("is-invalid");
                    validarTransf = true;
                }
            }
        }
    }
}

/*Evento que dispara la función validarModal() al hacer click en el botoón "Guardar datos" y setea el método de pago seleccionado*/
botonPago.addEventListener("click", function(a){

    validarModal();

    if(validarTarjeta == true) {
        document.getElementById("metodoDePago").innerHTML = " ";
        document.getElementById("metodoDePago").innerHTML = tarjeta.value;
    }
    else if(validarTransf == true) {
        document.getElementById("metodoDePago").innerHTML = " ";
        document.getElementById("metodoDePago").innerHTML = transf.value;
    }
})

/*Funcioón que valida que se haya seteado un método de pago, de lo contrario dispara una alerta*/

let validarMetodo = false;

function validarMetodoPago() {

    if(validarTarjeta==true || validarTransf==true) {
        validarMetodo = true;
    }
    else {
        let html = "";

        html = `
        <p class="alert-danger">Debes seleccionar un método de pago</p>`

        document.getElementById("metodoDePago").innerHTML = " ";
        document.getElementById("metodoDePago").innerHTML = html;

        validarMetodo = false;
    }
}

/*Función que valida la compra (esto es, haber seleccionado un método de envío y un método de pago) una vez se selecciona "Finalzar compra"*/

document.getElementById("finalizarCompra").addEventListener("click", function() {

    validarMetodoEnvio();
    validarMetodoPago();

    if(validarEnvio == true && validarMetodo == true) {

        let html ="";

        html += `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Compra finalizada!</strong> Hemos generado su compra con éxito.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        document.getElementById("alertaAca").innerHTML=html;
    }
                  
});


/*Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.*/
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
                
            CartArticles = resultObj.data.articles;

            if (usuario != null) {
                showCart(CartArticles);
            }               
        }
    })
});
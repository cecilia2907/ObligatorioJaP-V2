const ORDER_ASC_BY_COST = "$";
const ORDER_DESC_BY_COST = "$$$";
const ORDER_BY_SOLD_COUNT = "Mas Vendidos";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var precioMin = undefined;
var precioMax = undefined;

// Función que ordena los productos

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

//Función que muestra los productos

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(product.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(product.cost) <= precioMax))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1 nombre">`+ product.name +`</h4>
                            <small class="text-muted">`+ product.currency +` `+ product.cost +`</small>
                        </div>
                        <small class="text-muted float-right">` + product.soldCount + ` artículos</small>
                        <p class="mb-1 descripcion">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("lista-de-productos").innerHTML = htmlContentToAppend;
    }

    //Evento que lanza la función buscar cuando se ingresa texto en el buscador

    document.getElementById("buscador").addEventListener("input", function() {
        buscar();
    });
    
    //Función buscar que busca los productos de la lista según lo que se ingresó en el buscador

    function buscar() {

    let input = document.getElementById("buscador");
    let filter = input.value.toUpperCase();
    let lista = document.getElementById("lista-de-productos");
    var prodBuscados = lista.getElementsByTagName("a");
  
    for (let i = 0; i < prodBuscados.length; i++) {
        
        //console.log("prueba2");

        let nombre = prodBuscados[i].querySelector(".nombre").innerHTML;
        let descripcion = prodBuscados[i].querySelector(".descripcion").innerHTML;
      
        //console.log(nombre);
  
        if (nombre.toUpperCase().indexOf(filter) > -1 || descripcion.toUpperCase().indexOf(filter) > -1) {
            prodBuscados[i].style.display = "";
        
        } else {
            prodBuscados[i].style.display = "none";
        }
    };
    }
}

// Función que ordena y muestra

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL)
        .then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
            }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBysoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        //Borro el intervalo 
        
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        precioMin = undefined;
        precioMax = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de productos

        nuevoPrecioMin = document.getElementById("rangeFilterCountMin").value;
        nuevoPrecioMax = document.getElementById("rangeFilterCountMax").value;

        if ((nuevoPrecioMin != undefined) && (nuevoPrecioMin != "") && (parseInt(nuevoPrecioMin)) >= 0){
            precioMin = parseInt(nuevoPrecioMin);
        }
        else{
            precioMin = undefined;
        }

        if ((nuevoPrecioMax != undefined) && (nuevoPrecioMax != "") && (parseInt(nuevoPrecioMax)) >= 0){
            precioMax = parseInt(nuevoPrecioMax);
        }
        else{
            precioMax = undefined;
        }

        showProductsList();
    });

});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function() {
    traerProductos();

})


//Realizar una petición web a una URL donde se encuentra una 
//colección de productos en formato JSON, 
//con la información básica (precio, nombre, breve descripción) 
//respectiva a cada producto

function traerProductos () {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(productos => {
            //console.log(productos)
            showProductos(productos);
        })
};

// Función que muestra la lista de productos en el HTML.

let contenido = document.getElementById("lista-de-productos");

var minCount = undefined;
var maxCount = undefined;


function showProductos(array) {
    
    console.log(array);

    contenido.innerHTML = " "

    for(let i=0; i < array.length; i++) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(array.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(array.cost) <= maxCount))){

            contenido.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${array[i].imgSrc}" alt="${array[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${array[i].name}</h4>
                            <small class="text-muted">${array[i].currency} ${array[i].cost}</small>
                        </div>
                        <p class="mb-1">${array[i].description}</p>
                    </div>
                </div>
            </div>
            `
            }
    }
}

//Función que ordena de acuerdo a diferentes criterios la lista de productos

const ORDER_ASC_BY_COST = "$";
const ORDER_DESC_BY_COST = "$$$";
const ORDER_BY_SOLD_COUNT = "MasVendidos";

function sortProducts(criterio, array){
    let result = [];
    if (criterio === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
            
        });
    }
    else if (criterio === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }
    else if (criterio === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
        
    }
    return result;
}

//fUNCIÓN QUE FILTRA 
//function filterProducts(array){
//    let result = [];
//    let minCost = document.getElementById("rangeFilterCountMin").value 
//    let maxCost = document.getElementById("rangeFilterCountMax").value

//    for (let i = 0; i<array.length; i++) {
        
//        if (array[i].cost >= minCost && array[i].cost <= maxCost) {
//          result.push(array[i]);
//        }
//    }
//    return result;  
//}

//function filterAndShowProducts() {
//    fetch(PRODUCTS_URL)
//    .then(response => response.json())
//    .then(productos => {
//        filterProducts(productos)
//        console.log(productos);
//        showProductos(productos);
//    })
//}

// Función que ordena y muestra los productos ordenados
function sortAndShowProducts(criterio){
    fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(productos => {
        sortProducts(criterio, productos)
        //console.log(productos);
        showProductos(productos);
    })
}


document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
})

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
})

document.getElementById("sortBysoldCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_SOLD_COUNT);
})


// Funcionalidad que filtra por rango de precios

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    traerProductos();
})


document.getElementById("rangeFilterCount").addEventListener("click", function(){

    //filterAndShowProducts();

    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    //minCount = document.getElementById("rangeFilterCountMin").value;
    //maxCount = document.getElementById("rangeFilterCountMax").value;

    
    //if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
    //    minCount = parseInt(minCount);
    //}
    //else{
    //    minCount = undefined;
    //}

    //if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
    //    maxCount = parseInt(maxCount);
    //}
    //else{
    //    maxCount = undefined;
    //}

    //traerProductos();
});



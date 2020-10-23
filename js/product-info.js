var product = {};

//Función que muestra las imágenes dentro del subtítulo imágenes
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i=0; i<array.length; i++){
        
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item" id="img${[i]}">
            <img class="d-block w-100 img-fluid" src="${imageSrc}">
        </div>
        
        `
    }

    console.log(htmlContentToAppend);
    document.getElementById("imgList").innerHTML = htmlContentToAppend;
    
    let img1 = document.getElementById("img0")
    img1.classList.add("active");
    
}

//Función que muestra los productos relacionados del array Productos de acuerdo al array del product-info

function showRelatedProducts(array1, array2) {

    let relatedProducts = document.getElementById("relatedProductContainer");
    let htmlContentToAppend = "";
        
    for (let relacionado of array1) {

        htmlContentToAppend += `
        <div class="card m-1" style="width: 18rem;">
            <img class="card-img-top" src="` + array2[relacionado].imgSrc +` " alt="Card image cap">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title"> ` + array2[relacionado].name +`</h5>
                <p class="card-text">`+ array2[relacionado].description+`</p>
                <a href="product-info.html" class="btn btn-secondary mt-auto">Ver producto</a>
            </div>
        </div>
        `
        relatedProducts.innerHTML = htmlContentToAppend;
    }
};

//Función que muestra los comentarios

function showComments(array) {
    
    let htmlContentToAppend = "";

    for(let i=0; i<array.length; i++) {

        let comentario = array[i];

        let pintadas = `<span class="fa fa-star checked"></span>`.repeat(comentario.score);
        let nopintadas = `<span class="fa fa-star"></span>`.repeat(5-comentario.score);

        htmlContentToAppend = `
        <div class="col-6 border rounded">
            <div class="d-flex flex-row comment-row m-t-0">
                <div class="comment-text w-100">
                    <h6 class="font-weight-bold">${comentario.user}</h6> 
                    <div class="rating">${pintadas}${nopintadas}</div>
                    <span class="m-b-15 d-block">${comentario.description}</span>
                    <div class="comment-footer"> 
                        <span class="text-muted float-right">${comentario.dateTime}</span> 
                    </div>
                </div>
            </div>
        </div>
        <br>
        `
        document.getElementById("listaDeComentarios").innerHTML += htmlContentToAppend;
    }
}

//Función que agrega un nuevo comentario

function newComment () {

    let inputComment = document.getElementById("inputComment").value;

    let inputScore = document.getElementById("inputScore").value;

    let pintadas = `<span class="fa fa-star checked"></span>`.repeat(inputScore);
    let nopintadas = `<span class="fa fa-star"></span>`.repeat(5 - inputScore);

    let fechaLarga = new Date();

    let ano = fechaLarga.getFullYear()
    let mes = (fechaLarga.getMonth() + 1);
    let dia = (fechaLarga.getDay() + 1);
    let hora = fechaLarga.getHours();
    let min = fechaLarga.getMinutes();
    let sec = fechaLarga.getSeconds();

    if (mes<10) {
        mes = "0" + mes
    }
    if (dia<10) {
        dia = "0" + dia
    }
    if (hora<10) {
        hora = "0" + hora
    }
    if (min<10) {
        min = "0" + min
    }
    if (sec<10) {
        sec = "0" + sec
    }
    
    let fechaComment = ano+ `-` +mes+ `-`+dia;
    let horaComment = hora+ `:`+min+ `:`+sec;


    htmlContentToAppend = "";

    htmlContentToAppend = `
    <div class="col-6 border rounded">
        <div class="d-flex flex-row comment-row m-t-0">
            <div class="comment-text w-100">
                <h6 class="font-weight-bold">${usuario}</h6> 
                <div class="rating">${pintadas}${nopintadas}</div>
                <span class="m-b-15 d-block">${inputComment}</span>
                <div class="comment-footer"> 
                    <span class="text-muted float-right">${fechaComment} ${horaComment}</span> 
                </div>
            </div>
        </div>
    </div>
    <br>

    `
    document.getElementById("listaDeComentarios").innerHTML += htmlContentToAppend;
    document.getElementById("newCommentForm").reset();
    
}

//Función que muestra el formulario para realizar comentarios

function mostrarForm() {
    html = "";

    html = `
    <dt>Nos interesa su opinión</dt>
        <hr class="my-2">
        <dd>
            <div class="col-6">
                <form id="newCommentForm">
                    <div class="form-group">
                        <label for="inputComment">Escriba aquí su comentario sobre el producto</label>
                        <textarea id="inputComment" class="form-control" rows="3" name="texto" required></textarea>
                    </div> 
                    <div class="form-group">Puntuación: 
                        <select id="inputScore" class="form-control form-control-sm" name="menu" required> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <input id="botonComment" class="btn btn-primary" type="submit" value="Enviar">
                </form>
            </div>
        </dd>
    `
    document.getElementById("seccionComentarios").innerHTML += html;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>';
            productCostHTML.innerHTML = product.currency +` `+ product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //Muestro los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    productList = resultObj.data;

                    showRelatedProducts(product.relatedProducts, productList); 
                }
            })

            //Muestro los comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    comentario = resultObj.data;
                    
                    showComments(comentario);  

                    if (usuario) {
                        mostrarForm();

                        document.getElementById("newCommentForm").addEventListener("submit", function(event) {

                            event.preventDefault();
                            newComment();
                    
                        });
                    }
                    
                    //Muestro el nuevo comentario al submit el formulario si el usuario está logueado
            
                    
                                   
                }
            });

            
            
            
            
        }
    
    })
   
});




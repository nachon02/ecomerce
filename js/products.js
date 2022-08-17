//array donde se cargarán los datos recibidos:
let listaProductos = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array, catName) {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
       <div class="text-center mt-3">
        <h2>Productos</h2>
            <div id="info"><h3 class="mb-4 text-muted">Verás aquí todos los productos de la categoría <span class="text-dark">${catName}</span></h3></div>
    </div>
            
    `;

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        
        <div class="list-group-item list-group-item-action">
            
            <div class="row">
                <div class="col-3">
                    <img src=${product.image} alt="product image" class="p-0 img-thumbnail">                    
                </div>
                <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${product.name} -${product.currency} ${product.cost} </h4> 
                                <p mb-1=""> ${product.description} </p> 
                            </div>
                            <small class="text-muted">${product.soldCount} vendidos</small> 
                        </div>
                    </div>
            </div>
        </div>
        `;
        document.getElementById("product_container").innerHTML =
            htmlContentToAppend;
    }
    // console.log(htmlContentToAppend);
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en listaProductos.
-Por último, se llama a showCategoriesList() pasándole por parámetro listaProductos.

*/ /* document.addEventListener("DOMContentLoaded", function (e) {
    getID(
        "https://japceibal.github.io/emercado-api/cats_products/101.json"
    ).then(function (id) {
        if (id.status === "ok") {
            let catID = id.data.catID;
            console.log(catID);
        }
    });
});
*/
document.addEventListener("DOMContentLoaded", function (e) {
    /* getID(
        "https://japceibal.github.io/emercado-api/cats_products/101.json"
    ).then(function (id) {
        if (id.status === "ok") {
            let catID = '"' + id.data.catID + '"';
            console.log(catID);
            return catID;
        }
    });*/
    getJSONData(
        "https://japceibal.github.io/emercado-api/cats_products/101.json"
    ).then(function (resultObj) {
        // console.log(`${PRODUCTS_URL}${catID}${EXT_TYPE}`);
        if (resultObj.status === "ok") {
            listaProductos = resultObj.data.products;

            showCategoriesList(listaProductos, resultObj.data.catName);
        } else {
            // console.log(PRODUCTS_URL + catID + EXT_TYPE);
        }
    });
});

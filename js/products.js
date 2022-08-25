//array donde se cargarán los datos recibidos:
let listaProductos = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function verProductos(array, catName) {
    let contenido = "";
    contenido = `
       <div class="text-center mt-3">
        <h2>Productos</h2>
            <div id="info"><h3 class="mb-4 text-muted">Verás aquí todos los productos de la categoría <span class="text-dark">${catName}</span></h3></div>
    </div>
    <div class="row">
        <div class="col text-end">
          <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
            <input type="radio" class="btn-check" name="options" id="sortAsc">
            <label class="btn btn-light" for="sortAsc">A-Z</label>
            <input type="radio" class="btn-check" name="options" id="sortDesc">
            <label class="btn btn-light" for="sortDesc">Z-A</label>
            <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
            <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i></label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
          <div class="row container p-0 m-0">
            <div class="col">
              <p class="font-weight-normal text-end my-2">Cant.</p>
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
            </div>
            <div class="col-3 p-0">
              <div class="btn-group" role="group">
                <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
            
    `;

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        contenido += `
        
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
        document.getElementById("product_container").innerHTML = contenido;
    }
    // console.log(contenido);
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en listaProductos.
-Por último, se llama a verProductos() pasándole por parámetro listaProductos.

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
    let id = localStorage.getItem("catID");
    getJSONData(`${PRODUCTS_URL}${id}${EXT_TYPE}`).then(function (resultObj) {
        // console.log(`${PRODUCTS_URL}${catID}${EXT_TYPE}`);
        if (resultObj.status === "ok") {
            listaProductos = resultObj.data.products;

            verProductos(listaProductos, resultObj.data.catName);
        } else {
            // console.log(PRODUCTS_URL + catID + EXT_TYPE);
        }
    });
});

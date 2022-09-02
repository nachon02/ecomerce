//array donde se cargarán los datos recibidos:
let listaProductos = [];
const asc = "asc";
const desc = "desc";
const rel = "rel";
let pMin = undefined;
let pMax = undefined;

/* Sorting the array by the criteria that is passed as a parameter. */
function ordenarArray(criterio, array) {
    let arrayOrdenado = [];
    if (criterio === asc) {
        arrayOrdenado = array.sort((a, b) => {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criterio === desc) {
        arrayOrdenado = array.sort((a, b) => {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criterio === rel) {
        arrayOrdenado = array.sort((a, b) => {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;
        });
    }
    return arrayOrdenado;
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM

function verProductos() {
    let contenido = "";
    let contenidoT = "";

    if (listaProductos.length > 0) {
        document.getElementById("filtros").style.display = "block";

        contenidoT = `
       <div class="text-center mt-3">
        <h2>Productos</h2>
            <div id="info"><h3 class="mb-4 text-muted">Verás aquí todos los productos de la categoría <span class="text-dark">${nameCat}</span></h3></div>
    </div>
    `;
        document.getElementById("pTitulo").innerHTML = contenidoT;

        for (let i = 0; i < listaProductos.length; i++) {
            let product = listaProductos[i];

            /* Checking if the value of pMin is not undefined and not empty and if it is greater than
            0. If
            it is, it will parse the value of pMin to an integer. If not, it will set pMin to
            undefined. */
            if (
                (pMin == undefined ||
                    (pMin != undefined && parseInt(product.cost) >= pMin)) &&
                (pMax == undefined ||
                    (pMax != undefined && parseInt(product.cost) <= pMax))
            ) {
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
            }
            document.getElementById("product_container").innerHTML = contenido;
        }
    }
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en listaProductos.
-Por último, se llama a verProductos() pasándole por parámetro listaProductos.

*/
document.addEventListener("DOMContentLoaded", function (e) {
    let id = localStorage.getItem("catID");
    getJSONData(`${PRODUCTS_URL}${id}${EXT_TYPE}`).then(function (resultObj) {
        // console.log(`${PRODUCTS_URL}${catID}${EXT_TYPE}`);
        if (resultObj.status === "ok") {
            listaProductos = resultObj.data.products;
            nameCat = resultObj.data.catName;

            verProductos();
        }
    });

    /* funcion que limpia los inputs y muestro los productos */
    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("precioMin").value = "";
        document.getElementById("precioMax").value = "";

        pMin = undefined;
        pMax = undefined;

        verProductos();
    });
    // Agrego a los filtros la funcion verProductos con el array ordenado

    document.getElementById("sortAsc").addEventListener("click", () => {
        verProductos(ordenarArray(asc, listaProductos), nameCat);
    });
    document.getElementById("sortDesc").addEventListener("click", () => {
        verProductos(ordenarArray(desc, listaProductos), nameCat);
    });
    document.getElementById("sortByCount").addEventListener("click", () => {
        verProductos(ordenarArray(rel, listaProductos), nameCat);
    });

    document.getElementById("filtrar").addEventListener("click", () => {
        pMin = document.getElementById("precioMin").value;
        pMax = document.getElementById("precioMax").value;

        /* Checking if the value of pMin is not undefined and not empty and if it is greater than 0. If
        it is, it will parse the value of pMin to an integer. If not, it will set pMin to undefined. */
        if (pMin != undefined && pMin != "" && parseInt(pMin) >= 0) {
            pMin = parseInt(pMin);
        } else {
            pMin = undefined;
        }

        if (pMax != undefined && pMax != "" && parseInt(pMax) >= 0) {
            pMax = parseInt(pMax);
        } else {
            pMax = undefined;
        }

        verProductos();
        console.log(listaProductos);
    });
});

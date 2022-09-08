//array donde se cargarán los datos recibidos:
let listaProductos = [];
const asc = "asc";
const desc = "desc";
const rel = "rel";
let pMin = undefined;
let pMax = undefined;
let buscarVal = undefined;

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

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
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

            if (
                (pMin == undefined ||
                    (pMin != undefined && parseInt(product.cost) >= pMin)) &&
                (pMax == undefined ||
                    (pMax != undefined && parseInt(product.cost) <= pMax)) &&
                (buscarVal == undefined ||
                    (buscarVal != undefined &&
                        product.name.toLowerCase().includes(buscarVal)) ||
                    product.description.toLowerCase().includes(buscarVal))
            ) {
                // console.log(product.id);
                contenido += `
        
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            
            <div class="row">
                <div class="col-3">
                    <img src=${product.image} alt="product image" class="p-0 img-thumbnail">                    
                </div>
                <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${product.name} - ${product.currency} ${product.cost} </h4> 
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
    // console.log(localStorage.getItem("catID"));
    // funcion que limpia los inputs

    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("precioMin").value = "";
        document.getElementById("precioMax").value = "";
        document.getElementById("buscar").value = "";

        buscarVal = undefined;
        pMin = undefined;
        pMax = undefined;

        verProductos();
    });
    // Agrego validaciones  alos filtros

    document.getElementById("sortAsc").addEventListener("click", () => {
        verProductos(ordenarArray(asc, listaProductos), nameCat);
    });
    document.getElementById("sortDesc").addEventListener("click", () => {
        verProductos(ordenarArray(desc, listaProductos), nameCat);
    });
    document.getElementById("sortByCount").addEventListener("click", () => {
        verProductos(ordenarArray(rel, listaProductos), nameCat);
    });
    // cuando se cumplen las condiciones convierte los valores a enteros
    document.getElementById("filtrar").addEventListener("click", () => {
        pMin = document.getElementById("precioMin").value;
        pMax = document.getElementById("precioMax").value;

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
    });
    // agrego evento input que filtre los productos segun el valor del buscador y el nombre y descripcion de los mismos
    buscar = document.getElementById("buscar");
    buscar.addEventListener("input", () => {
        buscarVal = document.getElementById("buscar").value;
        if (buscarVal.trim() != "" && buscarVal != undefined) {
            buscarVal = buscarVal.toLowerCase();
        } else {
            buscarVal = undefined;
        }
        verProductos();
    });
});

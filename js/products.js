//array donde se cargarán los datos recibidos:
let listaProductos = [];
const asc = "asc";
const desc = "desc";
const rel = "rel";
let pMin = undefined;
let pMax = undefined;
let buscarVal = undefined;

let carro = JSON.parse(localStorage.getItem("cart"));
let infoP = {
	id: "",
	name: "",
	count: 1,
	unitCost: "",
	currency: "",
	image: "",
};

function addCart(id) {
	let existe = false;

	let este = false;
	let j;

	for (let i = 0; i < listaProductos.length; i++) {
		j = i;
		const element = listaProductos[i];
		if (element.id == id) {
			este = true;
			console.log("este es " + element.name);

			infoP.id = parseInt(element.id);
			infoP.unitCost = parseInt(element.cost);
			infoP.name = element.name;
			infoP.image = element.image;
			infoP.currency = element.currency;
			infoP.count = 1;
		}
	}

	for (let i = 0; i < carro.length; i++) {
		const p = carro[i];
		if (id == p.id) {
			console.log(id + " " + p.id);
			existe = true;
			console.log(p.name + " holas");
			console.log(carro);
			console.log(p);
		}
	}

	if (!existe) {
		carro.push(infoP);
		// localStorage.setItem("carrito", carro);
		console.log(carro);

		localStorage.setItem("carrito", JSON.stringify(carro));
		console.log("Se agrego al carrito");
		document.getElementById("sucssCart").classList.remove("hide");
		carro = JSON.parse(localStorage.getItem("carrito"));

		setTimeout(function () {
			document.getElementById("sucssCart").classList.add("hide");
		}, 3000);
	} else {
		// existe = false;

		// cantidad = infoP.count;
		// cantidad += 1;
		// console.log(cantidad);
		// infoP.count += 1;
		document.getElementById("alreadyCart").classList.remove("hide");
		setTimeout(function () {
			document.getElementById("alreadyCart").classList.add("hide");
		}, 3000);
	}
	// localStorage.setItem("carrito", JSON.stringify(carro));
	// console.log(j);
}

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
//guarda en el LS el id del producto y redirecciona a product info
function setProdID(id) {
	localStorage.setItem("prodID", id);
	window.location = "product-info.html";
}
//función que obtiene datos, y los muestra en pantalla a través el uso del DOM

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
				(pMin == undefined || (pMin != undefined && parseInt(product.cost) >= pMin)) &&
				(pMax == undefined || (pMax != undefined && parseInt(product.cost) <= pMax)) &&
				(buscarVal == undefined ||
					(buscarVal != undefined && product.name.toLowerCase().includes(buscarVal)) ||
					product.description.toLowerCase().includes(buscarVal))
			) {
				contenido += `
        
        <div  class="list-group-item list-group-item-action cursor-active">
            
            <div class="row">
                <div class="col-3" onclick="setProdID(${product.id})">
                    <img id="img_p${i + 1}"src=${product.image} alt="Imagen de ${
					product.name
				}" class="p-0 img-thumbnail">                    
                </div>
                <div class="col-7" onclick="setProdID(${product.id})">
                        
                            <div class="mb-1">
                                <h4>${product.name} - ${product.currency} ${product.cost} </h4> 
                                <p mb-1=""> ${product.description} </p> 
                            
                            
                        </div>
                    </div>
					<div class="col-2 text-end">

					<div class="row">
					<small class="text-muted">${product.soldCount} vendidos</small> 
					</div>

					<div class="row mt-100">
					<button type="button" class="btn btn-cart btn-sm" onclick="addCart(${product.id})">Comprar</button>
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
		ordenarArray(asc, listaProductos);
		console.log(ordenarArray(asc, listaProductos));
		verProductos();
	});
	document.getElementById("sortDesc").addEventListener("click", () => {
		ordenarArray(desc, listaProductos);
		verProductos();
	});
	document.getElementById("sortByCount").addEventListener("click", () => {
		ordenarArray(rel, listaProductos);
		verProductos();
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

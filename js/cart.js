const user = 25801;
let articulos = JSON.parse(localStorage.getItem("carrito"));
let articulo = articulos[0];
console.log(articulos);

const verCarro = () => {
	let subtotal = parseInt(articulo.unitCost);
	let contenido = `
        <div id="titulo" class=" mt-3">
            <h2 class="text-center">Carrito de compras</h2>
            <h4 class="mt-4">Articulos a comprar</h4>
        </div>
        <div class="d-flex justify-content-between">
            <table id='carritoInfo'class="w-100 text-center">
                <tr class="borde-btm">
                    <th></th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </table>
        </div>
        <div class="mt-3 d-flex flex-row justify-content-evenly">

            <div class="column">
            <h4 class="mt-4">Tipo de envío</h4>
                <div class="d-flex flex-column">
                    <div class="p-2"><input type="radio" name="envio" id="premium" class="me-2" value="15"></input><label for="premium"> Premium 2 a 5 días (15%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" id="express" class="me-2" value="7"></input><label for="express"> Express 5 a 8 días (7%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" id="standar" class="me-2" value="5"></input><label for="standar"> Standar 12 a 15 días (5%)</label></div>
                </div>
            </div>
                
            <div class="">
                <h4 class="mt-4">Dirección de envío</h4> 
                <div class="row">
                    
                    <div class="mb-3 col-md-9">
                        <label for="calle" class="form-label">Calle</label>
                        <input type="text" class="form-control" id="calle">
                    </div>
                    <div class="mb-3 col-md-3">
                        <label for="puerta" class="form-label">Número</label>
                        <input type="text" class="form-control" id="puerta">
                    </div>
                    <div class="mb-3 col-md-9">
                        <label for="esq" class="form-label">Esquina</label>
                        <input type="text" class="form-control" id="esq">
                    </div>
                </div>
            </div>
        </div>
    `;
	document.getElementById("carrito").innerHTML = contenido;

	let carrito = `<tr class="borde-btm">
    <td><img src="${articulo.image}" width="100px" class="my-2"></td>
    <td>${articulo.name}</td>
    <td>${articulo.currency} ${articulo.unitCost}</td>
    <td><input type="number" value="${articulo.count}" class='cantidad' min="0"></input> </td>
    <td><b id='subtotal'>${articulo.currency} ${articulo.unitCost}</b></td>
  </tr>`;

	// console.log(carrito);
	document.getElementById("carritoInfo").innerHTML += carrito;
	let inputCant = document.getElementsByClassName("cantidad")[0];
	inputCant.addEventListener("input", () => {
		subtotal = parseInt(inputCant.value * articulo.unitCost);
		document.getElementById("subtotal").innerHTML = `${articulo.currency} ${subtotal}`;
	});
};

document.addEventListener("DOMContentLoaded", () => {
	getJSONData(`${CART_INFO_URL}${user}${EXT_TYPE}`).then(function (resultObj) {
		// console.log(`${CART_INFO_URL}${user}${EXT_TYPE}`);
		if (resultObj.status === "ok") {
			// console.log(articles);
			cart = resultObj.data;
			compras = cart.articles;

			localStorage.setItem("carrito", JSON.stringify(compras));

			// console.log(articles);
			verCarro();
		}
	});
});

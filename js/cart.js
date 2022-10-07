const verCarro = () => {
	let articulos = JSON.parse(localStorage.getItem("carrito"));
	// let articulo = articulos[0];

	let contenido = "";
	contenido = `
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
                        <input type="number" class="form-control" id="puerta">
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

	let carrito = "";
	let cant = 1;

	console.log(articulos);
	for (let i = 0; i < articulos.length; i++) {
		let element = articulos[i];
		let subtotal = element.unitCost;
		// if (element.currency == "USD") {
		// 	console.log(element.currency);
		carrito += `<tr class="borde-btm" id="compra_${i + 1}">
    <td><img src="${element.image}" width="100px" class="my-2"></td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.unitCost}</td>
    <td><input type="number" id="inputCant_${i + 1}" value="${parseInt(cant)}" class='cantidad' min="1"></input> </td>
    <td><b moneda="${element.currency}"id='subtotal_${i + 1}'>${element.currency} ${subtotal}</b></td>
  </tr>`;
		// }

		// 		carrito += `<tr class="borde-btm" id="compra_${i + 1}">
		//     <td><img src="${element.image}" width="100px" class="my-2"></td>
		//     <td>${element.name}</td>
		//     <td>${element.currency} ${element.unitCost}</td>
		//     <td><input type="number" id="inputCant_${i + 1}" value="1" class='cantidad' min="1"></input> </td>
		//     <td><b id='subtotal_${i + 1}'>${element.currency} ${subtotal}</b></td>
		//   </tr>

		//   `;
	}
	// console.log(carrito);
	document.getElementById("carritoInfo").innerHTML += carrito;

	for (let i = 0; i < articulos.length; i++) {
		let p = articulos[i];
		let inputCant = document.getElementById("inputCant_" + (i + 1));
		let sub = document.getElementById("subtotal_" + (i + 1));
		inputCant.addEventListener("input", () => {
			if (inputCant.value >= 1) {
				console.log(inputCant.value);
				subtotales = parseInt(inputCant.value * p.unitCost);
				sub.innerHTML = `${p.currency} ${subtotales}`;
			}
		});
	}
};

document.addEventListener("DOMContentLoaded", () => {
	// console.log(articles);
	verCarro();
});

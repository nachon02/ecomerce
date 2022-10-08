let total = [];
const dltCart = (u) => {
	let dltcarro = JSON.parse(localStorage.getItem("carrito"));
	// console.log(dltcarro[u]);
	dltcarro.pop(u);
	localStorage.setItem("carrito", JSON.stringify(dltcarro));

	location.reload();
};
const verCarro = () => {
	let articulos = JSON.parse(localStorage.getItem("carrito"));
	// let articulo = articulos[0];

	if (!articulos[0]) {
		document.getElementById("carrito").innerHTML = `
            <div id="titulo" class=" mt-3 text-center">
            <h2 class="">Carrito de compras</h2>
            <p class="fs-4 mt-4 ">No hay productos</p>
        </div>
        `;
	} else {
		let contenido = "";

		contenido = `
        <div id="titulo" class=" mt-3 text-center">
            <h2 class="">Carrito de compras</h2>
            <p class="fs-4 mt-4 ">Articulos a comprar</p>
        </div>
        <div class="d-flex justify-content-between">
            <table id='carritoInfo'class=" w-100 text-center">
            <thead>
            <tr class="borde-btm">
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th><i class="fas fa-ellipsis-h"></i></th>
                </tr>
            </thead>
                
            </table>
        </div>
        <div class="mt-3 d-flex flex-row justify-content-evenly">
        
            <div class="col-3">
            <p class="fs-4 mt-4">Tipo de envío</p>
                <div class="mt-3">
                    <div class="p-2"><input type="radio" name="envio" id="premium" class="me-2" value="15"></input><label for="premium"> Premium 2 a 5 días (15%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" id="express" class="me-2" value="7"></input><label for="express"> Express 5 a 8 días (7%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" id="standar" class="me-2" value="5"></input><label for="standar"> Standar 12 a 15 días (5%)</label></div>
                </div>
            </div>
                
            <div class="col-6">
                <p class="fs-4 mt-4">Dirección de envío</p> 
                <div class="row">
                    
                    <div class="mb-3 ">
                        <label for="calle" class="form-label">Calle</label>
                        <input type="text" class="form-control" id="calle">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="esq" class="form-label">Esquina</label>
                        <input type="text" class="form-control" id="esq">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="puerta" class="form-label">Número</label>
                        <input type="number" class="form-control" id="puerta">
                    </div>
                </div>
            </div>
             <div id="total" class="col-3 ms-3">
            <p class="fs-4 mt-4 borde-btm">Total</p>
            <div class="row">
                <div class="col">
                    <div class="p-2"><input type="radio" name="total" id="usd" class="me-2" value="usd" checked></input><label for="usd"> USD</label></div>
                    <div class="p-2"><input type="radio" name="total" id="uyu" class="me-2" value="uyu"></input><label for="uyu"> UYU</label></div>
                </div>
                <div>
                </div>
            </div>
            </div>
        </div>
    `;
		document.getElementById("carrito").innerHTML = contenido;

		let carrito = "";

		for (let i = 0; i < articulos.length; i++) {
			let element = articulos[i];
			let subtotal = element.unitCost;
			let precios = {
				id: element.id,
				cantidad: 1,
				precio: subtotal,
				moneda: element.currency,
			};

			total.push(precios);
			// if (element.currency == "USD") {
			// 	console.log(element.currency);
			carrito += `<tr class="borde-btm" id="compra_${i + 1}">
    <td class="tbImg"><img src="${element.image}" width="100px" class="my-2"></td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.unitCost}</td>
    <td><input type="number" id="inputCant_${i + 1}" value="${1}" class='cantidad' min="1"></input> </td>
    <td><b moneda="${element.currency}">${element.currency} <span id='subtotal_${i + 1}'>${subtotal}</span></b></td>
    <td class="dltCart" onclick="dltCart(${i})"><i class="fas fa-trash-alt"></i></i></td>
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
					sub.innerHTML = ` ${subtotales}`;
					console.log(parseInt(sub.innerText));
					total[i].cantidad = parseInt(inputCant.value);
					total[i].precio = subtotales;
					console.log(total);
				}
			});
		}
		console.log(total);
	}
};

const calcTotal = () => {
	let inputUY = uyu;

	let moneda = "USD";
	const dolar = 40.97;
	let precio = 0;
	// console.log(moneda);
	for (let i = 0; i < total.length; i++) {
		const element = total[i];
		if (element.moneda == "UYU") {
			console.log(element.moneda);
			precio += Math.ceil(element.precio / dolar);
			console.log(precio);
			// console.log("USD");
		} else {
			precio += element.precio;
		}
	}
	document.getElementById("total").innerHTML += `<b>${moneda} ${precio}</b> `;
};

document.addEventListener("DOMContentLoaded", () => {
	// console.log(articles);
	localStorage.getItem("carrito");

	verCarro();
	calcTotal();
});

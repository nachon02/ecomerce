let total = [];
let price = {
	moneda: "",
	precio: "",
};

let moneda = "USD";
const dltCart = (u) => {
	let dltcarro = JSON.parse(localStorage.getItem("carrito"));

	dltcarro.splice(u, 1);

	localStorage.setItem("carrito", JSON.stringify(dltcarro));

	location.reload();
	// verCarro();
};
function validaNumericos(event) {
	if (event.charCode >= 48 && event.charCode <= 57) {
		return true;
	}
	return false;
}
const verCarro = () => {
	let articulos = JSON.parse(localStorage.getItem("carrito"));
	// let articulo = articulos[0];

	if (!articulos[0]) {
		document.getElementById("carrito").innerHTML = `
            <div id="titulo" class=" mt-3 text-center">
            <h2 class="">Carrito de compras</h2>
            <p class="fs-4 mt-4 ">No hay productos</p>
                <a href="categories.html">Volver a comprar</a>
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
        <div class="mt-3 row justify-content-evenly">
        
            <div class="col-lg-3 col-md-6 col-12">
            <p class="fs-4 mt-4">Tipo de envío</p>
                <div class="mt-3">
                    <div class="p-2"><input type="radio" name="envio" onclick="calcTotal()" id="premium" class="me-2" value="15"></input><label for="premium"> Premium 2 a 5 días (15%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" onclick="calcTotal()" id="express" class="me-2" value="7"></input><label for="express"> Express 5 a 8 días (7%)</label></div>
                    <div class="p-2"><input type="radio" name="envio" onclick="calcTotal()" id="standar" class="me-2" value="5"></input><label for="standar"> Standar 12 a 15 días (5%)</label></div>
                </div>
            </div>
                
            <div class="col-lg-5 col-md-6 col-12  ">
                <p class="fs-4 mt-4">Dirección de envío</p> 
                <div class="row">
                    
                    <div class="mb-3 ">
                        <label for="calle" class="form-label">Calle</label>
                        <input type="text" required class="form-control" id="calle">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="esq" class="form-label">Esquina</label>
                        <input type="text" required class="form-control" id="esq">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="puerta" class="form-label">Número</label>
                        <input type="number" required class="form-control" id="puerta">
                    </div>
                </div>
            </div>
             <div id="total" class="pay px-3 col-lg-3 col-md-12 col-12">
				<p class="fs-4 mt-4 borde-btm">Compra</p>
				<div class="row">
					<div class="col-lg-4 col-6">
					<b>Moneda: </b>
						<div class=""><input type="radio" onclick="calcSubtotal()" name="total" id="usd" class="me-2" value="usd" checked></input><label for="usd"> USD
						</label></div>
						<div class=""><input type="radio" onclick="calcSubtotal()" name="total" id="uyu" class="me-2" value="uyu"></input><label for="uyu"> UYU</label>
						</div>
					</div>
					<div class="col">
						<b >Subtotal: </b> 
						<div class="row justify-content-between precio">
						<p class="col-3" id="moneda"></p><p class="col-7 " id="subtotal"></p> 
						</div>
						<div class="row">
						 <p class="col-6 fw-bold">Envio: </p> 
						</div>
						
						<div class="row mt-2">
						<p class="col precio" id="precioEnvio"></p>  
						</div>
						
					</div>
						
					<div>
                </div>
            </div>
			<div>
				<p class="fs-4  borde-btm">Total</p>
				<p id="precioTotal" class="fw-bold precio">Seleccione el tipo de envio</p>
				
			</div>
			

			<div class="modal fade" id="payForm" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header borde-btm">
					<h5 class="modal-title fw-bold" id="exampleModalLabel">Forma de pago</h5>
					
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

				</div>
				<div class="modal-body container">
					<form class="row g-3 needs-validation container" novalidate>
					<div class="form-check">
							<input class="form-check-input" type="radio" name="payMetod" id="cardMetod" value="creditCard">
							<label class="form-check-label" for="cardMetod">
							Tarjeta de crédito
							</label>
						</div>
						<hr>
						<div class="col-md-8"> <label class="form-label" for="cardNumber">Número de tarjeta</label>
							<input type="text" disabled class="form-control" id="cardNumber" placeholder="---- ---- ---- ----" onkeypress="return validaNumericos(event)" maxlength="16" required>
							
							<div class="invalid-feedback">
							Tarjeta no valida...
							</div>
						</div>
						<div class="col-md-4"> <label class="form-label" for="cardCode">Código de seg</label>
							<input type="text" disabled class="form-control" id="cardCode" maxlength="3" placeholder="---" onkeypress="return validaNumericos(event)"  required>
							
							<div class="invalid-feedback">
							Codigo de seguiridad invalido...
							</div>
						</div>
						<div class="col-md-6">
							<label class="form-label" for="cardExpMonth">Vencimiento (MM/AA)</label>
								<div class="input-group mb-3">	
									<input type="text" disabled class="form-control" id="cardExpMonth" placeholder="Mes" value=""  maxlength="2" onkeypress="return validaNumericos(event)" required>
									<span class="input-group-text">/</span>
									<input type="text" class="form-control" id="cardExpYear" placeholder="Año" disabled  maxlength="2" onkeypress="return validaNumericos(event)" required>
									
									<div class="invalid-feedback">
										Fecha de vencimiento invalida.
									</div>
							</div>
						</div>


						
						

						<div class="form-check mb-3">
							<input type="radio" class="form-check-input" id="bankMetod" name="payMetod" required>
							<label class="form-check-label" for="bankMetod">Transferencia bancaria</label>
							<div class="invalid-feedback">More example invalid feedback text</div>
						</div>
						<hr>
						<div class="col-md-8"> <label class="form-label" for="bankNumber">Número de cuenta</label>
							<input type="text" disabled class="form-control" id="bankNumber"  placeholder="---- ---- ---- ---- ----" maxlength="20" onkeypress="return validaNumericos(event)" required>
							
							<div class="invalid-feedback">
							Numero de cuenta invalido...
							</div>
						</div>
						</form>
										</div>
							<div class="modal-footer">
								
								<button class="btn btn-secondary" type="submit" id="modalReset" disabled >Nuevo metodo</button>
								<button class="btn btn-primary" type="submit" id="modalSave" disabled >Guardar</button>
								</div>
								
							</div>
						</div>
						</div>
				<div class="pb-3">
				<p class="fs-4 borde-btm">Forma de pago</p>
				<b class="mb-0" id="payB"></b><span id="paySpan" class="fst-italic">No ha seleccionado </span> <a href="#" id="paySelectButton" type="submit" class="link-primary" data-bs-toggle="modal" data-bs-target="#payForm"> Seleccionar </a> <a href="#" id="payDeleteButton"  class="link-danger" > Quitar </a>
				
            </div>
			<button type="submit" id="buyButton"class="btn btn-primary w-100 mb-3"> Finalizar compra </button>
            </div>
			
        </div>
    `;

		document.getElementById("carrito").innerHTML = contenido;
		const payObj = JSON.parse(localStorage.getItem("payMetod"));

		// paySelectButton.click(); //quitar luego

		const payForm = document.getElementById("payForm");

		const radioCredit = document.getElementById("cardMetod");
		const radioBank = document.getElementById("bankMetod");
		const inputCardN = document.getElementById("cardNumber");
		const inputCardCode = document.getElementById("cardCode");
		const inputCardExpM = document.getElementById("cardExpMonth");
		const inputCardExpY = document.getElementById("cardExpYear");
		const modalSave = document.getElementById("modalSave");
		const modalReset = document.getElementById("modalReset");
		const inputBankN = document.getElementById("bankNumber");
		let inputsPay = payForm.getElementsByTagName("input");
		const deletePay = document.getElementById("payDeleteButton");
		const buyButton = document.getElementById("buyButton");

		deletePay.addEventListener("click", function () {
			localStorage.removeItem("payMetod");
			location.reload();
		});
		const userPaymetod = {
			user: localStorage.getItem("email"),
			account: "",
			card: "",
		};

		function clearInput(id) {
			const elemento = document.getElementById(id);
			elemento.classList.remove("is-invalid");
			elemento.classList.remove("is-valid");

			elemento.value = "";
		}

		function swapInputDisabled(element_id) {
			const estado = document.getElementById(element_id).disabled;
			document.getElementById(element_id).disabled = !estado;
		}
		function disableInput(element_id) {
			document.getElementById(element_id).disabled = true;
		}
		function enableInput(element_id) {
			document.getElementById(element_id).disabled = false;
		}

		function showPayInfo() {
			if (payObj) {
				let paySpan = document.getElementById("paySpan");
				let payB = document.getElementById("payB");
				// disableInput("radioBank");
				// disableInput("radioCredit");

				for (let i = 0; i < inputsPay.length; i++) {
					const input = inputsPay[i];
					input.disabled = true;
				}
				modalReset.disabled = false;
				console.log(payObj.account || payObj.card);

				paySpan.textContent = `${payObj.account || payObj.card}`;
				if (payObj.account) {
					payB.textContent = `Nro de cuenta: `;
				} else if (payObj.card) {
					payB.textContent = `Nro de tarjeta: `;
				}
			} else {
				modalReset.disabled = true;
			}
		}
		showPayInfo();

		modalReset.addEventListener("click", function () {
			modalReset.disabled = true;
			localStorage.removeItem("payMetod");
			for (let i = 0; i < inputsPay.length; i++) {
				const input = inputsPay[i];
				input.disabled = false;
			}
			// showPayInfo();
		});

		let enabledB = false;
		let enabledC = false;
		radioCredit.addEventListener("click", () => {
			if (!enabledC) {
				enabledC = true;
				enabledB = false;
				disableInput("bankNumber");
				disableInput("cardNumber");
				disableInput("cardCode");
				disableInput("cardExpMonth");
				disableInput("cardExpYear");

				swapInputDisabled("cardNumber");
				swapInputDisabled("cardCode");
				swapInputDisabled("cardExpMonth");
				swapInputDisabled("cardExpYear");

				clearInput("bankNumber");
				enableInput("modalSave");
			}
		});

		radioBank.addEventListener("click", () => {
			if (!enabledB) {
				enabledB = true;
				enabledC = false;
				enableInput("bankNumber");
				disableInput("cardNumber");
				disableInput("cardCode");
				disableInput("cardExpMonth");
				disableInput("cardExpYear");

				clearInput("cardNumber");
				clearInput("cardCode");
				clearInput("cardExpMonth");
				clearInput("cardExpYear");

				enableInput("modalSave");
			}
		});
		// radioBank.click(); //quitar luego
		// radioCredit.click();

		function validInput(id, c = "correcto") {
			let valid = "is-valid";
			let invalid = "is-invalid";

			const inp = document.getElementById(id);
			const inpValue = document.getElementById(id).value;

			if (!inp.disabled) {
				if (c == "error") {
					inp.classList.remove(valid);
					inp.classList.add(invalid);
				} else {
					inp.classList.add(valid);
					inp.classList.remove(invalid);
				}
			}
		}

		modalSave.addEventListener("click", (e) => {
			e.preventDefault();
			let nGc = 0;
			let nGb = 0;
			let greatCard = false;
			let greatBank = false;

			if (inputCardN.value.length < 16) {
				validInput("cardNumber", "error");
			} else {
				validInput("cardNumber");
				nGc += 1;
			}
			if (inputCardCode.value.length < 3) {
				validInput("cardCode", "error");
			} else {
				validInput("cardCode");
				nGc += 1;
			}
			if (inputCardExpM.value.length < 2 || inputCardExpM.value > 12) {
				validInput("cardExpMonth", "error");
			} else {
				validInput("cardExpMonth");
				nGc += 1;
			}
			if (inputCardExpY.value.length < 2 || inputCardExpY.value < 22) {
				validInput("cardExpYear", "error");
			} else {
				validInput("cardExpYear");
				nGc += 1;
			}

			//

			if (inputBankN.value.length < 20) {
				validInput("bankNumber", "error");
			} else {
				validInput("bankNumber");
				greatBank = true;
			}

			if (nGc === 4) {
				greatCard = true;
			}

			if (greatBank) {
				userPaymetod.account = inputBankN.value;
				console.log(userPaymetod);

				localStorage.setItem("payMetod", JSON.stringify(userPaymetod));
			}
			if (greatCard) {
				userPaymetod.card = inputCardN.value;
				userPaymetod.exipration = `${inputCardExpM.value}/20${inputCardExpY.value}`;
				// userPaymetod.cvv = inputCardCode.value;
				console.log(userPaymetod);

				localStorage.setItem("payMetod", JSON.stringify(userPaymetod));
			}

			if (greatCard || greatBank) {
				let alert = document.createElement("div");
				alert.setAttribute("id", "payMetodSuccess");
				alert.setAttribute("role", "alert");
				alert.classList.add("text-center");
				alert.classList.add("alert");
				alert.classList.add("alert-success");
				alert.classList.add("hide");
				alert.textContent = "El metodo de pago fue agregado correctamente";
				document.getElementById("alerts").appendChild(alert);
				alert.classList.remove("hide");
				setTimeout(function () {
					alert.classList.add("hide");
				}, 3000);

				let modal = bootstrap.Modal.getInstance(payForm);
				modal.hide();

				disableInput("cardMetod");
				disableInput("bankMetod");
				disableInput("modalSave");
				// inputsPay[inputsPay.length - 1].readOnly = true;

				for (let i = 0; i < inputsPay.length; i++) {
					const input = inputsPay[i];
					input.readOnly = true;
				}
				console.log(inputsPay);

				location.reload();
				// showPayInfo();
				// console.log(alert);
			}
		});

		buyButton.addEventListener("click", function () {
			if (
				(payObj.account || payObj.card) &&
				(document.getElementById("premium").checked ||
					document.getElementById("express").checked ||
					document.getElementById("standar").checked) &&
				document.getElementById("calle").value != "" &&
				document.getElementById("esq").value != "" &&
				document.getElementById("calle").value != ""
			) {
				console.log("fin compra");
				let buyAlert = document.createElement("div");
				buyAlert.setAttribute("id", "payMetodSuccess");
				buyAlert.setAttribute("role", "alert");
				buyAlert.classList.add("text-center");
				buyAlert.classList.add("alert");
				buyAlert.classList.add("alert-success");
				buyAlert.classList.add("hide");
				buyAlert.textContent = "Felicitaciones! La compra ha sido realizada correctamente";
				document.getElementById("alerts").appendChild(buyAlert);
				buyAlert.classList.remove("hide");
				setTimeout(function () {
					buyAlert.classList.add("hide");
				}, 3000);
			}
		});

		let carrito = "";

		for (let i = 0; i < articulos.length; i++) {
			let element = articulos[i];
			let subtotal = element.unitCost;
			let precios = {
				id: element.id,
				cantidad: element.count,
				precio: subtotal,
				moneda: element.currency,
			};

			total.push(precios);
			// if (element.currency == "USD") {
			// 	urrency);
			carrito += `<tr class="borde-btm" id="compra_${i + 1}">
    <td class="tbImg"><img src="${element.image}" width="100px" class="my-2"></td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.unitCost}</td>
    <td><input type="number" id="inputCant_${i + 1}" value="${
				element.count
			}" onclick="calcSubtotal()" class='cantidad' min="1"></input> </td>
    <td><b moneda="${element.currency}">${element.currency} <span id='subtotal_${i + 1}'>${
				subtotal * element.count
			}</span></b></td>
    <td class="dltCart" onclick="dltCart(${i})"><i class="fas fa-trash-alt"></i></i></td>
  </tr>`;
		}

		document.getElementById("carritoInfo").innerHTML += carrito;

		for (let i = 0; i < articulos.length; i++) {
			let p = articulos[i];
			let inputCant = document.getElementById("inputCant_" + (i + 1));
			let sub = document.getElementById("subtotal_" + (i + 1));

			subtotales = parseInt(inputCant.value * p.unitCost);
			sub.innerHTML = ` ${subtotales}`;
			total[i].cantidad = parseInt(inputCant.value);
			total[i].precio = subtotales;

			inputCant.addEventListener("input", () => {
				if (inputCant.value >= 1) {
					subtotales = parseInt(inputCant.value * p.unitCost);
					sub.innerHTML = ` ${subtotales}`;
					total[i].cantidad = parseInt(inputCant.value);
					total[i].precio = subtotales;
				}
			});
		}
	}
	calcSubtotal();
};

function calcSubtotal() {
	const dolar = 40.97;
	let precio = 0;
	let precioUSD = 0;
	let moneda;
	let tipo;
	// if (n == 0) {
	// 	precioUSD = 0;
	// }
	document.getElementById("subtotal").innerText = "";
	if (document.getElementById("uyu").checked) {
		moneda = "UYU";
		for (let i = 0; i < total.length; i++) {
			const element = total[i];
			tipo = element.moneda;

			if (tipo == "UYU") {
				precioUSD += element.precio;
			} else {
				precio += element.precio * dolar;
				precioUSD += precio;
			}
		}
	}
	if (document.getElementById("usd").checked) {
		moneda = "USD";
		for (let i = 0; i < total.length; i++) {
			const element = total[i];
			tipo = element.moneda;

			if (tipo == "USD") {
				precioUSD += element.precio;
			} else {
				precio += element.precio / dolar;
				precioUSD += precio;
			}
		}
	}

	document.getElementById("moneda").innerText = `${moneda}`;
	document.getElementById("subtotal").innerText = `${precioUSD.toFixed(2)}`;
	price.moneda = moneda;
	price.precio = precioUSD;
	calcTotal(moneda);
}

function calcTotal(m) {
	let envio;
	let precioTotal = document.getElementById("precioTotal");
	let precioEnvio = document.getElementById("precioEnvio");
	if (document.getElementById("premium").checked) {
		envio = price.precio * 0.15;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		// console.log(envio);
		precioTotal.innerHTML = "";
		// document.getElementById("env").innerText = "15%";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (15%)`;
	}
	if (document.getElementById("express").checked) {
		// total = price + envio;

		envio = price.precio * 0.07;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		precioTotal.innerHTML = "";
		// document.getElementById("env").innerText = "7%";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (7%)`;
	}
	if (document.getElementById("standar").checked) {
		// total = price + envio;

		envio = price.precio * 0.05;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		precioTotal.innerHTML = "";
		// document.getElementById("env").innerText = "5%";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (5%)`;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	localStorage.getItem("carrito");
	verCarro();
	calcSubtotal();
});

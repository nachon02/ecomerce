let total = [];
let price = {
	moneda: "",
	precio: "",
};

let moneda = "USD";
const dltCart = (u) => {
	let dltcarro = JSON.parse(localStorage.getItem("cart"));

	dltcarro.splice(u, 1);

	localStorage.setItem("cart", JSON.stringify(dltcarro));

	location.reload();
};

const verCarro = () => {
	let articles = JSON.parse(localStorage.getItem("cart"));
	if (!articles[0]) {
		document.getElementById("carrito").classList.add("text-center");

		document.getElementById("carrito").innerHTML = `
            <div id="titulo" class=" mt-3 text-center"></div>
            <h2 class="">Carrito de compras</h2>
            <p class="fs-4 mt-4 ">No hay productos</p>
                <a href="categories.html">Volver a comprar</a>
        </div>
        `;
	} else {
		let content = "";

		content = `
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
        <div class="mt-3 row justify-content-between pay">
        
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
						
						<div class="invalid-feedback">
							Ingresa una calle.
							</div>
                    </div>
                    <div class="mb-3 col-6">
                        <label for="esq" class="form-label">Esquina</label>
                        <input type="text" required class="form-control" id="esq">
						
						<div class="invalid-feedback">
							Ingresa una esquina.
							</div>
                    </div>
                    <div class="mb-3 col-6">
                        <label for="puerta" class="form-label">Número</label>
                        <input type="text" required class="form-control" id="puerta">
						
						<div class="invalid-feedback">
							Ingresa un número.
							</div>
                    </div>
                </div>
            </div>
             <div id="total" class=" px-3 col-lg-3 col-md-12 col-12">
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
								
								
								<button class="btn btn-primary" type="submit" id="modalSave" disabled >Guardar</button>
								</div>
								
							</div>
						</div>
						</div>
				<div class="pb-3">
				<p class="fs-4 borde-btm">Forma de pago</p>
				<b class="mb-0" id="payB">No ha seleccionado </b><span id="paySpan" class="fst-italic"></span> <a href="#" id="paySelectButton" type="submit" class="link-primary" data-bs-toggle="modal" data-bs-target="#payForm"> Seleccionar </a> <a href="#" id="payDeleteButton"  class="link-danger" > Quitar </a>
				<div id="payMetodError" class="invalid-feedback">
										Debe seleccionar una forma de pago.
									</div>
            </div>
			<button type="submit" id="buyButton"class="btn btn-primary w-100 mb-3"> Finalizar compra </button>
            </div>
			
        </div>
    `;

		document.getElementById("carrito").innerHTML = content;

		validModal();

		let carrito = "";

		for (let i = 0; i < articles.length; i++) {
			let element = articles[i];
			let subtotal = element.unitCost;
			let precios = {
				id: element.id,
				cantidad: element.count,
				precio: subtotal,
				moneda: element.currency,
			};

			total.push(precios);
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
    <td class="" onclick="dltCart(${i})"><i class="dltCart fas fa-trash-alt"></i></i></td>
  </tr>`;
		}

		document.getElementById("carritoInfo").innerHTML += carrito;

		for (let i = 0; i < articles.length; i++) {
			let p = articles[i];
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

const calcSubtotal = () => {
	const dolar = 40;
	let precio = 0;
	let precioUSD = 0;
	let moneda;
	let tipo;
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
};

const calcTotal = (m) => {
	let envio;
	let precioTotal = document.getElementById("precioTotal");
	let precioEnvio = document.getElementById("precioEnvio");
	if (document.getElementById("premium").checked) {
		precioTotal.classList.remove("invalid-feedback");
		envio = price.precio * 0.15;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		precioTotal.innerHTML = "";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (15%)`;
	}
	if (document.getElementById("express").checked) {
		precioTotal.classList.remove("invalid-feedback");
		envio = price.precio * 0.07;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		precioTotal.innerHTML = "";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (7%)`;
	}
	if (document.getElementById("standar").checked) {
		precioTotal.classList.remove("invalid-feedback");

		envio = price.precio * 0.05;
		priceTotal = (parseInt(price.precio) + parseInt(envio)).toFixed(2);
		precioTotal.innerHTML = "";
		precioTotal.innerHTML = `
		<p id="precioTotal" class="fw-bold"> ${price.moneda}
		${priceTotal}
		</p>
		`;
		precioEnvio.innerHTML = `${price.moneda} ${envio.toFixed(2)} (5%)`;
	}
};

const validModal = () => {
	let payObj = JSON.parse(localStorage.getItem("payMetod"));
	let userLtion = JSON.parse(localStorage.getItem("userLocation"));

	const calle = document.getElementById("calle");
	const esq = document.getElementById("esq");
	const puerta = document.getElementById("puerta");

	const payForm = document.getElementById("payForm");
	const radioCredit = document.getElementById("cardMetod");
	const radioBank = document.getElementById("bankMetod");
	const inputCardN = document.getElementById("cardNumber");
	const inputCardCode = document.getElementById("cardCode");
	const inputCardExpM = document.getElementById("cardExpMonth");
	const inputCardExpY = document.getElementById("cardExpYear");
	const modalSave = document.getElementById("modalSave");
	const inputBankN = document.getElementById("bankNumber");
	const deletePay = document.getElementById("payDeleteButton");
	const buyButton = document.getElementById("buyButton");

	const paySpan = document.getElementById("paySpan");
	const payB = document.getElementById("payB");
	let inputsPay = payForm.getElementsByTagName("input");

	deletePay.addEventListener("click", function () {
		if (localStorage.getItem("payMetod")) {
			localStorage.removeItem("payMetod");
			createAlert("deletePayMetod", "El metodo de pago se ha eliminado correctamente.", "alerts", 3000, "danger");
			setTimeout(() => {
				location.reload();
			}, 1500);
		} else {
			createAlert(
				"notPayMetod",
				"No hay metodo de pago ha eliminar, por favor seleccione uno",
				"alerts",
				3000,
				"warning"
			);
		}
	});
	const userPaymetod = {
		user: localStorage.getItem("email"),
		account: "",
		card: "",
	};
	const userLocation = {
		user: localStorage.getItem("email"),
		calle: "",
		puerta: "",
		esq: "",
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

	function showUserLocation() {
		if (userLtion) {
			calle.value = `${userLtion.calle}`;
			esq.value = `${userLtion.esq}`;

			puerta.value = `${userLtion.puerta}`;
		}
	}

	showUserLocation();

	function showPayInfo() {
		if (payObj) {
			for (let i = 0; i < inputsPay.length; i++) {
				const input = inputsPay[i];
				input.disabled = true;
			}
			console.log(payObj.account || payObj.card);

			paySpan.textContent = `${payObj.account || payObj.card}`;
			if (payObj.account) {
				payB.textContent = `Nro de cuenta: `;
			} else if (payObj.card) {
				payB.textContent = `Nro de tarjeta: `;
			}
		}
	}

	showPayInfo();

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

	function validInput(id, c = "correcto") {
		let valid = "is-valid";
		let invalid = "is-invalid";

		const inp = document.getElementById(id);

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
	function createAlert(id, msg, container, time = 3000, type = "success") {
		let alerta = document.createElement("div");
		alerta.setAttribute("id", id);
		alerta.setAttribute("role", "alert");
		alerta.classList.add("text-center");
		alerta.classList.add("alert");
		alerta.classList.add(`alert-${type}`);
		alerta.classList.add("hide");
		alerta.textContent = msg;
		document.getElementById(container).appendChild(alerta);
		alerta.classList.remove("hide");
		setTimeout(function () {
			alerta.classList.add("hide");
		}, time);
	}

	modalSave.addEventListener("click", (e) => {
		payObj = JSON.parse(localStorage.getItem("payMetod"));

		e.preventDefault();
		showPayInfo();
		let nGc = 0;
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
			payB.textContent = "Nro de Cuenta: ";
			paySpan.textContent = inputBankN.value;
			document.getElementById("payMetodError").classList.remove("d-block");
		}
		if (greatCard) {
			userPaymetod.card = inputCardN.value;
			userPaymetod.exipration = `${inputCardExpM.value}/20${inputCardExpY.value}`;

			console.log(userPaymetod);

			localStorage.setItem("payMetod", JSON.stringify(userPaymetod));
			payB.textContent = "Nro de Tarjeta: ";
			paySpan.textContent = inputCardN.value;
			document.getElementById("payMetodError").classList.remove("d-block");
		}

		if (greatCard || greatBank) {
			createAlert("payMetodSuccess", "El metodo de pago fue agregado correctamente", "alerts");

			let modal = bootstrap.Modal.getInstance(payForm);
			modal.hide();

			disableInput("cardMetod");
			disableInput("bankMetod");
			disableInput("modalSave");

			showPayInfo();

			for (let i = 0; i < inputsPay.length; i++) {
				const input = inputsPay[i];
				input.readOnly = true;
			}
		}
	});

	buyButton.addEventListener("click", function () {
		let buyOK = false;
		let okCount = 0;
		payObj = JSON.parse(localStorage.getItem("payMetod"));

		if (payObj) {
			document.getElementById("payMetodError").classList.remove("d-block");

			okCount++;
		} else {
			document.getElementById("payMetodError").classList.add("d-block");
		}
		if (
			document.getElementById("premium").checked ||
			document.getElementById("express").checked ||
			document.getElementById("standar").checked
		) {
			okCount++;
			let pTotal = document.getElementById("precioTotal");

			pTotal.classList.remove("invalid-feedback", "d-block");
			pTotal.classList.add("fw-bold");
		} else {
			let pTotal = document.getElementById("precioTotal");

			pTotal.classList.add("invalid-feedback", "d-block");
			pTotal.classList.remove("fw-bold");
		}

		if (calle.value != "") {
			calle.classList.remove("is-invalid");
			calle.classList.add("is-valid");
			okCount++;

			userLocation.calle = calle.value;
		} else {
			calle.classList.remove("is-valid");

			calle.classList.add("is-invalid");
		}
		if (esq.value != "") {
			esq.classList.remove("is-invalid");
			esq.classList.add("is-valid");
			okCount++;
			userLocation.esq = esq.value;
		} else {
			esq.classList.remove("is-valid");
			esq.classList.add("is-invalid");
		}
		if (puerta.value != "") {
			puerta.classList.remove("is-invalid");
			puerta.classList.add("is-valid");
			okCount++;
			userLocation.puerta = puerta.value;
		} else {
			puerta.classList.remove("is-valid");
			puerta.classList.add("is-invalid");
		}
		if (okCount === 5) {
			createAlert("buyGreat", "La compra ha sido concretada con exito, Felicitaciones!", "alerts");
			localStorage.setItem("userLocation", JSON.stringify(userLocation));
		} else {
			console.log("Completar los datos requieridos");
		}
	});
};

document.addEventListener("DOMContentLoaded", () => {
	localStorage.getItem("cart");
	verCarro();
	calcSubtotal();
});

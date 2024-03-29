let estrellaCom = "";
let max = undefined;
let min = undefined;
let carro = JSON.parse(localStorage.getItem("cart"));
let avgStars;
let countComm = 0;

let comentariosArray = [];
let infoP = {
	id: "",
	name: "",
	count: 1,
	unitCost: "",
	currency: "",
	image: "",
};
// guarda en el LS el id del producto y redirecciona a product info, usada en prodctos relacionados
function setProdID(id) {
	localStorage.setItem("prodID", id);
	window.location = "product-info.html";
}

function addCart(id) {
	let existe = false;

	for (let i = 0; i < carro.length; i++) {
		const p = carro[i];
		if (id == p.id) {
			existe = true;
		}
	}

	if (!existe) {
		infoP.count = document.getElementById("cantidad").value;
		carro.push(infoP);
		// localStorage.setItem("cart", carro);
		console.log(carro);

		localStorage.setItem("cart", JSON.stringify(carro));
		console.log("Se agrego al carrito");
		document.getElementById("sucssCart").classList.remove("hide");

		setTimeout(function () {
			document.getElementById("sucssCart").classList.add("hide");
		}, 3000);
	} else {
		document.getElementById("alreadyCart").classList.remove("hide");
		setTimeout(function () {
			document.getElementById("alreadyCart").classList.add("hide");
		}, 3000);
	}
}

//agrego imagenes al carrusel
function carruselImg() {
	let content = "";
	for (let i = 0; i < infoProd.images.length; i++) {
		let imagen = infoProd.images[i];
		if (i == 0) {
			content += `
        <div class="carousel-item active">
            <div class="d-flex justify-content-center">
                <a href='${imagen}' target='_blank'>
                    <img src="${imagen}" class=" cursor-active" alt="Imagen de ${infoProd.name} ${1}">
                </a>
            </div>
        </div>
        `;
		} else {
			content += `
        <div class="carousel-item">
            <div class="d-flex justify-content-center">
                <a href='${imagen}' target='_blank'>
                    <img src="${imagen}" class=" cursor-active" alt="Imagen de ${infoProd.name} ${i + 1}">
                </a>
            </div>
        </div>
        `;
		}
	}
	return content;
}
function carruselBtn() {
	// console.log(infoProd.images.length);
	let buttons = "";
	for (let i = 0; i < infoProd.images.length; i++) {
		let imagen = infoProd.images[i];
		if (i == 0) {
			buttons += `
        
		<img src="${imagen}" data-bs-target="#prodCarousel" data-bs-slide-to="0"
            aria-label="Slide 1" class="img-car img-thumbnail img-car__active" aria-current="true" alt="Imagen de ${infoProd.name} ${i}"></img>
        `;
		} else {
			buttons += `

			<img src="${imagen}" data-bs-target="#prodCarousel" data-bs-slide-to="${i}"
            aria-label="Slide ${i + 1}" class="img-car img-thumbnail" aria-current="true" alt="Imagen de ${
				infoProd.name
			} ${i + 1}"></img>
        `;
		}
	}
	return buttons;
}

function carrusel() {
	let carrusel = "";

	carrusel +=
		`
		<div class="row">
			<div class="col-12">
				<div class='d-flex justify-content-center'>
						<div id="prodCarousel" class="carousel carousel-dark slide container border rounded w-100" data-bs-ride="true">
							
							<div id='carousel_images'class="carousel-inner">

							` +
		carruselImg() +
		`
							
						</div>
						<button class="carousel-control-prev" type="button" data-bs-target="#prodCarousel" data-bs-slide="prev">
							<span class="carousel-control-prev-icon flechas" aria-hidden="true"></span>
							<span class="visually-hidden">Previous</span>
						</button>
						<button class="carousel-control-next" type="button" data-bs-target="#prodCarousel" data-bs-slide="next">
							<span class="carousel-control-next-icon flechas" aria-hidden="true"></span>
							<span class="visually-hidden">Next</span>
						</button>
					</div>
				</div>
				</div>
		</div>
    `;
	document.getElementById("images").innerHTML += carrusel;
}

// obtiene info del getJsonData y la muestra en la pagina
function showProducts() {
	infoP.id = parseInt(infoProd.id);
	infoP.unitCost = parseInt(infoProd.cost);
	infoP.name = infoProd.name;
	infoP.image = infoProd.images[0];
	infoP.currency = infoProd.currency;
	// infoP.count = parseInt(infoProd.soldCount);

	let info = "";
	let imagenes = "";
	if (infoProd.name != "") {
		info +=
			`

        <div class="row row-cols-1 row-cols-sm-2 text-center text-md-start p-3 bg-white border rounded">
		<div class="col-12 col-xl-2 order-2 order-xl-first border d-md-flex d-none rounded align-items-center mt-2">` +
			carruselBtn() +
			`</div>
		
			<div id="images" class="col-12 col-xl-7 order-1 mt-2">        
			</div>

			<div class="col-12 col-xl-3 container border rounded py-3 order-3 mt-2">
				<div class="row">
					<small class="text-muted">
					<a class="link-dark" href="products.html">
					${infoProd.category}</a> | ${infoProd.soldCount} vendidos </small>
				</div>
				<div class="row">
					<h1 class="borde-btm fs-3">${infoProd.name}</h1>
				</div>
			
			
			
			<p class="fs-2 lh-3">${infoProd.currency} ${infoProd.cost}</p>
			<p class="fs-5">Descripcion: </p>
				<p>${infoProd.description}</p>` +
			//  <b>Vendidos: </b>

			// <button type="button" class="btn btn-primary" onclick="addCart(${infoProd.id})">Comprar</button>
			// <a href="cart.html" class="btn btn-dark" onclick="goToCart()"><i class="fas fa-shopping-cart"></i></a>

			`
			<div class="col">
			
			<div class=" mb-3 ">

			<label for="cantidad" class="form-label">Cantidad:</label>
                        
				<input type="number" class="form-control" placeholder="Cantidad" id="cantidad" value="1" min="1">
			
			</div>
			<div class="mt-3 row justify-content-evenly">
				
					<button class="btn btn-primary col-xl-5 col-11 gap-2" type="button" id="btn-buy" onclick="addCart(${infoProd.id})">Comprar</button>
				
				
					<a href="cart.html" class="btn btn btn-cart col-xl-6 col-11 mt-2 mt-xl-0" >Ver Carrito<i class="fas fa-shopping-cart"></i></a>
				
			</div>

			</div>
			
		
			</div>
			
		</div>
        
        

        <div id="comentFilter" class="row">        
        </div>
    `;

		document.getElementById("info_container").innerHTML = info;
		carrusel();

		for (let i = 0; i < infoProd.relatedProducts.length; i++) {
			let rel = infoProd.relatedProducts[i];

			document.getElementById("productos_relacionados").innerHTML += `
            <div class="prod-related col-xl-5 col-12 cursor-active border rounded pb-2 mb-3 bg-white" onclick="setProdID(${rel.id})">
            <p class="bold">${rel.name}</p>
            <img class="p-0 img-thumbnail"src="${rel.image}" alt="Imagen de ${rel.name}"/>
            </div>
            
           
    `;
		}

		let commentsFilter = `<div class='d-flex justify-content-between mt-4 
flex-column flex-xl-row align-items-center'> <p class="fs-4">Comentarios</p>
    <div
                id="filtros"
                class="mr-2"
            >
                <div class="row">
                    <div class="col text-end">
                        <div
                            class="btn-group btn-group-toggle"
                            data-bs-toggle="buttons">
                                <input
                                    type="radio"
                                    class="btn-check"
                                    name="comFilter"
                                    id="todos" onclick="filtroCom('todos')"
                                />
                                <label
                                    class="btn btn-light text-dark border border-secondary"
                                    for="todos"
                                    >Todos</label>
                                <input
                                    type="radio"
                                    class="btn-check"
                                    name="comFilter"
                                    id="positivo" onclick="filtroCom('pos')"
                                />
                                <label
                                    class="btn btn-light bg-success text-light border border-secondary"
                                    for="positivo"
                                    >Positivos</label>
                                <input
                                    type="radio"
                                    class="btn-check"
                                    name="comFilter"
                                    id="negativo" onclick="filtroCom('neg')"
                                />
                                <label
                                    class="btn btn-light bg-danger text-light border border-secondary"
                                    for="negativo"
                                    >Negativos</label>
                            
                        </div>
                    </div>
                </div>
            </div>
    </div>
        `;
		document.getElementById("comentFilter").innerHTML = commentsFilter;
	}
}
// bucle de 5 que dependiendo si el parametro es mayor a i agrega la clase checked o no
function verEstrellas(numero) {
	let puntuacion = "";

	for (let i = 1; i <= 5; i++) {
		if (i <= numero) {
			puntuacion += `<i class="fa fa-star checked"></i>`;
		} else {
			puntuacion += `<i class="fa fa-star"></i>`;
		}
	}
	return puntuacion;
}

function filtroCom(o) {
	switch (o) {
		case "todos":
			min = undefined;
			max = undefined;
			showComments();

			break;

		case "neg":
			min = undefined;
			max = 2;
			showComments();

			break;

		case "pos":
			min = 3;
			showComments();
			break;
	}
}

// bucle que muestra los comentarios obtenidos con getJSONData
function showComments() {
	document.getElementById("comments").innerHTML = "";
	comentariosArray = comProd;
	console.log(comentariosArray);
	countComm = comentariosArray.length;
	let starss = 0;

	for (let i = 0; i < comProd.length; i++) {
		let comentario = comProd[i];

		// countComm++;
		starss += comentario.score;
		if (
			((max == undefined || (max != undefined && parseInt(comentario.score) <= max)) && min == undefined) ||
			(min != undefined && parseInt(comentario.score) >= min)
		) {
			let comments =
				`
    
    <div class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold col">${comentario.user}</p>
        
                
        </div>    
        <div class="row">
            <p class="col-12 col-lg-10">${comentario.description} </p> 
            
            
            <div class="col-12 text-end">
			<span class="lighter col-3 text-end"> ${comentario.dateTime}</span>` +
				verEstrellas(comentario.score) +
				`</div>
         </div>
    </div>
        
    `;

			document.getElementById("comments").innerHTML += comments;
		}
	}
	avgStars = starss / countComm;
	console.log(avgStars);
}

document.getElementById("nuevoComentario").innerHTML = `
    <b class="mt-5">Escriba su comentario</b>
    <form>
        <div id="agregar_com" class="form-group">
            
            <label id="label_opinion"for="opinion" class="mt-3">Tu opinión:</label>
            <textarea class="form-control" id="opinion" rows="3" placeholder="Escriba su comentario"></textarea>
            <p class="m-0 mt-3" id="puntuacion">Tu puntuación:</p>
            <div class="bold diselect">
                <i id="estrella1" class="fa fa-star cursor-active estrella" onclick="puntuar(1)"></i>
                <i id="estrella2" class="fa fa-star cursor-active estrella" onclick="puntuar(2)"></i>
                <i id="estrella3" class="fa fa-star cursor-active estrella" onclick="puntuar(3)"></i>
                <i id="estrella4" class="fa fa-star cursor-active estrella" onclick="puntuar(4)"></i>
                <i id="estrella5" class="fa fa-star cursor-active estrella" onclick="puntuar(5)"></i>
            </div>
        
        
            <input id="comentar" type="button" class="btn btn-primary mt-3" value="Comentar" onclick="addComent()"></input>
        </div>
    </form>
    `;
document.getElementById("opinion").addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		addComent();
	}
});
//funcion que depenedieno del parametro agrega n cantidad de veces la clase checked
function puntuar(n) {
	estrellaCom = n;

	for (let i = 1; i <= n; i++) {
		if (i <= n) {
			document.getElementById(`estrella${i}`).classList.add("checked");
		}
	}
	for (let i = 1; i <= 5; i++) {
		if (i > n && document.getElementById(`estrella${i}`).classList.contains("checked")) {
			document.getElementById(`estrella${i}`).classList.remove("checked");
		}
	}
}

// ordenar y filtrar

// funcion que agrega comentario del usuario
function addComent() {
	console.log(comentariosArray);
	let opinion = document.getElementById("opinion").value;

	let stars = estrellaCom;
	let newComent = "";
	let user = JSON.parse(localStorage.getItem("userInfo")).email;
	let o = undefined;
	let s = undefined;
	let ok = undefined;

	if (opinion != "") {
		document.getElementById("opinion").classList.remove("is-invalid");
		document.getElementById("label_opinion").innerText = "Tu opinion:";
		document.getElementById("label_opinion").style.color = "";
		o = true;
	} else {
		document.getElementById("opinion").classList.add("is-invalid");
		document.getElementById("label_opinion").innerText = "Debe ingresar un comentario: ";
		document.getElementById("label_opinion").style.color = "#dc3545";
		o = false;
	}
	if (stars != "") {
		document.getElementById("puntuacion").innerText = "Tu puntuación:";
		document.getElementById("puntuacion").style.color = "";
		s = true;
	} else {
		document.getElementById("puntuacion").innerText = "Debe seleccionar una puntuación: ";
		document.getElementById("puntuacion").style.color = "#dc3545";
		s = false;
	}

	if (o && s) {
		if (document.getElementById("userCom")) {
			o = false;
			s = false;
			document.getElementById("alreadyCom").classList.remove("hide");
			document.getElementById("opinion").value = "";
			puntuar(0);

			setTimeout(function () {
				document.getElementById("alreadyCom").classList.add("hide");
			}, 2000);
		} else {
			ok = true;
		}
	}
	if (ok) {
		let hoy = new Date();
		let fecha = hoy.getFullYear();

		if (JSON.stringify(hoy.getDate()).length == 1) {
			fecha += "-0" + hoy.getDate();
		} else {
			fecha += "-" + hoy.getDate();
		}
		if (JSON.stringify(hoy.getMonth()).length == 1) {
			fecha += "-0" + (hoy.getMonth() + 1);
		} else {
			fecha += "-" + (hoy.getMonth() + 1);
		}
		if (JSON.stringify(hoy.getHours()).length == 1) {
			fecha += " 0" + hoy.getHours();
		} else {
			fecha += " " + hoy.getHours();
		}
		if (JSON.stringify(hoy.getMinutes()).length == 1) {
			fecha += ":0" + hoy.getMinutes();
		} else {
			fecha += ":" + hoy.getMinutes();
		}
		if (JSON.stringify(hoy.getSeconds()).length == 1) {
			fecha += ":0" + hoy.getSeconds();
		} else {
			fecha += ":" + hoy.getSeconds();
		}

		let com = {
			product: infoP.id,
			score: stars,
			description: opinion,
			user: JSON.parse(localStorage.getItem("userInfo")).name,
			dateTime: fecha,
		};
		comentariosArray.push(com);
		console.log(comentariosArray);

		newComent +=
			`<div id="userCom"class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold col">${user}</p> 
        
        </div>    
        <div class="row">
            <p class="col-12 col-lg-10">${opinion} </p> <div class="col-12 text-end">
			<span class="lighter col-3 text-end"> ${fecha}</span>` +
			verEstrellas(stars) +
			`</div>
         </div>
    </div>
    `;
		document.getElementById("comments").innerHTML += newComent;
		let id = localStorage.getItem("prodID");
		// let lcom = { id, newComent };
		document.getElementById("opinion").value = "";
		puntuar(0);
		// localStorage.setItem("userCom", JSON.stringify(lcom));

		localStorage.setItem(`userCom${localStorage.getItem("prodID")}`, newComent);
		showComments();
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	let prodID = localStorage.getItem("prodID");

	getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
		if (resultObj.status === "ok") {
			infoProd = resultObj.data;
			showProducts();
		}
	});

	getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
		if (resultObj.status === "ok") {
			comProd = resultObj.data;
			showComments();
		}
	});

	setTimeout(function com() {
		if (
			// localStorage.getItem("userCom") &&
			// prodID === JSON.parse(localStorage.getItem("userCom")).id
			localStorage.getItem(`userCom${localStorage.getItem("prodID")}`)
		) {
			document.getElementById("comments").innerHTML += localStorage.getItem(`userCom${localStorage.getItem("prodID")}`);
		}
	}, 1000);
});

let estrellaCom = "";
let max = undefined;
let min = undefined;
let carro = JSON.parse(localStorage.getItem("carrito"));
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
		carro.push(infoP);
		// localStorage.setItem("carrito", carro);
		console.log(carro);

		localStorage.setItem("carrito", JSON.stringify(carro));
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
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide 1" class="active" aria-current="true"></button>
        `;
		} else {
			buttons += `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${
				i + 1
			}" class="" ></button>
        `;
		}
	}
	return buttons;
}

function carrusel() {
	let carrusel = "";

	carrusel +=
		`
    <div class='d-flex justify-content-center'>
                <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="true">
                    <div id='carousel_buttons'class="carousel-indicators">
                       ` +
		carruselBtn() +
		`
                    </div>
                    <div id='carousel_images'class="carousel-inner">

                     ` +
		carruselImg() +
		`
                        
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon flechas" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon flechas" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
    `;
	document.getElementById("images").innerHTML += carrusel;
}

// obtiene info del getJsonData y la muestra en la pagina
function mostrarInfo() {
	infoP.id = parseInt(infoProd.id);
	infoP.unitCost = parseInt(infoProd.cost);
	infoP.name = infoProd.name;
	infoP.image = infoProd.images[0];
	infoP.currency = infoProd.currency;
	// infoP.count = parseInt(infoProd.soldCount);

	let info = "";
	let imagenes = "";
	if (infoProd.name != "") {
		info += `
        <div class="row">
		<div id="images" class="col">        
        </div>

		<div class="col">
		<h2 class="borde-btm">${infoProd.name}</h2>
        <b>Descripcion: </b>
        <p>${infoProd.description}</p>
        <b>Categoria: </b>
        <p>${infoProd.category}</p>
        <b>Vendidos: </b>
        <p>${infoProd.soldCount}</p>
		<b>Precio: </b>
        <p>${infoProd.currency} ${infoProd.cost}</p>
		<button type="button" class="btn btn-primary" onclick="addCart(${infoProd.id})">Comprar</button>
	
		<a href="cart.html" class="btn btn-dark" onclick="goToCart()"><i class="fas fa-shopping-cart"></i></a>
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
            <div class="list-group-item list-group-item-action cursor-active container w-50 border mx-3" onclick="setProdID(${rel.id})">
            <b>${rel.name}</b>
            <img class="p-0 img-thumbnail"src="${rel.image}" alt="Imagen de ${rel.name}"/>
            </div>
            
           
    `;
		}

		let commentsFilter = `<div class='d-flex justify-content-between mt-4'> <p class="fs-4">Comentarios</p>
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
			mostrarComm();

			break;

		case "neg":
			min = undefined;
			max = 2;
			mostrarComm();

			break;

		case "pos":
			min = 3;
			mostrarComm();
			break;
	}
}

// bucle que muestra los comentarios obtenidos con getJSONData
function mostrarComm() {
	document.getElementById("comments").innerHTML = "";

	for (let i = 0; i < comProd.length; i++) {
		let comentario = comProd[i];

		if (
			((max == undefined || (max != undefined && parseInt(comentario.score) <= max)) && min == undefined) ||
			(min != undefined && parseInt(comentario.score) >= min)
		) {
			let comments =
				`
    
    <div class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold col">${comentario.user}</p><span class="lighter col-3 text-end"> ${comentario.dateTime}</span>
        
                
        </div>    
        <div class="d-flex justify-content-between">
            <p class="col">${comentario.description} </p> 
            
            
            <div class="col-1 text-end">` +
				verEstrellas(comentario.score) +
				`</div>
         </div>
    </div>
        
    `;

			document.getElementById("comments").innerHTML += comments;
		}
	}
}

document.getElementById("nuevoComentario").innerHTML = `
    <b class="mt-5">Escriba su comentario</b>
    <form>
        <div id="agregar_com" class="form-group">
            
            <label id="label_opinion"for="opinion" class="mt-3">Tu opinión:</label>
            <textarea class="form-control" id="opinion" rows="3"></textarea>
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
	let opinion = document.getElementById("opinion").value;

	let stars = estrellaCom;
	let newComent = "";
	let user = localStorage.getItem("email");
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

		newComent +=
			`<div id="userCom"class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold col">${user}</p><span class="lighter col-3 text-end"> ${fecha}</span> 
        
        </div>    
        <div class="d-flex justify-content-between">
            <p class="col">${opinion} </p> <div class="col-1 text-end">` +
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
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	let prodID = localStorage.getItem("prodID");

	getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
		if (resultObj.status === "ok") {
			infoProd = resultObj.data;
			mostrarInfo();
		}
	});

	getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
		if (resultObj.status === "ok") {
			comProd = resultObj.data;
			mostrarComm();
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

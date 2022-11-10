const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const user = 25801;

let showSpinner = function () {
	document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
	document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
	let result = {};
	showSpinner();
	return fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.then(function (response) {
			result.status = "ok";
			result.data = response;
			hideSpinner();
			return result;
		})
		.catch(function (error) {
			result.status = "error";
			result.data = error;
			hideSpinner();
			return result;
		});
};
function out() {
	localStorage.clear();
	location.replace("login.html");
}
const validaNumericos = (event) => {
	if (event.charCode >= 48 && event.charCode <= 57) {
		return true;
	}
	return false;
};

getJSONData(`${CART_INFO_URL}${user}${EXT_TYPE}`).then(function (resultObj) {
	// console.log(`${CART_INFO_URL}${user}${EXT_TYPE}`);
	if (resultObj.status === "ok") {
		// console.log(articles);
		cart = resultObj.data;
		compras = cart.articles;
		if (!localStorage.getItem("cart")) {
			localStorage.setItem("cart", JSON.stringify(compras));
		}
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const nav = document.getElementsByClassName("nav-item");
	const googleUser = JSON.parse(localStorage.getItem("userGoogle"));
	let img_perfil = "img/img_perfil.png";
	const navMail = nav[nav.length - 1];
	navMail.id = "userMail";

	if (localStorage.getItem("userPic")) {
		img_perfil = localStorage.getItem("userPic");
	} else {
		img_perfil = "img/img_perfil.png";
	}

	if (localStorage.getItem("userInfo") !== null) {
		navMail.innerHTML = `<div class="dropdown">
			<a class="btn nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
			 <img src=${img_perfil} class="userImg">
			<span class="profileName">${JSON.parse(localStorage.getItem("userInfo")).name}</span>
			</a>

			
			<ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="userMenu" >
				<li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
				<li><a class="dropdown-item" href="cart.html">Ver Carrito </a></li>
				<li><p class="dropdown-item text-danger cursor-active mb-0" href="#" onclick="out()">Cerrar Sesion</p></li>
			</ul>
		</div>
        `;
	}

	let pass = localStorage.getItem("passOK");
	let mail = localStorage.getItem("mailOK");

	if (!pass || pass == "false") {
		location.replace("login.html");
	}
});

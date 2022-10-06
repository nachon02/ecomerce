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

getJSONData(`${CART_INFO_URL}${user}${EXT_TYPE}`).then(function (resultObj) {
	// console.log(`${CART_INFO_URL}${user}${EXT_TYPE}`);
	if (resultObj.status === "ok") {
		// console.log(articles);
		cart = resultObj.data;
		compras = cart.articles;
		if (!localStorage.getItem("carrito")) {
			localStorage.setItem("carrito", JSON.stringify(compras));
		}
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const nav = document.getElementsByClassName("nav-item");
	const navMail = nav[nav.length - 1];

	// if (localStorage.getItem("email") !== null) {
	//     navMail.innerHTML = `
	// <a class="nav-link" href="my-profile.html">${localStorage.getItem(
	//     "email"
	// )}</a>
	// `;
	// }
	if (localStorage.getItem("email") !== null) {
		navMail.innerHTML = `
        <button type="button" class="btn nav-link">
            <span class="ml-2">${localStorage.getItem("email")}</span>
        </button>
        <button type="button" class="btn nav-link border-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only"></span>
            </button>
        <div class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="userMenu">
            <a class="dropdown-item" href="my-profile.html">Perfil</a>
            <a class="dropdown-item" href="cart.html">Ver Carrito</a>
            <p class="dropdown-item text-danger cursor-active mb-0" href="#" onclick="out()">Cerrar Sesion</p>
        </div>
        `;
	}

	let pass = localStorage.getItem("passOK");
	let mail = localStorage.getItem("mailOK");

	if (!pass || !mail) {
		location.replace("login.html");
	}
});

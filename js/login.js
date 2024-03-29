// Variables
const formulario = document.getElementById("formulario");
const inputEmail = document.getElementById("form2Example1");
const inputPass = document.getElementById("form2Example2");
const button = document.getElementById("enviarBtn");
const userInfo = {
	name: "",
	email: "",
};

// Valores y errores
inputPass.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		validar();
	}
});
inputEmail.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		validar();
	}
});

function validar() {
	let valorPass = inputPass.value;
	let valorEmail = inputEmail.value;
	const commPass = document.getElementById("passValidationComment");
	const commEmail = document.getElementById("validationServer03Feedback");

	// funciones que muestran los mensajes de error

	function errorPass() {
		commPass.classList.remove("invalid-feedback");
		inputPass.classList.add("is-invalid");
	}
	function errorMail() {
		commEmail.classList.remove("invalid-feedback");
		inputEmail.classList.add("is-invalid");
	}
	function validPass() {
		if (inputPass.classList.contains("is-invalid")) {
			inputPass.classList.remove("is-invalid");

			commPass.classList.add("invalid-feedback");
		}
		inputPass.classList.add("is-valid");
	}
	function validMail() {
		if (inputEmail.classList.contains("is-invalid")) {
			inputEmail.classList.remove("is-invalid");

			commEmail.classList.add("invalid-feedback");
		}
		inputEmail.classList.add("is-valid");
	}

	/* Validaciones  */

	// variables vacias para comprobar si el usuario esta loggueado

	let pass = false;
	let mail = false;

	// regex de validacion de email
	const caracterMail = (e) => {
		return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
			e
		);
	};
	const spaces = (p) => {
		return / /.test(p);
	};

	// validacion de email

	if (!valorEmail) {
		errorMail();
		mail = false;
	} else if (!caracterMail(valorEmail)) {
		errorMail();
	} else {
		validMail();
		mail = true;
		userInfo.email = valorEmail;
		userInfo.name = valorEmail.split("@")[0];
		userInfo.fullName = valorEmail.split("@")[0];
		// console.log(userInfo.name);
		// localStorage.setItem("email", valorEmail);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
	}

	// validacion de contraseña

	if (!valorPass) {
		errorPass();

		pass = false;
	} else if (valorPass.length < 8) {
		errorPass();
	} else if (spaces(valorPass)) {
		errorPass();
	} else {
		validPass();
		pass = true;
	}

	localStorage.setItem("passOK", pass);

	localStorage.setItem("mailOK", mail);

	// Funcion para ir al index cuando este validado tanto la contraseña como el email

	setTimeout(function goToIndex() {
		if (pass && mail) {
			location.replace("index.html");
		}
	}, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("passOK") == true || localStorage.getItem("mailOK") == true) {
		location.replace("index.html");
	}
});

// data inputs
const userEmailInput = document.querySelector("#userEmail");
const imagenUser = document.querySelector("#userImgInput");
const firstNameInput = document.querySelector("#firstName");
const secondNameInput = document.querySelector("#secondName");
const firstLastNameInput = document.querySelector("#firstLastName");
const secondLastNameInput = document.querySelector("#secondLastName");
const contactCelInput = document.querySelector("#contactCel");
// btns
const btnChange = document.querySelector("#changeData");
const btnSave = document.querySelector("#modalInfoSave");

// aux
const img = document.querySelector("#imgUser");
let userInfo = JSON.parse(localStorage.getItem("userInfo"));

// functions

const spaces = (w) => {
	return / /.test(w);
};
const deleteSpaces = (w) => {
	if (spaces(w)) {
		return w.split(" ")[0];
	} else {
		return w;
	}
};

btnSave.addEventListener("click", (e) => {
	//required
	if (firstNameInput.value !== "") {
		userInfo.name = deleteSpaces(firstNameInput.value);
		firstNameInput.classList.remove("is-invalid");

		firstNameInput.classList.add("is-valid");
	} else {
		userInfo.name = "";
	}
	if (firstLastNameInput.value !== "") {
		userInfo.lastName = deleteSpaces(firstLastNameInput.value);

		firstLastNameInput.classList.remove("is-invalid");

		firstLastNameInput.classList.add("is-valid");
	} else {
		userInfo.lastName = "";
	}

	//
	if (secondNameInput.value != "") {
		userInfo.secondName = deleteSpaces(secondNameInput.value);
		// console.log(userInfo.name, userInfo.secondName);
	} else {
		userInfo.secondName = "";
	}
	if (secondLastNameInput.value != "") {
		userInfo.secondLastName = deleteSpaces(secondLastNameInput.value);
		// console.log(userInfo.name, userInfo.secondLastName);
	} else {
		userInfo.secondLastName = "";
	}
	if (contactCelInput.value != "") {
		userInfo.tel = deleteSpaces(contactCelInput.value);
		// console.log(userInfo.name, userInfo.secondLastName);
	} else {
		userInfo.tel = "";
	}
	if (firstLastNameInput.value !== "" && firstNameInput.value !== "") {
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		let fullName = `${userInfo.name} ${userInfo.secondName} ${userInfo.lastName} ${userInfo.secondLastName} `;

		console.log(deleteSpaces(fullName));
	}
});

imagenUser.addEventListener("change", () => {
	const archivos = imagenUser.files;
	// console.log(imagenUser.files);
	if (!archivos || !archivos.length) {
		if (localStorage.getItem("userPic")) {
			img.src = localStorage.getItem("userPic");
		} else {
			img.src = "img/img_perfil.png";
		}
		return;
	}
	const primerArchivo = archivos[0];
	console.log(archivos[0]);
	const objectURL = URL.createObjectURL(primerArchivo);
	img.src = objectURL;
	localStorage.setItem("userPic", objectURL);
	let imagends = (document.querySelector(".userImg").src = localStorage.getItem("userPic"));
});
document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("userPic")) {
		img.src = localStorage.getItem("userPic");
	} else {
		img.src = "img/img_perfil.png";
	}
	userEmailInput.value = userInfo.email;
	document.querySelector("#userName").textContent = userInfo.name + " " + (userInfo.lastName || "");
	document.querySelector("#email").textContent = userInfo.email;
	firstNameInput.value = userInfo.name;
	firstLastNameInput.value = userInfo.lastName || "";
});

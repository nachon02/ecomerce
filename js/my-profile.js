// data inputs
const userEmailInput = document.querySelector("#userEmail");
const imagenUser = document.querySelector("#userImgInput");
const firstNameInput = document.querySelector("#firstName");
const firstLastNameInput = document.querySelector("#firstLastName");
// btns
const btnChange = document.querySelector("#changeData");
const btnSave = document.querySelector("#modalInfoSave");

// aux
const img = document.querySelector("#imgUser");
let userInfo = JSON.parse(localStorage.getItem("userInfo"));

// functions

btnChange.addEventListener("click", (e) => {
	// console.log(imagenUser.value, userInfo);
	if ("") {
	}
});

imagenUser.addEventListener("change", () => {
	const archivos = imagenUser.files;
	if (!archivos || !archivos.length) {
		if (localStorage.getItem("userPic")) {
			img.src = localStorage.getItem("userPic");
		} else {
			img.src = "img/img_perfil.png";
		}
		return;
	}
	const primerArchivo = archivos[0];
	console.log(archivos);
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
	document.querySelector("#userName").textContent = userInfo.name;
	document.querySelector("#lastName").textContent = userInfo.lastName;
	document.querySelector("#email").textContent = userInfo.email;
	firstNameInput.value = userInfo.name;
	firstLastNameInput.value = userInfo.lastName;
});

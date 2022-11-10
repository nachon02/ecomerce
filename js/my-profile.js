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
const standardizeText = (w) => {
	return deleteSpaces(upperFirst(w));
};

const upperFirst = (w) => {
	// let upper = w[0].toUpperCase();
	let text = "";
	for (let i = 0; i < w.length; i++) {
		const letter = w[i];
		if (i == 0) {
			text = letter.toUpperCase();
		} else {
			text += letter.toLowerCase();
		}
	}
	return text;
};

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
		firstNameInput.classList.remove("is-valid");

		firstNameInput.classList.add("is-invalid");
	}
	if (firstLastNameInput.value !== "") {
		userInfo.lastName = deleteSpaces(firstLastNameInput.value);

		firstLastNameInput.classList.remove("is-invalid");

		firstLastNameInput.classList.add("is-valid");
	} else {
		userInfo.lastName = "";
		firstLastNameInput.classList.remove("is-valid");

		firstLastNameInput.classList.add("is-invalid");
	}

	//
	if (secondNameInput.value != "") {
		userInfo.secondName = standardizeText(secondNameInput.value);
		secondNameInput.classList.add("is-valid");

		// console.log(userInfo.name, userInfo.secondName);
	} else {
		userInfo.secondName = "";
	}
	if (secondLastNameInput.value != "") {
		userInfo.secondLastName = standardizeText(secondLastNameInput.value);
		secondLastNameInput.classList.add("is-valid");

		// console.log(userInfo.name, userInfo.secondLastName);
	} else {
		userInfo.secondLastName = "";
	}
	if (contactCelInput.value != "") {
		userInfo.tel = standardizeText(contactCelInput.value);
		document.querySelector("#tel").textContent = standardizeText(contactCelInput.value);

		contactCelInput.classList.add("is-valid");

		// console.log(userInfo.name, userInfo.secondLastName);
	} else {
		userInfo.tel = "";
	}
	if (firstLastNameInput.value !== "" && firstNameInput.value !== "") {
		let fullName = `${standardizeText(userInfo.name)}
		 ${standardizeText(userInfo.secondName)} 
		 ${standardizeText(userInfo.lastName)} 
		 ${standardizeText(userInfo.secondLastName)} `;
		userInfo.fullName = fullName;
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		document.querySelector("#userName").textContent = fullName; 
		document.querySelector(".profileName").textContent = userInfo.name;




		let userModal = bootstrap.Modal.getInstance(document.querySelector("#userInfo"));
		setTimeout(() => {
			userModal.hide();
		}, 300);

		// console.log(JSON.parse(localStorage.getItem("userInfo")).fullName);
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
	const reader = new FileReader;

	
	reader.readAsDataURL(primerArchivo)
	reader.addEventListener('load',()=>{img.src = reader.result;
	localStorage.setItem("userPic", reader.result);
	let imagends = (document.querySelector(".userImg").src = localStorage.getItem("userPic"));
	// let imagends = (document.querySelector(".userImg").src = localStorage.getItem("userPic"));

	})
});
document.addEventListener("DOMContentLoaded", () => {
	//mostrar nombre y email guardados
	if (localStorage.getItem("userPic")) {
		img.src = localStorage.getItem("userPic");
	} else {
		img.src = "img/img_perfil.png";
	}
	userEmailInput.value = userInfo.email;
	// document.querySelector("#userName").textContent = userInfo.name + " " + (userInfo.lastName || "");
	document.querySelector("#userName").textContent = JSON.parse(localStorage.getItem("userInfo")).fullName;
	document.querySelector("#email").textContent = userInfo.email;
	document.querySelector("#tel").textContent = JSON.parse(localStorage.getItem("userInfo")).tel;

	firstNameInput.value = userInfo.name;
	firstLastNameInput.value = userInfo.lastName || "";
	//mostrar nombre y email guardados
});

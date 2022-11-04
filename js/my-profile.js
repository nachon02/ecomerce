const imagenUser = document.querySelector("#userImgInput");
const img = document.querySelector("#imgUser");
const saveBtn = document.querySelector("#saveChanges");

saveBtn.addEventListener("click", (e) => {
	console.log(imagenUser.value);
});

imagenUser.addEventListener("change", () => {
	// Los archivos seleccionados, pueden ser muchos o uno
	const archivos = imagenUser.files;
	console.log(archivos);
	// Si no hay archivos salimos de la función y quitamos la imagen
	if (!archivos || !archivos.length) {
		img.src = "img/img_perfil.png";
		return;
	}
	// Ahora tomamos el primer archivo, el cual vamos a previsualizar
	const primerArchivo = archivos[0];
	console.log(primerArchivo);
	// Lo convertimos a un objeto de tipo objectURL
	const objectURL = URL.createObjectURL(primerArchivo);
	// Y a la fuente de la imagen le ponemos el objectURL
	img.src = objectURL;
	localStorage.setItem("userPic", objectURL);
});
document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("userPic")) {
		img.src = localStorage.getItem("userPic");
	} else {
		img.src = localStorage.getItem("userPic");
	}
});

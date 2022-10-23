import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { auth } from "./firebase.js";

const googleBtn = document.querySelector("#customBtn");

googleBtn.addEventListener("click", async () => {
	const provider = new GoogleAuthProvider();

	try {
		const credentials = await signInWithPopup(auth, provider);
		console.log(credentials);
		console.log("bienvenido " + credentials.user.displayName);
		localStorage.setItem("mailOK", true);
		localStorage.setItem("passOK", true);
		localStorage.setItem("email", credentials.user.email);
		localStorage.setItem("userGoogle", JSON.parse(credentials));
		location.replace("index.html");
	} catch (error) {
		console.log(error);
	}
});

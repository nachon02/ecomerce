import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { auth } from "./firebase.js";

const googleBtn = document.querySelector("#customBtn");

googleBtn.addEventListener("click", async () => {
	const provider = new GoogleAuthProvider();

	try {
		const credentials = await signInWithPopup(auth, provider);
		const userInfo = {
			name: "",
			email: "",
			lastName: "",
		};

		console.log(credentials);
		console.log("bienvenido " + credentials.user.displayName);
		localStorage.setItem("mailOK", true);
		localStorage.setItem("passOK", true);
		localStorage.setItem("email", credentials.user.email);
		userInfo.email = credentials.user.email;
		userInfo.name = credentials._tokenResponse.firstName;
		userInfo.lastName = credentials._tokenResponse.lastName;
		JSON.stringify(localStorage.setItem("userInfo", JSON.stringify(userInfo)));
		localStorage.setItem("userGoogle", JSON.stringify(credentials));
		location.replace("index.html");
	} catch (error) {
		console.log(error);
	}
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD35j2S2PIwXPG9t1gVMucPkZPZol7ABvU",
	authDomain: "prueba-auth-d4b1e.firebaseapp.com",
	projectId: "prueba-auth-d4b1e",
	storageBucket: "prueba-auth-d4b1e.appspot.com",
	messagingSenderId: "1084346111242",
	appId: "1:1084346111242:web:7452c89d803a9f353496f3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// console.log(app);

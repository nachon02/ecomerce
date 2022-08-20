// Variables
const formulario = document.getElementById("formulario");
const inputEmail = document.getElementById("form2Example1");
const inputPass = document.getElementById("form2Example2");
const button = document.getElementById("enviarBtn");

// Valores y errores

button.addEventListener("click", function validar() {
    let valorPass = inputPass.value;
    let valorEmail = inputEmail.value;
    const commPass = document.getElementById("passValidationComment");
    const commEmail = document.getElementById("validationServer03Feedback");

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
            inputPass.classList.add("is-valid");

            commPass.classList.add("invalid-feedback");

            console.log(valorPass);
        }
    }
    function validMail() {
        if (inputEmail.classList.contains("is-invalid")) {
            inputEmail.classList.remove("is-invalid");
            inputEmail.classList.add("is-valid");

            commEmail.classList.add("invalid-feedback");

            console.log(valorEmail);
        }
    }

    /** Validaciones  */

    if (!valorEmail || !valorPass || valorPass.length < 8) {
        errorMail();
        errorPass();
    } else {
        validMail();
        validPass();
    }
});

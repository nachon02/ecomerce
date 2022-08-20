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

            commPass.classList.add("invalid-feedback");

            console.log(valorPass);
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

    /** Validaciones  */

    // if (!valorEmail || !valorPass || valorPass.length < 8) {
    //     errorMail();
    //     errorPass();
    let pass = null;
    let mail = null;
    const caracterMail = (e) => {
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            e
        );
    };
    const spaces = (p) => {
        return / /.test(p);
    };

    if (!valorEmail) {
        errorMail();

        console.log(valorEmail);
    } else if (!caracterMail(valorEmail)) {
        errorMail();
        console.log(valorEmail + 1212);
    } else {
        validMail();
        mail = true;
    }

    if (!valorPass) {
        errorPass();
        console.log(valorPass);
    } else if (valorPass.length < 8) {
        console.log("menor a 8");
        errorPass();
    } else if (spaces(valorPass)) {
        console.log("tiene espacios");
        errorPass();
    } else {
        validPass();
        pass = true;
    }
    console.log(!spaces(valorPass));
});

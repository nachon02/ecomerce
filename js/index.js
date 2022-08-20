document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });

    console.log(localStorage.getItem("passOK"));
    console.log(localStorage.getItem("mailOK"));

    let pass = localStorage.getItem("passOK");
    let mail = localStorage.getItem("mailOK");

    if (!pass || !mail) {
        location.replace("https://nachon02.github.io/ecomerce/login.html");
    }
});

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

    let pass = localStorage.getItem("passOK");
    let mail = localStorage.getItem("mailOK");

    if (!pass || !mail) {
        location.replace("login.html");
    }
    // setTimeout(function clearStorage() {
    //     localStorage.clear();
    // }, 3000);
});

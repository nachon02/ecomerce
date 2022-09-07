let infoProd = [];
let comProd = [];

function mostrarInfo() {
    let infoT = "";
    let info = "";
    let imagenes = "";

    if (infoProd.name != "") {
        infoT = `
       <div class="text-center mt-3">
        <h2>${infoProd.name}</h2>
            
    </div>`;
        document.getElementById("h2__infoNombre").innerHTML = infoT;

        info += `
        <div>

        <h4 class="bold">Precio: </h4>
        <h5>${infoProd.currency} ${infoProd.cost}</h5>
        <h4 class="bold">Descripcion: </h4>
        <h5>${infoProd.description}</h5>
        <h4 class="bold">Categoria: </h4>
        <h5>${infoProd.category}</h5>
        <h4 class="bold">Cantidad de vendidos: </h4>
        <h5>${infoProd.soldCount}</h5>
        <h4 class="bold">Imagenes Ilustrativas: </h4>
        <div id="images" class="row">
         
        </div>
    `;

        document.getElementById("info_container").innerHTML = info;

        if (infoProd.images.length > 0) {
            infoProd.images.forEach((src) => {
                imagenes += `
        <div class="col">
        <img class="p-0 img-thumbnail" src="${src}">
        </div>
        `;
                //
            });
            document.getElementById("images").innerHTML = imagenes;
        }
        // for (let i = 0; i < infoProd.images.length; i++) {
        //     const imgs = infoProd.images[i];
        //     console.log(imgs);
        // }
    }
}
function mostrarComm() {
    let comments = `<h4 class="">Comentarios</h4>
        `;

    for (let i = 0; i < comProd.length; i++) {
        let commentario = comProd[i];

        comments += `
    
    <div class="list-group-item list-group-item-action"> 
    <p class="bold">${commentario.user} -<span class="lighter"> ${commentario.dateTime} - ${commentario.score}</span></p>
    <p>${commentario.description}</p>
    </div>
        
    `;
        document.getElementById("comments").innerHTML = comments;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let prodID = localStorage.getItem("prodID");
    getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (
        resultObj
    ) {
        if (resultObj.status === "ok") {
            infoProd = resultObj.data;
            console.log(infoProd);
            console.log(localStorage.getItem("prodID"));
            mostrarInfo();
        }
    });

    getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                comProd = resultObj.data;
                console.log(comProd);
                // console.log(localStorage.getItem("prodID"));
                mostrarComm();
            }
        }
    );
});

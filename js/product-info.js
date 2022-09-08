let infoProd = [];
let comProd = [];
let estrellaCom = "";

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
function mostrarInfo() {
    let infoT = "";
    let info = "";
    let imagenes = "";
    // console.log(infoProd.relatedProducts);

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

        for (let i = 0; i < infoProd.relatedProducts.length; i++) {
            let rel = infoProd.relatedProducts[i];

            document.getElementById("productos_relacionados").innerHTML += `
            <div class="list-group-item list-group-item-action cursor-active container w-50 border mx-3" onclick="setProdID(${rel.id})">
            <h4>${rel.name}</h4>
            <img class="p-0 img-thumbnail"src="${rel.image}"/>
            </div>
            
           
    `;
        }
    }
}
function verEstrellas(numero) {
    let puntuacion = "";
    // console.log(numero);
    for (let i = 1; i <= 5; i++) {
        if (i <= numero) {
            puntuacion += `<i class="fa fa-star checked"></i>`;
        } else {
            puntuacion += `<i class="fa fa-star"></i>`;
        }
    }
    return puntuacion;
}
function mostrarComm() {
    // let puntuacion = "";
    let comments = `<h4 class="">Comentarios</h4>
        `;

    for (let i = 0; i < comProd.length; i++) {
        let comentario = comProd[i];
        // console.log(comentario);
        // puntuacion = comentario.score;
        // console.log(puntuacion);

        comments +=
            `
    
    <div class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold ">${comentario.user}</p><span class="lighter"> ${comentario.dateTime}</span>
        
                
        </div>    
        <div class="d-flex justify-content-between">
            <p>${comentario.description} </p> <div>` +
            verEstrellas(comentario.score) +
            `</div>
         </div>
    </div>
        
    `;
        document.getElementById("comments").innerHTML = comments;
    }
    // console.log(
    //     document
    //         .getElementById("agregar_com")
    //         .getElementsByClassName("estrella")
    // );
}

// comments += ;
document.getElementById("nuevoComentario").innerHTML = `
    <h4 class="mt-3">Comentarios</h4>
    <form>
        <div id="agregar_com" class="form-group">
            
            <label id="label_opinion"for="opinion" class="mt-3">Tu opinión:</label>
            <textarea class="form-control" id="opinion" rows="3"></textarea>
            <p class="m-0 mt-3" id="puntuacion">Tu puntuación:</p>
            <div class="bold">
                <i id="estrella1" class="fa fa-star cursor-active estrella" onclick="puntuar(1)"></i>
                <i id="estrella2" class="fa fa-star cursor-active estrella" onclick="puntuar(2)"></i>
                <i id="estrella3" class="fa fa-star cursor-active estrella" onclick="puntuar(3)"></i>
                <i id="estrella4" class="fa fa-star cursor-active estrella" onclick="puntuar(4)"></i>
                <i id="estrella5" class="fa fa-star cursor-active estrella" onclick="puntuar(5)"></i>
            </div>
        
        
            <input id="comentar" type="button" class="btn btn-primary mt-3" value="Comentar" onclick="addComent()"></input>
        </div>
    </form>
    `;

function puntuar(n) {
    // console.log(n);
    // let puntuacionComent = n;
    estrellaCom = n;

    for (let i = 1; i <= n; i++) {
        if (i <= n) {
            document.getElementById(`estrella${i}`).classList.add("checked");
        }
    }
    for (let i = 1; i <= 5; i++) {
        if (
            i > n &&
            document
                .getElementById(`estrella${i}`)
                .classList.contains("checked")
        ) {
            document.getElementById(`estrella${i}`).classList.remove("checked");
        }
    }
}

function addComent() {
    let opinion = document.getElementById("opinion").value;

    let stars = estrellaCom;
    let newComent = "";
    let user = localStorage.getItem("email");
    let o = undefined;
    let s = undefined;
    let ok = undefined;

    if (opinion != "") {
        document.getElementById("opinion").classList.remove("is-invalid");
        document.getElementById("label_opinion").innerText = "Tu opinion:";
        document.getElementById("label_opinion").style.color = "";
        o = true;
    } else {
        document.getElementById("opinion").classList.add("is-invalid");
        document.getElementById("label_opinion").innerText =
            "Debe ingresar un comentario: ";
        document.getElementById("label_opinion").style.color = "#dc3545";
        o = false;
    }
    if (stars != "") {
        document.getElementById("puntuacion").innerText = "Tu puntuación:";
        document.getElementById("puntuacion").style.color = "";
        s = true;
    } else {
        document.getElementById("puntuacion").innerText =
            "Debe seleccionar una puntuación: ";
        document.getElementById("puntuacion").style.color = "#dc3545";
        s = false;
    }

    if (o && s) {
        if (document.getElementById("userCom")) {
            o = false;
            s = false;
            document.getElementById("alerta").classList.remove("hide");
            document.getElementById("opinion").value = "";
            puntuar(0);

            setTimeout(function () {
                document.getElementById("alerta").classList.add("hide");
            }, 2000);
        } else {
            ok = true;
        }
    }
    if (ok) {
        console.log(opinion);
        console.log(stars);
        console.log(user);
        let hoy = new Date();
        let fecha = hoy.getFullYear();

        // console.log;
        if (JSON.stringify(hoy.getMonth()).length == 1) {
            fecha += "-0" + (hoy.getMonth() + 1);
        } else {
            fecha += "-" + (hoy.getMonth() + 1);
        }
        if (JSON.stringify(hoy.getDay()).length == 1) {
            fecha += "-0" + hoy.getDay();
        } else {
            fecha += "-" + hoy.getDay();
        }
        if (JSON.stringify(hoy.getHours()).length == 1) {
            fecha += " 0" + hoy.getHours();
        } else {
            fecha += " " + hoy.getHours();
        }
        if (JSON.stringify(hoy.getMinutes()).length == 1) {
            fecha += ":0" + hoy.getMinutes();
        } else {
            fecha += ":" + hoy.getMinutes();
        }
        if (JSON.stringify(hoy.getSeconds()).length == 1) {
            fecha += ":0" + hoy.getSeconds();
        } else {
            fecha += ":" + hoy.getSeconds();
        }

        ":" + hoy.getSeconds();

        console.log(fecha);
        newComent +=
            `<div id="userCom"class="list-group-item list-group-item-action "> 
        <div class="d-flex justify-content-between">
        <p class="bold ">${user}</p><span class="lighter"> ${fecha}</span>
        
        </div>    
        <div class="d-flex justify-content-between">
            <p>${opinion} </p> <div>` +
            verEstrellas(stars) +
            `</div>
         </div>
    </div>
    `;
        document.getElementById("comments").innerHTML += newComent;
        let id = localStorage.getItem("prodID");
        let lcom = { id, newComent };
        // console.log(lcom);
        document.getElementById("opinion").value = "";
        puntuar(0);
        localStorage.setItem("userCom", JSON.stringify(lcom));
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let prodID = localStorage.getItem("prodID");

    // console.log(localStorage.getItem("userCom"));
    getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (
        resultObj
    ) {
        if (resultObj.status === "ok") {
            infoProd = resultObj.data;
            // console.log(infoProd);
            // console.log(localStorage.getItem("prodID"));
            mostrarInfo();

            console.log(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`);
        }
    });

    getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                comProd = resultObj.data;
                // console.log(comProd);
                console.log(localStorage.getItem("prodID"));
                mostrarComm();
            }
        }
    );

    setTimeout(function com() {
        if (
            localStorage.getItem("userCom") &&
            prodID === JSON.parse(localStorage.getItem("userCom")).id
        ) {
            document.getElementById("comments").innerHTML += JSON.parse(
                localStorage.getItem("userCom")
            ).newComent;
        }
        console.log(JSON.parse(localStorage.getItem("userCom")).id);
    }, 1000);
});

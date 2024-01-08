// mes variables
let containerProduct = document.getElementById('listProduct'); 
let productListFetch = fetch(config.host + config.api);

function showProduct(product)
{
    let url = "productDetail.html?id=" + product.id; // je recupere l url où j y rajoute l id pour afficher le produit
    containerProduct.innerHTML += // je rajoute le HTML dans le js
        `<div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div class="card border-warning border-5 m-3">
                <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <a href= ${url}>
                        <figure id="figure">
                            <img src=${product.imageUrl} class="img-fluid rounded align-items-center" alt="ours en peluche">
                        </figure>
                    </a>
                    <p class="text-right font-weight-bold">Prix:${product.price / 100}€</p>
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <input type="submit" id="btnListProduct" type="button" onclick="window.location.href ='${url}';" class="float-right mt-sm-2 mt-md-0 btn btn-warning font-weight-bold border-dark" data-id="${product.id}" data-image="${product.imageUrl}" data-name="${product.name}" data-price="${product.price /100}" value="détails">
                </div>
            </div>
        </div>`
    ;
}

productListFetch
    .then(function(response) {
        return response.json();
    }) 
    .then(function(listProductData) { // promesse de la reponse json ( liste des produits)
        for (let product of listProductData) { // boucle for of pour recuperer un produit de la liste
            let teddy = new TeddyBears(product); // creation de teddy sur le modele du constructor TeddyBear
            showProduct(teddy); // j appelle ma fonction  en lui passant en parametre teddy          
        }
    })
    .catch(function(err) { //le retour en cas de non connection au serveur 
        console.log('Fetch problem: ' + err.message);
    })
;

// j affiche la quantité d articles du panier de commande dans le header
let quantityInCart = document.getElementById('quantity-in-cart'); 
calculQuantity();
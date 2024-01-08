//creation des variables
let containerProductDetail = document.getElementById('containerProductDetail');
let stringOptionColor = '';

const urlParams = new URL(document.location).searchParams; //recuperation du parametre (id) à la fin de l url
const id = urlParams.get('id');

function showColor(color) { // afficher les differentes couleurs à choisir
    let choice = document.getElementById('choice');
    choice.innerHTML += 
        `<label class="form-check-label pb-1">
            Choississez votre couleur: 
        </label><br>
        <select id="clr" name="color">${color}</select>`
    ;
}

function displayCardTeddy(product) { // fiche produit detaillée
    containerProductDetail.innerHTML +=
        `<section class="flex flex-wrap text-center row mr-2 ml-2 justify-content-md-center">
            <div class="row-sm-12 mt-4 col-md-6 col-lg-4  mb-md-4 border card border-warning border-right-0">
                <figure id="figure">
                   <img src=${product.imageUrl} class="img-fluid rounded align-items-center mt-3" alt="ours en peluche">
                </figure>
            </div>
            <div id="card-body" class="row-sm-12 col-md-6 mt-md-4 col-lg-4 mb-4 pr-4 pl-4 border border-warning  border-left-0 flex flex-col flex-wrap bg-light">
                <h2 class="card-title text-center font-weight-bold mt-4">${product.name}</h2>
                <figure>
                    <p class="card-text text-center">${product.description}</p>
                </figure>
                <div class="form">
                    <p class="lead font-weight-bold mt-4 mb-2">Si vous voulez me personnaliser</p>
                    <div id="choice" class="form-check"></div>
                </div>
                <p class="text-right font-weight-bold mt-3">Prix:${product.price / 100}€</p>
                <form class="text-right mb-1">
                    <label>Quantité</label>
                    <select id="quantity" name="quantite">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </form>
                <p class="mb-5 text-left">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile">
                    <img src="img/star-solid.jpg" alt="etoile"> 
                    <input type="submit" id="addToCart" class="float-right mt-0 btn btn-warning font-weight-bold border-dark" value="Commander" data-image="${product.imageUrl}" data-toggle="modal" data-target="#windowChoice" data-id="${product._id}" data-name="${product.name}" data-price="${product.price / 100}">
                </p>
            </div>
            <div class="modal" tabindex="-1" id="yourChoice"></div>
        </section>`
    ;
}

fetch(config.host + config.api + '/' + id) // j envoi une requete avec l'url precis(id) du nounours
    .then(function(response) {
        return response.json();
    })
    .then(function(showTeddy) {
        displayCardTeddy(showTeddy); // je rappelle la fonction pour afficher chaque carte detaillée

        for (let color of showTeddy.colors) { // boucle for pour notifier chaque couleur
            stringOptionColor += `<option value='${color}'>${color}</option>`;
        }

        showColor(stringOptionColor);
        let color = showTeddy.colors[0]; // je cree une variable avec la premiere couleur selectionnée

        choice.addEventListener('input', function(event) {
            color = event.target.value;
            alert('la couleur ' + event.target.value + ' a été sélectionnée');
        });

        let quantity = document.getElementById('quantity');
        calculQuantity();

        let btnAddToCart = document.getElementById('addToCart'); // recuperation des infos du bouton
        btnAddToCart.addEventListener('click', function() {
            let basket = {
                imageUrl: btnAddToCart.dataset.image,
                idItem: btnAddToCart.dataset.id,
                price: btnAddToCart.dataset.price,
                firstName: btnAddToCart.dataset.name,
                quantity: quantity.value,
                color: color
            }
            addBasket(basket); // je recupere ma function pour creer les lignes de commande    
        });
    })
    //le retour en cas de non connection au serveur 
    .catch(function(err) {
        console.log('probleme dans la page de showProduct: ' + err.message);
    })
;
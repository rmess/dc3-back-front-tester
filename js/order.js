//recuperer les infos de la commande 
const basket = JSON.parse(localStorage.getItem("basket"));

let trash = document.getElementsByClassName("trash");
let cartTableBody = document.getElementById("cart-tablebody");
cartTableBody.innerHTML = "";
let totalQuantity = 0;
let total = 0;
let totalOrder = 0;

function displayOrderLines(product) {
    // le html d'une ligne de commande
    cartTableBody.innerHTML += `
        <tr class="bg-white">
            <td class="d-none d-md-block">
                <img class="d-none d-md-block ml-lg-5 img-rounded" src="${product.imageUrl}" width="90" alt="peluche">
            </td>
            <td class="align-middle pr-0 ml-1">${product.firstName}</td>
            <td class="text-left pl-4 align-middle">${product.price}€</td>
            <td class="align-middle">${product.color}</td>
            <td class="quantity text-left pl-5 align-middle" data-id="${product.idItem}">${product.quantity}</td>
            </td>
            <td id="calculPriceLine" class="text-center align-middle">${total}€</td>
            <td>       
                <img data-id="${product.idItem}" role= "button" class ="trash ml-4 h-75 mt-2 pl-0" src="img/trash.png" alt="image d'une poubelle"> 
            </td>
        </tr>`;
}
 
function calculPrice(product) {
    total = product.price * product.quantity; //calcul la quantite par ligne
    totalOrder += total //calcul la quantite total 
}

//Condition pour afficher le panier
if (basket) {
    orderLines();
} else {
   console.log("le panier est vide")
}

//bouton de la poubelle sur la ligne de commande
for (let btn of trash) {
    btn.addEventListener('click', function () {
        let idItem = this.dataset.id;
        removeBasket({ idItem: idItem });
        document.querySelector(`td.quantity[data-id="${idItem}"]`);
        window.location.reload();
    })
};

function orderLines() //j affiche chaque ligne de commande 
{ 
    basket.forEach((product) => {
        calculPrice(product); 
        totalQuantity += parseInt(product.quantity);
        displayOrderLines(product);
    });
    cartTableBody.innerHTML +=
        `<tr class="bg-light">
            <td class="font-weight-bold pl-lg-5">Prix total</td>
            <td class="d-none d-md-block"></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-center font-weight-bold">${totalOrder}€</td>
            <td></td>
        </tr>`;

    localStorage.setItem("totalQuantity", totalQuantity);//nombre d 'articles du panier affiché dans les headers
    localStorage.setItem("totalOrder", totalOrder);
    calculQuantity();
 }

let resetBasketAll = document.getElementById("resetBasketAll");
resetBasketAll.addEventListener('click', function() {
    if(basket == null) {
        alert("votre panier ne contient pas d'article");
    } else {
        if(confirm("Attention, vous êtes sur le point de vider totalement votre panier!")) {        
            cartTableBody.remove()
            localStorage.clear(basket); 
            window.location.reload(); 
            return true
        } 
            return false
        }
    
})






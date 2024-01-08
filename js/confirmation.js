// PRIX
let priceOrder = document.getElementById("priceOrder");
let totalOrder = localStorage.getItem("totalOrder");

priceOrder.innerHTML = `<span>${totalOrder}</span> €`;

// NUMERO DE COMMANDE
let number = document.getElementById("numberOrder");
let urlParams = new URL(document.location).searchParams;
let orderId = urlParams.get("orderId");

number.innerHTML += `<span>${orderId}</span>`;

// PRENOM
let contactName = document.getElementById("contactName");
let user = urlParams.get("user");

contactName.innerHTML += `<span>${user}!!</span>`;

//je supprime le panier puisque la confirmation est retournée par l'API
localStorage.clear(orderId);
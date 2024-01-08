function calculQuantity() // Afficher la quantité de produits présent dans la panier
{
    let quantityInCart = document.getElementById("quantity-in-cart"); 
    totalQuantity = localStorage.getItem("totalQuantity");  
        if (totalQuantity != null) {
            quantityInCart.innerHTML = `<span>${totalQuantity}</span> article(s)`;
        } else {
            quantityInCart.innerHTML =`0 article`
        } 
}
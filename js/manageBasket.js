//function pour verifier le panier
function initBasket()
{
    let basket = localStorage.getItem('basket');
    if (basket !== null) {
        return JSON.parse(basket);
    } else {
        return [];
    }
}

///function pour ajouter une ligne au panier ou juste la quantité
function addBasket(product)
{
    let basket = initBasket();
    let productFind = basket.find(function(basketProduct) {
        return basketProduct.idItem === product.idItem;
    });
    if (productFind != undefined) {
        productFind.quantity = parseInt(productFind.quantity) + parseInt(product.quantity);
    } else {
        basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
}

//function pour vider la ligne du panier ou seulement la quantite si le produit est existant dans le panier
function removeBasket(product)
{
    let basket = initBasket();
    let productFind = basket.find(function(basketProduct) {
        return basketProduct.idItem === product.idItem
    });
        if (productFind.quantity > 1) {
            productFind.quantity--;
        } else {
            basket = basket.filter(function(basketProduct) {
                return basketProduct.idItem != product.idItem
            });
        }
    localStorage.setItem("basket", JSON.stringify(basket));
}

//function pour verifier si le panier contient des articles
function basketIsRight()
{  
    if(basket.length <= 0 || basket == null) {
        alert("Il n'y a pas d'article dans votre panier!");
        return false
    }
        return true
    
}


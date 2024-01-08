let btnSubmit = document.getElementById("btnSubmit");

let products = []; // je cree une fonction pour envoyer un tableau à l 'API
function orderForAPI (item)
{
    for(let i = 0; i < item.length; i++){
    products.push(item[i].idItem);
    }  
}

btnSubmit.addEventListener("click", function (event) { // envoie du formulaire au click du bouton
    let form = document.getElementById("form");
    event.preventDefault();
//verification du panier s'il contient articles ET si le formulaire est correctement rempli
    if(basketIsRight() == true  && form.reportValidity() == true) {
        let contact = { // je cree un objet avec les valeurs que je recupere par les id
            'firstName': document.getElementById("userName").value,
            'lastName': document.getElementById("userLastName").value,
            'address': document.getElementById("userAdress").value,
            'email': document.getElementById("userEmail").value,
            'city': document.getElementById("userCity").value    
        }     
        orderForAPI(basket); //je rappelle la function pour creer un tableau des produits commandés
        let sendInfo = JSON.stringify({ 
            contact,
            products, 
        });

//j'envoie des donnees au serveur    
        fetch(config.host + config.api + '/' + order), {
            method: "post",
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            mode:"cors",
            body: sendInfo            
        }  
            .then(function (response) {
                return response.json()
            })  
            .then(function(data) { //j enregistre le retour  de l'api dans des variables
                let user = data.contact.lastName;
                let orderId = data.orderId;
//ouverture de la page de confirmation ave les parametres dans l url
	       		window.location.assign("confirmation.html?orderId="+orderId+"&user="+user)
            })
            //le retour en cas de non connection au serveur 
            .catch(function(err) {
            console.log('Retour info Api problem: ' + err.message);
            })
    }

});


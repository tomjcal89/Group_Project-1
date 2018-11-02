var api_key = "06T1HtKGcNnaCMel55RhqPd1NsG8GJiIZFYPuXSX3RIaUcxOdltKNkSnhI-EYlm4Nqvsjv-tqPEBL2ytT1PIauam3m11R3y6smUfqUUhUBi_skHvOcANf9FWu5vWW3Yx"


function displayZomato() {

    var queryURL = "https://developers.zomato.com/api/v2.1/categories"

    $.ajax({
        url: queryURL,
        headers: {
         'Accept': 'application/json',
         'user-key': '3a3df368b2259dd907eb09bb356cf09d'
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);

    })
 }
 displayZomato();
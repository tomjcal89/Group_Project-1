var api_key = "06T1HtKGcNnaCMel55RhqPd1NsG8GJiIZFYPuXSX3RIaUcxOdltKNkSnhI-EYlm4Nqvsjv-tqPEBL2ytT1PIauam3m11R3y6smUfqUUhUBi_skHvOcANf9FWu5vWW3Yx"


function randomizer(lat, long) {
    var queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + long + "&radius=3200&category=breakfast%2C%20lunch%2C%20dinner"
    $.ajax({
        url: queryURL,
        headers: {
            'Accept': 'application/json',
            'user-key': '3a3df368b2259dd907eb09bb356cf09d'
        },
        method: "GET"
    }).then(function (response) {

        // From the ajax response the HTML page will show a featured photo, the name of the restaurant, address, type of cusine, cost, and rating-text
        var resp_rest = response.restaurants;
        console.log(response);
        console.log(resp_rest);

        var i = resp_rest[Math.floor(Math.random() * resp_rest.length)];

        console.log(i);
        console.log(i.restaurant.featured_image);
        console.log(i.restaurant.name);
        console.log(i.restaurant.location.address);
        console.log(i.restaurant.cuisines);
        console.log(i.restaurant.average_cost_for_two);
        console.log(i.restaurant.user_rating.rating_text);
        console.log(i.restaurant.location.latitude);
        console.log(i.restaurant.location.longitude);


        var featured = $("<img>");
        featured.addClass("image");
        featured.attr("src", i.restaurant.featured_image);
        featured.attr("width", "300px")
        $("#featured").html(featured);
        $("#name").html(i.restaurant.name);
        $("#add").html(i.restaurant.location.address);
        $("#cuisine").html(i.restaurant.cuisines);
        $("#cost").html(i.restaurant.average_cost_for_two);
        $("#rating").html(i.restaurant.user_rating.rating_text);


    })

    } 

randomizer();




$("#button").on("click", function () {
    getLocation();
    randomizer();
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        if(lat !== position.coords.latitude || long !== position.coords.longitude){
            $(".hide-show").hide();
        }
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    console.log(lat)
    var long = position.coords.longitude;
    console.log(long)
    randomizer(lat, long);
}

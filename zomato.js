


var api_key = "06T1HtKGcNnaCMel55RhqPd1NsG8GJiIZFYPuXSX3RIaUcxOdltKNkSnhI-EYlm4Nqvsjv-tqPEBL2ytT1PIauam3m11R3y6smUfqUUhUBi_skHvOcANf9FWu5vWW3Yx"
var coordinates;

function randomizer(lat, long) {
    var queryURL = "https://developers.zomato.com/api/v2.1/search?lat="+ lat + "&lon=" + long + "&radius=5000&sort=real_distance"

    $.ajax({
        url: queryURL,
        headers: {
            'Accept': 'application/json',
            'user-key': '3a3df368b2259dd907eb09bb356cf09d'
        },
        method: "GET"
    }).then(function (response) {
        console.log(response)

        // From the ajax response the HTML page will show a featured photo, the name of the restaurant, address, type of cusine, cost, and rating-text
        var resp_rest = response.restaurants;
        console.log(response);
        // console.log(resp_rest);

        var i = resp_rest[Math.floor(Math.random() * resp_rest.length)];

        // console.log(i);
        // console.log(i.restaurant.featured_image);
        // console.log(i.restaurant.name);
        // console.log(i.restaurant.location.address);
        // console.log(i.restaurant.cuisines);
        // console.log(i.restaurant.average_cost_for_two);
        // console.log(i.restaurant.user_rating.rating_text);
        console.log(i.restaurant.location.latitude);
        console.log(i.restaurant.location.longitude);


        //changing the restaurant string to an int.
        var nlat = parseFloat(i.restaurant.location.latitude);
        var nlong = parseFloat(i.restaurant.location.longitude)
        var latLong = {lat: nlat, lng: nlong}
        

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


       
        // GOOGLE MAPS STARTS HERE------------------------------
       
        var map; 
        var marker;

        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
            
          });
        
          console.log(map)
          
          marker = new google.maps.Marker({
            position: latLong,
            map: map,
            draggable: false
            
        });
        console.log(latLong)
          
        // GOOGLE MAPS END--------------------
    
    });

};


//giving permision to use current location
$("#button1").on("click", function () {
    getLocation();
})

//
function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition);
}

//getting the your coordinates based off your location
function showPosition(position) {
    var lat = position.coords.latitude;
    console.log(lat);
    var long = position.coords.longitude;
    console.log(long);
    coordinates = {lat, long};
    randomizer(lat, long);
}
//displaying a different restaurant if you dont like the one that is displayed
$("#button2").on("click", function(){
        if (navigator.geolocation) {
            if (coordinates) {
                randomizer(coordinates.lat, coordinates.long);
            } else {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
    });





      
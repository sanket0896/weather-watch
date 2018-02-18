$(document).ready(
    function(){
        getLocation();
    }
);

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( showLocation, showError);
    }
    else{
        alert("Geolocation not supported in your browser!");
    }
}

function showLocation(location) {
    let lat = parseFloat(location.coords.latitude);
    let lng = parseFloat(location.coords.longitude);
    console.log(lng);
    console.log(lat);
    
    let URL = "https://fcc-weather-api.glitch.me/api/current?lon="+lng+"&lat="+lat;
    $.ajax({
        url: URL,
        success: successFn
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function successFn(data) {
    console.log(data);
    $("#curr_location").html(data.name);
    $("#temp").html(data.main.temp+" °C ");
    $("#temp").html((data.main.temp*1.8+32)+" °F");
}
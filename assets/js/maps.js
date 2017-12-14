function initMaps(id,adrs) {
var map = new google.maps.Map(document.getElementById(id), {
 zoom: 8,
 center: {lat: -34.397, lng: 150.644}
});

var geocoder = new google.maps.Geocoder();

geocodeAddress(geocoder, map, adrs);
}

document.getElementById('submit').addEventListener('click', function() {

    initMaps('restMap','Moneda 1495.');
});


function geocodeAddress(geocoder, resultsMap, adrs) {
    var address = adrs;
geocoder.geocode({'address': address}, function(results, status) {
 if (status === 'OK') {
   resultsMap.setCenter(results[0].geometry.location);
   var marker = new google.maps.Marker({
     map: resultsMap,
     position: results[0].geometry.location
   });
 } else {
   alert('Geocode was not successful for the following reason: ' + status);
 }
});
}

initMaps('restMap');

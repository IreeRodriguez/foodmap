$(document).ready(function() {
	//inicializar el funcionamiento del menu select del html//

    $(".button-collapse").sideNav();

    $('select').material_select();

	//#selectedFood es el id de mi menu select, y le indico que cunado el usuario escoga una acicon hasta una funcion//
	$('#selectedFood').on('change', function() {
		//borro mi div restaurantPic que es donde se anadira toda la info nueva//
		$('#restaurantPic').empty();

		//rescato el value de la opcion seleccionada//
		var type = $('#selectedFood').val();
		//busco en mi data el tipo de comida seleccionada por el usuario//
		var food = data[type];
		//inicio un contador desde 0 para poder enumerar los modales//
		var counter = 0;
		//hago un for each que recorra todos los items de la data[type] que rescate//
		$.each(food, function(i, v) {
			//aumenta el contador//
			counter ++;
			//anado a mi div vacio toda la info que necesito de los restaurantes usando clases de materialize//
			$('#restaurantPic').append(
				"<div class='col s6'>" +
					"<div class='card hoverable'>" +
						"<div class='card-image'>" +
							"<a class='waves-effect waves-light modal-trigger' href='#modal" + counter + "'>" +
								"<img src='" + v.photo + "' alt='...'>" +
								"<span class='card-title'>" + v.name +
								"</span>" +
							"</a>" +
						"</div>" +
					"</div>" +
				"</div>" +
				//modal //
				"<div id='modal" + counter + "' class='modal'>"+
					"<div class='modal-content'>"+
						"<a href='#!' class='right modal-action modal-close waves-effect waves-green btn-flat'><i class='fa fa-times' aria-hidden='true'></i></a>" +
						"<h4 class='center-align'>" + v.name + "</h4>" +
                        "<div id='" + counter + "' class= 'video-container'>" +
                        "</div>" + 
						"<p><strong>Adress: </strong>" + v.adress + "</p>" +
						"<p><strong>Price: </strong> <span class='deep-orange-text text-darken-1'>" +
						v.range + "</span></p>" +
					"</div>" +
				"</div>"
			);

            initMaps(counter,v.adress);
			//Codigo para inicializar los modals de materialize//
			$('.modal').modal({
			  dismissible: true, // Modal can be dismissed by clicking outside of the modal
			  opacity: .5, // Opacity of modal background
			  inDuration: 300, // Transition in duration
			  outDuration: 200, // Transition out duration
			  startingTop: '4%', // Starting top style attribute
			  endingTop: '10%', // Ending top style attribute
			});
   	 	});
	});
 });

 $(function(){
   setTimeout(function() {
      $('#splash').fadeOut(500);
  }, 2000);
});

var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
});

infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                     'Error: The Geolocation service failed.' :
                     'Error: Your browser doesn\'t support geolocation.');
                     infoWindow.open(map);
}

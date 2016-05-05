var map;
var geocoder;
var infowindow;
var currentCoords;

function milesToMeters (miles) {
  return miles * 1609;
}

function initGoogleMap () {
  var defaultAddress = "New York, NY";

  // Set Google Maps library variables
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map($("#map-canvass")[0], {zoom: 15, center: {lat: -34.397, lng: 150.644}});

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-location-input'));

  setGoogleMapLocation(defaultAddress);
  locationInputListener();
}

function setGoogleMapLocation (address) {
  // Get geolocation of default address and set map to that location
  geocoder.geocode({'address': address}, function(results, status){
    if (status === google.maps.GeocoderStatus.OK) {
      currentCoords = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};

      map.setCenter(results[0].geometry.location);
      placeMarker(map, results[0]);

    } else {
      console.log("Something went wrong when trying to set the location: " + status);
    }
  });  
}

function placeMarker (map, place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function locationInputListener () {

  $("#pac-location-form").submit(function(e){
    e.preventDefault();

    // Reset map location
    var locationInput = $("#pac-location-input").val();
    setGoogleMapLocation(locationInput);

    // Initialize Google Places Service
    var services = new google.maps.places.PlacesService(map);

    var types =  [
      'natural_feature',
      'convenience_store',
      'grocery_or_supermarket',
      'hospital',
      'pharmacy',
      'doctor',
      'hardware_store',
      'gas_station',
      'airport',
      'parking'
    ];

    for (var i = 0; i < types.length; i++) {
      services.nearbySearch({
        location: currentCoords,
        radius: milesToMeters(1),
        type: [types[i]]
      }, mapServicesCallback);      
    };


  });    

}

function mapServicesCallback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      placeMarker(map, results[i]);
    }
  }
}








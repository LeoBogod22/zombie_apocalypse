var map;
var geocoder;
var infowindow;
var currentCoords;
var defaultAddress = "New York, NY";

var types =  [
  'natural_feature',
  'convenience_store',
  'grocery_or_supermarket',
  'hospital',
  'pharmacy',
  'doctor',
  'hardware_store',
  'gas_station',
  'shopping_mall',
  'airport',
  'parking',
  'liquor_store',
  'bar',
  'night_club',
  'police',
  'locksmith'
];

function milesToMeters (miles) {
  return miles * 1609.34;
}

// Sets the map to default location then adds listener for input
function initGoogleMap () {

  // Set Google Maps library variables
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map($("#map-canvass")[0], {zoom: 15, center: {lat: -34.397, lng: 150.644}});

  var autocomplete = new google.maps.places.Autocomplete($('#pac-location-input')[0]);

  setGoogleMapLocation(defaultAddress);
  locationInputListener();
}

// Listens for client's location input and then resets the map
function locationInputListener () {

  $("#pac-location-form").submit(function(e){
    e.preventDefault();

    // Reset map location
    var locationInput = $("#pac-location-input").val();
    setGoogleMapLocation(locationInput);

  });

}

// Takes an address string and searches for geolocation coordinates.
// Centers map on coordinates then finds and places markers for select places
function setGoogleMapLocation (address) {
  // Get geolocation of default address and set map to that location
  geocoder.geocode({'address': address}, function(results, status){
    if (status === google.maps.GeocoderStatus.OK) {

      currentCoords = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};


      map.setCenter(results[0].geometry.location);
      if (address != defaultAddress){
        createLocation(results[0]);
        findAndMapServices();
      }
    } else {
      console.log("Something went wrong when trying to set the location: " + status);
    }
  });
}

// Called from setGoogleMapLocation
// Loops through a types array place types and calls mapServicesCallback to mark results
function findAndMapServices () {
  // Initialize Google Places Service
  var services = new google.maps.places.PlacesService(map);

  for (var i = 0; i < types.length; i++) {
    services.nearbySearch({
      location: currentCoords,
      radius: milesToMeters(0.5),
      type: [types[i]]
    }, mapServicesCallback);
  };
}

// Callback takes results from Google PlacesService's nearbySearch call
 // Places a marker for each result on map and creates a place record in the backend
function mapServicesCallback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length && i < 5; i++) {
      addPlaceMarker(map, results[i]);
      createPlace(results[i]);
    }
  }
}

// placeObject.name.search(/(\bpond\b|\blake\b|\briver\b)/ig) < 0

function typeFilter (type) {
  return types.indexOf(type) != -1;
}

// Places marker for result. Shows name with place type
function addPlaceMarker (map, place) {
  var placeType = place.types.filter(typeFilter)[0];

  // If place type is a natural feature, but is not a pond, lake or river don't place the marker.
  if (placeType === "natural_feature" && place.name.search(/(\bpond\b|\blake\b|\briver\b)/ig) < 0) {
  } else {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name + " - " + placeType.replace(/_/g, " "));
      infowindow.open(map, this);
    });
  }
}

function addLocationMarker (map, position) {
  marker = new google.maps.Marker({
    map: map,
    position: position
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("Your location");
    infowindow.open(map, this);
  });}

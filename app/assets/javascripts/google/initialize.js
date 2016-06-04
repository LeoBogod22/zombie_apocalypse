var map;
var geocoder;
var infowindow;
var currentCoords;
var defaultAddress = "New York, NY";

// Sets the map to default location then adds listener for input
function initGoogleMap () {

  // Set Google Maps library variables
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map($("#map-canvass")[0], {zoom: 15, center: {lat: -34.397, lng: 150.644}});

  var autocomplete = new google.maps.places.Autocomplete($('#pac-location-input')[0]);

  resetGoogleMapLocation(defaultAddress);
  locationInputListener();
}

// Listens for client's location input and then resets the map
function locationInputListener () {
  $("#pac-location-form").submit(function(e){
    e.preventDefault();

    // Reset map location
    var locationInput = $("#pac-location-input").val();
    resetPage();

    resetGoogleMapLocation(locationInput);
  });
}

// Takes an address string and searches for geolocation coordinates.
// Centers map on coordinates then finds and places markers for select places
function resetGoogleMapLocation (address) {
  // Get geolocation of default address and set map to that location
  geocoder.geocode({'address': address}, function(results, status){
    if (status === google.maps.GeocoderStatus.OK) {
      currentCoords = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};

      map.setCenter(results[0].geometry.location);
      if (address != defaultAddress){
        createLocation(results[0]);
        findAndMapPlaces(map, currentCoords);
      }

    } else {
      console.log("Something went wrong when trying to set the location: " + status);
    }
  });
}

function resetPage () {
  $(`
    #location-address,
    #location-basic-info,
    #location-survival-stats,
    #location-survival-summary,
    #place-resources-navbar ul,
    #resources-display,
    #place-info
  `).empty();

  $("#more-location-info").remove();

  $("#location-results div").show().removeClass("active");
  $("#location-results div:eq(0)").addClass("active");
  $("#location-results").removeData("id");
}

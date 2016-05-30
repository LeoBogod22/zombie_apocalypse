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
  });
}

function addGunShopMarker (map, place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name + " - gun shop");
    infowindow.open(map, this);
  });}

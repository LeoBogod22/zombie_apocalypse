function milesToMeters (miles) {
  return miles * 1609.34;
}

// Called from resetGoogleMapLocation
function findAndMapPlaces (map, coordinates) {
  // Initialize Google Places Service
  var service = new google.maps.places.PlacesService(map);

  searchPlaceByKeyword(service, coordinates, "gun shop", mapGunShopCallback);

  for (var i = 0; i < types.length; i++) {
    searchPlaceByType(service, coordinates, types[i], mapPlaceCallback);

    // All place types done. Set timeout to account for asynchronous nature of external api calls
    if (i === types.length - 1) {
      setTimeout(document.dispatchEvent(placesDone), 500);
    }
  };
}

// Google Place Service searches
  function searchPlaceByType (google_service, coordinates, type, callback) {
    google_service.nearbySearch({
      location: coordinates,
      radius: milesToMeters(0.5),
      type: [type]
    }, callback);
  }

  function searchPlaceByKeyword (google_service, coordinates, keyword, callback) {
    google_service.nearbySearch({
      location: coordinates,
      radius: milesToMeters(0.5),
      keyword: keyword
    }, callback);
  }

// Callbacks. Adds a marker and POSTs to create place in backend
  function mapPlaceCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length && i < 5; i++) {
        addPlaceMarker(map, results[i]);
        createPlace(results[i]);
      }
    }
  }

  function mapGunShopCallback (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length && i < 5; i++) {
        addGunShopMarker(map, results[i]);
        createGunShop(results[i]);
      }
    }
  }

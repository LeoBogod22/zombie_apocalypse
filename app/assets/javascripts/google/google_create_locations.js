function createLocation (locationObject) {
  // debugger;
  var locationInfo = {
    address: locationObject.formatted_address,
    latitude: locationObject.geometry.location.lat(),
    longitude: locationObject.geometry.location.lng()
  };

  // POST /locations

  $.ajax({
    url: "/locations",
    method: "POST",
    data: JSON.stringify(locationInfo),
    dataType: "json",
    contentType: 'application/json',
    success: function(results){
      // debugger;
      $("#location-results").attr("data-id", results.id);

      var resultsDisplay = 
        "<strong>Address:</strong> " + results.address + "<br>" +
        "<strong>Latitude:</strong> " + results.latitude + "<br>" + 
        "<strong>Longitude:</strong> " + results.longitude;

      $("#location-results").append(resultsDisplay);
    },
    fail: function(error) {
      console.log("There was an error saving your location: " + error);
      $("#location-results").append("There were no results for your location.");
    }
  });
}

function createPlace (placeObject) {

  var placeResourceConversion = {
    'natural_feature':        {'types': ['water'], 'count': [30]},
    'convenience_store':      {'types': ['food', 'water'], 'count': [4, 6]},
    'grocery_or_supermarket': {'types': ['food', 'water'], 'count': [10, 15]},
    'hospital':               {'types': ['medicine'], 'count': [10]},
    'pharmacy':               {'types': ['medicine'], 'count': [10]},
    'doctor':                 {'types': ['medicine'], 'count': [5]},
    'hardware_store':         {'types': ['tools'], 'count': [5]},
    'gas_station':            {'types': ['transportation'], 'count': [2]},
    'airport':                {'types': ['transportation'], 'count': [5]},
    'parking':                {'types': ['transportation'], 'count': [5]},
    'shopping_mall':          {'types': ['other'], 'count': [5]},
    'liquor_store':           {'types': ['other'], 'count': [2]},
    'bar':                    {'types': ['other'], 'count': [2]},
    'night_club':             {'types': ['other'], 'count': [2]},
    'police':                 {'types': ['weapons'], 'count': [10]},
    'locksmith':              {'types': ['other'], 'count': [5]}
  };

  var types =  [
    'natural_feature', 'convenience_store', 'grocery_or_supermarket', 'hospital', 'pharmacy',
    'doctor', 'hardware_store', 'gas_station', 'shopping_mall', 'airport',
    'parking', 'liquor_store', 'bar', 'night_club', 'police', 'locksmith'
  ];

  var resourceType;

  for (var i = 0; i < placeObject.types.length; i++) {
    if (types.indexOf(placeObject.types[i]) >= 0) {


      if (placeObject.types[i] === 'natural_feature' && placeObject.name.search(/(\bpond\b|\blake\b|\briver\b)/ig) < 0) {
        break;
      }

      resourceType = placeObject.types[i];
      break;

    }
  };

  var placeInfo
  if (resourceType) {
    placeInfo = {
      name: placeObject.name,
      address: placeObject.vicinity,
      resource_type: placeResourceConversion[resourceType],
      latitude: placeObject.geometry.location.lat(),
      longitude: placeObject.geometry.location.lng(),
      location_id: $("#location-results").data("id")
    };

    debugger;

    $("#results").append("Place result: " + JSON.stringify(placeInfo) + "<br><br>");


    // POST /places

    // $.ajax({
    //   url: "/places",
    //   method: "POST",
    //   data: JSON.stringify(placeInfo),
    //   dataType: "json",
    //   contentType: "application/json",
    //   success: function(results) {
    //     // Do something with results
    //   },
    //   fail: function(error) {
    //     console.log("There was an error saving your place: " + error);
    //   }      
    // });
  }

}




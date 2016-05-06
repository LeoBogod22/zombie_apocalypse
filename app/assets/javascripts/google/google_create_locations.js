function createLocation (locationObject) {
  // debugger;
  var locationInfo = {
    address: locationObject.formatted_address,
    latitude: locationObject.geometry.location.lat(),
    longitude: locationObject.geometry.location.lng()
  };

  $("#results").append("Location results: " + JSON.stringify(locationInfo) + "<br><br>");

  // $.post("/locations", {
  //   address: locationObject.formatted_address,
  //   latitude: locationObject.geometry.location.lat(),
  //   longitude: locationObject.geometry.location.lng()
  // });
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

  for (var i = placeObject.types.length - 1; i >= 0; i--) {
    if (types.indexOf(placeObject.types[i])) {

      if (placeObject.types[i]) === 'natural_feature') {
        if (placeObject.types[i].indexOf(/pond|lake|river/ig) < 0) {
          break;
        }
      }

      resourceType = placeObject.types[i];
      break;
    };
  };

  var placeInfo
  if (resourceType) {
    placeInfo = {
      name: placeObject.name,
      address: placeObject.vicinity,
      resource_type: resourceType,
      latitude: placeObject.geometry.location.lat(),
      longitude placeObject.geometry.location.lng()
    };
  }


  // POST /places

}
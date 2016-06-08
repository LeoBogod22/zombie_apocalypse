function createPlaceNavbar (resources, locationId) {
  var resourceStrings = resources.resource_strings;
  var resourceIds = resources.resource_ids;
  var resourceCounts = resources.resources_count;
  var resourcePlacesCount = resources.resource_places_count;

  var resourceTabs = "";
  var resourceTabWidth = 100.0 / resourceStrings.length;
  var resourceTabHeigth = resourceStrings.length >= 6 ? 50.0 : 100.0;

  for (var i = 0; i < resourceStrings.length; i++) {
    var resource = resourceStrings[i];
    resourceTabs +=
      "<li class='nav-item' style='width:" + Math.max(resourceTabWidth, 25) + "%; height:" + resourceTabHeigth + "%;'>" +
        "<a href='#' class='resource-tab' data-resource-id='" + resourceIds[i] + "' data-resource-count='" + resourceCounts[i] + "' data-resource-places-count='" + resourcePlacesCount[i] + "'>" +
          resource.capitalize() +
        "</a>" +
      "</li>";
  }

  $("#place-resources-navbar").show().children().show();
  $("#place-resources-navbar .nav").append(resourceTabs);

  getResourcePlaces(locationId, resourceIds[0]);
  document.dispatchEvent(haveResults);

  resourceTabClickCallback();
}

function resourceTabClickCallback () {
  $(".resource-tab").click(function (e) {
    e.preventDefault();
    $(".resource-tab").removeClass("active");

    $(e.target).addClass("active");
    var resourceId = $(e.target).data("resource-id");

    getResourcePlaces(getLocationId(), resourceId);
  });
}

function getResourcePlaces (locationId, resourceId) {
  $.ajax({
    url: '/places/' + locationId + '/' + resourceId,
    method: 'GET',
    dataType: 'json',
    success: function (results) {
      var resourcePlacesList = "";
      for (var i = 0; i < results.places.length; i++) {
        var place = results.places[i];

        resourcePlacesList += "<li><a href='#' class='resource-place' data-place-id='" + place.id + "'>" + place.name + "</a></li>"
      }

      $("#places-list").empty().append(resourcePlacesList);
      $("#resource-summary, #place-info").empty();
      $("#place-results").show();

      getResourceSummary(resourceId);
      placeClickCallback();
    },
    error: function (xhr, status, error) {
      console.log("Something went wrong: " + error);
    }
  });
}

function getResourceSummary (resourceId) {
  var resourceCap = {
    0: 30,
    // weapons
    1: 30,
    // water
    2: 20,
    // food
    3: 15,
    // medicine
    4: 5,
    // tools
    // 5 (transportation) and 6 (other) have no cap
  }

  var resourceTab = $(".resource-tab[ data-resource-id='" + resourceId + "' ]");
  var resource = resourceTab.text().toLowerCase();
  var capacity = parseInt(resourceTab.data("resource-count")) > resourceCap[resourceId];
  var resourceSummary = resource != "other" ?
    "You had " + resourceTab.data("resource-places-count") + " places with " + resource + " nearby. " : "";

  if (capacity) {
    resourceSummary += "There was plenty of " + resource + " but you could only carry " + resourceCap[resourceId];
  } else if (resourceId === 5) {
    resourceSummary += "You're lucky. Not everyone will has a working vehicle nearby when the undead appear.";
  } else if (resourceId === 6) {
    resourceSummary += "Lucky you. You have a way to keep yourself entertained when there are no zombies nearby.";
  } else {
    resourceSummary += "You were able to scrounge up " + resourceTab.data("resource-count") + " " + resource;
  }

  $("#resource-summary").append(resourceSummary);
}

function placeClickCallback () {
  $(".resource-place").click(function (e) {
    e.preventDefault();
    var placeId = $(e.target).data('place-id');

    $.ajax({
      url: '/places/' + placeId,
      method: 'GET',
      dataType: 'json',
      success: function (results) {
        $("#place-info").empty();
        // name, address, lat, lng, resource type, resource count, description
        var placeInfo =
          "<h5>" + results.place.name + "</h5>" +
          "<strong>Address: </strong>" + results.place.address + "<br>" +
          "<strong>Latitude: </strong>" + results.place.latitude + "<br>" +
          "<strong>Longitude: </strong>" + results.place.longitude + "<br>" +
          "<strong>Resource: </strong>" + results.place.resource_type + "<br>" +
          "<strong>Count: </strong>" + results.place.resource_count + "<br>" +
          "<strong>Description: </strong>" + results.place.description + "<br>";

        $("#place-info").append(placeInfo);
      },
      error: function (xhr, status, error) {
        console.log("Something went wrong: " + error);
      }
    })
  });
}

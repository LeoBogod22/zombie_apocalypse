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
        $("#place-info").append(JSON.stringify(results));
      },
      error: function (xhr, status, error) {
        console.log("Something went wrong: " + error);
      }
    })
  });
}

function resourceTabClickCallback () {
  $(".resource-tab").click(function (e) {
    e.preventDefault();
    $(".resource-tab").removeClass("active");

    $(e.target).addClass("active");
    var locationId = $("#location-results").data("id");
    var resourceId = $(e.target).data("resource-id");

    getResourcePlaces(locationId, resourceId);
  });
}

function createPlaceNavbar (resources, locationId) {
  var resourceStrings = resources.resource_strings;
  var resourceIds = resources.resource_ids;
  var resourceCounts = resources.resources_count;
  var resourcePlacesCount = resources.resource_places_count;

  // Put other in back of arrays
  if (resourceStrings.indexOf("other") >= 0) {
    var index = resourceStrings.indexOf("other");

    resourceStrings.push(resourceStrings.splice(index, 1)[0]);
    resourceIds.push(resourceIds.splice(index, 1)[0]);
    resourceCounts.push(resourceCounts.splice(index, 1)[0]);
    resourcePlacesCount.push(resourcePlacesCount.splice(index, 1)[0]);
  }

  var resourceTabs = "";
  for (var i = 0; i < resourceStrings.length; i++) {
    var resource = resourceStrings[i];
    resourceTabs +=
      "<li class='nav-item'>" +
        "<a href='#' class='resource-tab' data-resource-id='" + resourceIds[i] + "' data-resource-count='" + resourceCounts[i] + "' data-resource-places-count='" + resourcePlacesCount[i] + "'>" +
          resource[0].toUpperCase() + resource.slice(1) +
        "</a>" +
      "</li>";
  }

  $("#place-resources-navbar").show().children().show();
  $("#place-resources-navbar .nav").append(resourceTabs);
  var activeResourceTab = $("#place-resources-navbar .nav .nav-item a:eq(0)");
  activeResourceTab.addClass("active");
  getResourcePlaces(locationId, activeResourceTab.data("resource-id"));
  resourceTabClickCallback();
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

        resourcePlacesList += "<a href='#' class='resource-place' data-place-id='" + place.id + "'>" + place.name + "</a>"
      }

      $("#resources-display").empty().append(resourcePlacesList);
      $("#place-results, #resources-display, #place-info").show();

      placeClickCallback();
    },
    error: function (xhr, status, error) {
      console.log("Something went wrong: " + error);
    }
  });
}

function locationClickCallback () {
  $("#more-location-info").click(function (e) {
    e.preventDefault();
    var id = $("#location-results").data("id");

    getLocation(id);
    $(e.target).hide();
  });
}

function getLocation (id) {
  $.ajax({
    url: '/locations/' + id,
    method: 'GET',
    dataType: 'json',
    success: function (results) {
      $("#location-results-navbar, #location-results").show();
      $("#location-results .active").show().children("div").show();

      var [resourceStrings, resourceCounts] = moveOtherToBack(results.location.resources.resource_strings, results.location.resources.resources_count);
      var resourceList = "<h5>Resources nearby</h5>" + buildResourceList(resourceStrings, resourceCounts);

      var basicInfo =
        "<div id='location-latitude'><strong>Latitude: </strong>" + results.location.latitude + "</div>" +
        "<div id='location-longitude'><strong>Longitude: </strong>" + results.location.longitude + "</div>" +
        "<div id='location-resource-list'>" + resourceList + "</div>";

      $("#location-basic-info").append(basicInfo);
      // debugger;
      fetchSurvivalStats(id);
      locationNavbarClickCallback();
    },
    fail: function(error) {
      console.log("There was an error saving your place: " + error);
    }
  });
}

function moveOtherToBack (strings, counts) {
  if (strings.indexOf("other") >= 0) {
    var index = strings.indexOf("other");
    strings.push(strings.splice(index, 1)[0]);
    counts.push(counts.splice(index, 1)[0]);
  }
  return [strings, counts];
}

function buildResourceList (resourceStrings, resourceCounts) {
  var resourceList = "<ul>";
  for (var i = 0; i < resourceStrings.length; i++) {
    resourceList += "<li>" + resourceStrings[i] + " - " + resourceCounts[i] + " points" + "</li>"
  }
  resourceList += "</ul>";
  return resourceList;
}

function fetchSurvivalStats (id) {
  // debugger;
  $.ajax({
    url: '/locations/' + id + '/survival',
    method: 'GET',
    dataType: 'json',
    success: function (results) {
      $("#location-survival-stats").hide();
      $("#location-survival-stats").append(JSON.stringify(results));
    },
    error: function (error) {
      console.log("Something went wrong: " + error);
    }
  });
}

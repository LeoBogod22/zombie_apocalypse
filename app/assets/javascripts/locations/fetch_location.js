function locationClickCallback () {
  $("#more-location-info").click(function (e) {
    e.preventDefault();

    var id = $("#location-results").data("id");

    getLocation(id);
  });
}

function getLocation (id) {
  $.ajax({
    url: '/locations/' + id,
    method: 'GET',
    dataType: 'json',
    success: function (results) {
      $("#location-results").append(JSON.stringify(results.location));
    },
    fail: function(error) {
      console.log("There was an error saving your place: " + error);
    }
  });
}

function getPopulationDensity (latitude, longitude) {
  var url = "http://www.datasciencetoolkit.org/coordinates2statistics/" + latitude + "%2c" + longitude + "?statistics=population_density";

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'jsonp',
    success: function (results) {
      // $("#location-results").append("You got this back from datasciencetoolkit.org: <br>" + JSON.stringify(results) + "<br>");
      $("#location-results").append("<br><br>Your population density is " + results[0].statistics.population_density.value + " people per square km.<br>");
    },
    fail: function (error) {
      console.log("There was an error saving your place: " + error);
    }
  });
}

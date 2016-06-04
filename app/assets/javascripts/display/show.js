function showResults () {
  $("#results").show();
  var activeResultIndex = $("#results-navbar .nav .nav-item a").index($("#results-navbar a.active"));

  debugger;
  // location
  if (activeResultIndex === 0) {
    $("#place-results-container").hide();
    $("#location-results-container").show();

    var activeLocationResultIndex = $("#location-results-navbar .nav .nav-item a").index($("#location-results-navbar a.active"));
    $("#location-results div").hide();
    $("#location-results div").eq(0).show().children().show();

  // places
  } else {
    $("#location-results-container").hide();
    $("#place-results-container").show();
  }
}

function resultsNavbarClickCallback () {
  $("#results-navbar .nav .nav-item a").click(function (e) {
    e.preventDefault();
    $("#results-navbar .nav .nav-item a").removeClass("active");
    $(e.target).addClass("active");
    showResults();
  })
}

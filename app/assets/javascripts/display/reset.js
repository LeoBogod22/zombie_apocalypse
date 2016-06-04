function resetPage () {
  $(`
    #location-address,
    #location-basic-info,
    #location-survival-stats,
    #location-survival-summary,
    #place-resources-navbar .places-list,
    #resources-display,
    #place-info
  `).empty();

  $("#more-location-info").remove();

  $("#results").hide();
  $("#location-results div").hide().removeClass("active");
  $("#location-results-container, #place-results-container").hide();

  $("#location-results").removeData("id");
}

function resetActive () {

}

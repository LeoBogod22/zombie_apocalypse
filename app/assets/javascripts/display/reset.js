function resetPage () {
  $(`
    #location-address,
    #location-basic-info,
    #location-survival-stats,
    #location-survival-summary,
    #place-resources-navbar ul,
    #resources-display,
    #place-info
  `).empty();

  $("#more-location-info").remove();

  $("#location-results div").show().removeClass("active");
  $("#location-results div:eq(0)").addClass("active");
  $("#location-results").removeData("id");
}

function locationNavbarClickCallback () {
  $("#location-results-navbar .nav .nav-item a").click(function (e) {
    e.preventDefault();

    var locationNavbarTabs = $("#location-results-navbar .nav .nav-item a");
    locationNavbarTabs.removeClass("active");
    $(e.target).addClass("active");

    var showTarget = $(e.target).data("target");
    $("#location-results div").removeClass("active").hide();
    $("#" + showTarget).addClass("active").show().children().show();

  });
}

function locationClickCallback () {
  $("#more-location-info").click(function (e) {
    e.preventDefault();
    var id = $("#location-results").data("id");

    getLocation(id);
    $(e.target).remove();
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
      fetchSurvivalStats(id);
      createPlaceNavbar(results.location.resources, id);
      locationNavbarClickCallback();
    },
    error: function(xhr, status, error) {
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
      var survival = results.location_survival.survival ? "You survived the zombie outbreak you lucky son of a gun" : "I'm sorry but you didn't make it. Please don't eat my brain.";
      $("#location-survival-stats, #location-survival-summary").hide();

      var survivalStats =
        "<div id='location-population-density'><strong>Population density: </strong>" + results.location_survival.population_density + " people per sq km</div>" +
        "<div id='location-percent-survival'><strong>Percent survival: </strong>" + (results.location_survival.percent_survival * 100).toFixed(2) + "% chance of survival</div>" +
        "<div id='location-survival-status'><p>" + survival + "</p></div>";
      $("#location-survival-stats").append(survivalStats);

      $("#location-survival-summary").append(buildSurivalSummary(results));
    },
    error: function (xhr, status, error) {
      console.log("Something went wrong: " + error);
    }
  });
}

function buildSurivalSummary (results) {
  var names = ["Wilbert",  "Dalton",  "Dudley",  "Lucio",  "Reid",  "Octavio",  "Francesco",  "Willie",  "Amado",  "Tyler",  "Christie",  "Iliana",  "Leia",  "Teofila",  "Alejandrina",  "Shawnee",  "Aja",  "Lai",  "Marianna", "Amanada"];
  var randomIndex = Math.floor(Math.random() * names.length);
  var randomName = names[randomIndex];
  var gender = randomIndex >= names.length/2 ? "She" : "He";
  var randomNumber = Math.floor(Math.random() * 30) + 1;
  var nthChild;
  if (randomNumber === 1) {
    nthChild = "1st";
  } else if (randomNumber === 2) {
    nthChild = "2nd";
  } else if (randomNumber === 3) {
    nthChild = "3rd";
  } else {
    nthChild = String(randomNumber) + "th";
  }

  var summary;

  // Summary based on survival and how their location's population density compared to normal US city

  // Managed to survive
  if (results.location_survival.survival) {
// Need to add more customization based on their resources
// if they have particularly high survival odds, chances are they have a lot of resources nearby
// Should add to survival algorithm to account find out if their survival odds are high because of high resources or low population


    summary = results.location_survival.population_density > 8098.8928 ?
    // Managed to survive in a populated city
      "You managed to scrounge up enough resources nearby to survive the zombie outbreak. " +
      "You got everything you could find and hulled up in your home afterwards. " +
      "It was mass hysteria and you trampled some people while looting, trying to get away from the zombie horde, including your neighbor, " + randomName + ". " +
      "I'm sorry but " + randomName + " is a zombie now. " + gender + " will live on in spirit as a flesh eating cannibal that moves at 2 miles per hour. " +
      "But don't worry. One day when you come out from your shelter with the thousand-yard stare and shotgun in hand, you will be the one to take back society and rebuild it better, with blackjack and hookers. " +
      "In fact, forget the society and the blackjack. Ah screw the whole thing."
      :
    // Managed to survive in a less populated city
      "Wow you survived and there was no competition for supplies. " +
      "It was like a walk in the park and you just waltz up the the stores like it was nothing and looted the place. " +
      "Where was everyone? You got all the resources without having to fight of many zombies and or race anyone for stuff. " +
      "Man the zombie apocalypse is a breeze. You should just sit on your roof with a beer in hand and watch as the zombies wander aimlessly in the distance. " +
      "They'll give up and walk away soon enough when they can't find anyone else. You lucky devil."

  // Became a zombie
  } else {
    summary = results.location_survival.population_density > 8098.8928 ?
    // Did not survive in a populated city
      "The zombie horde was too much. You live in a pretty populated place. " +
      "There were way too many zombies in the area and you were completely surrounded while trying to get away. " +
      "You were in a market trying to loot whatever you could when you hear the sound of someone screaming. " +
      "Your neighbor " + randomName + " managed to lure every zombie in the surrounding areas to your location. " +
      "The zombies break down the doors and windows to get to the people inside. Sadly you were one of them. In the rush to get away, you were pushed out of the way by some selfish person trying to escape. " +
      "If it makes you feel any better, they also became a zombie an hour later. " +
      "Oh, and don't worry about " + randomName + ". " + gender + " managed to get away and find a place to hide away, until the zombies left for some other place. " +
      randomName + " found someone nice to repopulate society with and " + gender.toLowerCase() + " will name their " + nthChild + " child after you in your memory."
      :
    // Did not survive in a less populated city
      "You didn't survive? That's actually surprising. There are not that many people in your area. What zombies did you actually find? " +
      "Where they the like the really fast zombies from World War Z? Man I hate those. " +
      "Sorry, but you never stood a chance against those World War Z zombies. Why couldn't you get the Romero zombies? Now those you could probably outrun. Hell I think you can even out walk those zombies. " +
      "Sad. I will remember you in spirit. Don't eat me."
  }

  return summary;
}

function searchBandsInTown(artist) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (res) {
    var name = $("<h1>");
    name.text("Name : " + res.name);
    var photo = $("<img>");
    photo.attr("src", res.thumb_url);
    var numOfFans = $("<p>");
    numOfFans.text("Number of fans : " + res.tracker_count);
    var numOfEvents = $("<p>");
    numOfEvents.text("Number of events : " + res.upcoming_event_count);
    var linkToArtist = $("<a>");
    linkToArtist.attr("href", res.url);
    linkToArtist.attr("target", "blank");
    linkToArtist.text("For more info, click this link!");
    $("#artist-div").append(name, photo, numOfFans, numOfEvents, linkToArtist);
  });
  // Using jQuery, append the following to the #artist-div :
  // The artist's name

  // The artists thumbnail image
  // The number of fans tracking this artist
  // The number of upcoming events for this artist
  // A link to the bandsintown url for this artist
  // Note: Append actual HTML elements, not just text
}

// Event handler for user clicking the select-artist button
$("#select-artist").on("click", function (event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the artist name
  var artist = $("#artist-input").val().trim();

  // Running the searchBandsInTown function(passing in the artist as an argument)
  searchBandsInTown(artist);
});

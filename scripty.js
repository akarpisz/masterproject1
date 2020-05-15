var drinkBtn = $("#drinks");
var brewInput = $("#brews");
var resultsDiv = $("#results");
var clearBtn = $("#clear");
var bluesInput =$("#blues");

var city;
var cityId;
var inputarr = [];
var lon;
var lat;
var query;
var restaurants = {};
// var unit = "K";
var resLat;
var resLon;
var dist;
var resName;
var hours;
var resLon;
var resLat;
var resAddress;
var resURL;
var resRating;

var musicBtn = $("#music");
var concerts;
var tmUrl;
var postCode;
var bing;
var evObj;
var resultNum;
var band;
var addr;
var street;
var city;
var stateCode;
var venueUrl;
var eventDist;

var evNameSpan;
var evAddrSpan;  
var venUrlSpan;
var venLink;
var evDistSpan;


var newDiv;
var resNameSpan;
var resAddrSpan;
var resHrsSpan;
var resUrlSpan;
var ratingSpan;
var resLink;
var resDist;

navigator.geolocation.getCurrentPosition((position) => {
  lat = parseFloat(position.coords.latitude);
  lon = parseFloat(position.coords.longitude);
  console.log(lat);
  console.log(lon);
});

function distance(lat, lon, lat2, lon2) {
  if (lat == lat2 && lon == lon2) {
    return 0;
  } else {
    var radlat1 = Math.PI * (lat / 180);
    var radlat2 = Math.PI * (lat2 / 180);
    var theta = lon - lon2;
    var radtheta = Math.PI * (theta / 180);
    dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    return dist;
  }
}


function clear() {
    $(resultsDiv).children().not('div:first').empty();
}

function renderBars() {
  if (resultsDiv.hasClass("hide")) {
    resultsDiv.removeClass("hide");
  }
  for (var i = 0; i < 5; i++) {
    newDiv = $("<div>");
    resNameSpan = $("<span>");
    resAddrSpan = $("<span>");
    resHrsSpan = $("<span>");
    resUrlSpan = $("<span>");
    ratingSpan = $("<span>");
    resDist = $("<span>");
    resLink = $("<a>");

    resAddress = restaurants[i].restaurant.location.address;
    resLat = restaurants[i].restaurant.location.latitude;
    resLon = restaurants[i].restaurant.location.longitude;
    hours = restaurants[i].restaurant.timings;
    resName = restaurants[i].restaurant.name;
    resURL = restaurants[i].restaurant.menu_url;
    resRating = parseFloat(
      restaurants[i].restaurant.user_rating.aggregate_rating
    );

    dist = (distance(lat, lon, resLat, resLon)).toFixed(2);

    resNameSpan.html(resName + "<br/>");
    resAddrSpan.html(resAddress + "<br/>");
    resHrsSpan.html("Hours: " + hours + "<br/>");
    ratingSpan.html("Rating: " + resRating + "<br/>");
    resDist.html(dist + " miles" + "<br/>");
    resLink.html("Click for details" + "<br/>");
    resLink.attr("href", resURL);
    resLink.attr("target", "_blank");
    resUrlSpan.append(resLink);
    resultsDiv.append(
      newDiv.append(
        resNameSpan,
        resAddrSpan,
        resHrsSpan,
        ratingSpan,
        resDist,
        resUrlSpan,
        "<br/>"
      )
    );
  }
}

$(clearBtn).on("click", function(e) {
  e.preventDefault();
  clear();
});

$(drinkBtn).on("click", function (e) {
  e.preventDefault();
  if(brewInput.val().trim().indexOf(' ') >= 0){
     brewInput = brewInput.val().split(" ");
     brewInput = brewInput.join("%20");
     console.log(brewInput);
     query =
    "https://developers.zomato.com/api/v2.1/search?q=" + brewInput + "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&radius=4000&cuisines=227&establishment_type=283%2C161%2C292&category=11&sort=real_distance&order=asc";
} 
else if (brewInput !== "") {
  var input = brewInput.val().trim();
  console.log(input);
  query =
    "https://developers.zomato.com/api/v2.1/search?q=" + input + "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&radius=4000&cuisines=227&establishment_type=283%2C161%2C292&category=11&sort=real_distance&order=asc";
  
} else {
  query =
    "https://developers.zomato.com/api/v2.1/search?lat=" +
    lat +
    "&lon=" +
    lon +
    "&radius=4000&establishment_type=283%2C161%2C292&category=11&sort=real_distance&order=asc";
}

  $.ajax({
    headers: {
      "user-key": "54777615f3d90f6470638ab304cca90e",
      Accept: "application/json",
    },
    url: query,
    method: "GET",
  }).then(function (response) {
    restaurants = response.restaurants;
    console.log(restaurants);
    resultsDiv.removeClass("hide");

    if (restaurants.length === 0) {
      newDiv = $("<div>");
      newDiv.html("<h2>" + "Change your search keywords for better results" + "</h2>");
      resultsDiv.append(newDiv);
    }
    else{
    renderBars();
    }
  });
});



function renderConcerts() {
  if (resultNum === 0) {
    newDiv = $("<div>");
      newDiv.html("<h2>" + "Change your search keywords for better results" + "</h2>");
      resultsDiv.append(newDiv);
  }
  
  if (resultsDiv.hasClass("hide")) {
    resultsDiv.removeClass("hide");
  }

  for (var i = 0; i < 5; i++) {
    band = evObj[i].name;
    street = evObj[i]._embedded.venues[0].address.line1;
    city = evObj[i]._embedded.venues[0].city.name;
    stateCode = evObj[i]._embedded.venues[0].state.stateCode;
    addr = street + ", " + city + " " + stateCode;
    venueUrl = evObj[i]._embedded.venues[0].url;
    evLat = parseFloat(evObj[i]._embedded.venues[0].location.latitude);
    evLon = parseFloat(evObj[i]._embedded.venues[0].location.longitude);
    eventDist = (distance(lat, lon, evLat, evLon)).toFixed(2);

    newDiv = $("<div>");
    evNameSpan = $("<span>");
    evAddrSpan = $("<span>");
    venUrlSpan = $("<span>");
    venLink = $("<a>");
    evDistSpan = $("<span>");

    evNameSpan.html(band + "<br/>");
    evAddrSpan.html(addr + "<br/>");
    venLink.html("Venue Details" + "<br/>");
    venLink.attr("src", venueUrl);
    venLink.attr("target", "_blank");
    
    evDistSpan.html(eventDist + "miles " + "<br/>");

    venUrlSpan.append(venLink);
    resultsDiv.append(newDiv.append(evNameSpan, evAddrSpan, venUrlSpan, evDistSpan, "<br/>"));
  }
}
$(musicBtn).on("click", function (e) {
  e.preventDefault();
  if(bluesInput.val().trim().indexOf(' ') >= 0){
    bluesInput = bluesInput.val().split(" ");
    bluesInput = bluesInput.join("%20");
    console.log(bluesInput);
    tmUrl =
    "https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&keyword=" + bluesInput + "&latlong=" +
    lat +
    "," +
    lon +
    "&radius=100&unit=miles&apikey=jU8GzC1wG1A48BjlxlTRirxmEQwRLpAV";
} 
else if (brewInput !== "") {
 var input = bluesInput.val().trim();
 console.log(input);
 tmUrl =
    "https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&keyword=" + input + "&latlong=" +
    lat +
    "," +
    lon +
    "&radius=100&unit=miles&apikey=jU8GzC1wG1A48BjlxlTRirxmEQwRLpAV";
 
} else {
  tmUrl =
  "https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&latlong=" +
  lat +
  "," +
  lon +
  "&radius=100&unit=miles&apikey=jU8GzC1wG1A48BjlxlTRirxmEQwRLpAV";
}

  // tmUrl =
  //   "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=fJ8NqHO29YPZO64hyJI671TsUFTHgAfT";

  $.ajax({
    url: tmUrl,
    method: "GET",
  }).then(function (response) {
    resultNum = parseInt(response.page.totalElements);
    evObj = response._embedded.events;
    console.log(evObj);
    renderConcerts();
  });
});
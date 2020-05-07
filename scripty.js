


var btn = $("#drinks");
var resultsDiv = $("#results");

var test;
var city;
var cityId;
var inputarr = [];
var lon;
var lat;
var query;
var restaurants= {};
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

navigator.geolocation.getCurrentPosition((position) => {
  lat = parseFloat(position.coords.latitude);
  lon = parseFloat(position.coords.longitude);
  console.log(lat);
  console.log(lon);
});


// function distance(lat, lon, resLat, resLon) {
//   if ((lat == resLat) && (lon == resLon)) {
//       return 0;
//   }
//   else {
//       var radlat1 = Math.PI * (lat/180);
//       var radlat2 = Math.PI * (resLat/180);
//       var theta = lon-resLon;
//       var radtheta = Math.PI * (theta/180);
//       dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//       if (dist > 1) {
//           dist = 1;
//       }
//       dist = Math.acos(dist);
//       dist = dist * 180/Math.PI;
//       dist = dist * 60 * 1.1515;
  
//       return dist;
//   }};

function distance(lat, lon, lat2, lon2) {
  if ((lat == lat2) && (lon == lon2)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * (lat/180);
      var radlat2 = Math.PI * (lat2/180);
      var theta = lon-lon2;
      var radtheta = Math.PI * (theta/180);
      dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
  
      return dist;
  }};


$(btn).on("click", function (e) {
  e.preventDefault();

query =
"https://developers.zomato.com/api/v2.1/search?lat=" + lat +"&lon=" + lon + "&radius=4000&cuisines=227&establishment_type=7%2C6%2C283%2C161%2C292&category=11&sort=real_distance&order=asc"
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
    
    for (var i = 0; i < 5; i++) {
      resAddress = restaurants[i].restaurant.location.address;
        resLat = restaurants[i].restaurant.location.latitude;
        resLon = restaurants[i].restaurant.location.longitude;
        hours = restaurants[i].restaurant.timings;
        resName = restaurants[i].restaurant.name;
        resURL = restaurants[i].restaurant.menu_url;
        resRating = restaurants[i].restaurant.user_rating.aggregate_rating;
        
        dist = distance(lat, lon, resLat, resLon);
        console.log(dist);
    };

  });});






function renderConcerts() {
  if (resultNum === 0) {
    alert("No live events within a 50 mile radius");
  } else {
    console.log(evObj);
    
    for (var i = 0; i<5; i++){
    band = evObj[i].name;
    street =(evObj[i]._embedded.venues[0].address.line1);
    city = (evObj[i]._embedded.venues[0].city.name);
    stateCode = (evObj[i]._embedded.venues[0].state.stateCode);
    addr =  street + ", " + city + " " + stateCode;
    venueUrl = evObj[i]._embedded.venues[0].url;
    evLat = parseFloat(evObj[i]._embedded.venues[0].location.latitude);
    evLon = parseFloat(evObj[i]._embedded.venues[0].location.longitude);
    eventDist = distance(lat,lon,evLat,evLon);
    
    console.log(eventDist);
    
   
    

    
    
    
  }};
  
};
$(musicBtn).on("click", function (e) {
    e.preventDefault();
    bing = "http://dev.virtualearth.net/REST/v1/Locations/" + lat + "," + lon + "?includeEntityTypes=Postcode1&inclnb=0&key=ApwvG3nj84vYuuLndoBvpO-v-2DRvBYWOMe6Qn91TMKEEDNpjri-pNSd-ihAIT_Q";


$.ajax({
    url: bing,
    method: "GET"
}).then(function(response){
    postCode = (response.resourceSets[0].resources[0].address.postalCode);
    console.log(postCode);
    console.log(response);
    
    // tmUrl = "https://app.ticketmaster.com/discovery/v2/events.json?locale=en-us&classificationName=music&postalCode=" + postCode + "&radius=100&unit=miles&apikey=jU8GzC1wG1A48BjlxlTRirxmEQwRLpAV";
    tmUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=fJ8NqHO29YPZO64hyJI671TsUFTHgAfT";

    $.ajax({
        url: tmUrl,
        method: "GET"
    }).then(function(response) {
        resultNum = parseInt(response.page.totalElements);
        
        evObj = response._embedded.events;
        renderConcerts();
    });
})
});
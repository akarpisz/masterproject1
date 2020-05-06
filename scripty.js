
var btn = $("#submit");

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

navigator.geolocation.getCurrentPosition((position) => {
  lat = parseFloat(position.coords.latitude);
  lon = parseFloat(position.coords.longitude);
  console.log(lat);
  console.log(lon);
});


function distance(lat, lon, resLat, resLon) {
  if ((lat == resLat) && (lon == resLon)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * (lat/180);
      var radlat2 = Math.PI * (resLat/180);
      var theta = lon-resLon;
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


$(btn).on("click", function () {

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
    resAddress = restaurants[0].restaurant.location.address
    console.log(address);
    resLat = restaurants[0].restaurant.location.latitude;
    resLon = restaurants[0].restaurant.location.longitude;
    hours = restaurants[0].restaurant.timings;
    resName = restaurants[0].restaurant.name;
    resURL = restaurants[0].restaurant.menu_url;
    resRating = restaurants[0].restaurant.user_rating.aggregate_rating;
    distance(lat, lon, resLat, resLon);
    console.log(dist);
    


  });});

for (var i = 0; i < 5; i++) {
  
}
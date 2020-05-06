var input = $("#brewery");
var btn = $("#submit");
var apiKey =
  "apikey=47gS6GQi6mEI86nCQS_iwcIUY_lmh2C767yVJei_hiTzdPTC3dA_VJKINJZI6nbEV2-aVOct7NyVLdUNIdVf_bBiYbUUGYfdtxtQoN6t5LcPs0RL6Gm7-BGx94mrXnYx";
var test;
// --header "Accept: application/json" --header "user-key: 54777615f3d90f6470638ab304cca90e" "https://developers.zomato.com/api/v2.1/locations?query=new%20york

var header1 = "Accept: application/json";
var header2 = "user-key: 54777615f3d90f6470638ab304cca90e";

$(btn).on("click", function () {
  test =
    "https://developers.zomato.com/api/v2.1/locations?q=" +
    input.val().trim();

  // $.ajaxSetup({
  //     beforeSend: function(xhr) {
  //         xhr.setRequestHeader();
  //     }
  // });
  $.ajax({
    headers: {
      "user-key": "54777615f3d90f6470638ab304cca90e",
      Accept: "application/json",
    },
    url: test,
  }).then(function (response) {
    console.log(response);
  });
});

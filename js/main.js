$(document).ready(function () {
  var geo = navigator.geolocation;
  var icons = {
    "01d": "<i class='wi wi-day-sunny'></i>",
    "02d": "<i class='wi wi-day-cloudy'></i>",
    "03d": "<i class='wi wi-cloud'></i>",
    "04d": "<i class='wi wi-cloudy'></i>",
    "09d": "<i class='wi wi-rain'></i>",
    "10d": "<i class='wi wi-day-rain'></i>",
    "11d": "<i class='wi wi-thunderstorm'></i>",
    "13d": "<i class='wi wi-snow'></i>",
    "50d": "<i class='wi wi-dust'></i>",
    "01n": "<i class='wi wi-night-clear'></i>",
    "02n": "<i class='wi wi-night-alt-cloudy'></i>",
    "03n": "<i class='wi wi-cloud'></i>",
    "04n": "<i class='wi wi-cloudy'></i>",
    "09n": "<i class='wi wi-rain'></i>",
    "10n": "<i class='wi wi-night-alt-rain'></i>",
    "11n": "<i class='wi wi-thunderstorm'></i>",
    "13n": "<i class='wi wi-snow'></i>",
    "50n": "<i class='wi wi-dust'></i>"
  }

  // Initialize location to Manhattan
  getWeather(40.79, -73.97);

  // Get weather for current location
  if (geo) {
    geo.getCurrentPosition(function (position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }

  function getWeather(lat, lon) {
    $.getJSON(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&APPID=4aa9a70d507ed98584e3b1232bfd25fb`,
      function (api) {
        let icon = icons[api.weather[0].icon];
        let description = api.weather[0].description;
        let city = api.name;
        let country = api.sys.country;
        let temp = Math.round(api.main.temp);

        // Capitalize description
        description = description[0].toUpperCase() + description.slice(1);
  
        $("#title").html(`L${icon}cal Weather`);
        $("#description").html(`${description} in ${city}, ${country}`);
        $("#temperature").html(temp);
        $("#units").html("<i class='wi wi-celsius'></i>");
      });
  }

  // Convert C <> F
  $("#units").on("click", function() {
    let temp = $("#temperature").html();
    let units = $("#units").html();
    let c = "<i class='wi wi-celsius'></i>";
    let f = "<i class='wi wi-fahrenheit'></i>";

    if (units.indexOf("celsius") !== -1) {
      $("#temperature").html(Math.round(temp * 9/5 + 32));
      $("#units").html(f);
    } else {
      $("#temperature").html(Math.round((temp - 32) * 5/9));
      $("#units").html(c);
    }
  });
});
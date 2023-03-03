// var APIkey = "f9f8fe997d95f05921c4379ec1099394";
// var APIkey = "ed0c261d13633def93e4ef40ad9584f2"
var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab";


var currentCity;
var cityInputEl = $("#city-input");
var searchBtn = $("#search-button");
var clearBtn = $("#clear-button");
var pastSearchedCitiesEl = $("#past-searches");

function getCoordinates() {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

  fetch(requestUrl)
    .then(function (response) {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (data) {
      var cityInfo = {
        city: currentCity,
        lon: data.coord.lon,
        lat: data.coord.lat,
      };

      storedCities.push(cityInfo);
      localStorage.setItem("cities", JSON.stringify(storedCities));

      displaySearchHistory();

      return cityInfo;
    })
    .then(function (data) {
      getWeather(data);
    });
  return;
}

function getWeather(data) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIkey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentConditionsEl = $("#currentConditions");
      currentConditionsEl.addClass("border border-primary mt-2");

      var cityNameEl = $("<h2>");
      cityNameEl.text(currentCity);
      currentConditionsEl.append(cityNameEl);

      var currentCityDate = data.current.dt;
      currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
      var currentDateEL = $("<span>");
      currentDateEL.text(` (${currentCityDate}) `);
      cityNameEl.append(currentDateEL);

      var currentCityWeatherIcon = data.current.weather[0].icon;
      var currentWeatherIconEL = $("<img>");
      currentWeatherIconEL.attr(
        "src",
        "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png"
      );
      cityNameEl.append(currentWeatherIconEL);

      var currentCityTemp = data.current.temp;
      var currentTempEl = $("<p>");
      currentTempEl.text(`Temp: ${currentCityTemp}°F`);
      currentConditionsEl.append(currentTempEl);

      var currentCityWind = data.current.wind_speed;
      var currentWindEl = $("<p>");
      currentWindEl.text(`Wind: ${currentCityWind} MPH`);
      currentConditionsEl.append(currentWindEl);

      var currentCityHumidity = data.current.humidity;
      var currentHumidityEl = $("<p>");
      currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`);
      currentConditionsEl.append(currentHumidityEl);

      var fiveDayForecastEl = $("#fiveDayForecast");
      var fiveDayForecastHeaderEl = $("#fiveDayForecastHeader");
      var fiveDayHeaderEl = $("<h2>");
      fiveDayHeaderEl.text("5-Day Forecast: ");
      fiveDayForecastHeaderEl.append(fiveDayHeaderEl);

      for (var i = 1; i <= 5; i++) {
        var date;
        var temp;
        var icon;
        var wind;
        var humidity;


        date = data.daily[i].dt;
        date = moment.unix(date).format("MM/DD/YYYY");
        temp = data.daily[i].temp.day;
        icon = data.daily[i].weather[0].icon;
        wind = data.daily[i].wind_speed;
        humidity = data.daily[i].humidity;

        var card = document.createElement("div");
        card.classList.add("card", "col-2", "m-1", "bg-primary", "text-white");

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       Temp: ${temp}°F<br>
                                       Wind: ${wind} MPH <br>
                                       Humidity: ${humidity}%`;

        
        card.appendChild(cardBody);
        fiveDayForecastEl.append(card);
      }
    });
  return;
}

function displaySearchHistory() {
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
  var pastSearchesEl = document.getElementById("past-searches");

  pastSearchesEl.innerHTML = "";

  for (i = 0; i < storedCities.length; i++) {
    var pastCityBtn = document.createElement("button");
    pastCityBtn.classList.add("btn", "btn-primary", "my-2", "past-city");
    pastCityBtn.setAttribute("style", "width: 100%");
    pastCityBtn.textContent = `${storedCities[i].city}`;
    pastSearchesEl.appendChild(pastCityBtn);
  }
  return;
}

function handleClearHistory(event) {
  event.preventDefault();
  var pastSearchesEl = document.getElementById("past-searches");

  localStorage.removeItem("cities");
  pastSearchesEl.innerHTML = "";

  return;
}

function clearCurrentCityWeather() {
  var currentConditionsEl = document.getElementById("currentConditions");
  currentConditionsEl.innerHTML = "";

  var fiveDayForecastHeaderEl = document.getElementById(
    "fiveDayForecastHeader"
  );
  fiveDayForecastHeaderEl.innerHTML = "";

  var fiveDayForecastEl = document.getElementById("fiveDayForecast");
  fiveDayForecastEl.innerHTML = "";

  return;
}

function handleCityFormSubmit(event) {
  event.preventDefault();
  currentCity = cityInputEl.val().trim();

  clearCurrentCityWeather();
  getCoordinates();
  return;
}

function getPastCity(event) {
  var element = event.target;

  if (element.matches(".past-city")) {
    currentCity = element.textContent;

    clearCurrentCityWeather();

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;

    fetch(requestUrl)
      .then(function (response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (data) {
        var cityInfo = {
          city: currentCity,
          lon: data.coord.lon,
          lat: data.coord.lat,
        };
        return cityInfo;
      })
      .then(function (data) {
        getWeather(data);
      });
  }
  return;
}
displaySearchHistory();

searchBtn.on("click", handleCityFormSubmit);

clearBtn.on("click", handleClearHistory);

pastSearchedCitiesEl.on("click", getPastCity);

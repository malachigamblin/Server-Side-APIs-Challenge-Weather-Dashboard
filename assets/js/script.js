var APIkey = "f9f8fe997d95f05921c4379ec1099394";

var currentCity;
var cityInputEl = $("#city-input");
var searchBtn = $("#search-button");
var clearBtn = $("#clear-button");
var pastSearchedCitiesEl = $("#past-searches");

function getWeather(data) {
  var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentConditionsEl = $("#currentConditions");
      currentConditionsEl.addClass("border border-primary");

      var cityNameEl = $("<h2>");
      cityNameEl.text(currentCity);
      currentConditionsEl.append(cityNameEL);

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
      currentWindEl.text(`Wind: ${currentCityWind} KPH`);
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

        date = data.daily[i].dt;
        date = moment.unix(date).format("MM/DD/YYYY");
        temp = data.daily[i].temp.day;
        icon = data.daily[i].weather[0].icon;
        wind = data.daily[i].wind_speed;

        var card = document.createElement("div");
        card.classList.add("card", "col-2", "m-1", "bg-primary", "text-white");

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       ${temp}°F<br>
                                       ${wind} MPH <br>`;

        card.appendChild(cardBody);
        fiveDayForecastEl.append(card);
      }
    });
  return;
}

function displaySearchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var pastSearchesEl = document.getElementById('past-searches');

    pastSearchesEl.innerHTML ='';

    for (i = 0; i < storedCities.length; i++) {
        
        var pastCityBtn = document.createElement("button");
        pastCityBtn.classList.add("btn", "btn-primary", "my-2", "past-city");
        pastCityBtn.setAttribute("style", "width: 100%");
        pastCityBtn.textContent = `${storedCities[i].city}`;
        pastSearchesEl.appendChild(pastCityBtn);
    }
    return;
}
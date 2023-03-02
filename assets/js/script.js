var APIkey = "f9f8fe997d95f05921c4379ec1099394";

var currentCity;
var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');
var clearBtn = $('#clear-button');
var pastSearchedCitiesEl = $('#past-searches');

function getWeather(data) {
    var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            var currentConditionsEl = $('#currentConditions');
            currentConditionsEl.addClass('border border-primary');

            var cityNameEl = $('<h2>');
            cityNameEl.text(currentCity);
            currentConditionsEl.append(cityNameEL);

            var currentCityDate = data.current.dt;
            currentCityDate = moment.unix(currentCityDate).format('MM/DD/YYYY');
            var currentDateEL = $('<span>');
            currentDateEL.text(` (${currentCityDate}) `);
            cityNameEl.append(currentDateEL);


            var currentCityWeatherIcon = data.current.weather[0].icon;
            var currentWeatherIconEL = $('<img>');
            currentWeatherIconEL.attr('src', "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
            cityNameEl.append(currentWeatherIconEL);

            var currentCityTemp = data.current.temp;
            var currentTempEl = $('<p>')
            currentTempEl.text(`Temp: ${currentCityTemp}°F`)
            currentConditionsEl.append(currentTempEl)

            var currentCityWind = data.current.wind_speed;
            var currentWindEl = $('<p>')
            currentWindEl.text(`Wind: ${currentCityWind} KPH`)
            currentConditionsEl.append(currentWindEl);

            var currentCityHumidity = data.current.humidity;
            var currentHumidityEl = $('<p>')
            currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`)
            currentConditionsEl.append(currentHumidityEl);

        })



}

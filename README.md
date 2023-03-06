# Server-Side-APIS-Challenge

## Description

The Ohio State University Coding Boot Camp assigned a homework project to create a weather dashboard that could provide users with both the current weather conditions and the five-day forecast for a particular city. To achieve this, OpenWeatherMap APIs were utilized, which required sending requests with specific parameters to a designated URL to access the weather data. No starter code was provided for this assignment.

## Features

• Two distinct OpenWeather APIs are employed to retrieve the necessary weather information.

• To store search history, localStorage is used, and if any prior search history exists in local storage, it  is displayed when the website first loads.

• Users have the option of either entering a city to search for or clicking on a button for a previously searched city to obtain the current weather and five-day forecast.

• jQuery event listeners are utilized to detect when a user wants to search for a city (including a previously searched city) or clear search history.

• Bootstrap is utilized for styling and creating new components (such as cards for each day of the five-day forecast).

• The UI is clean and straightforward, with graphical representations of the weather.

• Moment.js is used to convert unix timestamp to MM/DD/YYYY format.
 
## Usage

To search for weather data for a specific city, type its name in the search input field. If you wish to obtain weather data for previously searched cities, click on them in the history section. To clear the search history, click the 'Clear Search History' button.

## Links

Deployed application: https://malachigamblin.github.io/Server-Side-APIs-Challenge-Weather-Dashboard/

## Screenshot

The following image shows a screenshot of the application:
<img width="1915" alt="Screenshot 2023-03-02 at 11 48 12 PM" src="https://user-images.githubusercontent.com/118701306/222634000-9e3b1773-96d3-4ac7-96a7-84329e559669.png">

## License

[MIT](https://choosealicense.com/licenses/mit/)
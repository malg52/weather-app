# Weather App

## Description
This is a simple weather web application that shows current weather and forecast for any city.
The app automatically detects user location using geolocation API, or allows manual city search.

##Features
 - Detects your location automatically
 - Search weather by city name
 - Shows current temperature and "feels like"
 - Sunrise and sunset time
 - Day duration
 - Hourly forecast
 - 5-day forecast
 - Error handling (city not found)

##Technologies - HTML, CSS, JavaScript (Vanilla JS), OpenWeather API

Screenshots
<img width="783" height="869" alt="image" src="https://github.com/user-attachments/assets/9e057bbc-1bd0-415e-9e1a-8ffce80e8822" />
<img width="779" height="913" alt="image" src="https://github.com/user-attachments/assets/a44cf1ec-2688-4dbf-aff7-69a36531e145" />


##How it works:
App tries to get your current location.
If denied → uses default city (Bratislava). 
Fetches data from OpenWeather API. 
Displays weather and forecast

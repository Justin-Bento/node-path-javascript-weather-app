import "./style.css";

const currentWeatherConditions = document.querySelector(".curent-conditions");
const searchCountryQuery = document.querySelector("#search-country");
const searchCountryButton = document.querySelector("#search-button");

async function getData() {
  const country = searchCountryQuery.value.trim() || "Toronto"; // Default to Toronto if input is empty
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const days = json.days;

    function createListItem(parent, label, value) {
      const li = document.createElement("li");
      li.textContent = `${label}: ${value || "Not available"}`;
      parent.appendChild(li);
    }

    function displayLocationInfo() {
      const { address, timezone, latitude, longitude } = json;

      // Store the location data in an array
      const locationData = [
        { label: "City Name", value: address },
        { label: "Country", value: timezone },
        { label: "Latitude/Longitude", value: `${latitude}/${longitude}` },
      ];

      // Loop through the array and create <li> elements
      locationData.forEach((item) => {
        createListItem(locationInformation, item.label, item.value);
      });
    }

    function displayCurrentWeatherConditions() {
      if (days && days.length > 0) {
        days.forEach((day) => {
          // Store the weather data in an array
          const weatherData = [
            { label: "Date", value: day.datetime },
            { label: "Max Temperature", value: `${day.tempmax}°C` },
            { label: "Min Temperature", value: `${day.tempmin}°C` },
            { label: "Current Temperature", value: `${day.temp}°C` },
            { label: "Feels Like Max", value: `${day.feelslikemax}°C` },
            { label: "Feels Like Min", value: `${day.feelslikemin}°C` },
            { label: "Feels Like", value: `${day.feelslike}°C` },
            { label: "Dew Point", value: `${day.dew}°C` },
            { label: "Humidity", value: `${day.humidity}%` },
            { label: "Precipitation", value: `${day.precip}mm` },
            { label: "Precipitation Probability", value: `${day.precipprob}%` },
            { label: "Precipitation Cover", value: `${day.precipcover}%` },
          ];

          // Loop through the array and create <li> elements
          weatherData.forEach((item) => {
            createListItem(currentWeatherConditions, item.label, item.value);
          });
        });
      }
    }

    displayLocationInfo();
    displayCurrentWeatherConditions();

    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

searchCountryButton.addEventListener("click", getData());

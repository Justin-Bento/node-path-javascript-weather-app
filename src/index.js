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
      // Assuming the data you want is inside json.address, json.timezone, etc.
      const { address, timezone, latitude, longitude } = json;

      // Create the <ul> dynamically (if it's not already in the HTML)
      if (!locationInfromation) {
        const ulElement = document.createElement("ul");
        ulElement.classList.add("country-address");
        document.body.appendChild(ulElement);
      }

      createListItem(locationInfromation, "City Name", address);
      createListItem(locationInfromation, "Country", timezone);
      createListItem(
        locationInfromation,
        "Latitude/Longitude",
        `${latitude}/${longitude}`
      );
    }

    function displayCurrentWeatherConditions() {
      // If there's at least one day of data
      if (days && days.length > 0) {
        days.forEach((day) => {
          // Extracting the necessary data for each day
          const {
            datetime,
            tempmax,
            tempmin,
            temp,
            feelslikemax,
            feelslikemin,
            feelslike,
            dew,
            humidity,
            precip,
            precipprob,
            precipcover,
          } = day;
          // Create <ul> dynamically if not present in the DOM

          if (!currentWeatherConditions) {
            const ulElement = document.createElement("ul");
            ulElement.classList.add("country-address");
            document.body.appendChild(ulElement);
          }
          // Add day data as <li> items in the DOM

          createListItem(currentWeatherConditions, "Date", datetime);
          createListItem(
            currentWeatherConditions,
            "Max Temperature",
            `${tempmax}°C`
          );
          createListItem(
            currentWeatherConditions,
            "Min Temperature",
            `${tempmin}°C`
          );
          createListItem(
            currentWeatherConditions,
            "Current Temperature",
            `${temp}°C`
          );
          createListItem(
            currentWeatherConditions,
            "Feels Like Max",
            `${feelslikemax}°C`
          );
          createListItem(
            currentWeatherConditions,
            "Feels Like Min",
            `${feelslikemin}°C`
          );
          createListItem(
            currentWeatherConditions,
            "Feels Like",
            `${feelslike}°C`
          );
          createListItem(currentWeatherConditions, "Dew Point", `${dew}°C`);
          createListItem(currentWeatherConditions, "Humidity", `${humidity}%`);
          createListItem(
            currentWeatherConditions,
            "Precipitation",
            `${precip}mm`
          );
          createListItem(
            currentWeatherConditions,
            "Precipitation Probability",
            `${precipprob}%`
          );
          createListItem(
            currentWeatherConditions,
            "Precipitation Cover",
            `${precipcover}%`
          );
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

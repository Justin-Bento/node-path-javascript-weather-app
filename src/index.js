import "./style.css";
const locationInfromation = document.querySelector(".country-address");
const currentWeatherConditions = document.querySelector(
  ".curent-weather-conditions"
);
const searchCountryQuery = doocument.querySelector("#search-country");
// const forcastInformation = document.querySelector(".forcast-information");
// const additionalInformation = document.querySelector(".additional-information");

async function getData() {
  //
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const days = json.days;

    function displayLocationInfo() {
      // Assuming the data you want is inside json.address, json.timezone, etc.
      const { address, timezone, latitude, longitude } = json;

      // Create the <ul> dynamically (if it's not already in the HTML)
      if (!locationInfromation) {
        const ulElement = document.createElement("ul");
        ulElement.classList.add("country-address");
        document.body.appendChild(ulElement);
      }

      // Create <li> elements and append them to the <ul>
      const addressLi = document.createElement("li");
      addressLi.textContent = `City Name: ${address || "Not available"}`;
      locationInfromation.appendChild(addressLi);

      const timezoneLi = document.createElement("li");
      timezoneLi.textContent = `Country: ${timezone || "Not available"}`;
      locationInfromation.appendChild(timezoneLi);

      const latitudeLi = document.createElement("li");
      latitudeLi.textContent = `Latitude/Longitude : ${
        latitude + "/" + longitude || "Not available"
      }`;
      locationInfromation.appendChild(latitudeLi);
    }

    displayLocationInfo();

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

          const dateLi = document.createElement("li");
          dateLi.textContent = `Date: ${datetime}`;
          currentWeatherConditions.appendChild(dateLi);

          const tempMaxLi = document.createElement("li");
          tempMaxLi.textContent = `Max Temperature: ${tempmax}°C`;
          currentWeatherConditions.appendChild(tempMaxLi);

          const tempMinLi = document.createElement("li");
          tempMinLi.textContent = `Min Temperature: ${tempmin}°C`;
          currentWeatherConditions.appendChild(tempMinLi);

          const currentTempLi = document.createElement("li");
          currentTempLi.textContent = `Current Temperature: ${temp}°C`;
          currentWeatherConditions.appendChild(currentTempLi);

          const feelsLikeMaxLi = document.createElement("li");
          feelsLikeMaxLi.textContent = `Feels Like Max: ${feelslikemax}°C`;
          currentWeatherConditions.appendChild(feelsLikeMaxLi);

          const feelsLikeMinLi = document.createElement("li");
          feelsLikeMinLi.textContent = `Feels Like Min: ${feelslikemin}°C`;
          currentWeatherConditions.appendChild(feelsLikeMinLi);

          const feelsLikeLi = document.createElement("li");
          feelsLikeLi.textContent = `Feels Like: ${feelslike}°C`;
          currentWeatherConditions.appendChild(feelsLikeLi);

          const dewLi = document.createElement("li");
          dewLi.textContent = `Dew Point: ${dew}°C`;
          currentWeatherConditions.appendChild(dewLi);

          const humidityLi = document.createElement("li");
          humidityLi.textContent = `Humidity: ${humidity}%`;
          currentWeatherConditions.appendChild(humidityLi);

          const precipLi = document.createElement("li");
          precipLi.textContent = `Precipitation: ${precip}mm`;
          currentWeatherConditions.appendChild(precipLi);

          const precipProbLi = document.createElement("li");
          precipProbLi.textContent = `Precipitation Probability: ${precipprob}%`;
          currentWeatherConditions.appendChild(precipProbLi);

          const precipCoverLi = document.createElement("li");
          precipCoverLi.textContent = `Precipitation Cover: ${precipcover}%`;
          currentWeatherConditions.appendChild(precipCoverLi);
        });
      }
    }
    displayCurrentWeatherConditions();

    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

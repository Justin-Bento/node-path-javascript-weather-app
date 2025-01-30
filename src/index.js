import "./style.css";
import { greeting } from "./greeting.js";
const Address = document.querySelector(".country-address");
const description = document.querySelector(".country-description");
const weatherMeasurement = document.querySelector("#change-metric");

weatherMeasurement.textContent = "Change to C";

const node = document.querySelector(".content");
const section = document.createElement("section");
section.setAttribute("class", ["container"]);
node.appendChild(section);

const GlobalWeather = {
  // Define a method to set country information
  CountryInfo: function (address, description) {
    this.address = address; // Store address
    this.description = description; // Store description
  },

  // Define the method to fetch and display the weather data
  InitializeFetchRequest: async function () {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${process.env.WEATHER_API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      // Create a new CountryInfo object using the fetched data
      const country = new this.CountryInfo(
        json.resolvedAddress,
        json.description
      );

      // Use the properties of the country object to update the DOM elements
      Address.textContent = country.address;
      description.textContent = country.description;

      console.log(json); // Log the full JSON response for debugging
    } catch (error) {
      console.error(error.message); // Handle any errors during the fetch
    }
  },
};

// Call the getData function to fetch and display the weather data
GlobalWeather.InitializeFetchRequest();

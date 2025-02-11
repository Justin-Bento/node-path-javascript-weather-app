import "./style.css";

// Get DOM elements
const Address = document.querySelector(".country-address");
const description = document.querySelector(".country-description");
const weatherMeasurement = document.querySelector("#change-metric");

// Initial text for the metric toggle button
weatherMeasurement.textContent = "Change to C";

// Create and append a new section for layout
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

  // Add Layout to Fetch data
  WebsiteLayout: function (json) {
    // Create a new CountryInfo object using the fetched data
    const country = new this.CountryInfo(
      json.resolvedAddress || "Address not available",
      json.description || "Description not available"
    );
    
    // Use the properties of the country object to update the DOM elements
    Address.textContent = country.address;
    description.textContent = country.description;
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

      // Pass the fetched data to WebsiteLayout
      this.WebsiteLayout(json);

      console.log(json); // Log the full JSON response for debugging
    } catch (error) {
      console.error("Error fetching weather data:", error.message); // Handle any errors during the fetch
    }
  },
};

// Call the function to fetch and display the weather data
GlobalWeather.InitializeFetchRequest();

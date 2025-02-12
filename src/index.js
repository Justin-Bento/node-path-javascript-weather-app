import "./style.css";
const locationInfromation = document.querySelector(".country-address");

async function getData() {
  //
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

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

    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

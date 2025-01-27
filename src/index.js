import "./style.css";
import { greeting } from "./greeting.js";

const node = document.querySelector(".content");
const section = document.createElement("section");
section.setAttribute("class", ["container"]);
node.appendChild(section);

async function getData() {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const heading = document.createElement("h1");
    heading.textContent = json.resolvedAddress;
    section.appendChild(heading);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

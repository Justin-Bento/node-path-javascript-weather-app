import "./style.css";

async function getData() {
  //
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

import _, { add, remove, xor } from "lodash";
const key = "82d187774de3e295c9a75f3749708fe9";

async function findCity(city) {
  try {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`,
      { method: "GET", headers: { accept: "aplication/json" } }
    );
    let data = await response.json();
    return data[0];
  } catch (err) {
    console.error(err);
  }
}

async function getWeather(lat, lon, units = "metric") {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
    { method: "GET", headers: { accept: "aplication/json" } }
  );
  let data = await response.json();
  return data;
}

async function getCityWeather(name) {
  try {
    let city = await findCity(name);
    let weather = -1;
    if (city != undefined) {
      weather = await getWeather(city);
    }
    return weather;
  } catch (err) {
    console.error(err);
  }
}

function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

export { findCity, getWeather, getCityWeather, degToCompass };

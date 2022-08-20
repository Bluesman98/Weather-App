import _ from "lodash";
import { format, fromUnixTime } from "date-fns";
import { findCity, getWeather, degToCompass } from "./weather-api";

const main = document.querySelector(".main");

function name(data, parent) {
  let name_div = document.createElement("div");
  name_div.classList.add("name-container");
  parent.appendChild(name_div);

  let name = document.createElement("span");
  name.textContent = data.name;
  name_div.appendChild(name);

  let state = document.createElement("span");
  state.textContent = data.state;
  name_div.appendChild(state);
}
function dateDaily(data, parent) {
  let date = new Date(fromUnixTime(data.dt));

  let date_div = document.createElement("div");
  date_div.classList.add("date-daily");
  parent.appendChild(date_div);

  let day = document.createElement("div");
  day.textContent = format(date, "EEEE");
  date_div.appendChild(day);

  let dt = document.createElement("div");
  dt.textContent = format(date, "dd LLL yyy");
  date_div.appendChild(dt);
}

function date(data, parent) {
  let date = new Date(fromUnixTime(data.dt));

  let date_div = document.createElement("div");
  date_div.classList.add("date-container");
  parent.appendChild(date_div);

  let dt = document.createElement("div");
  dt.textContent = format(date, "EEEE dd LLL yyy");
  date_div.appendChild(dt);

  let time = document.createElement("div");
  time.textContent = format(date, "HH:mm");
  date_div.appendChild(time);
}

function time(data, parent) {
  let date = new Date(fromUnixTime(data.dt));
  let time = document.createElement("div");
  time.classList.add("time");
  time.textContent = format(date, "HH:mm");
  parent.appendChild(time);
}

function temp(data, parent, units_symbol) {
  let temp_div = document.createElement("div");
  temp_div.classList.add("temp-container");
  parent.appendChild(temp_div);

  let temp_icon = document.createElement("i");
  temp_icon.classList.add("wi", "wi-thermometer");
  temp_div.appendChild(temp_icon);

  let container = document.createElement("div");
  temp_div.appendChild(container);

  let temp = document.createElement("div");
  temp.innerHTML = data.temp + units_symbol;
  container.appendChild(temp);

  let feels_like = document.createElement("div");
  feels_like.innerHTML = "Feels Like " + data.feels_like + units_symbol;
  container.appendChild(feels_like);
}
function tempDaily(data, parent, units_symbol) {
  let div = document.createElement("div");
  div.classList.add("temp-table");
  for (let j = 0; j < 3; j++) {
    let time_div = document.createElement("div");
    let i = document.createElement("i");
    i.classList.add("wi");
    let text = document.createElement("div");
    time_div.classList.add("icon");

    let temp_div = document.createElement("div");
    let temp = document.createElement("div");
    let feels_like = document.createElement("div");

    if (j === 0) {
      i.classList.add("wi-time-3");
      temp = document.createElement("i");
      temp.classList.add("wi", "wi-thermometer");
      temp_div.classList.add("icon");
    } else if (j == 1) {
      i.classList.add("wi-day-sunny");
      text.textContent = "Day";
      temp.innerHTML = data.temp.day + units_symbol;
      feels_like.innerHTML = "Feels Like " + data.feels_like.day + units_symbol;
      temp_div.classList.add("temp-daily");
    } else if (j == 2) {
      i.classList.add("wi-night-clear");
      temp.innerHTML = data.temp.eve + units_symbol;
      feels_like.innerHTML = "Feels Like " + data.feels_like.eve + units_symbol;
      text.textContent = "Evening";
      temp_div.classList.add("temp-daily");
    }
    time_div.appendChild(i);
    time_div.appendChild(text);
    temp_div.appendChild(temp);
    temp_div.appendChild(feels_like);
    div.appendChild(time_div);
    div.appendChild(temp_div);
  }
  parent.appendChild(div);
}

function weather(data, parent) {
  let weather_div = document.createElement("div");
  parent.appendChild(weather_div);

  let weatherIcon = document.createElement("i");
  weatherIcon.classList.add("wi", `wi-owm-${data.weather[0].id}`);
  weather_div.appendChild(weatherIcon);

  let weather_text = document.createElement("div");
  weather_text.textContent = titleCase(data.weather[0].description);
  weather_div.appendChild(weather_text);
}

function humidity(data, parent) {
  let humidity_div = document.createElement("div");
  parent.appendChild(humidity_div);

  let humidityIcon = document.createElement("i");
  humidityIcon.classList.add("fa-solid", "fa-droplet");
  humidity_div.appendChild(humidityIcon);

  let humidity = document.createElement("div");
  humidity.textContent = "Humidity " + data.humidity + "%";
  humidity_div.appendChild(humidity);
}

function wind_speed(data, parent) {
  let wind_div = document.createElement("div");

  parent.appendChild(wind_div);
  let wind_icon = document.createElement("i");
  wind_icon.classList.add("fa-solid", "fa-wind");
  wind_div.appendChild(wind_icon);

  let wind_speed = document.createElement("div");
  wind_speed.textContent = (data.wind_speed * 3.6).toFixed(2) + " km/h";
  wind_div.appendChild(wind_speed);
  parent.appendChild(wind_div);
}

function wind_deg(data, parent) {
  let wind_direction = document.createElement("div");
  let wind_direction_icon = document.createElement("i");
  wind_direction_icon.classList.add(
    "wi",
    "wi-wind",
    `towards-${data.wind_deg}-deg`
  );
  wind_direction.appendChild(wind_direction_icon);

  let wind_deg = document.createElement("div");
  wind_deg.textContent = degToCompass(data.wind_deg);
  wind_direction.appendChild(wind_deg);
  parent.appendChild(wind_direction);
}

function pop(data, parent) {
  let pop_div = document.createElement("div");
  pop_div.classList.add("pop-container");
  parent.appendChild(pop_div);

  let pop_icon = document.createElement("i");
  pop_icon.classList.add("wi", "wi-sleet");
  pop_div.appendChild(pop_icon);

  let pop = document.createElement("div");
  pop.textContent = "Precipitation " + data.pop * 100 + "%";
  pop_div.appendChild(pop);
}

async function weatherCard(city, units = "metric") {
  let city_data = await findCity(city);
  if (city_data) {
    let units_symbol = units === "metric" ? "&#8451" : "&#8457";
    let data = await getWeather(city_data.lat, city_data.lon, units);

    let weather_container = document.createElement("div");
    weather_container.classList.add("weather-container", "current");

    let card = document.createElement("div");
    card.classList.add("weather-card");
    weather_container.appendChild(card);

    let top = document.createElement("div");
    top.classList.add("top");
    name(city_data, top);
    date(data.current, top);
    card.appendChild(top);

    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    card.appendChild(bottom);
    let div2 = document.createElement("div");
    temp(data.current, bottom, units_symbol);
    weather(data.current, bottom);

    let div3 = document.createElement("div");
    humidity(data.current, bottom);
    pop(data.daily[0], bottom);

    wind_speed(data.current, bottom);
    wind_deg(data.current, bottom);

    if (!document.querySelector(".buttons")) {
      main.appendChild(weather_container);
      let button_div = document.createElement("div");
      button_div.classList.add("buttons");
      main.appendChild(button_div);
      radioButtons(city_data, data, button_div, units, units_symbol);
    } else {
      document.querySelector(".buttons").before(weather_container);
    }

    weatherHourly(data, units_symbol);
  } else {
    let error = document.querySelector(".error");
    error.innerHTML =
      'Location not found.<br>Search must be in the form of "City", "City, State" or "City, Country';
  }
}

function weatherHourly(data, units_symbol) {
  let weather_container = document.createElement("div");
  weather_container.classList.add("weather-container", "hourly");

  let today = new Date();
  for (let i = 0; i < 48; i = i + 3) {
    let dt = new Date(fromUnixTime(data.hourly[i].dt));
    if (dt.getDay() !== today.getDay() || i === 0) {
      today = dt;
      let container = document.createElement("div");
      container.classList.add("day-divider");
      let day = document.createElement("span");

      day.textContent = format(today, "EEEE");
      container.appendChild(day);
      weather_container.appendChild(container);
    } else {
      let container = document.createElement("div");
      container.classList.add("day-divider");
      weather_container.appendChild(container);
    }

    let card = document.createElement("div");
    card.classList.add("weather-card");
    weather_container.appendChild(card);

    let top = document.createElement("div");
    top.classList.add("top");
    card.appendChild(top);
    time(data.hourly[i], top);

    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    card.appendChild(bottom);
    temp(data.hourly[i], bottom, units_symbol);
    weather(data.hourly[i], bottom);
    humidity(data.hourly[i], bottom);
    pop(data.hourly[i], bottom);
    wind_speed(data.hourly[i], bottom);
    wind_deg(data.hourly[i], bottom);

    main.appendChild(weather_container);
  }
}

function weatherDaily(data, units_symbol) {
  let weather_container = document.createElement("div");
  weather_container.classList.add("weather-container", "daily");

  let today = new Date();
  for (let i = 0; i < 8; i++) {
    let dt = new Date(fromUnixTime(data.daily[i].dt));
    if (dt.getDay() !== today.getDay() || i === 0) {
      today = dt;
      let container = document.createElement("div");
      container.classList.add("day-divider");
      weather_container.appendChild(container);
    } else {
      let container = document.createElement("div");
      container.classList.add("day-divider");
      weather_container.appendChild(container);
    }

    let card = document.createElement("div");
    card.classList.add("weather-card", "daily");
    weather_container.appendChild(card);

    let top = document.createElement("div");
    top.classList.add("top");
    card.appendChild(top);
    dateDaily(data.daily[i], top);

    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    card.appendChild(bottom);
    weather(data.daily[i], top);
    tempDaily(data.daily[i], top, units_symbol);
    humidity(data.daily[i], bottom);
    pop(data.daily[i], bottom);
    wind_speed(data.daily[i], bottom);
    wind_deg(data.daily[i], bottom);

    main.appendChild(weather_container);
  }
}

function searchBar() {
  let container = document.createElement("div");
  container.classList.add("search-bar");
  main.appendChild(container);

  let div = document.createElement("div");
  container.appendChild(div);

  let input = document.createElement("input");
  input.id = "search-input";
  input.type = "text";
  input.placeholder = "Search Location";
  input.addEventListener("focus", () => {
    addEventListener("keydown", (event) => {
      if (event.key == "Enter") search(input);
    });
  });
  div.appendChild(input);

  let error = document.createElement("div");
  error.classList.add("error");
  main.appendChild(error);

  let btn = document.createElement("i");
  btn.classList.add("fa-solid", "fa-magnifying-glass");
  btn.onclick = () => {
    search(input);
  };
  container.appendChild(btn);
}
function search(input) {
  let temp = document.querySelectorAll(".weather-container");
  if (temp != null) {
    temp.forEach((item) => {
      item.remove();
    });
  }
  let buttons = document.querySelector(".buttons");
  if (buttons) buttons.remove();
  let error = document.querySelector(".error");
  error.innerHTML = "";
  weatherCard(input.value);
  input.value = "";
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

function radioButtons(city_data, data, parent, units, units_symbol) {
  for (let j = 0; j < 2; j++) {
    let radio = document.createElement("form");
    radio.id = "radio-set" + j;

    for (let i = 0; i < 2; i++) {
      //let form = document.createElement('form')
      let input = document.createElement("input");
      let label = document.createElement('label')
      radio.appendChild(input)
      radio.appendChild(label)
     // radio.append(form)
     
      if (i == 0) {
        input.checked = "checked";
        if (j === 0) {
          input.id = 'hourly'
          input.value = "hourly";
          label.innerHTML = "Hourly";
          label.htmlFor = input.id

        } else {
          input.id = 'metric'
          input.value = "metric";
          label.innerHTML = "&#8451";
          label.htmlFor = input.id
        }
      }
      if (i == 1) {
        if (j === 0) {
          input.id = 'daily'
          input.value = "daily";
          label.innerHTML = "Daily";
          label.htmlFor = input.id
        } else {
          input.id = 'imperial'
          input.value = "imperial";
          label.innerHTML = "&#8457";
          label.htmlFor = input.id
        }
      }
      input.type = "radio";
      if (j === 0) {
        input.name = "tab";
      } else {
        input.name = "units";
      }
     // radio.append(input);

      input.addEventListener("click", () => {
        if (
          input.value === "hourly" &&
          document.querySelector(".weather-container.daily")
        ) {
          document.querySelector(".weather-container.daily").remove();
          weatherHourly(data, units_symbol);
        } else if (
          input.value === "daily" &&
          document.querySelector(".weather-container.hourly")
        ) {
          document.querySelector(".weather-container.hourly").remove();
          weatherDaily(data, units_symbol);
        } else if (input.value !== units) {
          if (input.value === "imperial") {
            parent.classList.add("hidden");
            document
              .querySelectorAll(".weather-container")
              .forEach((e) => e.remove());

            weatherCard(city_data.name, "imperial").then((onFulfilled) =>
              parent.classList.remove("hidden")
            );
            units = "imperial";
          } else if (input.value === "metric") {
            parent.classList.add("hidden");
            document
              .querySelectorAll(".weather-container")
              .forEach((e) => e.remove());

            weatherCard(city_data.name, "metric").then((onFulfilled) =>
              parent.classList.remove("hidden")
            );
            units = "metric";
          }
        }
      });
    }
    parent.append(radio);
  }
}

//weatherCard("London");
searchBar();

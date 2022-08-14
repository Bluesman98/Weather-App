import _ from "lodash";
import { format, fromUnixTime } from 'date-fns'
import { findCity, getWeather, degToCompass} from "./weather-api";

const main = document.querySelector(".main");


async function weatherCard(city) {
  let cityData = await findCity(city);
  if (cityData){
    let data = await getWeather(cityData.lat, cityData.lon);

    let weather_container = document.createElement('div')
    weather_container.classList.add('weather-container')

  let card = document.createElement("div")
  card.classList.add("weather-card");
  weather_container.appendChild(card);
  

  let name_div = document.createElement("div");
  card.appendChild(name_div);

  let name = document.createElement("span");
  name.textContent = cityData.name;
  name_div.appendChild(name);

  let state = document.createElement("span");
  state.textContent = cityData.state;
  name_div.appendChild(state);

let date_div = document.createElement('div')
date_div.classList.add('date-container')
card.appendChild(date_div)

 let date = new Date(fromUnixTime(data.current.dt)) 

    let dt = document.createElement('div')
    dt.textContent = format (date,'EEEE dd LLL yyy')
    date_div.appendChild(dt)

    let time = document.createElement('div')
    time.textContent = format(date,'HH:mm')
    date_div.appendChild(time)

  let temp_div = document.createElement('div')
  temp_div.classList.add('temp-container')
  card.appendChild(temp_div)

  let temp_icon = document.createElement('i')
  temp_icon.classList.add('wi','wi-thermometer')
  temp_div.appendChild(temp_icon)

  let container = document.createElement('div')
  temp_div.appendChild(container)

  let temp = document.createElement("div");
  temp.innerHTML = data.current.temp + ` &#8451`;
  container.appendChild(temp);

  let feels_like = document.createElement("div");
  feels_like.innerHTML = "Feels Like " + data.current.feels_like + ` &#8451`;
  container.appendChild(feels_like);

  let weather_div = document.createElement("div");
  card.appendChild(weather_div);

  let weatherIcon = document.createElement("i");
  weatherIcon.classList.add('wi',`wi-owm-${data.current.weather[0].id}`)
  weather_div.appendChild(weatherIcon);

  let weather = document.createElement("div");
  weather.textContent = data.current.weather[0].description;
  weather_div.appendChild(weather);

  let humidity_div = document.createElement('div')
  card.appendChild(humidity_div)
  
  let humidityIcon = document.createElement('i')
  //humidityIcon.classList.add('wi','wi-humidity')
  humidityIcon.classList.add('fa-solid','fa-droplet')
  humidity_div.appendChild(humidityIcon)

  let humidity = document.createElement("div");
  humidity.textContent = "Humidity " + data.current.humidity + "%";
  humidity_div.appendChild(humidity);

  let pop_div = document.createElement('div')
  card.appendChild(pop_div)

  let pop_icon = document.createElement('i')
  pop_icon.classList.add('wi','wi-sleet')
  pop_div.appendChild(pop_icon)

  let pop = document.createElement("div");
  pop.textContent = "Precipitation " + data.hourly[0].pop + "%";
  pop_div.appendChild(pop);

  let wind_div = document.createElement('div')
  card.appendChild(wind_div)

  let wind_icon = document.createElement('i')
  wind_icon.classList.add('fa-solid','fa-wind')
  wind_div.appendChild(wind_icon)

  let wind_speed = document.createElement("div");
  wind_speed.textContent = (data.current.wind_speed*3.6).toFixed(2) + " km/h";
  wind_div.appendChild(wind_speed);

  let wind_direction = document.createElement('i')
  wind_direction.classList.add('wi','wi-wind',`towards-${data.current.wind_deg}-deg`)
  wind_div.appendChild(wind_direction)
  
  let wind_deg = document.createElement("div");
  wind_deg.textContent = degToCompass(data.current.wind_deg) //data.current.wind_deg + " deg";
  wind_div.appendChild(wind_deg);

  main.appendChild(weather_container)
 }
 else{
    let error = document.querySelector('.error')
    error.innerHTML = 'Location not found.<br>Search must be in the form of "City", "City, State" or "City, Country'
 }
}

function searchBar (){
    let container = document.createElement('div')
    container.classList.add('search-bar')
    main.appendChild(container)

    let div = document.createElement('div')
    container.appendChild(div)

    let input = document.createElement('input')
    input.type = 'text'
    div.appendChild(input)

    let error = document.createElement('span')
    error.classList.add('error')
    div.appendChild(error)


    let btn = document.createElement('button')
    btn.textContent = 'Search'
    btn.onclick =  () => {
        let temp = document.querySelector('.weather-container')
        if(temp)main.removeChild(temp)
        error = document.querySelector('.error')
        error.innerHTML = ''
        weatherCard(input.value)
    }
    container.appendChild(btn)

}
searchBar()
//weatherCard("London");

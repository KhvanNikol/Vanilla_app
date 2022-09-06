function formatData(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}
function weatherDescription(response) {
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatData(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
}
function displayWeatherForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let day = ["Wed", "Thu", "Fri", "Sat"];
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42">
          <div class="forecast-weather-temperatures">
            <span class="forecast-weather-temperature-max">30°</span>
                <span class="forecast-weather-temperature-min">25°</span>
          </div>
        `;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}

function search(city) {
  let apiKey = "8bd19818f1a9f1fdc34f62c973ba9f77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherDescription);
}
function submitCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celciusTemperature = null;

function displayCelciusTemp(event) {
  event.preventDefault();
  let celciusElement = document.querySelector("#temperature");
  celciusElement.innerHTML = Math.round(celciusTemperature);
}

displayWeatherForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);
let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemp);
let celciusElement = document.querySelector("#celcius-link");
celciusElement.addEventListener("click", displayCelciusTemp);

search("Tokyo");

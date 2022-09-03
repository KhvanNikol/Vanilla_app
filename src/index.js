function formateData(timestamp) {
  let date = newDate(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDate()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${day}${hour}${minutes}`;
}
function weatherDescription(response) {
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.main.wind;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
dateElement.innerHTML = formateData();
let apiKey = "8bd19818f1a9f1fdc34f62c973ba9f77";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(weatherDescription);

// date info
let now = new Date();

let date = now.getDate();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let seconds = now.getSeconds();
let year = now.getFullYear();
//date info close

let apiKey = "30e9dd107086e8cc692d0c7add1a109e";
let units = "imperial";

let locationSearch = document.querySelector("#location-search");
locationSearch.addEventListener("click", findCurrentLocation);

let currentDayInfo = document.querySelector("#current-day-info");
currentDayInfo.innerHTML = `${day} ${hour}:${minutes}`;

let enterCity = document.querySelector("#enter-a-city");
enterCity.addEventListener("submit", citySearch);

let searchedCityName = document.querySelector("span");

//Functions
function citySearch(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#searched-city");
  searchedCityName.innerHTML = `Currently in ${currentCity.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(getMin);
  axios.get(apiUrl).then(getMax);
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let realTimeTemp = document.querySelector("#current-temp");
  realTimeTemp.innerHTML = `${currentTemp}`;
}

function getMin(response) {
  let minTemp = Math.round(response.data.main.temp_min);
  let currentLow = document.querySelector("span.current-low");
  currentLow.innerHTML = `${minTemp}`;
}

function getMax(response) {
  let maxTemp = Math.round(response.data.main.temp_max);
  let currentHigh = document.querySelector("span.current-high");
  currentHigh.innerHTML = `${maxTemp}`;
}

function fahrenheitChange(event) {
  event.preventDefault();
  let fahrenheitUpdate = document.querySelector("#current-temp");
  fahrenheitUpdate.innerHTML = "100";
}

function celciusChange(event) {
  event.preventDefault();
  let celciusUpdate = document.querySelector("#current-temp");
  celciusUpdate.innerHTML = "37";
}

//location request
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getCurrentTemp);
  axios.get(apiUrl).then(getCurrentCity);
  axios.get(apiUrl).then(getMin);
  axios.get(apiUrl).then(getMax);
}

function getCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let realTimeTemp = document.querySelector("#current-temp");
  realTimeTemp.innerHTML = `${currentTemp}`;
}

function getCurrentCity(response) {
  let currentCityLocation = response.data.name;
  searchedCityName.innerHTML = `Currently in ${currentCityLocation}`;
  //console.log(currentCityLocation);
}

//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", fahrenheitChange);

//let celcius = document.querySelector("#celcius-link");
//celcius.addEventListener("click", celciusChange);

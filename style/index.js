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

let currentDayInfo = document.querySelector("#current-day-info");
currentDayInfo.innerHTML = `${day} ${hour}:${minutes}`;

let searchedCityName = document.querySelector("#city");
let currentCity = document.querySelector("#searched-city");

let currentLow = document.querySelector("span#current-low");
let currentHigh = document.querySelector("span#current-high");
let currentTemp = document.querySelector("#current-temp");
let currentDescription = document.querySelector("#current-description");
let currentEmoji = document.querySelector("#current-emoji");
let currentWind = document.querySelector("span#current-wind");
let currentHumidity = document.querySelector("span#current-humidity");

//Typing in a city
let enterCity = document.querySelector("#enter-a-city");
enterCity.addEventListener("submit", citySearch);

//Functions
//Typing in a city
function citySearch(event) {
  event.preventDefault();
  if (/\d/.test(currentCity.value)) {
    alert("Enter a city name. ");
    document.getElementById("enter-a-city").reset();
  } else {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&units=${units}&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then(updateWeather)
      .catch((error) => {
        alert(error.response.data.message);
        document.getElementById("enter-a-city").reset();
        city.innerHTML = ``;
      });
    if (typeof error === "undefined") {
      searchedCityName.innerHTML = `Currently in ${currentCity.value}`;
    }
  }
}

//Current location upon initial page load
function handlePosition(position) {
  document.getElementById("enter-a-city").reset();
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

//location request
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

// combine all functions.
function updateWeather(response) {
  var nowTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${nowTemp}`;

  let minTemp = Math.round(response.data.main.temp_min);
  currentLow.innerHTML = `${minTemp}`;

  let maxTemp = Math.round(response.data.main.temp_max);
  currentHigh.innerHTML = `${maxTemp}`;

  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${humidity}`;

  let windSpeed = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `${windSpeed}`;

  let currentCityLocation = response.data.name;
  let country = response.data.sys.country;
  searchedCityName.innerHTML = `Currently in ${currentCityLocation}, ${country}`;

  let currentWeather = response.data.weather[0].description;
  currentDescription.innerHTML = `${currentWeather}`;

  let weatherIcon = response.data.weather[0].icon;
  currentEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  fahrenheitCurrentTemp = Math.round(response.data.main.temp);
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function fahrenheitChange(event) {
  event.preventDefault();
  let fahrenheitTemp = fahrenheitCurrentTemp;
  document.querySelector("#current-temp").innerHTML = `${fahrenheitTemp}`;
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function celciusChange(event) {
  event.preventDefault();
  let celciusTemp = Math.round(((fahrenheitCurrentTemp - 32) * 5) / 9);
  document.querySelector("#current-temp").innerHTML = `${celciusTemp}`;
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let fahrenheitCurrentTemp = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitChange);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", celciusChange);

findCurrentLocation();

//Improve the project including the
//search engine,
//API integration,
//unit conversion,
//wind speed,
//precipitation,
//weather description,
//and weather icon
//temp high
//temp low
//are mandatory. The project should not include the forecast yet.

import React from "react";
import "./CurrentWeather.css";

export default function CurrentWeather() {
  let weatherData = {
    city: "",
    description: "",
    emoji: "",
    temp: "64",
    high: "70",
    low: "40",
    humidity: "15",
    wind: "10",
  };

  return (
    <div className="CurrentWeather">
      <div className="block-3">
        <div class="box-1">
          <h1>{weatherData.city} </h1>
        </div>
        <div className="box-2">{weatherData.description}</div>
      </div>

      <div className="block-4">
        <div className="box-1">
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
            alt="Clear"
          />
          {weatherData.emoji}
        </div>

        <div className="box-2">
          <strong>{weatherData.temp}</strong>
          <a href="#" className="active">
            °F
          </a>
        </div>

        <div className="box-3">
          <ul>
            <li>High: {weatherData.high}</li>
            <li>Low: {weatherData.low}</li>
          </ul>
        </div>

        <div className="box-4">
          <ul>
            <li>Humidity: {weatherData.humidity}%</li>
            <li>Wind: {weatherData.wind} mph</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

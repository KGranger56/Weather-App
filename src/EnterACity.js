import React from "react";
import "./EnterACity.css";

export default function EnterACity() {
  let cityData = {
    searchedCity: "",
    searchTimeLog: "Tuesday 09:15",
  };

  return (
    <div className="block-2">
      <div className="box-1">
        <form id="enter-a-city">
          <input
            type="text"
            placeholder="Enter a city"
            autofocus="on"
            autocomplete="off"
          />
          {cityData.searchedCity}
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="box-2">Last updated: {cityData.searchTimeLog}</div>
    </div>
  );
}

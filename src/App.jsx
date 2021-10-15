import { useState } from "react";
import "./App.scss";

const api = {
  key: "1c886d44081cc6dffdf01ed1c0dfb7e4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState("");

  const dateBuilder = (details) => {
    const months = [
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

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    let day = days[details.getDay()];
    let date = details.getDate();
    let month = months[details.getMonth()];
    let year = details.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <div className="mainContainer">
        <div className="mainContainer__left">
          <h1 className="mainContainer__left--location">Abuja, Nigeria</h1>
          <h4 className="mainContainer__left--date">
            {dateBuilder(new Date())}
          </h4>
          <div className="mainContainer__left--temp">
            <h1>29°C</h1>
          </div>
          <div className="mainContainer__left--weather">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>Sunny</title>
              <path d="M8.031 16.5c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5-3.357-7.5-7.5-7.5c-4.142 0-7.5 3.357-7.5 7.5zM15.531 3.75l-2.109 4.219h4.219l-2.11-4.219zM24.543 7.457l-4.475 1.491 2.982 2.983 1.493-4.474zM10.994 8.948l-4.474-1.491 1.491 4.475 2.983-2.984zM6.969 14.359l-4.219 2.11 4.219 2.109v-4.219zM24.031 18.641l4.219-2.109-4.219-2.109v4.218zM15.531 29.25l2.109-4.219h-4.219l2.11 4.219zM20.068 24.052l4.475 1.491-1.492-4.475-2.983 2.984zM6.52 25.543l4.475-1.491-2.983-2.983-1.492 4.474z"></path>
            </svg>
            <h1>Sunny</h1>
          </div>
        </div>

        <div className="mainContainer__right">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search Location"
              value={searchValue}
              onChange={({ target }) => {
                setSearchValue(target.value);
              }}
            />

            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>magnifying-glass</title>
              <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

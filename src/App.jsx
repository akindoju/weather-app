import axios from "axios";
import { useEffect, useState } from "react";
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

    return `${day} ${date} ${month}, ${year}`;
  };

  // const findWeather = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${api.base}weather?q=${searchValue}&units=metric&APPID=${api.key}`
  //     );
  //     setResult(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="app">
      <div className="mainContainer">
        <div className="mainContainer__top">
          <div className="mainContainer__top--timestamp">
            <div className="mainContainer__top--timestamp-time">
              {new Date().getHours() > 12
                ? new Date().getHours() - 12
                : new Date().getHours()}
              :{new Date().getMinutes()}
              {new Date().getHours() > 12 ? "pm" : "am"}
            </div>
            <div className="mainContainer__top--timestamp-date">
              {dateBuilder(new Date())}
            </div>
          </div>

          <div className="mainContainer__top--location">Abuja</div>
        </div>
      </div>
    </div>
  );
};

export default App;

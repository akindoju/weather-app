import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";

const api = {
  key: "1c886d44081cc6dffdf01ed1c0dfb7e4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState("");
  const [latitude, setLatitude] = useState("");

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

  const findWeather = async () => {
    try {
      const { data } = await axios.get(
        `${api.base}weather?q=${searchValue}&units=metric&APPID=${api.key}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`${api.base}weather?q=abuja&units=metric&APPID=${api.key}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setLocation(res.name);
        setTemp(res.main.temp.toFixed());
        setWeather(res.weather[0].main);
        setHumidity(res.main.humidity);
        setLongitude(res.coord.lon.toFixed(2));
        setLatitude(res.coord.lat.toFixed(2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <div className="mainContainer">
        <div className="mainContainer__top">
          <div className="mainContainer__top--search">
            <input
              type="text"
              placeholder="Enter location"
              value={searchValue}
              onChange={({ target }) => {
                setSearchValue(target.value);
              }}
            />

            <div className="mainContainer__top--search-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                onClick={() => findWeather()}
              >
                <title>search</title>
                <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
              </svg>
            </div>
          </div>

          <div className="mainContainer__top--details">
            <h1 className="mainContainer__top--details-location">{location}</h1>
            <h2 className="mainContainer__top--details-time">
              {new Date().getHours() > 12
                ? new Date().getHours() - 12
                : new Date().getHours()}
              :{new Date().getMinutes()}
              {new Date().getHours() > 12 ? "pm" : "am"}
            </h2>
            <h3 className="mainContainer__top--details-date">
              {dateBuilder(new Date())}
            </h3>
          </div>
        </div>

        <div className="mainContainer__btm">
          <div className="mainContainer__btm--temp">{temp}°C</div>
          <div className="mainContainer__btm--weather">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>Sunny</title>
              <path d="M16 9c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7c0-3.859-3.141-7-7-7zM16 7c0.552 0 1-0.447 1-1v-2c0-0.552-0.448-1-1-1-0.553 0-1 0.448-1 1v2c0 0.553 0.447 1 1 1zM16 25c-0.553 0-1 0.448-1 1v2c0 0.553 0.447 1 1 1 0.552 0 1-0.447 1-1v-2c0-0.552-0.448-1-1-1zM23.776 9.635l1.414-1.414c0.391-0.391 0.391-1.023 0-1.414s-1.023-0.391-1.414 0l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0zM8.221 22.366l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0l1.414-1.414c0.391-0.393 0.391-1.023 0-1.414s-1.023-0.393-1.414 0zM7 16c0-0.552-0.448-1-1-1h-2c-0.553 0-1 0.448-1 1 0 0.553 0.447 1 1 1h2c0.552 0 1-0.447 1-1zM28 15h-2c-0.553 0-1 0.448-1 1 0 0.553 0.447 1 1 1h2c0.552 0 1-0.447 1-1 0-0.552-0.448-1-1-1zM8.22 9.635c0.391 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.023 0 1.414l1.414 1.414zM23.779 22.363c-0.393-0.391-1.023-0.391-1.414 0s-0.393 1.023 0 1.414l1.414 1.414c0.391 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414z"></path>
            </svg>

            <h3>{weather}</h3>
          </div>
          <div className="mainContainer__btm--info mainContainer__btm--humidity">
            <h2>Humidity</h2>
            <h1>{humidity}%</h1>
          </div>
          <div className="mainContainer__btm--info mainContainer__btm--precipitation">
            <h2>Longitude</h2>
            <h1>{longitude}°E</h1>
          </div>
          <div className="mainContainer__btm--info mainContainer__btm--wind">
            <h2>Latitude</h2>
            <h1>{latitude}°N</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

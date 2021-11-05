import { useEffect, useState } from "react";
import "./App.scss";
import Spinner from "./Spinner";

const api = {
  key: "1c886d44081cc6dffdf01ed1c0dfb7e4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [timezone, setTimezone] = useState("");
  // const [time, setTime] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hour, setHour] = useState("");
  const [isFetchingWeather, setIsFetchingWeather] = useState(true);
  const [isClouds, setIsClouds] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isRain, setIsRain] = useState(false);

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
      "Saturday",
    ];

    let day = days[details.getDay()];
    let date = details.getDate();
    let month = months[details.getMonth()];
    let year = details.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };

  const findWeather = async () => {
    setIsFetchingWeather(true);

    try {
      const response = await fetch(
        `${api.base}weather?q=${searchValue}&units=metric&APPID=${api.key}`
      );
      const data = await response.json();
      console.log(data);
      setLocation(data.name);
      setTemp(data.main.temp.toFixed());
      setWeather(
        data.weather[0].description
          .split(" ")
          .map((item) => {
            return item.charAt(0).toUpperCase() + item.slice(1);
          })
          .join(" ") // making first letter of word(s) capital
      );
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setLongitude(data.coord.lon.toFixed(2));
      setLatitude(data.coord.lat.toFixed(2));
      setTimezone(data.timezone);
      setIsFetchingWeather(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsFetchingWeather(true);
    fetch(`${api.base}weather?q=abuja&units=metric&APPID=${api.key}`)
      .then((data) => data.json())
      .then((res) => {
        setLocation(res.name);
        setTemp(res.main.temp.toFixed());
        setWeather(res.weather[0].main);
        setIcon(res.weather[0].icon);
        setHumidity(res.main.humidity);
        setLongitude(res.coord.lon.toFixed(2));
        setLatitude(res.coord.lat.toFixed(2));
        setTimezone(res.timezone);
        setIsFetchingWeather(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log({ weather });
    if (weather.includes("Rain")) {
      setIsRain(true);
      setIsClouds(false);
      setIsClear(false);
    } else if (weather.includes("Cloud")) {
      setIsRain(false);
      setIsClouds(true);
      setIsClear(false);
    } else if (weather.includes("Clear")) {
      setIsRain(false);
      setIsClouds(false);
      setIsClear(true);
    } else {
      setIsRain(false);
      setIsClouds(false);
      setIsClear(false);
    }
  }, [weather]);

  useEffect(() => {
    // const locationCurrentTime =
    // new Date(
    //   new Date().getTime() - -{ timezone } * 1000
    // );
    const locationCurrentTime = new Date(
      new Date().getTime() - -timezone * 1000
    );
    setHour(locationCurrentTime.getHours() - 1);
    setMinutes(locationCurrentTime.getMinutes());
    console.log(locationCurrentTime, "the time");
  }, [timezone]);

  return (
    <div
      className={
        isRain
          ? "app isRain"
          : isClouds
          ? "app isCloudsBG"
          : isClear
          ? "app isClear"
          : "app"
      }
    >
      <div
        className={
          isRain
            ? "mainContainer isRain"
            : isClouds
            ? "mainContainer isClouds"
            : isClear
            ? "mainContainer isClear"
            : "mainContainer"
        }
      >
        <div className="mainContainer__top">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              findWeather();
            }}
            className="mainContainer__top--search"
          >
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
                onClick={() => {
                  findWeather();
                }}
              >
                <title>search</title>
                <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
              </svg>
            </div>
          </form>

          <div className="mainContainer__top--details">
            <h1 className="mainContainer__top--details-location">{location}</h1>
            <h2 className="mainContainer__top--details-time">
              {/* Setting time based on 12hrs cycle */}
              {hour > 12 ? hour - 12 : hour}:{minutes}
              {hour > 12 ? "pm" : "am"}
            </h2>
            {/* <h2 className="mainContainer__top--details-time">{time}</h2> */}
            <h3 className="mainContainer__top--details-date">
              {dateBuilder(new Date())}
            </h3>
          </div>
          {isFetchingWeather ? <Spinner /> : null}
        </div>

        <div className="mainContainer__btm">
          <div className="mainContainer__btm--temp">{temp}°C</div>
          <div className="mainContainer__btm--weather">
            <img
              src={`https://openweathermap.org/img/w/${icon}.png`}
              alt={icon}
            />
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

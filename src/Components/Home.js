import React, { useEffect, useState } from "react";

import CityTitle from "./CityTitle/CityTitle";
import Temperature from "./Temperature/Temperature";
import WindRain from "./WindRain/WindRain";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Home = () => {
  const [data, setData] = useState({
    city: "Loading..",
    windSpeed: 0,
    temp: " ",
    date: " ",
    time: " "
  });

  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);

  const fetchData = async (lat, long) => {
    const response = await fetch(
      "http://openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=b6907d289e10d714a6e88b30761fae22"
    );
    const json = await response.json();

    // GET TIME
    let d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let time = hours + ":" + mins;

    //Get date + day of week

    let dayN = d.getDay();
    let day = days[dayN - 1];
    let fullDate = day + " " + dayN;

    return {
      city: json.name,
      temp: Math.floor(json.main.temp),
      windSpeed: json.wind.speed,
      time,
      date: fullDate
    };
  };
  fetchData();

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;

        setLat(coords.latitude);
        setLong(coords.longitude);

        fetchData(coords.latitude, coords.longitude).then(res => {
          setData(res);
        });
      });
    }
  });

  return (
    <>
      <CityTitle date={data.date} time={data.time} city={data.city} />
      <Temperature temp={data.temp + "°C"} />
      <WindRain speed={data.windSpeed} />
    </>
  );
};

export default Home;

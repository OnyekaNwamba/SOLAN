import React, { useEffect, useState } from "react";

import CityTitle from "../CityTitle/CityTitle";
import Temperature from "../Temperature/Temperature";
import WindRain from "../WindRain/WindRain";
import { useStore } from "../../stores/root";

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
  const { dispatch } = useStore();
  const [data, setData] = useState({
    city: "Loading..",
    windSpeed: 0,
    temp: " ",
    date: " ",
    time: " "
  });

  const fetchData = async (lat, long) => {
    const response = await fetch(
      "http://openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=b6907d289e10d714a6e88b30761fae22"
    );
    const json = await response.json();

    console.log(json);

    dispatch({
      type: "SET_COUNTRY",
      payload: { country: json.sys.country, city: json.name }
    });

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

        dispatch({
          type: "SET_COORDS",
          payload: {
            lat: coords.latitude,
            long: coords.longitude
          }
        });

        fetchData(coords.latitude, coords.longitude).then(res => {
          setData(res);
        });
      });
    }
  }, [dispatch]);

  return (
    <>
      <CityTitle date={data.date} time={data.time} city={data.city} />
      <Temperature temp={data.temp + "°C"} />
      <WindRain speed={data.windSpeed} />
    </>
  );
};

export default Home;

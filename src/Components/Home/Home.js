import CityTitle from "../CityTitle/CityTitle";
import Temperature from "../Temperature/Temperature";
import WindRain from "../WindRain/WindRain";
import Weather from "../Weather/Weather";
import { useStore } from "../../stores/root";
import React, { useEffect, useState } from "react";
/*
import { render } from "@testing-library/react";
import { ReactComponent } from "*.svg";*/

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
  const { state, dispatch } = useStore();
  const [data, setData] = useState({
    city: "Loading..",
    windSpeed: 0,
    temp: " ",
    date: " ",
    time: " ",
    weather: " "
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
    console.log(json);

    dispatch({
      type: "SET_COUNTRY",
      payload: { country: json.sys.country, city: json.name }
    });

    dispatch({
      type: "SET_WEATHER",
      payload: { weather: json.weather[0].main }
    });

    // GET TIME
    let d = new Date();
    let hours = d.getHours();
    let mins = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    let time = hours + ":" + mins;

    //Get day
    let dayN = d.getDay();
    let day = days[dayN - 1];

    //Get ordinal date
    //let date = d.getDate() + "/" + (d.getMonth() < 10 ? '0' : '') + d.getMonth();
    let date = d.getDate();
    let dateStr = date.toString();

    if (date >= 11 && date <= 13) {
      dateStr += "th";
    } else {
      switch (date % 10) {
        case 1:
          dateStr += "st";
          break;
        case 2:
          dateStr += "nd";
          break;
        case 3:
          dateStr += "rd";
          break;
        default:
          dateStr += "th";
          break;
      }
    }

    let fullDate = day + " " + dateStr;
    let mins = d.getMinutes();
    let time = hours + ":" + mins;

    //Get day
    let dayN = d.getDay();
    let day = days[dayN - 1];

    //Get ordinal date
    //let date = d.getDate() + "/" + (d.getMonth() < 10 ? '0' : '') + d.getMonth();
    let date = d.getDate();
    let dateStr = date.toString();

    if (date >= 11 && date <= 13) {
      dateStr += "th";
    } else {
      switch (date % 10) {
        case 1:
          dateStr += "st";
          break;
        case 2:
          dateStr += "nd";
          break;
        case 3:
          dateStr += "rd";
          break;
        default:
          dateStr += "th";
          break;
      }
    }

    let fullDate = day + " " + dateStr;

    return {
      city: json.name,
      temp: Math.floor(json.main.temp),
      windSpeed: json.wind.speed,
      time,
      date: fullDate,
      weather: json.weather[0].main
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
        setLat(coords.latitude);
        setLong(coords.longitude);

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
      <Weather weather={data.weather} />
    </>
  );
};
export default Home;

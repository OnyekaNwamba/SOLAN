import CityTitle from "../CityTitle/CityTitle";
import Temperature from "../Temperature/Temperature";
import WindRain from "../WindRain/WindRain";
import Weather from "../Weather/Weather";
import { useStore } from "../../stores/root";
import React, { useEffect, useState } from "react";
import { fetchWeatherData, fetchCoordinates } from "../../utils";
import { format } from "date-fns";

const Home = () => {
  const { dispatch } = useStore();
  const [data, setData] = useState({
    city: "Loading..",
    windSpeed: 0,
    humidity: 0,
    temp: " ",
    date: " ",
    time: " ",
    weather: " "
  });

  useEffect(() => {
    const fetchData = async (lat, long) => {
      const json = await fetchWeatherData(lat, long);

      dispatch({
        type: "SET_WEATHER_INFO",
        payload: {
          country: json.sys.country,
          city: json.name,
          weather: json.weather[0].main
        }
      });

      // GET TIME
      const today = new Date();

      return {
        city: json.name,
        temp: Math.floor(json.main.temp),
        windSpeed: Math.round(json.wind.speed*),
        humidity: json.main.humidity,
        time: format(today, "h:mm"),
        date: format(today, "EEEE do"),
        weather: json.weather[0].main
      };
    };

    if (navigator && navigator.geolocation) {
      fetchCoordinates(pos => {
        const { latitude, longitude } = pos.coords;
        dispatch({
          type: "SET_COORDS",
          payload: {
            lat: latitude,
            long: longitude
          }
        });

        fetchData(latitude, longitude).then(res => {
          setData(res);
        });
      });
    }
  }, [dispatch]);

  return (
    <>
      <CityTitle date={data.date} time={data.time} city={data.city} />
      <Temperature temp={`${data.temp}°C`} />
      <WindRain speed={`${data.windSpeed} m/s`} humidity={`${data.humidity}%`}/>
      <Weather weather={data.weather} />
    </>
  );
};

export default Home;

import "./Schedule.css";
import { differenceInHours, format } from "date-fns";
import React, { useEffect, useState } from "react";

import ScheduleCard from "./ScheduleCard";
import { useStore } from "../../stores/root";
import { fetchWeatherData, fetchCoordinates } from "../../utils";

const API_KEY = "";
const GOOGLE_API_KEY = "";

const DESCRIPTION =
  "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut";

const getActivityInformation = async (code, lat, long) => {
  let type;
  if (code < 300 && code >= 200) {
    type = "Thunderstorm";
  } else if (code < 400 && code >= 300) {
    type = "Drizzle";
  } else if (code < 600 && code >= 500) {
    type = "Rain";
  } else if (code < 700 && code >= 600) {
    type = "Snow";
  } else if (code < 800 && code >= 700) {
    type = "Atmosphere";
  } else if (code === 800) {
    type = "Clear";
  } else if (code < 900 && code > 800) {
    type = "Clouds";
  } else {
    throw new Error("Unknown weather type");
  }

  let choice = Math.floor(
    Math.random(0, ACTIVITIES_TYPES[type].length) *
      ACTIVITIES_TYPES[type].length
  );

  let resp = await fetch(
    `maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}&name=${ACTIVITIES_TYPES[type][choice]}&location=${lat},${long}&radius=10000&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id`
  );

  let json = await resp.json();

  console.log(json.results);

  while (json.results.length === 0) {
    choice = Math.floor(
      Math.random(0, ACTIVITIES_TYPES[type].length) *
        ACTIVITIES_TYPES[type].length
    );
    resp = await fetch(
      `maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}&name=${ACTIVITIES_TYPES[type][choice]}&location=${lat},${long}&radius=10000&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id`
    );

    json = await resp.json();
  }

  const place = json.results[0];
  const address = place.plus_code.compound_code.split(",")[0].split(" ");

  const resp2 = await fetch(
    `maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number&key=${GOOGLE_API_KEY}`
  );

  // console.log(json);

  // console.log(await resp2.json());

  return {
    location: place.name,

    rating: place.rating
  };
};

const ACTIVITIES_TYPES = {
  Thunderstorm: [""],
  Drizzle: ["theater", "casino"],
  Rain: ["museum", "restaurant", "movies", "spa"],
  Snow: ["shopping mall", "cinema"],
  Atmosphere: ["shopping mall"],
  Clear: ["tourist attractions", "go karting", "theater"],
  Clouds: ["tourist attractions", "go karting", "restaurant", "theater"]
};

const getSchedule = async (weather, lat, long) => {
  const currentDate = new Date();
  const date = new Date(weather.dt_txt);

  let dateString;

  const diff = differenceInHours(date, currentDate);

  if (diff < 2) {
    dateString = "Now";
  } else {
    dateString = format(date, "p");
  }

  const activityInformation = await getActivityInformation(
    weather.weather[0].id,
    lat,
    long
  );
  return {
    location: activityInformation.location,
    time: dateString,
    img: weather.weather[0].main,
    weather: weather.weather[0].main,
    temp: weather.main.temp,
    description: DESCRIPTION
  };
};

const Schedule = () => {
  const { state, dispatch } = useStore();

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async (city, country) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();

      console.log(json);

      if (json.cod === "200" && json.list) {
        const data = [];

        for (const forecast of json.list.slice(0, 8)) {
          let s = await getSchedule(forecast, state.lat, state.long);
          data.push(s);
        }
        setSchedule(data);
      }
    };

    const fetchLocationData = async (lat, long) => {
      const weatherData = await fetchWeatherData(lat, long);
      dispatch({
        type: "SET_WEATHER_INFO",
        payload: {
          country: weatherData.sys.country,
          city: weatherData.name,
          weather: weatherData.weather[0].main
        }
      });

      return {
        country: weatherData.sys.country,
        city: weatherData.name
      };
    };

    if (state.lat && state.long) {
      fetchData(state.city, state.country);
    } else {
      fetchCoordinates(pos => {
        const { latitude, longitude } = pos.coords;

        dispatch({
          type: "SET_COORDS",
          payload: {
            lat: latitude,
            long: longitude
          }
        });

        fetchLocationData(latitude, longitude).then(({ country, city }) => {
          console.log(country, city);
          fetchData(city, country);
        });
      });
    }
  }, [
    state.lat,
    state.long,
    state.weather,
    dispatch,
    state.city,
    state.country
  ]);

  return (
    <>
      {schedule.length > 0 ? (
        schedule.map((s, index) => {
          return (
            <ScheduleCard
              key={index}
              location={s.location}
              time={s.time}
              icon={s.img}
              temp={s.temp}
              weather={s.weather}
              description={s.description}
            />
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Schedule;

import "./Schedule.css";

import React, { useEffect, useState } from "react";

import Card from "../Card/Card";
import ScheduleCard from "./ScheduleCard";
import { useStore } from "../../stores/root";

const API_KEY = "ae274f9fa95742d9eb8ba702e2259052";

const scheduleData = [
  {
    location: "Queen Mary",
    country: "Sierra Leone",
    time: "Now",
    temp: "22",
    img: "sunny.svg",
    weather: "Sunny",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
  },
  {
    location: "Queen Mary",
    country: "Sierra Leone",
    time: "Now",
    img: "sunny.svg",
    weather: "Sunny",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
  },
  {
    location: "Queen Mary",
    country: "Sierra Leone",
    time: "Now",
    img: "sunny.svg",
    weather: "Sunny",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
  }
];

const Schedule = () => {
  const { state, dispatch } = useStore();

  const [forecasts, setForecasts] = useState([]);

  const fetchData = async (city, country) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/?q=${city},${country}&appid=${API_KEY}`
    );
    const json = await response.json();

    setForecasts(json.list.slice(0, 8));
    console.log(json);
  };

  useEffect(() => {
    console.log(state.lat, state.long);
    if (state.lat && state.long) {
      fetchData(state.city, state.country);
    } else {
    }
  });

  return (
    <>
      {forecasts.length > 0 ? (
        <p>Loading</p>
      ) : (
        scheduleData.map(schedule => {
          return (
            <ScheduleCard
              location={schedule.location}
              country={schedule.country}
              time={schedule.time}
              img={schedule.img}
              temp={schedule.temp}
              weather={schedule.weather}
              description={schedule.description}
            />
          );
        })
      )}
    </>
  );
};

export default Schedule;

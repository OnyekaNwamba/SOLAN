import "./Schedule.css";
import { differenceInHours, format } from "date-fns";

import React, { useEffect, useState } from "react";

import Card from "../Card/Card";
import ScheduleCard from "./ScheduleCard";
import { useStore } from "../../stores/root";
import { wait } from "@testing-library/react";

const API_KEY = "PASTE_YOUR_API_KEY";
const GOOGLE_API_KEY = "PASTE_YOUR_API_KEY";

const foo = [
  {
    dt: 1584014400,
    main: {
      temp: 281.78,
      feels_like: 273.46,
      temp_min: 281.3,
      temp_max: 281.78,
      pressure: 1010,
      sea_level: 1010,
      grnd_level: 1007,
      humidity: 46,
      temp_kf: 0.48
    },
    weather: [
      { id: 500, main: "Rain", description: "light rain", icon: "10d" }
    ],
    clouds: { all: 61 },
    wind: { speed: 8.59, deg: 250 },
    rain: { "3h": 0.5 },
    sys: { pod: "d" },
    dt_txt: "2020-03-12 12:00:00"
  }
];

const getActivityInformation = async code => {
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

  const choice = Math.floor(
    Math.random(0, ACTIVITIES_TYPES[type].length) *
      ACTIVITIES_TYPES[type].length
  );

  console.log(ACTIVITIES_TYPES[type]);

  console.log(choice);

  console.log(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${ACTIVITIES_TYPES[type][choice]}&inputtype=textquery&key=${GOOGLE_API_KEY}`
  );
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${ACTIVITIES_TYPES[type][choice]}&inputtype=textquery`,
    {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://maps.googleapis.com"
      }
    }
  );

  const json = await resp.json();

  const place = json.candidates[0];

  const resp2 = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number&key=${GOOGLE_API_KEY}`
  );

  console.log(json);

  console.log(await resp2.json());

  return;
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

const getSchedule = async weather => {
  const currentDate = new Date();
  const date = new Date(weather.dt_txt);

  let dateString;

  const diff = differenceInHours(currentDate, date);

  if (diff < 2) {
    dateString = "Now";
  } else {
    dateString = format(date, "p");
  }

  const activityInformation = await getActivityInformation(
    weather.weather[0].id
  );

  console.log(activityInformation);

  console.log(dateString);
};

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
      getSchedule(foo[0]);
    }
  }, []);

  return (
    <>
      {forecasts.length > 0 ? (
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
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Schedule;

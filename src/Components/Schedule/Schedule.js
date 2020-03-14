import "./Schedule.css";
import { differenceInHours, format } from "date-fns";
import React, { useEffect, useState } from "react";

import ScheduleCard from "./ScheduleCard";
import { useStore } from "../../stores/root";

const API_KEY = "PASTE_YOUR_KEY";
const GOOGLE_API_KEY = "PASTE_YOUR_KEY";

const DESCRIPTION =
  "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut";

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

  // console.log(
  //   await client.findPlaceFromText({
  //     input: ACTIVITIES_TYPES[type][choice],
  //     inputtype: PlaceInputType.textQuery
  //   })
  // );

  // console.log(
  //   `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${ACTIVITIES_TYPES[type][choice]}&inputtype=textquery&key=${GOOGLE_API_KEY}`
  // );
  const resp = await fetch(
    `maps/api/place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${ACTIVITIES_TYPES[type][choice]}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`,
    {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://maps.googleapis.com"
      }
    }
  );

  const json = await resp.json();

  console.log(json);

  const place = json.candidates[0];

  const address = place.formatted_address.split(" ");

  const resp2 = await fetch(
    `maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number&key=${GOOGLE_API_KEY}`
  );

  console.log(json);

  console.log(await resp2.json());

  return {
    location: place.name,
    country: address[address.length - 1],
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

const getSchedule = async weather => {
  const currentDate = new Date();
  const date = new Date(weather.dt_txt);

  let dateString;

  console.log(date);

  const diff = differenceInHours(currentDate, date);

  if (diff < 2) {
    dateString = "Now";
  } else {
    dateString = format(date, "p");
  }

  const activityInformation = await getActivityInformation(
    weather.weather[0].id
  );

  console.log({
    location: activityInformation.location,
    country: activityInformation.country,
    time: dateString,
    img: "sunny.svg",
    weather: weather.weather[0].main,
    temp: weather.main.temp,
    description: DESCRIPTION
  });

  return {
    location: activityInformation.location,
    country: activityInformation.country,
    time: dateString,
    img: "sunny.svg",
    weather: weather.weather[0].main,
    temp: weather.main.temp,
    description: DESCRIPTION
  };
};

const Schedule = () => {
  const { state } = useStore();

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async (city, country) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();

      if (json.cod === "200" && json.list) {
        const data = [];

        for (const forecast of json.list.slice(0, 8)) {
          let s = await getSchedule(forecast);
          data.push(s);
        }
        setSchedule(data);
      }
    };
    if (state.lat && state.long) {
      fetchData(state.city, state.country);
    }
  }, [state.country, state.city, state.lat, state.long]);

  return (
    <>
      {schedule.length > 0 ? (
        schedule.map((s, index) => {
          console.log(s);
          return (
            <ScheduleCard
              key={index}
              location={s.location}
              country={s.country}
              time={s.time}
              img={s.img}
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

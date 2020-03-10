import "./Schedule.css";

import Card from "../Card/Card";
import React from "react";
import ScheduleCard from "./ScheduleCard";

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
  return (
    <>
      {scheduleData.map(schedule => {
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
      })}
    </>
  );
};

export default Schedule;

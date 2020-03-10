import "./Schedule.css";

import Card from "../Card/Card";
import React from "react";

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
          <Card className="ma-3">
            <div className="header">
              <div>
                <h3>
                  {schedule.time} {schedule.temp}
                </h3>

                <img
                  src={require(`../../assets/${schedule.img}`)}
                  alt={schedule.img}
                />

                <p>{schedule.weather}</p>
              </div>
              <div className="ml-2">
                <h3>
                  {schedule.location},{schedule.country}
                </h3>
                {schedule.description}
              </div>

              {/* <p> */}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default Schedule;

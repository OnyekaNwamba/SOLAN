import React, { useState } from "react";
import SunnyImage from "../../assets/sunny.svg";
import ThunderstormImage from "../../assets/thunder.svg";
import CloudImage from "../../assets/cloudy.svg";
import DrizzleImage from "../../assets/drizzle.svg";
import Card from "../Card/Card";

const ICONS = {
  Clouds: `${CloudImage}`,
  Rain: `${DrizzleImage}`,
  Clear: `${SunnyImage}`,
  Drizzle: `${DrizzleImage}`,
  // Snow: `${SnowImage}`,
  Thunderstorm: `${ThunderstormImage}`
};

const ScheduleCard = ({ location, time, img, temp, weather, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  console.log(img);

  return (
    <Card className="ma-3">
      <div className="header">
        <div>
          <h3>{time}</h3>
          <h3>{temp} °C</h3>
          <img src={ICONS[img]} alt={img} />
          <p>{weather}</p>
        </div>
        <div className="ml-2">
          <h3>{location}</h3>
          {description}
        </div>
      </div>

      {expanded ? <div className="more-info"></div> : null}

      <i className="material-icons" onClick={handleExpanded}>
        {expanded ? "expand_less" : "expand_more"}
      </i>
    </Card>
  );
};

export default ScheduleCard;

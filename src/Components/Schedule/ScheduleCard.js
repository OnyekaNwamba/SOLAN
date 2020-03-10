import React, { useState } from "react";

import Card from "../Card/Card";

const ScheduleCard = ({
  location,
  country,
  time,
  img,
  temp,
  weather,
  description
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="ma-3">
      <div className="header">
        <div>
          <h3>
            {time} {temp}
          </h3>

          <img src={require(`../../assets/${img}`)} alt={img} />

          <p>{weather}</p>
        </div>
        <div className="ml-2">
          <h3>
            {location},{country}
          </h3>
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

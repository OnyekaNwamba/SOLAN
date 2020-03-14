import "./cityText.css";

import React from "react";

const CityTitle = ({ date, city, time }) => {
  return (
    <div>
      <div>
        <p className="dateTime">
          {date}
          <p className="timeSpacing">{time}</p>
        </p>
      </div>
      <p className="cityText">{city}</p>
    </div>
  );
};

export default CityTitle;

import "./cityText.css";

import React from "react";

const CityTitle = ({ date, city, time }) => {
  return (
    <div>
      <div>
        <p className="ma0 pa0">{date}</p>
        <p className="ma0 pa0">{time}</p>
      </div>
      <p>{city}</p>
    </div>
  );
};
// class CityTitle extends React.Component {
//   render() {

//   }
// }

export default CityTitle;

import "./temperature.css";

import React from "react";
import rectangle from "./random-rectangle.png";
class Temperature extends React.Component {
  render() {
    return (
      <div>
        <img
          className={"randomRectangle"}
          src={rectangle}
          alt="background rectangle"
        />
        <h1 className={"temperatureText"}>{this.props.temp}</h1>
      </div>
    );
  }
}

export default Temperature;

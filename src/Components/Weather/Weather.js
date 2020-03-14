import "./weather.css";
import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div>
        <h1 className={"weatherCondition"}>{this.props.weather}</h1>
      </div>
    );
  }
}

export default Weather;

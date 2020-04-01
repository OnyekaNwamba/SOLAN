import "./wind-rain.css";

import React from "react";
import divisorImage from "./dividor.png";
import rainImage from "./Vector.png";
import windImage from "./wind-image.svg";

const WindRain = ({ speed, humidity }) => {
  return (
    <div className={"bar"}>
      <p className={"rain"}>{humidity}</p>
      <img className={"rain-image"} src={rainImage} />
      <img className={"dividor"} src={divisorImage} />
      <p className={"wind"}>{speed}</p>
      <img className={"wind-image"} src={windImage} />
    </div>
  );
};

export default WindRain;

//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";
import CloudImage from "./assets/clouds_bg.png";
import RainImage from "./assets/rain_bg.png";
import DrizzleImage from "./assets/drizzle_bg.png";
import SnowImage from "./assets/snow_bg.png"
import ThunderstormImage from "./assets/thunder_bg.png"
import SunnyImage from "./assets/sunny_bg.png"

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import Weather from "./Components/Weather/Weather";
import React, { useState, useStore, useContext } from "react";
import { StoreProvider } from "./stores/root";
import Schedule from "./Components/Schedule/Schedule";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

const App = () => {

  const {state} = useState(StoreProvider.weather);

  function changeBackground(weather){

    if(weather == "Clouds")
      return `url(${CloudImage})`;

    else if(weather == "Rain")
      return `url(${RainImage})`;

    else if(weather== "Clear")
      return `url(${SunnyImage})`;

    else if(weather == "Drizzle")
      return `url(${DrizzleImage})`;

    else if(weather == "Snow")
      return `url(${SnowImage})`;

    else if(weather== "Thunderstorm")
      return `url(${ThunderstormImage})`;

    else{
      return null;
    }  
  }


  return (
    <div className={"container"} style={{backgroundImage: changeBackground(state) }}>
      <StoreProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </StoreProvider>
    </div>
  );
}

export default App;

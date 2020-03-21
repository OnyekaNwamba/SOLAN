//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";
import CloudImage from "./assets/clouds_bg.png";
import RainImage from "./assets/rain_bg.png";
import DrizzleImage from "./assets/drizzle_bg.png";
import SnowImage from "./assets/snow_bg.png";
import ThunderstormImage from "./assets/thunder_bg.png";
import SunnyImage from "./assets/sunny_bg.png";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import React, { useEffect } from "react";
import Schedule from "./Components/Schedule/Schedule";

import { useStore } from "./stores/root";
import { Loader } from "@googlemaps/loader";
import { GOOGLE_API_KEY } from "./utils";

const BACKGROUNDS = {
  Clouds: `url(${CloudImage})`,
  Rain: `url(${RainImage})`,
  Clear: `url(${SunnyImage})`,
  Drizzle: `url(${DrizzleImage})`,
  Snow: `url(${SnowImage})`,
  Thunderstorm: `url(${ThunderstormImage})`
};

const App = () => {
  const { state } = useStore();

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      libraries: ["places"]
    });

    if (window.google) {
      return;
    } else {
      loader.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.google]);

  return (
    <div
      className={"container"}
      style={{
        backgroundImage: BACKGROUNDS[state.weather]
      }}
    >
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/next" element={<Forecast />} />

      </Routes>
    </div>
  );
};

export default App;

//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";

/* Background for home page */
import CloudImage from "./assets/clouds_bg.png";
import RainImage from "./assets/rain_bg.png";
import DrizzleImage from "./assets/drizzle_bg.png";
import SnowImage from "./assets/snow_bg.png";
import ThunderstormImage from "./assets/thunder_bg.png";
import SunnyImage from "./assets/sunny_bg.png";

/* Background for schedule & five day forecast */
import Cloud_bg from "./assets/clouds_noImg.png";
import Rain_bg from "./assets/rain_noImg.png";
import Drizzle_bg from "./assets/drizzle_noImg.png";
import Snow_bg from "./assets/snow_noImg.png";
import Thunderstorm_bg from "./assets/thunder_noImg.png";
import Sunny_bg from "./assets/sunny_noImg.png";

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import React, { useEffect } from "react";
import Schedule from "./Components/Schedule/Schedule";
import Forecast from "./Components/Forecast/Forecast";

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

const OTHER_BACKGROUNDS = {
  Clouds: `url(${Cloud_bg})`,
  Rain: `url(${Rain_bg})`,
  Clear: `url(${Sunny_bg})`,
  Drizzle: `url(${Drizzle_bg})`,
  Snow: `url(${Snow_bg})`,
  Thunderstorm: `url(${Thunderstorm_bg})`
};

const App = () => {
  const { state } = useStore();
  const location = useLocation();

  function chooseBg() {
    if (location.pathname === "/") {
      return BACKGROUNDS[state.weather];
    }
    else {
      return OTHER_BACKGROUNDS[state.weather];
    }
  }

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
    <div className={"container"} style={{ backgroundImage: chooseBg() }}>
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
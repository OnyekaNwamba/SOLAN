//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import React, { useState } from "react";
import Schedule from "./Components/Schedule/Schedule";
import { StoreProvider } from "./stores/root";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

const App = () => {
  const { state, dispatch } = useState();
  return (
    <div className={"container"}>
      <StoreProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </StoreProvider>
    </div>
  );
};

export default App;

//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import React from "react";
import Schedule from "./Components/Schedule/Schedule";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className={"container"}>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    );
  }
}

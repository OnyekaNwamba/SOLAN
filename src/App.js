//import CityTitle from './Components/CityTitle/CityTitle'
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import React from "react";
import Schedule from "./Components/Schedule/Schedule";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lang: 0.0,
        lng: 0.0
      },
      city: "Loading..",
      windSpeed: 0,
      temp: " ",
      date: " ",
      time: " "
    };
    this.getCity = this.getCity.bind(this);
  }

  getCity = async (lat, long) => {
    //API call to get location and temp
    const response = await fetch(
      "http://openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=b6907d289e10d714a6e88b30761fae22"
    );
    const json = await response.json();

    console.log(json);
    //console.log("HIHIHI" + lat,long);

    return;
  };

  getDate = () => {
    //Function to get date
    return "Friday 13th";
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });

        this.getCity(coords.latitude, coords.longitude).then(res => {
          this.setState(res);
        });
      });
    }

    /*
        this.getCity().then((res) => {
            this.setState({data: res});
        });
        */
  }

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

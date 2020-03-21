import "./Forecast.css";
import React, { useEffect, useState } from "react";

import SunnyImage from "../../assets/sunny.svg";
import ThunderstormImage from "../../assets/thunder.svg";
import CloudImage from "../../assets/cloudy.svg";
import DrizzleImage from "../../assets/drizzle.svg";
import SnowImage from "../../assets/snow.svg";
import RainImage from "../../assets/rain.svg";
import divisorImage from "./dividor.png";
import rainImage from "./Vector.png";
import windImage from "./wind-image.svg";

const API_KEY = "a889a89ba1a6877ed0364717a0d1e877";
//const API_KEY = "b6907d289e10d714a6e88b30761fae22";
//const API_KEY = "9061b7e2f07c411fdaf15c394b285e0b";
//const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";
const days = ["SUN","MON","TUE","WED","THURS","FRI","SAT"];

const ICONS = {
    Clouds: `${CloudImage}`,
    Rain: `${RainImage}`,
    Clear: `${SunnyImage}`,
    Drizzle: `${DrizzleImage}`,
    Snow: `${SnowImage}`,
    Thunderstorm: `${ThunderstormImage}`
};

function getWeatherCondition(code){
    if (code < 300 && code >= 200) {
      return "Thunderstorm";
    } else if (code < 400 && code >= 300) {
      return "Drizzle";
    } else if (code < 600 && code >= 500) {
      return "Rain";
    } else if (code < 700 && code >= 600) {
      return "Snow";
    } else if (code === 800) {
      return "Clear";
    } else if (code < 900 && code > 800) {
      return "Clouds";
    } else {
        console.log(code);
        return "Clouds";
    }
}

function getTimestampDay(timestamp){
    let date = new Date(timestamp*1000);
    let day = days[date.getDay()];
    return day;
}

function getTotal(map, day, current){
    if (map.has(day)){
        let temp = map.get(day);
        let total = temp+current;
        return total;
    }
    else
        return current;
}

function getNextDayForecast(json){

    let firstDay = days[new Date().getDay()];

    const avgTemp = new Map();
    const avgHumid = new Map();
    const avgWind = new Map();
    const avgWeather = new Map();

    const keys = [];

    for(let i = 0;i<json.list.length;i++){
        let day = getTimestampDay(json.list[i].dt);

        if(day == firstDay)
            continue;
        
        let current_temp = json.list[i].main.temp;
        let current_humid = json.list[i].main.humidity;
        let current_wind = json.list[i].wind.speed;
        let current_weather = json.list[i].weather[0].id;
        
        if (avgTemp.has(day)){
            let temp = avgTemp.get(day);
            let total = temp+current_temp;
            avgTemp.set(day, total);
        }
        else{
            avgTemp.set(day, current_temp);
            keys.push(day);
        }

        let totalHumid = getTotal(avgHumid, day, current_humid);
        avgHumid.set(day, totalHumid);

        let totalWind = getTotal(avgWind, day, current_wind);
        avgWind.set(day,totalWind);

        let totalWeather = getTotal(avgWeather, day, current_weather);
        avgWeather.set(day,totalWeather);
    }

    const data = [];
    for(let j = 0; j<keys.length;j++){
        data.push({
            day: keys[j],
            temp: Math.floor(avgTemp.get(keys[j])/8),
            wind: Math.floor((avgWind.get(keys[j])/8)*2.2369362920544025),
            humidity: Math.floor(avgHumid.get(keys[j])/8),
            weather: (avgWeather.get(keys[j])/8),
        });
    }
    return data;
}
    
const Forecast = () => {
    const [position, setPosition] = useState({
        lat: 0,
        long: 0,
    });
    const [forecast, setForecast] = useState([]);

    
    useEffect(() => {
        const fetchData = async (lat,long) => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            );
            
            const json = await response.json();
            console.log(json);
            let weatherData=[];
            weatherData = getNextDayForecast(json);
            setForecast(weatherData);
        };

        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(success);
        else
            console.log("Geolocation not supported");
        
        function success(position){
            setPosition({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            })
        }
        fetchData(position.lat, position.long);
    });

    return(
        <>
        {forecast.length > 0 ? (
            forecast.map((s) => {
                return (

                    <div className="forecastCard">
                    <div className="forecastDisplay">
                    <div className="leftSide">
                    <div className="dayText">{s.day}</div>
                    <p>{s.temp}°C</p>
                    <p className="weatherText">{getWeatherCondition(s.weather)}</p>
                    </div>
                    <img className="iconImg" src={ICONS[getWeatherCondition(s.weather)]}></img>
                    <div className="windRain">
                    <p className="rainText">{s.humidity} %</p>
                    <img className={"rainImg"} src={rainImage} />
                    <img className={"dividorImg"} src={divisorImage} />
                    <img className={"windImg"} src={windImage} />
                    <p className="windText">{s.wind} mph</p>
                    </div>
                    </div>
                    </div>

                );
            })
        ) : (
            <p>Loading...</p>
        )}
        </>
        

    );

}

export default Forecast;
  

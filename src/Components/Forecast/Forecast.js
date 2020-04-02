import "./Forecast.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../stores/root";
import {  API_KEY, fetchWeatherData, fetchCoordinates } from "../../utils";


/* Weather icons */
import SunnyImage from "../../assets/sunny.svg";
import ThunderstormImage from "../../assets/thunder.svg";
import CloudImage from "../../assets/cloudy.svg";
import DrizzleImage from "../../assets/drizzle.svg";
import SnowImage from "../../assets/snow.svg";
import RainImage from "../../assets/rain.svg";

/* Misc icons */
import divisorImage from "./dividor.png";
import rainImage from "./rainImage.svg";
import windImage from "./wind-image.svg";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const ICONS = {
    Clouds: `${CloudImage}`,
    Rain: `${RainImage}`,
    Clear: `${SunnyImage}`,
    Drizzle: `${DrizzleImage}`,
    Snow: `${SnowImage}`,
    Thunderstorm: `${ThunderstormImage}`
};


function getTimestampDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = DAYS[date.getDay()];
    return day;
}

function getTotal(map, day, current) {
    if (map.has(day)) {
        let temp = map.get(day);
        let total = temp + current;
        return total;
    }
    else
        return current;
}


function getHigh(map, day, current) {
    if (map.has(day)) {
        let temp = map.get(day);
        let highest = current;
        if (temp > highest) {
            return temp
        }
        else {
            return highest
        }
    }
}

/* Returns array of keys with equal maximum value */
function getMax(object) {
    return Object.keys(object).filter(x => {
        return object[x] === Math.max.apply(null,
            Object.values(object));
    });
}

/* Out of the most recorded weather conditions 
    */
function chooseWeather(arr) {
    const maxWeather = new Map();
    for (let i = 0; i < arr.length; i++) {
        maxWeather.set(arr[i], "");
    }

    if (maxWeather.has("Rain") && maxWeather.has("Thunderstorm"))
        return "Thunderstorm";
    else if (maxWeather.has("Rain") && maxWeather.has("Drizzle"))
        return "Rain";
    else if ((maxWeather.has("Clear") || maxWeather.has("Clouds")) && maxWeather.has("Thunderstorm"))
        return "Thunderstorm";
    else if ((maxWeather.has("Clear") || maxWeather.has("Clouds")) && maxWeather.has("Rain"))
        return "Rain";
    else if ((maxWeather.has("Clear") || maxWeather.has("Clouds")) && maxWeather.has("Drizzle"))
        return "Drizzle";
    else if (maxWeather.has("Clear") && maxWeather.has("Clouds"))
        return "Clear";
    else if (maxWeather.has("Snow") && (maxWeather.has("Clouds") || maxWeather.has("Clear")))
        return "Snow";
    else
        return arr[Math.floor(Math.random() * arr.length)];
}

/* Gets the weather forecast details for the next four days 
    Does not include today's weather condition */
function getNextDayForecast(json) {
    const today = new Date();
    const firstDay = DAYS[today.getDay()];
    const fifthDate = new Date(today);
    fifthDate.setDate(fifthDate.getDate() + 5);
    const fifthDay = DAYS[fifthDate.getDay()];

    const keys = [];
    const data = [];

    const avgTemp = new Map();
    const avgHumid = new Map();
    const avgWind = new Map();
    let chosen_weather = "";

    let weathers = {
        "Clouds": 0,
        "Clear": 0,
        "Rain": 0,
        "Drizzle": 0,
        "Thunderstorm": 0,
        "Snow": 0,
    }

    for (let i = 0; i < json.list.length; i++) {
        let day = getTimestampDay(json.list[i].dt);
        if (day === firstDay) // skip first day
            continue;
        if (day === fifthDay) // stop on fifth day
            break;

        let current_temp = json.list[i].main.temp;
        let current_humid = json.list[i].main.humidity;
        let current_wind = json.list[i].wind.speed;
        let current_weather = json.list[i].weather[0].main;

        if (!avgTemp.has(day))
            keys.push(day);

        let totalTemp = getHigh(avgTemp, day, current_temp);
        avgTemp.set(day, totalTemp);

        let totalHumid = getTotal(avgHumid, day, current_humid);
        avgHumid.set(day, totalHumid);

        let totalWind = getTotal(avgWind, day, current_wind);
        avgWind.set(day, totalWind);

        weathers[current_weather]++;
    }

    let max = getMax(weathers);
    if (max.length === 1)
        chosen_weather = max[0];
    else
        chosen_weather = chooseWeather(max);

    for (let j = 0; j < keys.length; j++) {
        let parse_temp = Math.floor(avgTemp.get(keys[j]));
        let parse_wind = Math.round((avgWind.get(keys[j]) / 8));
        let parse_humid = Math.floor(avgHumid.get(keys[j]) / 8);
      
        data.push({
            day: keys[j],
            temp: parse_temp,
            wind: parse_wind,
            humidity: parse_humid,
            weather: chosen_weather,
        });
    }
    return data;
}


const Forecast = () => {
    const { state, dispatch } = useStore();
    const [forecast, setForecast] = useState([]);


    useEffect(() => {
        const fetchData = async (lat, long) => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            );

            const json = await response.json();
            console.log(json);


            setForecast(getNextDayForecast(json));
        };

        if (navigator && navigator.geolocation) {
            fetchCoordinates(pos => {
                const { latitude, longitude } = pos.coords;

                dispatch({
                    type: 'SET_COORDS',
                    payload: {
                        lat: latitude,
                        long: longitude
                    }
                })


                fetchData(latitude, longitude);
            });
        }


    }, [dispatch, state.weather]);
    return (
        <>
            {forecast.length > 0 ? (
                forecast.map((s) => {
                    return (
                        <div className="forecastCard ma-3">
                            <div className="forecastDisplay">
                                <div className="leftSide">
                                    <div className="dayText">{s.day}</div>
                                    <p className="tempText">{s.temp}°C</p>
                                    <p className="weatherText">{s.weather}</p>
                                </div>

                                <img className="iconImg" src={ICONS[s.weather]}></img>

                                <div className="windRain">
                                    <p className="rainText">{s.humidity} %</p>
                                    <img className={"rainImg"} src={rainImage} />
                                    <img className={"dividorImg"} src={divisorImage} />
                                    <img className={"windImg"} src={windImage} />
                                    <p className="windText">{s.wind} m/s</p>
                                </div>
                            </div>
                        </div>

                    );
                })
            ) : (
                    <p className="cityText">Loading...</p>
                )}
        </>


    );

}

export default Forecast;
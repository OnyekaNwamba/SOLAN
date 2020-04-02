import "./Forecast.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../stores/root";
import {API_KEY, fetchCoordinates} from "../../utils";

/* Weather icons */
import SunnyImage from "../../assets/sunny.svg";
import ThunderstormImage from "../../assets/thunder.svg";
import CloudImage from "../../assets/cloudy.svg";
import DrizzleImage from "../../assets/drizzle.svg";
import SnowImage from "../../assets/snow.svg";
import RainImage from "../../assets/rain.svg";

/* Misc icons */
import divisorImage from "./dividor.png";
import rainImage from "./Vector.png";
import windImage from "./wind-image.svg";

const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const ICONS = {
    Clouds: `${CloudImage}`,
    Rain: `${RainImage}`,
    Clear: `${SunnyImage}`,
    Drizzle: `${DrizzleImage}`,
    Snow: `${SnowImage}`,
    Thunderstorm: `${ThunderstormImage}`
};


function getNextDayForecast(json) {

}


const Forecast = () => {
    const { state , dispatch } = useStore();
    const [position, setPosition] = useState({
        lat: 0,
        long: 0,
    });
    const [forecast, setForecast] = useState([]);

    
    useEffect(() => {
        const fetchData = async (lat,long) => {
            const response = await fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${API_KEY}`
                );

            const json = await response.json();
            console.log(json);

            let weatherData=[];
            weatherData = getNextDayForecast(json);
            setForecast(weatherData);
        };

        if (navigator && navigator.geolocation) {
            fetchCoordinates(pos => {
                const { latitude, longitude } = pos.coords;
                setPosition({
                    lat: latitude,
                    long: longitude

                });

                fetchData(position.lat, position.long);
            });
        }


    }, [state.weather]);

    return(
        <>
        {forecast.length > 0 ? (
            forecast.map((s) => {
                return (
                    <div className="forecastCard ma-3">
                    <div className="forecastDisplay">
                        <div className="leftSide">
                            <div className="dayText">{s.day}</div>
                            <p className="parse_highest_temp">{s.tempHighest}°C</p>
                            <p className="parse_lowest_temp">{s.tempLowest}°C</p>
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
            <p>Loading...</p>
        )}
        </>
        

    );

}

export default Forecast;

import "./Schedule.css";
import { differenceInHours, format, getHours } from "date-fns";
import React, { useEffect, useState } from "react";

import ScheduleCard from "./ScheduleCard";
import { useStore } from "../../stores/root";
import {
  fetchWeatherData,
  fetchCoordinates,
  genRandomNumber,
  GOOGLE_API_KEY,
  API_KEY
} from "../../utils";

const CACHE = {};
const ACTIVITY_CHOICES = {
  0: {
    //midnight
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub"],
    Rain: ["Club", "Casino", "Bar"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub", "hotel"],
    Clouds: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub"]
  },
  3: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: [
      "club",
      "casino",
      "bar",
      "rooftop bar",
      "karaoke",
      "pub",
      "hotel",
      "hostel"
    ],
    Rain: ["club", "casino", "bar", "hotel", "hostel"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub", "hotel"],
    Clouds: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub"]
  },
  6: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: ["park", "cafe", "bakery", "hotel", "hostel", "gym"],
    Rain: ["hotel", "hostel", "gym"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: ["park", "cafe", "bakery", "hotel", "hostel", "gym"],
    Clouds: ["park", "cafe", "bakery", "hotel", "hostel", "gym"]
  },
  9: {
    Thunderstorm: ["hotel", "hostel", "tourist attraction"],
    Drizzle: [
      "park",
      "cafe",
      "bakery",
      "hotel",
      "hostel",
      "gym",
      "tourist attraction"
    ],
    Rain: ["hotel", "hostel", "gym"],
    Snow: ["hotel", "hostel"],

    Atmosphere: ["hotel", "hostel"],
    Clear: [
      "park",
      "cafe",
      "bakery",
      "hotel",
      "hostel",
      "gym",
      "tourist attraction"
    ],
    Clouds: [
      "park",
      "cafe",
      "bakery",
      "hotel",
      "hostel",
      "gym",
      "tourist attraction"
    ]
  },
  12: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: [
      "casino",
      "bar",
      "rooftop bar",
      "karaoke",
      "pub",
      "restaurant",
      "clothes shop",
      "tourist attraction"
    ],
    Rain: ["casino", "pub", "restaurant", "tourist attraction"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: [
      "casino",
      "restaurant",
      "bar",
      "rooftop bar",
      "tourist attraction",
      "karaoke",
      "pub",
      "hotel",
      "zoo",
      "farm",
      "park"
    ],
    Clouds: ["casino", "karaoke", "pub", "tourist attraction"]
  },
  15: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: ["casino", "pub", "cafe", "restaurant", "tourist attraction"],
    Rain: ["casino", "pub", "restaurant", "tourist attraction"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: [
      "casino",
      "restaurant",
      "karaoke",
      "pub",
      "hotel",
      "zoo",
      "farm",
      "park"
    ],
    Clouds: [
      "casino",
      "restaurant",
      "karaoke",
      "pub",
      "zoo",
      "farm",
      "park",
      "tourist attraction"
    ]
  },
  18: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: ["casino", "pub", "cafe", "minigolf", "golf", "laser tag"],
    Rain: ["club", "casino", "bar", "pub"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: [
      "club",
      "casino",
      "bar",
      "rooftop bar",
      "karaoke",
      "pub",
      "hotel",
      "minigolf",
      "golf",
      "laser tag"
    ],
    Clouds: [
      "club",
      "casino",
      "bar",
      "rooftop bar",
      "karaoke",
      "pub",
      "tourist attraction"
    ]
  },
  21: {
    Thunderstorm: ["hotel", "hostel"],
    Drizzle: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub"],
    Rain: ["club", "casino", "bar"],
    Snow: ["hotel", "hostel"],
    Atmosphere: ["hotel", "hostel"],
    Clear: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub", "hotel"],
    Clouds: ["club", "casino", "bar", "rooftop bar", "karaoke", "pub"]
  }
};

const getActivityInformation = async (code, lat, long, hour) => {
  let type;
  if (code < 300 && code >= 200) {
    type = "Thunderstorm";
  } else if (code < 400 && code >= 300) {
    type = "Drizzle";
  } else if (code < 600 && code >= 500) {
    type = "Rain";
  } else if (code < 700 && code >= 600) {
    type = "Snow";
  } else if (code < 800 && code >= 700) {
    type = "Atmosphere";
  } else if (code === 800) {
    type = "Clear";
  } else if (code < 900 && code > 800) {
    type = "Clouds";
  } else {
    throw new Error("Unknown weather type");
  }

  let choice = genRandomNumber(ACTIVITY_CHOICES[hour][type].length);
  let json;
  let url = `maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}&name=${ACTIVITY_CHOICES[hour][type][choice]}&location=${lat},${long}&radius=10000&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id,opening_hours`;

  if (CACHE[url]) {
    json = CACHE[URL];
  } else {
    let resp = await fetch(url);

    json = await resp.json();
    CACHE[url] = json;

    while (json.results.length === 0) {
      choice = genRandomNumber(ACTIVITY_CHOICES[hour][type].length);
      url = `maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}&name=${ACTIVITY_CHOICES[hour][type][choice]}&location=${lat},${long}&radius=10000&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id,opening_hours`;

      resp = await fetch(url);

      CACHE[url] = await resp.json();

      json = CACHE[url];
    }
  }

  const place = CACHE[url].results.splice(
    genRandomNumber(CACHE[url].results.length),
    1
  )[0];

  return {
    location: place.name,
    marker: {
      lat: place.geometry.location.lat,
      long: place.geometry.location.lng
    },
    placeId: place.place_id,
    rating: place.rating
  };
};

const getSchedule = async (weather, lat, long) => {
  const currentDate = new Date();
  const date = new Date(weather.dt_txt);

  let dateString;

  const diff = differenceInHours(date, currentDate);

  if (diff < 2) {
    dateString = "Now";
  } else {
    dateString = format(date, "p");
  }

  const activityInformation = await getActivityInformation(
    weather.weather[0].id,
    lat,
    long,
    getHours(date)
  );

  return {
    placeId: activityInformation.placeId,
    location: activityInformation.location,
    time: dateString,
    img: weather.weather[0].main,
    weather: weather.weather[0].main,
    temp: weather.main.temp,
    marker: activityInformation.marker
  };
};

const Schedule = () => {
  const { state, dispatch } = useStore();

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async (city, country) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();

      console.log(json);

      if (json.cod === "200" && json.list) {
        const data = [];

        for (const forecast of json.list.slice(0, 9)) {
          let s = await getSchedule(forecast, state.lat, state.long);
          data.push(s);
        }
        setSchedule(data);
      }
    };

    const fetchLocationData = async (lat, long) => {
      const weatherData = await fetchWeatherData(lat, long);
      dispatch({
        type: "SET_WEATHER_INFO",
        payload: {
          country: weatherData.sys.country,
          city: weatherData.name,
          weather: weatherData.weather[0].main
        }
      });

      return {
        country: weatherData.sys.country,
        city: weatherData.name
      };
    };

    if (state.lat && state.long) {
      fetchData(state.city, state.country);
    } else {
      fetchCoordinates(pos => {
        const { latitude, longitude } = pos.coords;

        dispatch({
          type: "SET_COORDS",
          payload: {
            lat: latitude,
            long: longitude
          }
        });

        fetchLocationData(latitude, longitude).then(({ country, city }) => {
          console.log(country, city);
          fetchData(city, country);
        });
      });
    }
  }, [
    state.lat,
    state.long,
    state.weather,
    dispatch,
    state.city,
    state.country
  ]);

  return (
    <>
      {schedule.length > 0 ? (
        schedule.map((s, index) => {
          return (
            <ScheduleCard
              key={index}
              location={s.location}
              time={s.time}
              icon={s.img}
              temp={s.temp}
              weather={s.weather}
              marker={s.marker}
              placeId={s.placeId}
            />
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Schedule;

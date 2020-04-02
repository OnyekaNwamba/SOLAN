export const fetchWeatherData = async (lat, long) => {
  const response = await fetch(
    "http://openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=b6907d289e10d714a6e88b30761fae22"
  );
  const json = await response.json();

  return json;
};

export const fetchCoordinates = async callback => {
  await navigator.geolocation.getCurrentPosition(pos => {
    callback(pos);
  });
};

export const genRandomNumber = (hi, lo = 0) =>
  Math.floor(Math.random(lo, hi) * hi);

export const GOOGLE_API_KEY = "AIzaSyCWdXpLDdgaGZkWJgN8kCcsuojuZ4NsM5c";
//export const API_KEY = "ae044746765db55ca524cc294e0d1a3a";
export const API_KEY = "1d6ccef209974e7684c5d6236b87c1a1";
export const WEATHER_STACK_API_KEY = "63f37017cff72d1fd7316afb315d917e";


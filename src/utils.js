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

//export const GOOGLE_API_KEY = "PASTE_YOUR_API_KEY";
//export const API_KEY = "PASTE_YOUR_API_KEY";

//export const GOOGLE_API_KEY ="AIzaSyAxVV4B59yolenI97igRIgGuDQ63PibG8";
export const GOOGLE_API_KEY = "AIzaSyCWdXpLDdgaGZkWJgN8kCcsuojuZ4NsM5c";

export const API_KEY ="ae044746765db55ca524cc294e0d1a3a";
//export const API_KEY = "a889a89ba1a6877ed0364717a0d1e877";
//export const API_KEY = "b6907d289e10d714a6e88b30761fae22";
//export const API_KEY = "9061b7e2f07c411fdaf15c394b285e0b";
//export const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";



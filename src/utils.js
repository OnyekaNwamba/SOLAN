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

export const GOOGLE_API_KEY = "PASTE_YOUR_API_KEY";
export const API_KEY = "PASTE_YOUR_API_KEY";

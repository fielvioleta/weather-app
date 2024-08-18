import axios from 'axios';

const API_KEY = '5ce8b7867e6670e7e7b575958b8b3246';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string, units: 'metric' | 'imperial') => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: units,
      appid: API_KEY,
    },
  });
  return response.data;
};

import { WEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCapital = async (capital) => {
  if (!capital || capital === 'Sin capital') return null;
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(capital)}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Ciudad no encontrada');
      throw new Error('Error al obtener clima');
    }
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
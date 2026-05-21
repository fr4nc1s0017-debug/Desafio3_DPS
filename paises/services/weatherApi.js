import axios from "axios";
import { WEATHER_API_KEY } from "@env";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=es`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
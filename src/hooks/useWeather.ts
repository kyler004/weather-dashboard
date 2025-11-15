import { useState, useEffect } from "react";
import {
  WeatherData,
  TemperatureUnit,
  CurrentWeather,
  DailyForecast,
} from "@/types/weather";
import {
  getWeatherByCity,
  getWeatherByGeolocation,
} from "@/services/weatherService";
import { convertTemperature } from "@/utils/converter";

/**
 * Custom hook to manage weather data and state
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: null,
    forecast: [],
    unit: "celsius",
    loading: false,
    error: null,
  });

  /**
   * Fetch weather data by city name
   */
  const fetchWeatherByCity = async (cityName: string) => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getWeatherByCity(cityName, weatherData.unit);

      setWeatherData((prev) => ({
        ...prev,
        current: data.current,
        forecast: data.forecast,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch weather data";

      setWeatherData((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  /**
   * Fetch weather data by user's geolocation
   */
  const fetchWeatherByLocation = async () => {
    setWeatherData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getWeatherByGeolocation(weatherData.unit);

      setWeatherData((prev) => ({
        ...prev,
        current: data.current,
        forecast: data.forecast,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch weather data";

      setWeatherData((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  /**
   * Toggle between Celsius and Fahrenheit
   * Converts existing data to new unit
   */
  const toggleUnit = () => {
    setWeatherData((prev) => {
      const newUnit: TemperatureUnit =
        prev.unit === "celsius" ? "fahrenheit" : "celsius";

      // If we have current weather data, convert it
      let convertedCurrent: CurrentWeather | null = null;
      if (prev.current) {
        const conversionFactor = newUnit === "fahrenheit" ? 1.8 : 1 / 1.8;
        const offset = newUnit === "fahrenheit" ? 32 : -32 * (5 / 9);

        convertedCurrent = {
          ...prev.current,
          temperature: Math.round(
            prev.current.temperature * conversionFactor + offset
          ),
          feelsLike: Math.round(
            prev.current.feelsLike * conversionFactor + offset
          ),
          tempMin: Math.round(prev.current.tempMin * conversionFactor + offset),
          tempMax: Math.round(prev.current.tempMax * conversionFactor + offset),
        };
      }

      // Convert forecast data
      const convertedForecast: DailyForecast[] = prev.forecast.map((day) => {
        const conversionFactor = newUnit === "fahrenheit" ? 1.8 : 1 / 1.8;
        const offset = newUnit === "fahrenheit" ? 32 : -32 * (5 / 9);

        return {
          ...day,
          temp: Math.round(day.temp * conversionFactor + offset),
          tempMin: Math.round(day.tempMin * conversionFactor + offset),
          tempMax: Math.round(day.tempMax * conversionFactor + offset),
        };
      });

      return {
        ...prev,
        unit: newUnit,
        current: convertedCurrent,
        forecast: convertedForecast,
      };
    });
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setWeatherData((prev) => ({ ...prev, error: null }));
  };

  // Load default city on mount (optional)
  useEffect(() => {
    // You can set a default city or use geolocation on load
    // fetchWeatherByCity('London');
    // Or use geolocation:
    // fetchWeatherByLocation();
  }, []);

  return {
    weatherData,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
    clearError,
  };
};

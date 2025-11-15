import {
  CurrentWeatherResponse,
  ForecastResponse,
  GeocodingResponse,
  CurrentWeather,
  DailyForecast,
  WeatherAPIError,
  Location,
  TemperatureUnit,
} from '@/types/weather';
import { convertTemperature } from '@/utils/converter';
import { getISODate, getDayName, getShortDayName } from '@/utils/formatters';

// Get API credentials from environment variables
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

/**
 * Base fetch function with error handling
 */
const fetchWeatherData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData: WeatherAPIError = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

/**
 * Search for cities by name
 * @param cityName - City name to search
 * @param limit - Maximum number of results (default: 5)
 */
export const searchCities = async (
  cityName: string, 
  limit: number = 5
): Promise<Location[]> => {
  if (!cityName.trim()) {
    return [];
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cityName
  )}&limit=${limit}&appid=${API_KEY}`;

  const data = await fetchWeatherData<GeocodingResponse[]>(url);
  
  return data.map((item) => ({
    name: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
};

/**
 * Get current weather by coordinates
 */
export const getCurrentWeather = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit
): Promise<CurrentWeather> => {
  const url = `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  
  const data = await fetchWeatherData<CurrentWeatherResponse>(url);
  
  // Transform API response to our app format
  return {
    temperature: convertTemperature(data.main.temp, unit),
    feelsLike: convertTemperature(data.main.feels_like, unit),
    tempMin: convertTemperature(data.main.temp_min, unit),
    tempMax: convertTemperature(data.main.temp_max, unit),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    visibility: data.visibility,
    cloudiness: data.clouds.all,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    cityName: data.name,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timestamp: data.dt,
  };
};

/**
 * Get 5-day forecast by coordinates
 * Groups 3-hour forecasts into daily forecasts
 */
export const getForecast = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit
): Promise<DailyForecast[]> => {
  const url = `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  
  const data = await fetchWeatherData<ForecastResponse>(url);
  
  // Group forecast data by day
  const dailyData = new Map<string, typeof data.list>();
  
  data.list.forEach((item) => {
    const date = getISODate(item.dt);
    
    if (!dailyData.has(date)) {
      dailyData.set(date, []);
    }
    
    dailyData.get(date)!.push(item);
  });
  
  // Process each day's data
  const forecasts: DailyForecast[] = [];
  
  dailyData.forEach((dayData, date) => {
    // Calculate daily averages and extremes
    const temps = dayData.map(item => item.main.temp);
    const tempMin = Math.min(...temps);
    const tempMax = Math.max(...temps);
    const tempAvg = temps.reduce((a, b) => a + b, 0) / temps.length;
    
    // Get the most common weather condition for the day
    const conditions = dayData.map(item => item.weather[0].main);
    const mostCommonCondition = conditions.sort(
      (a, b) => 
        conditions.filter(v => v === a).length - 
        conditions.filter(v => v === b).length
    ).pop()!;
    
    // Find data point with most common condition for icon/description
    const representativeData = dayData.find(
      item => item.weather[0].main === mostCommonCondition
    ) || dayData[0];
    
    // Calculate average humidity and wind speed
    const avgHumidity = Math.round(
      dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length
    );
    
    const avgWindSpeed = 
      dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length;
    
    // Maximum probability of precipitation
    const maxPop = Math.max(...dayData.map(item => item.pop));
    
    forecasts.push({
      date,
      dayName: getDayName(dayData[0].dt),
      tempMin: convertTemperature(tempMin, unit),
      tempMax: convertTemperature(tempMax, unit),
      temp: convertTemperature(tempAvg, unit),
      condition: mostCommonCondition,
      description: representativeData.weather[0].description,
      icon: representativeData.weather[0].icon,
      humidity: avgHumidity,
      windSpeed: avgWindSpeed,
      pop: maxPop,
    });
  });
  
  // Return up to 5 days, excluding today if it's past noon
  return forecasts.slice(0, 5);
};

/**
 * Get weather data for a city by name
 */
export const getWeatherByCity = async (
  cityName: string,
  unit: TemperatureUnit
): Promise<{ current: CurrentWeather; forecast: DailyForecast[] }> => {
  // First, get coordinates for the city
  const locations = await searchCities(cityName, 1);
  
  if (locations.length === 0) {
    throw new Error(`City "${cityName}" not found`);
  }
  
  const { lat, lon } = locations[0];
  
  // Fetch current weather and forecast in parallel
  const [current, forecast] = await Promise.all([
    getCurrentWeather(lat, lon, unit),
    getForecast(lat, lon, unit),
  ]);
  
  return { current, forecast };
};

/**
 * Get weather data by geolocation
 */
export const getWeatherByGeolocation = async (
  unit: TemperatureUnit
): Promise<{ current: CurrentWeather; forecast: DailyForecast[] }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const [current, forecast] = await Promise.all([
            getCurrentWeather(latitude, longitude, unit),
            getForecast(latitude, longitude, unit),
          ]);
          
          resolve({ current, forecast });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error('Unable to retrieve your location' + error));
      }
    );
  });
};
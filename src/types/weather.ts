// Temperature unit type
export type TemperatureUnit = 'celsius' | 'fahrenheit';

// Weather condition types from OpenWeatherMap
export type WeatherCondition = 
  | 'Clear' 
  | 'Clouds' 
  | 'Rain' 
  | 'Drizzle' 
  | 'Thunderstorm' 
  | 'Snow' 
  | 'Mist' 
  | 'Smoke' 
  | 'Haze' 
  | 'Dust' 
  | 'Fog' 
  | 'Sand' 
  | 'Ash' 
  | 'Squall' 
  | 'Tornado';

// Raw API response for current weather
export interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: WeatherCondition;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Raw API response for forecast
export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: WeatherCondition;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number; // Probability of precipitation
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    sys: {
      pod: string; // Part of day (d/n)
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Cleaned up current weather data for our app
export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  cloudiness: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
  cityName: string;
  country: string;
  sunrise: number;
  sunset: number;
  timestamp: number;
}

// Daily forecast data
export interface DailyForecast {
  date: string; // ISO date string
  dayName: string; // e.g., "Monday"
  tempMin: number;
  tempMax: number;
  temp: number; // Average temperature
  condition: WeatherCondition;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation (0-1)
}

// Complete weather data state
export interface WeatherData {
  current: CurrentWeather | null;
  forecast: DailyForecast[];
  unit: TemperatureUnit;
  loading: boolean;
  error: string | null;
}

// API error response
export interface WeatherAPIError {
  cod: string | number;
  message: string;
}

// Location data for search
export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// Geocoding API response (for city search)
export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
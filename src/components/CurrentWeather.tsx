import {
  CurrentWeather as CurrentWeatherType,
  TemperatureUnit,
} from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
} from "lucide-react";
import { capitalizeWords, formatTime } from "@/utils/formatters";
import {
  getUnitSymbol,
  metersPerSecToKmPerHour,
  metersToKilometers,
  degreesToCompass,
} from "@/utils/converter";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  unit: TemperatureUnit;
}

/**
 * Current weather display card
 */
export const CurrentWeather = ({ weather, unit }: CurrentWeatherProps) => {
  const unitSymbol = getUnitSymbol(unit);

  return (
    <div className="glass-card p-8 mb-8 animate-fade-in">
      {/* Location Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <MapPin className="text-white" size={24} />
        <h2 className="text-3xl font-bold text-white text-shadow">
          {weather.cityName}, {weather.country}
        </h2>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {/* Weather Icon */}
        <div className="animate-pulse-slow">
          <WeatherIcon condition={weather.condition} size={120} />
        </div>

        {/* Temperature & Condition */}
        <div className="text-center md:text-left">
          <div className="text-7xl font-bold text-white text-shadow mb-2">
            {weather.temperature}
            {unitSymbol}
          </div>
          <div className="text-2xl text-white/90 mb-1">
            {capitalizeWords(weather.description)}
          </div>
          <div className="text-lg text-white/80">
            Feels like {weather.feelsLike}
            {unitSymbol}
          </div>
          <div className="text-md text-white/70 mt-2">
            H: {weather.tempMax}
            {unitSymbol} • L: {weather.tempMin}
            {unitSymbol}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        {/* Humidity */}
        <WeatherDetail
          icon={<Droplets size={20} />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />

        {/* Wind */}
        <WeatherDetail
          icon={<Wind size={20} />}
          label="Wind"
          value={`${metersPerSecToKmPerHour(weather.windSpeed)} km/h`}
          subtitle={degreesToCompass(weather.windDirection)}
        />

        {/* Visibility */}
        <WeatherDetail
          icon={<Eye size={20} />}
          label="Visibility"
          value={`${metersToKilometers(weather.visibility)} km`}
        />

        {/* Pressure */}
        <WeatherDetail
          icon={<Gauge size={20} />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />

        {/* Sunrise */}
        <WeatherDetail
          icon={<Sunrise size={20} />}
          label="Sunrise"
          value={formatTime(weather.sunrise)}
        />

        {/* Sunset */}
        <WeatherDetail
          icon={<Sunset size={20} />}
          label="Sunset"
          value={formatTime(weather.sunset)}
        />
      </div>
    </div>
  );
};

/**
 * Individual weather detail item
 */
interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}

const WeatherDetail = ({
  icon,
  label,
  value,
  subtitle,
}: WeatherDetailProps) => {
  return (
    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
      <div className="text-white/80">{icon}</div>
      <div>
        <div className="text-white/70 text-xs uppercase tracking-wider">
          {label}
        </div>
        <div className="text-white font-semibold">{value}</div>
        {subtitle && <div className="text-white/60 text-xs">{subtitle}</div>}
      </div>
    </div>
  );
};

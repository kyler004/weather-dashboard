import { DailyForecast, TemperatureUnit } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import { capitalizeWords } from "@/utils/formatters";
import { getUnitSymbol } from "@/utils/converter";
import { Droplets } from "lucide-react";

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: TemperatureUnit;
}

/**
 * Individual forecast card for daily weather
 */

export const ForecastCard = ({ forecast, unit }: ForecastCardProps) => {
  {
    const unitSymbol = getUnitSymbol(unit);

    //Get shirt day name (eg "Mon", "Tue")

    const shortDay = forecast.dayName.substring(0, 3);

    return (
      <div className="glass-card p-6 card-hover flex flex-col items-center text-center min-w-[140px]">
        <h3 className="text-white font-semibold text-lg mb-3">{shortDay}</h3>

        {/* Weather Icon */}
        <div className="mb-3">
          <WeatherIcon condition={forecast.condition} size={56} />
        </div>

        {/* Temperature range */}
        <div className="mb-2">
          <div className="text-white text-2xl font-bold">
            {forecast.temp}
            {unitSymbol}
          </div>
          <div className="text-white text-2xl font-bold">
            {forecast.temp}
            {unitSymbol} / {forecast.tempMin}
            {unitSymbol}
          </div>
        </div>

        {/* Weather Description */}
        <p className="text-whute/80 text-sm mb-3">
          {capitalizeWords(forecast.description)}
        </p>

        {/* Additionnal Info */}
        <div className="w-full pt-3 border-t border-white/20 space-y-2">
          {/* Precipitation Probability */}
          {forecast.pop > 0 && (
            <div className="flex items-centter justify-center gap-2 text-white/70 text-xs">
              <Droplets size={14} />
              <span>{Math.round(forecast.pop * 100)}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

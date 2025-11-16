import { DailyForecast, TemperatureUnit } from "@/types/weather";
import { ForecastCard } from "./ForecastCard";

interface ForecastListProps {
  forecasts: DailyForecast[];
  unit: TemperatureUnit;
}

/**
 * List of forecast cards
 */
export const ForecastList = ({ forecasts, unit }: ForecastListProps) => {
  if (forecasts.length === 0) {
    return null;
  }

  return (
    <div className="animate-slide-up">
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-white text-center mb-6 text-shadow">
        5-Day Forecast
      </h2>

      {/* Forecast Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} unit={unit} />
        ))}
      </div>
    </div>
  );
};

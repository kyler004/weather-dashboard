import { useWeather } from "@/hooks/useWeather";
import { SearchBar } from "@/components/SearchBar";
import { UnitToggle } from "@/components/UnitToggle";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastList } from "@/components/ForecastList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Cloud } from "lucide-react";

function App() {
  const {
    weatherData,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
    clearError,
  } = useWeather();

  const { current, forecast, unit, loading, error } = weatherData;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="text-white" size={48} />
            <h1 className="text-5xl font-bold text-white text-shadow">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Get real-time weather forecasts for any location
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar
          onSearch={fetchWeatherByCity}
          onUseLocation={fetchWeatherByLocation}
          loading={loading}
        />

        {/* Unit Toggle */}
        {current && (
          <div className="flex justify-center mb-8">
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        )}

        {/* Error Message */}
        {error && <ErrorMessage message={error} onClose={clearError} />}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Weather Content */}
        {!loading && !error && current && (
          <>
            {/* Current Weather */}
            <CurrentWeather weather={current} unit={unit} />

            {/* Forecast */}
            <ForecastList forecasts={forecast} unit={unit} />
          </>
        )}

        {/* Empty State */}
        {!loading && !error && !current && (
          <div className="text-center py-20">
            <Cloud className="text-white/50 mx-auto mb-4" size={80} />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No Weather Data Yet
            </h2>
            <p className="text-white/70">
              Search for a city or use your current location to get started
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-white/60 text-sm">
          <p>Powered by OpenWeatherMap API</p>
          <p className="mt-1">Built with React, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

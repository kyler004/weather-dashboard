import { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

/**
 * Toggle button for Celsius/Fahrenheit
 */

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-white/80 text-sm font-medium">
        Temperature Unit:
      </span>

      <button
        onClick={onToggle}
        className="relative inline-flex items-center bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30 transition-all hover:bg-white/30"
        aria-label={`Switch to ${
          unit === "celsius" ? "Fahrenheit" : "Celsius"
        }`}
      >
        {/* Celsius Option */}
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            unit === "celsius"
              ? "bg-white text-blue-600 shadow-lg"
              : "text-white/80"
          }`}
        >
          °C
        </span>

        {/* Fahrenheit Option */}
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            unit === "fahrenheit"
              ? "bg-white text-blue-600 shadow-lg"
              : "text-white/80"
          }`}
        >
          °F
        </span>
      </button>
    </div>
  );
};

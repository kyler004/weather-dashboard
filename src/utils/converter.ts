import { TemperatureUnit } from "@/types/weather";

/**
 * Convert from kelvin to celsius as the
 * Api returns the temperature in kelvin by defautl
 */

export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * convert kelvin to fahreneit
 */

export const kelvinToFahreneit = (kelvin: number): number => {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
};

/**
 * Convert celsius to fahreneit
 */

export const celsiusToFahreneit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Convert fahreneit to celsius
 */
export const fahreneitToCelsius = (fahreneit: number): number => {
  return Math.round(((fahreneit - 32) * 5) / 9);
};

/**
 * Convert temperatue besed on preference
 * @param kelvin - temp from the API
 * @param unit - desired unit
 */
export const convertTemperature = (
  kelvin: number,
  unit: TemperatureUnit
): number => {
  return unit === "celsius"
    ? kelvinToCelsius(kelvin)
    : kelvinToFahreneit(kelvin);
};

/**
 * Get the temperature symbol
 */

export const getUnitSymbol = (unit: TemperatureUnit): string => {
  return unit === "celsius" ? "°C" : "°F";
};

/**
 * Convert the wind speed from m/s to km/h
 */

export const metersPerSecToKmPerHour = (mps: number): number => {
  return Math.round(mps * 3.6);
};

/**
 * convert the wind speed from mps to mile per hour
 */

export const metersPerSecToMph = (mps: number): number => {
  return Math.round(mps * 2.237);
};

/**
 * Convert visibility from meters to kilometers
 */

export const metersToKilometers = (meters: number): number => {
  return Math.round(meters / 1000);
};

/**
 * Convert wind direction in degrees to compass direction
 * @param degrees - Wind direction in degrees (0-360)
 */
export const degreesToCompass = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

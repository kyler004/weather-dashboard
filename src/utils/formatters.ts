//Utility functions to format the output on the dashboard.

import { format, fromUnixTime } from "date-fns";

/**
 * Format Unix timestamp to readable date
 * @param timestamp - Unix timestamp in seconds
 * @param formatStr - date-fns format string
 */

export const formatUnixTime = (
  timestamp: number,
  formatStr: string = "PPP"
): string => {
  return format(fromUnixTime(timestamp), formatStr);
};

/**
 * Format Unix timestamp to time only (HH:mm)
 */
export const formatTime = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "HH:mm");
};

/**
 * Get day name from Unix timestamp
 * @param timestamp - Unix timestamp in seconds
 */
export const getDayName = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "EEEE");
};

/**
 * Get short day name from unix timestamp
 */

export const getShortDayName = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "EEE");
};

/**
 * Get shirt day name from Unix timestamp (yyyy-mm-dd)
 */
export const getISODate = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "yyyy-MM-dd");
};

/**
 * Check if timestamp is today
 */
export const isToday = (timestamp: number): boolean => {
  const date = fromUnixTime(timestamp);
  const today = new Date();
  return date.toDateString() === today.toLocaleDateString();
};

/**
 * Format date for display (eg., "Mon, Jan 15")
 */
export const formatDisplayDate = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "EEE, MMM d");
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format percentage (0-1 to 0-100%)
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};

import {
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  Wind,
  Tornado,
  CloudFog,
} from "lucide-react";

import { WeatherCondition } from "@/types/weather";

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

/**
 * Dynamic weather Icon component
 * Maps weather conditions to appropriate Lucide icons
 */

export const WeatherIcon = ({
  condition,
  size = 48,
  className = "",
}: WeatherIconProps) => {
  const iconProps = {
    size,
    className: `${className} drop-shadow-lg`,
    strokeWidth: 1.5,
  };

  //Maps weather conditions to icons
  switch (condition) {
    case "Clear":
      return (
        <Sun
          {...iconProps}
          className={`${iconProps.className} text-yellow-300`}
        />
      );

    case "Clouds":
      return (
        <Cloud
          {...iconProps}
          className={`${iconProps.className} text-gray-300`}
        />
      );

    case "Rain":
      return (
        <CloudRain
          {...iconProps}
          className={`${iconProps.className} text-blue-300`}
        />
      );

    case "Drizzle":
      return (
        <CloudDrizzle
          {...iconProps}
          className={`${iconProps.className} text-blue-200`}
        />
      );

    case "Thunderstorm":
      return (
        <CloudLightning
          {...iconProps}
          className={`${iconProps.className} text-yellow-200`}
        />
      );

    case "Snow":
      return (
        <CloudSnow
          {...iconProps}
          className={`${iconProps.className} text-blue-100`}
        />
      );

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      return (
        <CloudFog
          {...iconProps}
          className={`${iconProps.className} text-gray-400`}
        />
      );

    case "Squall":
      return (
        <Wind
          {...iconProps}
          className={`${iconProps.className} text-yellow-300`}
        />
      );

    case "Tornado":
      return (
        <Tornado
          {...iconProps}
          className={`${iconProps.className} text-gray-500`}
        />
      );

    default:
      return (
        <Sun
          {...iconProps}
          className={`${iconProps.className} text-gray-300`}
        />
      );
  }
};

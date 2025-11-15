import {
    Sun, 
    Cloud, 
    CloudRain, 
    CloudDrizzle, 
    CloudSnow, 
    CloudLightning, 
    cloudFog, 
    Wind, 
    Tornado, 
} from 'lucide-react'; 

import {WeatherCondition} from '@/types/weather'; 

interface WeatherIconProps  {
    condition: WeatherCondition; 
    size ? : number; 
    className?: string; 
}

/**
 * Dynamic weather Icon component
 * Maps weather conditions to appropriate Lucide icons
 */

export const WeatherIcon = ({
    condition,
    size = 48, 
    className = ''
} : WeatherIconProps) => {
    const iconProps = {
        size, 
        className: `${className} drop-shadow-lg`, 
        strokeWidth: 1.5, 
    }; 

    //Maps weather conditions to icons
    switch (condition) {
        case 'Clear': 
        return <Sun {...iconProps} className = {`${iconProps.className} text-yellow-300`}/>
        
        case 'Clouds': 
        return <Cloud {...iconProps} className = {`${iconProps.className} text-gray-300`}/>

        case 'Rain': 
        return <CloudRain {...iconProps} className = {`${iconProps.className} text-blue-300`}/>
        
        case 'Drizzle': 
        return <CloudDrizzle {...iconProps} className={`${iconProps.className} text-blue-200`}/>
        
        case 'Thunderstorm': 
        return <CloudLightning {...iconProps} className={`${iconProps.className} text-yellow-200`} />

    }
}

import { useState } from 'react';

const precAndHumConfig = [
  {
    name: 'precipitation',
    description: 'Chance of Precipitation',
    unit: '%',
    color: '#5A5DA0',
  },
  {
    name: 'humidity',
    description: 'Humidity',
    unit: '%',
    color: '#8B64A6',
  },
];

const pressureConfig = [
  {
    name: 'pressure',
    description: 'Pressure',
    unit: 'hPa',
    color: '#5A5DA0',
  },
];

const windSpeedConfig = [
  {
    name: 'windSpeed',
    description: 'Wind Speed',
    unit: 'm/s',
    color: '#5A5DA0',
  },
];

const useGraphConfig = (defaultActiveTabName = 'Prec&Hum') => {
  const [activeTabName, setActiveTabName] = useState(defaultActiveTabName);
  let graphConfig;

  switch (activeTabName) {
    case 'Pressure':
      graphConfig = pressureConfig;
      break;
    case 'Wind Speed':
      graphConfig = windSpeedConfig;
      break;
    default:
      graphConfig = precAndHumConfig;
  }

  const setGraphConfig = (tabName) => setActiveTabName(tabName);

  return { graphConfig, setGraphConfig, activeTabName };
};

export default useGraphConfig;

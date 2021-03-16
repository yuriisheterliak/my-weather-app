import { useState } from 'react';
import axios from 'axios';

import useUpdateEffect from '../../../hooks/useUpdateEffect';
import { formatWeather } from '../utils/weatherFormatter';

const useFetchWeather = (
  locationData,
  setInputValue,
  setError,
  locationErrorRef
) => {
  const [weather, setWeather] = useState(null);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);

  useUpdateEffect(async () => {
    if (locationErrorRef.current) return;

    try {
      setWeatherIsLoading(true);

      const { data } = await axios.get(
        `/.netlify/functions/fetch-weather/?lat=${locationData.lat}&lng=${locationData.lng}`
      );
      const weather = formatWeather(data);

      setWeather(weather);
      setError(null);
      setInputValue('');
    } catch {
      setWeather(null);
      setError('Weather API Error! Try again...');
    } finally {
      setWeatherIsLoading(false);
    }
  }, [locationData]);

  return { weather, weatherIsLoading };
};

export default useFetchWeather;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import { formatWeather } from './weatherFormatter';
import useLocalStorage from '../../hooks/useLocalStorage';
import Header from '../Header/Header';
import Week from '../Week/Week';
import Hours from '../Hours/Hours';
import GraphContainer from '../GraphContainer/GraphContainer';
import classes from './App.module.scss';

const defaultLocationName = { value: 'Kyiv' };
const defaultLocationInfo = {
  location: null,
  country: null,
  lat: null,
  lng: null,
};

const App = () => {
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const prevLocationName = useRef(defaultLocationName);
  const [locationName, setLocationName] = useLocalStorage(
    'location',
    defaultLocationName,
    prevLocationName.current,
    error
  );
  const [units, setUnits] = useState('celsius');
  const [activeDay, setActiveDay] = useState(0);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [locationIsLoading, setLocationIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [locationInfo, setLocationInfo] = useState(defaultLocationInfo);
  const [sliderMouseDownClientX, setSliderMouseDownClientX] = useState(null);

  useEffect(() => {
    const getLocationInfo = async (locationName) => {
      let locationInfo = defaultLocationInfo;
      let locationError = null;

      try {
        setLocationIsLoading(true);
        setWeatherIsLoading(true);
        const { data } = await axios.get(
          `/.netlify/functions/fetch-location/?locationName=${locationName}`
        );
        const locationData = data.features[0].properties;
        locationInfo = {
          location:
            locationData.town ||
            locationData.city ||
            locationData.village ||
            locationData.state,
          country: locationData.country,
          lat: locationData.lat,
          lng: locationData.lon,
        };
      } catch {
        locationError = 'Geocoding API Error! Try again...';
        setError(locationError);
      } finally {
        setLocationIsLoading(false);
        setLocationInfo(locationInfo);
        return { locationInfo, locationError };
      }
    };

    const getWeather = async (locationName) => {
      const { locationInfo, locationError } = await getLocationInfo(
        locationName
      );
      if (locationError) return;

      try {
        const { data } = await axios.get(
          `/.netlify/functions/fetch-weather/?lat=${locationInfo.lat}&lng=${locationInfo.lng}`
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
    };

    getWeather(locationName.value);
  }, [locationName]);

  const handleLocationSubmit = useCallback(
    (value, e) => {
      e.preventDefault();
      if (!value || !value.trim()) return;

      setLocationName((prevValue) => {
        if (!error) prevLocationName.current = prevValue;
        return { value };
      });
    },
    [setLocationName, error]
  );

  const handleTempSwitching = useCallback((e) => {
    e.target.checked ? setUnits('fahrenheit') : setUnits('celsius');
  }, []);

  const changeActiveDay = useCallback(
    (dayIndex, e) => {
      if (sliderMouseDownClientX === e.clientX) {
        setActiveDay(dayIndex);
      }
    },
    [sliderMouseDownClientX]
  );

  const saveSliderMouseDownClientX = useCallback((e) => {
    setSliderMouseDownClientX(e.clientX);
  }, []);

  let mainContent = (
    <>
      <Week
        weather={weather}
        activeDay={activeDay}
        units={units}
        isLoading={weatherIsLoading}
        changeActiveDay={changeActiveDay}
        saveSliderMouseDownClientX={saveSliderMouseDownClientX}
      />
      <Hours
        weather={weather}
        activeDay={activeDay}
        units={units}
        isLoading={weatherIsLoading}
      />
      <GraphContainer
        weather={weather}
        activeDay={activeDay}
        isLoading={weatherIsLoading}
      />
    </>
  );

  if (error) {
    mainContent = <div className={classes.Error}>Something went wrong!</div>;
  }

  return (
    <div className={classes.App}>
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleLocationSubmit={handleLocationSubmit}
        handleTempSwitching={handleTempSwitching}
        location={locationInfo.location}
        country={locationInfo.country}
        isLoading={locationIsLoading}
        error={error}
      />
      {mainContent}
    </div>
  );
};

export default App;

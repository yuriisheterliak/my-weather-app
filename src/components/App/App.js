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
  const prevInputValue = useRef(defaultLocationName);
  const [inputValue, setInputValue] = useLocalStorage(
    'location',
    defaultLocationName,
    prevInputValue.current,
    error
  );
  const [units, setUnits] = useState('celsius');
  const [activeDay, setActiveDay] = useState(0);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [locationIsLoading, setLocationIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [locationInfo, setLocationInfo] = useState(defaultLocationInfo);
  const [sliderMouseDownClientX, setSliderMouseDownClientX] = useState(null);
  const formRef = useRef();

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
        const locationData = data.results[0];
        locationInfo = {
          location:
            locationData.components.town ||
            locationData.components.city ||
            locationData.components.village ||
            locationData.components.state,
          country: locationData.components.country,
          lat: locationData.geometry.lat,
          lng: locationData.geometry.lng,
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
        formRef.current.reset();
      } catch {
        setWeather(null);
        setError('Weather API Error! Try again...');
      } finally {
        setWeatherIsLoading(false);
      }
    };

    getWeather(inputValue.value);
  }, [inputValue]);

  const handleLocationSubmit = useCallback(
    (value, e) => {
      e.preventDefault();
      setInputValue((prevValue) => {
        if (!error) prevInputValue.current = prevValue;
        return { value };
      });
    },
    [setInputValue, error]
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
        handleLocationSubmit={handleLocationSubmit}
        handleTempSwitching={handleTempSwitching}
        formRef={formRef}
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

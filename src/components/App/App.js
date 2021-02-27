import React, { useState, useEffect, useCallback } from 'react';

import { formatWeather } from './weatherFormatter';
import Header from '../Header/Header';
import Week from '../Week/Week';
import Hours from '../Hours/Hours';
import GraphContainer from '../GraphContainer/GraphContainer';
import classes from './App.module.scss';

const App = () => {
  const [units, setUnits] = useState('celsius');
  const [activeDay, setActiveDay] = useState(0);
  const [weatherIsLoading, setWeatherIsLoading] = useState(false);
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [locationInfo, setLocationInfo] = useState({
    location: null,
    country: null,
    lat: null,
    lng: null,
  });
  const [error, setError] = useState(null);
  const [sliderMouseDownClientX, setSliderMouseDownClientX] = useState(null);

  const getLocationInfo = useCallback(async (locationName) => {
    const geocodingAPIKey = 'fc5537dfa58042ccb273b70a735c9fbe'; // TODO: hide this shame in server)
    const geocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&limit=1&key=${geocodingAPIKey}`;
    let formattedLocationData = {
      location: null,
      country: null,
      lat: null,
      lng: null,
    };
    let locationError = null;

    try {
      setLocationIsLoading(true);
      setWeatherIsLoading(true);
      const response = await fetch(geocodingURL);
      const data = await response.json();
      const locationData = data.results[0];
      formattedLocationData = {
        location:
          locationData.components.town ||
          locationData.components.city ||
          locationData.components.village ||
          locationData.components.state,
        country: locationData.components.country,
        lat: locationData.geometry.lat,
        lng: locationData.geometry.lng,
      };
      setLocationIsLoading(false);
      setLocationInfo(formattedLocationData);
    } catch {
      locationError = 'Geocoding API Error! Try again...';
      setLocationIsLoading(false);
      setLocationInfo(formattedLocationData);
      setError(locationError);
    }

    return {
      locationInfo: formattedLocationData,
      locationError: locationError,
    };
  }, []);

  const getWeather = useCallback(
    async (locationName) => {
      setError(null);
      const { locationInfo, locationError } = await getLocationInfo(
        locationName
      );
      if (locationError) return;

      const baseWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?';
      const weatherAPIKey = 'f7598b88f802f301ba64fa1641332295'; // TODO: hide this shame in server)
      const parameters = `lat=${locationInfo.lat}&lon=${locationInfo.lng}&exclude=current,minutely&units=metric&appid=${weatherAPIKey}`;
      const weatherURL = `${baseWeatherURL}${parameters}`;

      try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        const weather = formatWeather(data);

        setWeatherIsLoading(false);
        setWeather(weather);
      } catch {
        setWeatherIsLoading(false);
        setWeather(null);
        setError('Weather API Error! Try again...');
      }
    },
    [getLocationInfo]
  );

  useEffect(() => {
    getWeather('Kyiv');
  }, [getWeather]);

  const handleLocationSubmit = useCallback(
    async (value, e) => {
      e.preventDefault();
      e.persist();
      await getWeather(value);
      if (error === null) e.target.reset();
    },
    [getWeather, error]
  );

  const handleTempSwitching = useCallback((e) => {
    e.target.checked ? setUnits('fahrenheit') : setUnits('celsius');
  }, []);

  const changeActiveDay = (dayIndex, e) => {
    if (sliderMouseDownClientX === e.clientX) {
      setActiveDay(dayIndex);
    }
  };

  const saveSliderMouseDownClientX = (e) => {
    setSliderMouseDownClientX(e.clientX);
  };

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

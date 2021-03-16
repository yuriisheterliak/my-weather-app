import React, { useState, useCallback, useRef } from 'react';

import useFetchLocationData from './hooks/useFetchLocationData';
import useFetchWeather from './hooks/useFetchWeather';
import useLocalStorage from '../../hooks/useLocalStorage';
import Header from '../Header/Header';
import Week from '../Week/Week';
import Hours from '../Hours/Hours';
import GraphContainer from '../GraphContainer/GraphContainer';
import classes from './App.module.scss';

const defaultLocationName = { value: 'Kyiv' };

const App = () => {
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [units, setUnits] = useState('celsius');
  const [activeDay, setActiveDay] = useState(0);
  const prevLocationName = useRef(defaultLocationName);
  const [locationName, setLocationName] = useLocalStorage(
    'location',
    defaultLocationName,
    error,
    prevLocationName.current
  );
  const locationErrorRef = useRef(null);
  const { locationData, locationIsLoading } = useFetchLocationData(
    locationName,
    setError,
    locationErrorRef
  );
  const { weather, weatherIsLoading } = useFetchWeather(
    locationData,
    setInputValue,
    setError,
    locationErrorRef
  );

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

  return (
    <div className={classes.App}>
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleLocationSubmit={handleLocationSubmit}
        setUnits={setUnits}
        location={locationData.location}
        country={locationData.country}
        isLoading={locationIsLoading}
        error={error}
      />
      {error ? (
        <div className={classes.Error}>Something went wrong!</div>
      ) : (
        <>
          <Week
            weather={weather}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            units={units}
            isLoading={weatherIsLoading}
          />
          <Hours
            weather={weather && weather[activeDay]}
            units={units}
            isLoading={weatherIsLoading}
          />
          <GraphContainer
            weather={weather && weather[activeDay]}
            isLoading={weatherIsLoading}
          />
        </>
      )}
    </div>
  );
};

export default App;

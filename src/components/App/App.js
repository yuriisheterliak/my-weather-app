import { useState, useCallback, useRef } from 'react';

import useServiceWorker from './hooks/useServiceWorker';
import useFetchLocationData from './hooks/useFetchLocationData';
import useFetchWeather from './hooks/useFetchWeather';
import useOfflineStatus from './hooks/useOfflineStatus';
import useLocalStorage from '../../hooks/useLocalStorage';
import Header from '../Header/Header';
import Notification from '../Notification/Notification';
import Week from '../Week/Week';
import Hours from '../Hours/Hours';
import GraphContainer from '../GraphContainer/GraphContainer';
import classes from './App.module.scss';

const defaultLocationName = { value: 'Kyiv' };

const App = () => {
  const offline = useOfflineStatus();
  const { waitingWorker, setWaitingWorker } = useServiceWorker();
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
    locationErrorRef,
    offline
  );
  const { weather, weatherIsLoading } = useFetchWeather(
    locationData,
    setInputValue,
    setError,
    locationErrorRef,
    offline
  );

  const handleNotificationClick = (update) => {
    if (update) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setWaitingWorker(null);
    }
    window.location.reload();
  };

  const handleLocationSubmit = useCallback(
    (value) => {
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
        offline={offline}
        error={error}
      />
      {waitingWorker && (
        <Notification status="update" handleClick={handleNotificationClick} />
      )}
      {offline && (
        <Notification status="offline" handleClick={handleNotificationClick} />
      )}
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

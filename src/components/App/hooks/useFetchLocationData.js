import { useState, useEffect } from 'react';
import axios from 'axios';

import useLocalStorage from '../../../hooks/useLocalStorage';

const defaultLocationData = {
  locationRequest: null,
  location: null,
  country: null,
  lat: null,
  lng: null,
};

const useFetchLocationData = (
  locationName,
  setError,
  locationErrorRef,
  offline
) => {
  const [locationData, setLocationData] = useLocalStorage(
    'locationData',
    defaultLocationData
  );
  const [locationIsLoading, setLocationIsLoading] = useState(true);

  useEffect(() => {
    const getLocationData = async (locationName) => {
      const storedLocationData = JSON.parse(
        localStorage.getItem('locationData')
      );
      const locationDataAreStored =
        storedLocationData.locationRequest === locationName;
      let newLocationData = defaultLocationData;
      let locationError = null;

      try {
        if (offline || locationDataAreStored) {
          newLocationData = storedLocationData;
          return;
        }

        setLocationIsLoading(true);

        const { data } = await axios.get(
          `/.netlify/functions/fetch-location/?locationName=${locationName}`
        );
        const locationInfo = data.features[0].properties;

        newLocationData = {
          locationRequest: locationName,
          location:
            locationInfo.town ||
            locationInfo.city ||
            locationInfo.village ||
            locationInfo.state,
          country: locationInfo.country,
          lat: locationInfo.lat,
          lng: locationInfo.lon,
        };
      } catch {
        locationError = 'Geocoding API Error! Try again...';
      } finally {
        locationErrorRef.current = locationError;
        setError(locationError);
        setLocationIsLoading(false);
        setLocationData(newLocationData);
      }
    };

    getLocationData(locationName.value);
  }, [locationName, setLocationData, setError, locationErrorRef, offline]);

  return { locationData, locationIsLoading };
};

export default useFetchLocationData;

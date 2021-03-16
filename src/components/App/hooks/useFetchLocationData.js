import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultLocationData = {
  location: null,
  country: null,
  lat: null,
  lng: null,
};

const useFetchLocationData = (locationName, setError, locationErrorRef) => {
  const [locationData, setLocationData] = useState(defaultLocationData);
  const [locationIsLoading, setLocationIsLoading] = useState(true);

  useEffect(() => {
    const getLocationData = async (locationName) => {
      let locationData = defaultLocationData;
      let locationError = null;

      try {
        setLocationIsLoading(true);

        const { data } = await axios.get(
          `/.netlify/functions/fetch-location/?locationName=${locationName}`
        );
        const locationInfo = data.features[0].properties;

        locationData = {
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
        setLocationIsLoading(false);
        setLocationData(locationData);
        setError(locationError);
      }
    };

    getLocationData(locationName.value);
  }, [locationName, setError, locationErrorRef]);

  return { locationData, locationIsLoading };
};

export default useFetchLocationData;

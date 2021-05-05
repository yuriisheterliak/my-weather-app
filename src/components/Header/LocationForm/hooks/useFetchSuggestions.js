import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { throttle } from 'lodash';
import axios from 'axios';

const useFetchSuggestions = (locationName, offline) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchingIsAllowedRef = useRef(true);

  const fetchSuggestions = useCallback(async (locationName) => {
    if (!locationName || !locationName.trim()) return;

    const baseURL = '/.netlify/functions/fetch-location';
    const { data } = await axios.get(baseURL, { params: { locationName } });

    if (fetchingIsAllowedRef.current) setSuggestions(data.features);
  }, []);

  const debouncedFetchSuggestions = useMemo(
    () => throttle((locationName) => fetchSuggestions(locationName), 200),
    [fetchSuggestions]
  );

  const clearSuggestions = () => setSuggestions([]);
  const allowSuggestionsFetching = () => (fetchingIsAllowedRef.current = true);
  const preventSuggestionsFetching = () => {
    fetchingIsAllowedRef.current = false;
  };

  useEffect(() => {
    if (!offline) debouncedFetchSuggestions(locationName);
  }, [debouncedFetchSuggestions, locationName, offline]);

  return {
    suggestions,
    clearSuggestions,
    allowSuggestionsFetching,
    preventSuggestionsFetching,
  };
};

export default useFetchSuggestions;

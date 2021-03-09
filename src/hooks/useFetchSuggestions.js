import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { throttle } from 'lodash';
import axios from 'axios';

const useFetchSuggestions = (locationName) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchingIsCancelled = useRef(false);

  const fetchSuggestions = useCallback(async (locationName) => {
    if (!locationName || !locationName.trim()) return;

    const baseURL = '/.netlify/functions/fetch-location';
    const { data } = await axios.get(baseURL, { params: { locationName } });

    if (fetchingIsCancelled.current) return;
    setSuggestions(data.features);
  }, []);

  const throttledFetchSuggestions = useMemo(
    () => throttle((locationName) => fetchSuggestions(locationName), 300),
    [fetchSuggestions]
  );

  const clearSuggestions = () => setSuggestions([]);
  const cancelSuggestionsFetching = () => (fetchingIsCancelled.current = true);

  useEffect(() => {
    fetchingIsCancelled.current = false;
    throttledFetchSuggestions(locationName);
  }, [throttledFetchSuggestions, locationName]);

  return { suggestions, clearSuggestions, cancelSuggestionsFetching };
};

export default useFetchSuggestions;

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

const useFetchSuggestions = (locationName, offline) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchingIsCancelled = useRef(false);

  const fetchSuggestions = useCallback(async (locationName) => {
    if (!locationName || !locationName.trim()) return;

    const baseURL = '/.netlify/functions/fetch-location';
    const { data } = await axios.get(baseURL, { params: { locationName } });

    if (fetchingIsCancelled.current) return;
    setSuggestions(data.features);
  }, []);

  const debouncedFetchSuggestions = useMemo(
    () => debounce((locationName) => fetchSuggestions(locationName), 200),
    [fetchSuggestions]
  );

  const clearSuggestions = () => setSuggestions([]);
  const cancelSuggestionsFetching = () => (fetchingIsCancelled.current = true);

  useEffect(() => {
    fetchingIsCancelled.current = false;
    if (!offline) debouncedFetchSuggestions(locationName);
  }, [debouncedFetchSuggestions, locationName, offline]);

  return { suggestions, clearSuggestions, cancelSuggestionsFetching };
};

export default useFetchSuggestions;

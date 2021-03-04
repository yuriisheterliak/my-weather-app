import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue, prevValue, error) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    if (error) {
      localStorage.setItem(key, JSON.stringify(prevValue));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, prevValue, error]);

  return [value, setValue];
};

export default useLocalStorage;

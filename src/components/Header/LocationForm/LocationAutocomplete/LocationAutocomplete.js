import { useState, useEffect } from 'react';

import classes from './LocationAutocomplete.module.scss';
import SuggestionsList from './SuggestionsList/SuggestionsList';

const LocationAutocomplete = ({
  suggestions,
  clearSuggestions,
  inputValue,
  setInputValue,
}) => {
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(
    -1
  );

  useEffect(() => setHighlightedSuggestionIndex(-1), [suggestions]);

  const selectSuggestion = (index = highlightedSuggestionIndex) => {
    const locationName = suggestions[index].properties.formatted;
    setInputValue(locationName);
  };

  const handleSuggestionOnClick = (index) => {
    selectSuggestion(index);
    clearSuggestions();
  };

  const handleOnChange = (e) => {
    const newInputValue = e.target.value;
    clearSuggestions();
    setInputValue(newInputValue);
  };

  const handleOnKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const index =
        highlightedSuggestionIndex !== suggestions.length - 1
          ? highlightedSuggestionIndex + 1
          : 0;
      setHighlightedSuggestionIndex(index);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const index =
        highlightedSuggestionIndex > 0
          ? highlightedSuggestionIndex - 1
          : suggestions.length - 1;
      setHighlightedSuggestionIndex(index);
    } else if (e.key === 'Enter' && highlightedSuggestionIndex !== -1) {
      e.preventDefault();
      selectSuggestion();
      clearSuggestions();
    } else if (e.key === 'Tab') {
      clearSuggestions();
    }
  };

  return (
    <>
      <label htmlFor="searchInput" style={{ width: '0.1px', opacity: '0' }}>
        Search
      </label>
      <input
        id="searchInput"
        className={classes.Input}
        type="text"
        value={inputValue}
        placeholder="Enter Your Location..."
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {suggestions.length ? (
        <SuggestionsList
          highlightedSuggestionIndex={highlightedSuggestionIndex}
          suggestions={suggestions}
          handleSuggestionOnClick={handleSuggestionOnClick}
        />
      ) : null}
    </>
  );
};

export default LocationAutocomplete;

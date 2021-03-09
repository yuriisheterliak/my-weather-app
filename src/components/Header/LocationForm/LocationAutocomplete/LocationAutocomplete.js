import React, { useState, useEffect } from 'react';

import classes from './LocationAutocomplete.module.scss';
import SuggestionsList from './SuggestionsList/SuggestionsList';

const LocationAutocomplete = (props) => {
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(
    -1
  );

  useEffect(() => setHighlightedSuggestionIndex(-1), [props.suggestions]);

  const selectSuggestion = (index = highlightedSuggestionIndex) => {
    const locationName = props.suggestions[index].properties.formatted;
    props.setInputValue(locationName);
  };

  const handleSuggestionOnClick = (index) => {
    selectSuggestion(index);
    props.clearSuggestions();
  };

  const handleOnChange = (e) => {
    const newInputValue = e.target.value;
    props.clearSuggestions();
    props.setInputValue(newInputValue);
  };

  const handleOnKeyDown = (e) => {
    if (!props.suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const index =
        highlightedSuggestionIndex !== props.suggestions.length - 1
          ? highlightedSuggestionIndex + 1
          : 0;
      setHighlightedSuggestionIndex(index);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const index =
        highlightedSuggestionIndex > 0
          ? highlightedSuggestionIndex - 1
          : props.suggestions.length - 1;
      setHighlightedSuggestionIndex(index);
    } else if (e.key === 'Enter' && highlightedSuggestionIndex !== -1) {
      e.preventDefault();
      selectSuggestion();
      props.clearSuggestions();
    } else if (e.key === 'Tab') {
      props.clearSuggestions();
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
        value={props.inputValue}
        placeholder="Enter Your Location..."
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {props.suggestions.length ? (
        <SuggestionsList
          highlightedSuggestionIndex={highlightedSuggestionIndex}
          suggestions={props.suggestions}
          handleSuggestionOnClick={handleSuggestionOnClick}
        />
      ) : null}
    </>
  );
};

export default LocationAutocomplete;

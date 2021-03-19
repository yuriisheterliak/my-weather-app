import React from 'react';

import classes from './SuggestionsList.module.scss';

const SuggestionsList = ({
  suggestions,
  highlightedSuggestionIndex,
  handleSuggestionOnClick,
}) => (
  <ul className={classes.List}>
    {suggestions.map((suggestion, index) => {
      const classList = [classes.ListItem];
      if (index === highlightedSuggestionIndex) classList.push(classes.Active);

      return (
        <li
          key={index}
          className={classList.join(' ')}
          onClick={() => handleSuggestionOnClick(index)}
        >
          {suggestion.properties.formatted}
        </li>
      );
    })}
  </ul>
);

export default SuggestionsList;

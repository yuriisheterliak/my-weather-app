import React from 'react';

import classes from './SuggestionsList.module.scss';

const SuggestionsList = (props) => {
  const suggestions = props.suggestions.map((suggestion, index) => {
    const classList = [classes.ListItem];
    if (index === props.highlightedSuggestionIndex)
      classList.push(classes.Active);

    return (
      <li
        key={index}
        className={classList.join(' ')}
        onClick={() => props.handleSuggestionOnClick(index)}
      >
        {suggestion.properties.formatted}
      </li>
    );
  });

  return <ul className={classes.List}>{suggestions}</ul>;
};

export default SuggestionsList;

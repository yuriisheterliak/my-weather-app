import React, { useState } from 'react';

import classes from './LocationInput.module.scss';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';

const LocationInput = (props) => {
  const [value, setValue] = useState('');

  let formClasses = [classes.Form];
  if (props.error !== null) {
    formClasses.push(classes.FormInvalid);
  }

  return (
    <form
      className={formClasses.join(' ')}
      onSubmit={(e) => props.onSubmitHandler(value, e)}
    >
      <button type="submit">
        <SearchIcon className={classes.Icon} />
      </button>
      <input
        className={classes.Input}
        type="text"
        placeholder="Your Location..."
        onChange={(e) => setValue(e.target.value)}
      />
      {props.error !== null ? (
        <span className={classes.Error}>{props.error}</span>
      ) : null}
    </form>
  );
};

export default LocationInput;

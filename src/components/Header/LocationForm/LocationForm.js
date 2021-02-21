import React, { useState, memo } from 'react';

import classes from './LocationForm.module.scss';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import Button from '../../common/Button/Button';

const LocationForm = memo((props) => {
  const [value, setValue] = useState('');

  let formClasses = [classes.Form];
  if (props.error !== null) {
    formClasses.push(classes.FormInvalid);
  }

  return (
    <form
      className={formClasses.join(' ')}
      onSubmit={(e) => props.onSubmit(value, e)}
    >
      <label htmlFor="searchInput" style={{ width: '0.1px', opacity: '0' }}>
        Search
      </label>
      <input
        id="searchInput"
        className={classes.Input}
        type="text"
        placeholder="Your Location..."
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" aria-label="Search" title="Search">
        <SearchIcon className={classes.Icon} />
      </Button>
      {props.error !== null ? (
        <span className={classes.Error}>{props.error}</span>
      ) : null}
    </form>
  );
});

export default LocationForm;

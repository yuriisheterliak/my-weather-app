import React, { memo } from 'react';

import classes from './TempSwitcher.module.scss';
import useFocusIndicator from '../../../hooks/useFocusIndicator';

const TempSwitcher = memo((props) => {
  const shadowOnFocusClass = useFocusIndicator(true);

  const handleOnChange = (e) => {
    e.target.checked ? props.setUnits('fahrenheit') : props.setUnits('celsius');
  };

  return (
    <label className={[classes.Switcher, shadowOnFocusClass].join(' ')}>
      <input type="checkbox" onChange={handleOnChange} />
      <span className={classes.Slider}>
        <span>°C</span>
        <span>°F</span>
      </span>
    </label>
  );
});

export default TempSwitcher;

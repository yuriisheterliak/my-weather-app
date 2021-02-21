import React, { memo } from 'react';

import classes from './TempSwitcher.module.scss';

const TempSwitcher = memo((props) => (
  <label className={classes.Switcher}>
    <input type="checkbox" onChange={(e) => props.onChange(e)} />
    <span className={classes.Slider}>
      <span>°C</span>
      <span>°F</span>
    </span>
  </label>
));

export default TempSwitcher;

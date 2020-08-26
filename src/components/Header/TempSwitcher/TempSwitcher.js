import React from 'react';

import classes from './TempSwitcher.module.scss';

const TempSwitcher = (props) => (
  <label className={classes.Switcher}>
    <input type="checkbox" onChange={(e) => props.onChangeHandler(e)}/>
    <span className={classes.Slider}>
      <span>°C</span>
      <span>°F</span>
    </span>
  </label>
);

export default TempSwitcher;

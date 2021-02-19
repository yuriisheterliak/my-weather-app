import React from 'react';

import classes from './Hour.module.scss';
import WeatherIcon from '../../common/WeatherIcon/WeatherIcon';

const Hour = (props) => {
  let hourClasses = [classes.Hour];
  let activeLabel = null;

  if (props.active) {
    hourClasses.push(classes.Active);
    activeLabel = <span className={classes.ActiveLabel}>Now</span>;
  }

  return (
    <li className={hourClasses.join(' ')}>
      <span className={classes.Time}>
        {activeLabel}
        {props.time}
      </span>
      <WeatherIcon weatherID={props.weatherID} className={classes.Icon} />
      <span className={classes.Description}>{props.desc}</span>
      <span>{props.temp}°</span>
    </li>
  );
};

export default Hour;

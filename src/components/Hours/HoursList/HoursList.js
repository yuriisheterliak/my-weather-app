import React, { memo } from 'react';

import {
  capitalizeFirstLetters,
  getFormattedTime,
  isCurrentHour,
  toFahrenheit,
} from '../../../shared/utilities';
import classes from './HoursList.module.scss';
import Hour from './Hour/Hour';
import Spinner from '../../common/Spinner/Spinner';

const HoursList = memo((props) => {
  let hoursList, hoursData, timezone;
  if (props.weather) {
    hoursData = props.weather.hourlyWeather;
    timezone = props.weather.timezone;
  }

  if (props.isLoading) {
    hoursList = (
      <div className={classes.Error}>
        <Spinner big />
      </div>
    );
  } else if (hoursData && hoursData.length) {
    hoursList = hoursData.map((hour, index) => {
      const time = getFormattedTime(hour.dt, props.timeFormat, timezone);
      const desc = capitalizeFirstLetters(hour.desc);
      let temp = Math.round(hour.temp);
      if (props.units === 'fahrenheit') {
        temp = Math.round(toFahrenheit(hour.temp));
      }

      return (
        <Hour
          key={index}
          time={time}
          temp={temp}
          weatherID={hour.id}
          desc={desc}
          active={isCurrentHour(hour.dt)}
        />
      );
    });
  } else hoursList = <li className={classes.NoInfo}>No information</li>;

  return <ul>{hoursList}</ul>;
});

export default HoursList;

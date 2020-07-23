import React from 'react';

import classes from './Day.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import WeatherIcon from '../../UI/WeatherIcon/WeatherIcon';

const Day = (props) => {
  let dayClasses = [classes.Day, 'keen-slider__slide'];

  if (props.isActive) dayClasses.push(classes.Active);

  let dayComponent = (
    <div className={dayClasses.join(' ')}>
      <Spinner big />
    </div>
  );

  if (props.isLoaded) {
    dayComponent = (
      <div className={dayClasses.join(' ')}>
        {props.isToday === true ? (
          <span className={classes.TodayLabel}>Today</span>
        ) : null}
        <span className={classes.DayName}>{props.dayName}</span>
        <WeatherIcon id={props.id} className={classes.Icon} />
        <span className={classes.Temperature}>{props.temperature}°</span>
        <span className={classes.Weather}>{props.weather}</span>
      </div>
    );
  }

  return dayComponent;
};

export default Day;

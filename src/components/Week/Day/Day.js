import React from 'react';

import classes from './Day.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import WeatherIcon from '../../UI/WeatherIcon/WeatherIcon';

const Day = (props) => {
  let dayClasses = [classes.Day, 'keen-slider__slide'];
  if (props.isActive) dayClasses.push(classes.Active);

  let dayComponent = (
    <div
      className={dayClasses.join(' ')}
      onClick={(e) => props.onClick(props.index, e)}
      onMouseDown={(e) => props.onMouseDown(e)}
    >
      {props.isToday === true ? (
        <span className={classes.TodayLabel}>Today</span>
      ) : null}
      <span className={classes.DayName}>{props.dayName}</span>
      <WeatherIcon weatherID={props.weatherID} className={classes.Icon} />
      <span className={classes.Temperature}>{props.temp}°</span>
      <span className={classes.Description}>{props.desc}</span>
    </div>
  );

  if (props.isLoading) {
    dayComponent = (
      <div className={dayClasses.join(' ')}>
        <Spinner big />
      </div>
    );
  }

  return dayComponent;
};

export default Day;

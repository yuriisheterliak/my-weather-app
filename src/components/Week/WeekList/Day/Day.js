import React, { memo } from 'react';

import classes from './Day.module.scss';
import Spinner from '../../../common/Spinner/Spinner';
import WeatherIcon from '../../../common/WeatherIcon/WeatherIcon';

const Day = memo((props) => {
  const dayClasses = [classes.Day, 'keen-slider__slide'];
  if (props.isActive) dayClasses.push(classes.Active);

  return (
    <>
      {props.isLoading ? (
        <div className={dayClasses.join(' ')}>
          <Spinner big />
        </div>
      ) : (
        <div
          className={dayClasses.join(' ')}
          onClick={(e) => props.handleOnClick(e, props.index)}
          onMouseDown={props.handleOnMouseDown}
        >
          {props.isToday === true ? (
            <span className={classes.TodayLabel}>Today</span>
          ) : null}
          <span className={classes.DayName}>{props.dayName}</span>
          <WeatherIcon weatherID={props.weatherID} className={classes.Icon} />
          <span className={classes.Temperature}>{props.temp}°</span>
          <span className={classes.Description}>{props.desc}</span>
        </div>
      )}
    </>
  );
});

export default Day;

import React, { memo } from 'react';

import classes from './Day.module.scss';
import useFocusIndicator from '../../../../hooks/useFocusIndicator';
import Spinner from '../../../common/Spinner/Spinner';
import WeatherIcon from '../../../common/WeatherIcon/WeatherIcon';

const Day = memo((props) => {
  const outlineOnFocusClass = useFocusIndicator();
  const dayClasses = [classes.Day, outlineOnFocusClass, 'keen-slider__slide'];
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
          onKeyDown={(e) => props.handleOnKeyDown(e, props.index)}
          onMouseDown={props.handleOnMouseDown}
          tabIndex="0"
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

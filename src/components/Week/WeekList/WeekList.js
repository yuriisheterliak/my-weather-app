import React, { memo } from 'react';

import {
  capitalizeFirstLetters,
  getDayName,
  toFahrenheit,
} from '../../../shared/utilities';
import Day from './Day/Day';

const WeekList = memo((props) => {
  let weekList = [];

  if (!props.weather || props.isLoading) {
    for (let i = 0; i < 7; i++) {
      weekList.push(<Day key={i} isLoading />);
    }
  } else {
    weekList = props.weather.map((day, index) => {
      const dayName = getDayName(day.dt);
      const desc = capitalizeFirstLetters(day.desc);
      let temp = Math.round(day.temp);
      if (props.units === 'fahrenheit') {
        temp = Math.round(toFahrenheit(day.temp));
      }

      return (
        <Day
          key={index}
          index={index}
          dayName={dayName}
          temp={temp}
          desc={desc}
          weatherID={day.id}
          isToday={index === 0}
          isActive={index === props.activeDay}
          onClick={props.changeActiveDay}
          onMouseDown={props.saveSliderMouseDownClientX}
        />
      );
    });
  }

  return weekList;
});

export default WeekList;

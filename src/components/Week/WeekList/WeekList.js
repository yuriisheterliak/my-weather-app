import React, { memo, useState } from 'react';

import {
  capitalizeFirstLetters,
  getDayName,
  toFahrenheit,
} from '../../../utils/utilities';
import Day from './Day/Day';

const WeekList = memo((props) => {
  const [sliderMouseDownClientX, setSliderMouseDownClientX] = useState(null);
  let weekList = [];

  const handleOnMouseDown = (e) => setSliderMouseDownClientX(e.clientX);
  const handleOnClick = (e, index) => {
    if (sliderMouseDownClientX === e.clientX) {
      props.setActiveDay(index);
    }
  };
  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      props.setActiveDay(index);
    }
  };

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
          handleOnClick={handleOnClick}
          handleOnMouseDown={handleOnMouseDown}
          handleOnKeyDown={handleOnKeyDown}
        />
      );
    });
  }

  return weekList;
});

export default WeekList;

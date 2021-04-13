import { memo, useState } from 'react';

import {
  capitalizeFirstLetters,
  getDayName,
  isToday,
  toFahrenheit,
} from '../../../utils/utilities';
import Day from './Day/Day';
import classes from './WeekList.module.scss';

const WeekList = memo(
  ({ weather, isLoading, activeDay, setActiveDay, units }) => {
    const [sliderMouseDownClientX, setSliderMouseDownClientX] = useState(null);
    let weekList = [];

    const handleOnMouseDown = (e) => setSliderMouseDownClientX(e.clientX);
    const handleOnClick = (e, index) => {
      if (sliderMouseDownClientX === e.clientX) setActiveDay(index);
    };
    const handleOnKeyDown = (e, index) => {
      if (e.key === 'Enter') setActiveDay(index);
    };

    if (isLoading) {
      for (let i = 0; i < 7; i++) {
        weekList.push(<Day key={i} isLoading />);
      }
    } else if (!weather) {
      weekList = <div className={classes.NoInfo}>No information</div>;
    } else {
      weekList = weather.map((day, index) => {
        const dayName = getDayName(day.dt);
        const desc = capitalizeFirstLetters(day.desc);
        let temp = Math.round(day.temp);
        if (units === 'fahrenheit') temp = Math.round(toFahrenheit(day.temp));

        return (
          <Day
            key={index}
            index={index}
            dayName={dayName}
            temp={temp}
            desc={desc}
            weatherID={day.id}
            isToday={isToday(day.dt)}
            isActive={index === activeDay}
            handleOnClick={handleOnClick}
            handleOnMouseDown={handleOnMouseDown}
            handleOnKeyDown={handleOnKeyDown}
          />
        );
      });
    }

    return weekList;
  }
);

export default WeekList;

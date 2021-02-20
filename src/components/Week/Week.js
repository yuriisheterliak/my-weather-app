import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

import classes from './Week.module.scss';
import Day from './Day/Day';
import {
  toFahrenheit,
  capitalizeFirstLetters,
  getDayName,
} from '../../shared/utilities';

const Week = (props) => {
  const [sliderRef] = useKeenSlider({
    mode: 'free',
    slidesPerView: 2,
    breakpoints: {
      '(min-width: 400px)': {
        slidesPerView: 2.4,
      },
      '(min-width: 500px)': {
        slidesPerView: 3,
      },
      '(min-width: 650px)': {
        slidesPerView: 4,
      },
      '(min-width: 800px)': {
        slidesPerView: 5,
      },
    },
  });

  const weekClasses = [classes.Week, 'keen-slider'];

  let days = [];

  if (props.weather === null || props.isLoading) {
    for (let i = 0; i < 7; i++) {
      days.push(<Day key={i} isLoading />);
    }
  } else {
    days = props.weather.map((day, index) => {
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

  return (
    <div className={weekClasses.join(' ')} ref={sliderRef}>
      {days}
    </div>
  );
};

export default Week;

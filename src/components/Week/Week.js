import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

import classes from './Week.module.scss';
import Day from './Day/Day';
import { capitalizeFirstLetters, getDayName } from '../../shared/utility';

const Week = (props) => {
  const [sliderRef] = useKeenSlider({
    mode: 'free',
    slidesPerView: 1.8,
    breakpoints: {
      '(min-width: 400px)': {
        slidesPerView: 2.4,
      },
      '(min-width: 500px)': {
        slidesPerView: 3,
      },
      '(min-width: 700px)': {
        slidesPerView: 4,
      },
      '(min-width: 900px)': {
        slidesPerView: 5,
      },
    },
  });

  const weekClasses = [classes.Week, 'keen-slider'];

  let days = [];

  if (props.weather === null) {
    for (let i = 0; i < 7; i++) {
      days.push(<Day key={i} noData />);
    }
  } else {
    days = props.weather.map((day, index) => {
      const dayName = getDayName(new Date(day.dt * 1000));
      const temp = Math.round(day.temp);
      const desc = capitalizeFirstLetters(day.desc);

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
          onClick={props.handleActiveDayChange}
          onMouseDown={props.handleOnMouseDown}
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

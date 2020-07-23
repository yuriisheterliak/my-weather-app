import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

import classes from './Week.module.scss';
import Day from './Day/Day';
import { capitalizeFirstLetters, getDayName } from '../../shared/utility';

const Week = (props) => {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 2,
    breakpoints: {
      '(min-width: 460px)': {
        slidesPerView: 3,
      },
      '(min-width: 700px)': {
        slidesPerView: 4,
      },
      '(min-width: 800px)': {
        slidesPerView: 5,
      },
    },
  });
  const weekClasses = [classes.Week, 'keen-slider'];

  let days = [];

  if (props.weather === null) {
    for (let i = 0; i < 7; i++) {
      days.push(<Day key={i} />);
    }
  } else {
    props.weather.forEach((day, index) => {
      const dayName = getDayName(new Date(day.dt * 1000));
      const temp = Math.round(day.temp);
      const desc = capitalizeFirstLetters(day.desc);

      days.push(
        <Day
          key={index}
          dayName={dayName}
          temperature={temp}
          weather={desc}
          id={day.id}
          isToday={index === 0}
          isActive={index === 0}
          isLoaded
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

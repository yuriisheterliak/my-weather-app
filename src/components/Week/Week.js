import React, { memo } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import classes from './Week.module.scss';
import WeekList from './WeekList/WeekList';

const keenSliderOptions = {
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
};

const Week = memo((props) => {
  const [sliderRef] = useKeenSlider(keenSliderOptions);
  const weekClasses = [classes.Week, 'keen-slider'];

  return (
    <div className={weekClasses.join(' ')} ref={sliderRef}>
      <WeekList
        weather={props.weather}
        activeDay={props.activeDay}
        units={props.units}
        isLoading={props.isLoading}
        setActiveDay={props.setActiveDay}
      />
    </div>
  );
});

export default Week;

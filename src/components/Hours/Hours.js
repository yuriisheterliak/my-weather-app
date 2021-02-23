import React, { useState, memo, useMemo } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import classes from './Hours.module.scss';
import {
  toFahrenheit,
  capitalizeFirstLetters,
  isCurrentHour,
  getFormattedTime,
} from '../../shared/utilities';
import Hour from './Hour/Hour';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';
import Spinner from '../common/Spinner/Spinner';

const tabsData = [
  { name: '24-h', params: 'h23', description: '24-hour format' },
  { name: '12-h', params: 'h12', description: '12-hour format' },
];

const Hours = memo((props) => {
  const [timeFormat, setTimeFormat] = useState('h23');

  let hoursData, timezone;
  if (props.weather) {
    hoursData = props.weather[props.activeDay].hourlyWeather;
    timezone = props.weather[props.activeDay].timezone;
  }

  let hours = <li className={classes.NoInfo}>No information</li>;

  if (hoursData && hoursData.length) {
    hours = hoursData.map((hour, index) => {
      const time = getFormattedTime(hour.dt, timeFormat, timezone);
      const desc = capitalizeFirstLetters(hour.desc);
      let temp = Math.round(hour.temp);
      if (props.units === 'fahrenheit') {
        temp = Math.round(toFahrenheit(hour.temp));
      }

      return (
        <Hour
          key={index}
          time={time}
          temp={temp}
          weatherID={hour.id}
          desc={desc}
          active={isCurrentHour(hour.dt)}
        />
      );
    });
  }

  if (props.isLoading) {
    hours = (
      <div className={classes.Error}>
        <Spinner big />
      </div>
    );
  }

  const tabs = useMemo(
    () =>
      tabsData.map((tabData, index) => (
        <Tab
          onClick={setTimeFormat}
          handlerParams={tabData.params}
          active={timeFormat === tabData.params}
          title={tabData.description}
          key={index}
        >
          {tabData.name}
        </Tab>
      )),
    [timeFormat]
  );

  return (
    <div className={classes.Hours}>
      <BlockHeader>{tabs}</BlockHeader>
      <SimpleBar className={classes.List} timeout="200">
        <ul>{hours}</ul>
      </SimpleBar>
    </div>
  );
});

export default Hours;

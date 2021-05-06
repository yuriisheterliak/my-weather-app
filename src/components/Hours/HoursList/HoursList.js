import { memo, useContext } from 'react';

import {
  capitalizeFirstLetters,
  getFormattedTime,
  isCurrentHour,
  toFahrenheit,
} from '../../../utils/utilities';
import classes from './HoursList.module.scss';
import Hour from './Hour/Hour';
import Spinner from '../../common/Spinner/Spinner';
import { WeatherIsLoadingContext } from '../../App/App';

const HoursList = memo(({ weather, timeFormat, units }) => {
  const isLoading = useContext(WeatherIsLoadingContext);
  let hoursList, hoursData, timezone;

  if (weather) {
    hoursData = weather.hourlyWeather;
    timezone = weather.timezone;
  }

  if (isLoading) {
    hoursList = (
      <div className={classes.Error}>
        <Spinner big />
      </div>
    );
  } else if (hoursData && hoursData.length) {
    hoursList = hoursData.map((hour, index) => {
      const time = getFormattedTime(hour.dt, timeFormat, timezone);
      const desc = capitalizeFirstLetters(hour.desc);
      let temp = Math.round(hour.temp);
      if (units === 'fahrenheit') temp = Math.round(toFahrenheit(hour.temp));

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
  } else hoursList = <li className={classes.NoInfo}>No information</li>;

  return <ul tabIndex="0">{hoursList}</ul>;
});

export default HoursList;

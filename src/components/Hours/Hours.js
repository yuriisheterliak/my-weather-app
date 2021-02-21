import React, { PureComponent } from 'react';
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

class Hours extends PureComponent {
  state = {
    timeFormat: 'h23',
  };

  changeTimeFormat = (timeFormat) => {
    this.setState({ timeFormat: timeFormat });
  };

  tabs = [
    <Tab
      onClick={this.changeTimeFormat}
      handlerParams="h23"
      active={this.state.timeFormat === 'h23'}
      title="24-hour format"
      key="h23"
    >
      24-h
    </Tab>,
    <Tab
      onClick={this.changeTimeFormat}
      handlerParams="h12"
      active={this.state.timeFormat === 'h12'}
      title="12-hour format"
      key="h12"
    >
      12-h
    </Tab>,
  ];

  render() {
    let hoursData, timezone;
    if (this.props.weather) {
      hoursData = this.props.weather[this.props.activeDay].hourlyWeather;
      timezone = this.props.weather[this.props.activeDay].timezone;
    }

    let hours = <li className={classes.NoInfo}>No information</li>;

    if (hoursData && hoursData.length) {
      hours = hoursData.map((hour, index) => {
        const time = getFormattedTime(hour.dt, this.state.timeFormat, timezone);
        const desc = capitalizeFirstLetters(hour.desc);
        let temp = Math.round(hour.temp);
        if (this.props.units === 'fahrenheit') {
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

    if (this.props.isLoading) {
      hours = (
        <div className={classes.Error}>
          <Spinner big />
        </div>
      );
    }

    return (
      <div className={classes.Hours}>
        <BlockHeader>{this.tabs}</BlockHeader>
        <SimpleBar className={classes.List} timeout="200">
          <ul>{hours}</ul>
        </SimpleBar>
      </div>
    );
  }
}

export default Hours;

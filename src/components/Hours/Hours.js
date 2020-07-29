import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import classes from './Hours.module.scss';
import { capitalizeFirstLetters, isCurrentHour } from '../../shared/utility';
import Hour from './Hour/Hour';
import BlockHeader from '../UI/BlockHeader/BlockHeader';
import Tab from '../UI/Tab/Tab';

class Hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeFormat: 'h23',
    };
  }

  changeTimeFormat = (timeFormat) => {
    this.setState({ timeFormat: timeFormat });
  };

  render() {
    let hoursData, timezone;
    if (this.props.weather) {
      hoursData = this.props.weather[this.props.activeDay].hoursWeather;
      timezone = this.props.weather[this.props.activeDay].timezone;
    }

    let hours = <li className={classes.NoInfo}>No information</li>;

    if (hoursData && hoursData.length) {
      hours = hoursData.map((hour, index) => {
        const date = new Date(hour.dt * 1000);
        const time = date.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hourCycle: this.state.timeFormat,
          timeZone: timezone,
        });

        let active = false;
        if (isCurrentHour(date)) active = true;

        const temp = Math.round(hour.temp);
        const desc = capitalizeFirstLetters(hour.desc);

        return (
          <Hour
            key={index}
            time={time}
            temp={temp}
            weatherID={hour.id}
            desc={desc}
            active={active}
          />
        );
      });
    }

    return (
      <div className={classes.Hours}>
        <BlockHeader>
          <Tab
            onClick={this.changeTimeFormat}
            timeFormat="h23"
            active={this.state.timeFormat === 'h23'}
            title="24-hour format"
          >
            24-h
          </Tab>
          <Tab
            onClick={this.changeTimeFormat}
            timeFormat="h12"
            active={this.state.timeFormat === 'h12'}
            title="12-hour format"
          >
            12-h
          </Tab>
        </BlockHeader>
        <SimpleBar className={classes.List} timeout="200">
          <ul>{hours}</ul>
        </SimpleBar>
      </div>
    );
  }
}

export default Hours;

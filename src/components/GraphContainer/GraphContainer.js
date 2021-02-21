import React, { PureComponent } from 'react';

import classes from './GraphContainer.module.scss';
import { getFormattedTime } from '../../shared/utilities';
import { tabsData, precAndHumData, pressureData, windSpeedData } from './data';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';
import Graph from './Graph/Graph';
import Spinner from '../common/Spinner/Spinner';

class GraphContainer extends PureComponent {
  state = {
    activeTab: 'Prec&Hum',
  };

  changeTab = (tabName) => this.setState({ activeTab: tabName });

  render() {
    let graph, hoursData, timezone, graphData, commonData;

    if (this.props.weather) {
      hoursData = this.props.weather[this.props.activeDay].hourlyWeather;
      timezone = this.props.weather[this.props.activeDay].timezone;

      graphData = hoursData.map((hour) => {
        return {
          name: getFormattedTime(hour.dt, 'h23', timezone),
          precipitation: parseInt(hour.precipitation * 100),
          humidity: hour.humidity,
          pressure: hour.pressure,
          windSpeed: hour.windSpeed,
        };
      });
    }

    if (this.state.activeTab === 'Prec&Hum') {
      commonData = precAndHumData;
    } else if (this.state.activeTab === 'Pressure') {
      commonData = pressureData;
    } else if (this.state.activeTab === 'Wind Speed') {
      commonData = windSpeedData;
    }

    if (graphData && graphData.length) {
      graph = <Graph graphData={graphData} commonData={commonData} />;
    } else graph = <div className={classes.NoInfo}>No information</div>;

    if (this.props.isLoading) {
      graph = (
        <div className={classes.Error}>
          <Spinner big />
        </div>
      );
    }

    return (
      <div className={classes.GraphContainer}>
        <BlockHeader>
          {tabsData.map((tabData, index) => (
            <Tab
              onClick={this.changeTab}
              handlerParams={[tabData.name]}
              active={this.state.activeTab === tabData.name}
              title={tabData.description}
              key={index}
            >
              {tabData.name}
            </Tab>
          ))}
        </BlockHeader>
        {graph}
      </div>
    );
  }
}

export default GraphContainer;

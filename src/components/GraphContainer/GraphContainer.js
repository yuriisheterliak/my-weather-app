import React, { useState, memo } from 'react';

import classes from './GraphContainer.module.scss';
import { getFormattedTime } from '../../shared/utilities';
import { tabsData, precAndHumData, pressureData, windSpeedData } from './data';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';
import Graph from './Graph/Graph';
import Spinner from '../common/Spinner/Spinner';

const GraphContainer = memo((props) => {
  const [activeTab, setActiveTab] = useState('Prec&Hum');

  let graph, hoursData, timezone, graphData, commonData;

  if (props.weather) {
    hoursData = props.weather[props.activeDay].hourlyWeather;
    timezone = props.weather[props.activeDay].timezone;

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

  if (activeTab === 'Prec&Hum') {
    commonData = precAndHumData;
  } else if (activeTab === 'Pressure') {
    commonData = pressureData;
  } else if (activeTab === 'Wind Speed') {
    commonData = windSpeedData;
  }

  if (graphData && graphData.length) {
    graph = <Graph graphData={graphData} commonData={commonData} />;
  } else graph = <div className={classes.NoInfo}>No information</div>;

  if (props.isLoading) {
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
            onClick={setActiveTab}
            handlerParams={tabData.name}
            active={activeTab === tabData.name}
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
});

export default GraphContainer;

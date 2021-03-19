import React, { memo } from 'react';

import classes from './GraphContainer.module.scss';
import { getFormattedTime } from '../../utils/utilities';
import useGraphConfig from './hooks/useGraphConfig';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';
import Graph from './Graph/Graph';
import Spinner from '../common/Spinner/Spinner';

const tabsConfig = [
  { name: 'Prec&Hum', title: 'Precipitation and Humidity' },
  { name: 'Pressure', title: 'Pressure' },
  { name: 'Wind Speed', title: 'Wind Speed' },
];

const GraphContainer = memo(({ weather, isLoading }) => {
  const { graphConfig, setGraphConfig, activeTabName } = useGraphConfig();

  let graphData;

  if (weather) {
    const hoursData = weather.hourlyWeather;
    const timezone = weather.timezone;

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

  let graph;

  if (isLoading) {
    graph = (
      <div className={classes.Error}>
        <Spinner big />
      </div>
    );
  } else if (graphData && graphData.length) {
    graph = (
      <Graph
        graphData={graphData}
        graphConfig={graphConfig}
        activeTabName={activeTabName}
      />
    );
  } else graph = <div className={classes.NoInfo}>No information</div>;

  const tabs = tabsConfig.map((tabConfig, index) => (
    <Tab
      onClick={setGraphConfig}
      handlerParams={tabConfig.name}
      active={activeTabName === tabConfig.name}
      title={tabConfig.title}
      key={index}
    >
      {tabConfig.name}
    </Tab>
  ));

  return (
    <div className={classes.GraphContainer}>
      <BlockHeader>{tabs}</BlockHeader>
      {graph}
    </div>
  );
});

export default GraphContainer;

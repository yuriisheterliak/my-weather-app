import React, { useState, memo, useMemo } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import classes from './Hours.module.scss';
import HoursList from './HoursList/HoursList';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';

const tabsData = [
  { name: '24-h', params: 'h23', description: '24-hour format' },
  { name: '12-h', params: 'h12', description: '12-hour format' },
];

const Hours = memo((props) => {
  const [timeFormat, setTimeFormat] = useState('h23');

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
        <HoursList
          weather={props.weather}
          activeDay={props.activeDay}
          units={props.units}
          timeFormat={timeFormat}
          isLoading={props.isLoading}
        />
      </SimpleBar>
    </div>
  );
});

export default Hours;

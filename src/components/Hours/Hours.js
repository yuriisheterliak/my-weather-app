import { useState, memo, useMemo } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import classes from './Hours.module.scss';
import HoursList from './HoursList/HoursList';
import BlockHeader from '../common/BlockHeader/BlockHeader';
import Tab from '../common/Tab/Tab';

const tabsConfig = [
  { name: '24-h', timeFormat: 'h23', title: '24-hour format' },
  { name: '12-h', timeFormat: 'h12', title: '12-hour format' },
];

const Hours = memo((props) => {
  const [timeFormat, setTimeFormat] = useState('h23');

  const tabs = useMemo(
    () =>
      tabsConfig.map((tabConfig, index) => (
        <Tab
          onClick={setTimeFormat}
          handlerParams={tabConfig.timeFormat}
          active={timeFormat === tabConfig.timeFormat}
          title={tabConfig.title}
          key={index}
        >
          {tabConfig.name}
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
          units={props.units}
          timeFormat={timeFormat}
          isLoading={props.isLoading}
        />
      </SimpleBar>
    </div>
  );
});

export default Hours;

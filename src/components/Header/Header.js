import React, { memo } from 'react';

import classes from './Header.module.scss';
import LocationForm from './LocationForm/LocationForm';
import TitleAndLocation from './TitleAndLocation/TitleAndLocation';
import TempSwitcher from './TempSwitcher/TempSwitcher';

const Header = memo((props) => (
  <div className={classes.Header}>
    <TitleAndLocation
      location={props.location}
      country={props.country}
      isLoading={props.isLoading}
    />
    <TempSwitcher setUnits={props.setUnits} />
    <LocationForm
      inputValue={props.inputValue}
      setInputValue={props.setInputValue}
      handleLocationSubmit={props.handleLocationSubmit}
      offline={props.offline}
      error={props.error}
    />
  </div>
));

export default Header;

import React from 'react';

import classes from './Header.module.scss';
import LocationInput from './LocationInput/LocationInput';
import TitleAndLocation from './TitleAndLocation/TitleAndLocation';
import TempSwitcher from './TempSwitcher/TempSwitcher';

const Header = (props) => (
  <div className={classes.Header}>
    <TitleAndLocation location={props.location} isLoading={props.isLoading} />
    <TempSwitcher onChange={props.handleTempSwitching} />
    <LocationInput
      onSubmit={props.handleLocationSubmit}
      error={props.error}
    />
  </div>
);

export default Header;

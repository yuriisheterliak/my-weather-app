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
    <TempSwitcher onChange={props.handleTempSwitching} />
    <LocationForm
      formRef={props.formRef}
      onSubmit={props.handleLocationSubmit}
      error={props.error}
    />
  </div>
));

export default Header;

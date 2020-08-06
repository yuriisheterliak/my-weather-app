import React from 'react';

import classes from './Header.module.scss';
import LocationInput from './LocationInput/LocationInput';
import TitleAndLocation from './TitleAndLocation/TitleAndLocation';

const Header = (props) => (
  <div className={classes.Header}>
    <TitleAndLocation location={props.location} />
    <LocationInput
      onSubmitHandler={props.onSubmitHandler}
      error={props.error}
    />
  </div>
);

export default Header;

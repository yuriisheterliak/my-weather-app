import React from 'react';

import classes from './TitleAndLocation.module.css';
import { ReactComponent as LocationIcon } from '../../../assets/images/location.svg';
import Spinner from '../../UI/Spinner/Spinner';

const TitleAndLocation = (props) => {
  const location = props.location.location ? (
    <div className={classes.LocationContainer}>
      <LocationIcon className={classes.Icon} />
      <span>
        {props.location.location}, {props.location.country}
      </span>
    </div>
  ) : (
    <div className={classes.LocationContainer}>
      <Spinner small/>
    </div>
  );

  return (
    <div>
      <h1 className={classes.Title}>My Weather App</h1>
      {location}
    </div>
  );
};

export default TitleAndLocation;

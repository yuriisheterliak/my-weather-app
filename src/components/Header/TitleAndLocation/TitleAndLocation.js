import React, { memo } from 'react';

import classes from './TitleAndLocation.module.scss';
import { ReactComponent as LocationIcon } from '../../../assets/images/location.svg';
import Spinner from '../../common/Spinner/Spinner';

const TitleAndLocation = memo((props) => {
  const locationText =
    props.location || props.country
      ? `${props.location}, ${props.country}`
      : 'Location not found!';

  let location = (
    <div className={classes.LocationContainer}>
      <LocationIcon className={classes.Icon} />
      <span>{locationText}</span>
    </div>
  );

  if (props.isLoading) {
    location = (
      <div className={classes.LocationContainer}>
        <Spinner small />
      </div>
    );
  }

  return (
    <div>
      <h1 className={classes.Title}>My Weather App</h1>
      {location}
    </div>
  );
});

export default TitleAndLocation;

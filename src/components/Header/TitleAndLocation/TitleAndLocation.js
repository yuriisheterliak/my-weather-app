import { memo } from 'react';

import classes from './TitleAndLocation.module.scss';
import { ReactComponent as LocationIcon } from '../../../assets/images/location.svg';
import Spinner from '../../common/Spinner/Spinner';

const TitleAndLocation = memo(({ location, country, isLoading }) => {
  const locationText =
    location || country ? `${location}, ${country}` : 'Location not found!';

  return (
    <div>
      <h1 className={classes.Title}>My Weather App</h1>
      <div className={classes.LocationContainer}>
        {isLoading ? (
          <div className={classes.LocationContainer}>
            <Spinner small />
          </div>
        ) : (
          <>
            <LocationIcon className={classes.Icon} />
            <span>{locationText}</span>
          </>
        )}
      </div>
    </div>
  );
});

export default TitleAndLocation;

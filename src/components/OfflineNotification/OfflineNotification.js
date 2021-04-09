import React from 'react';

import { ReactComponent as NoWifiIcon } from '../../assets/images/no_wifi.svg';
import Button from '../common/Button/Button';
import classes from './OfflineNotification.module.scss';

const OfflineNotification = () => {
  const handleClick = () => window.location.reload();

  return (
    <div className={classes.OfflineNotification}>
      <h2 className={classes.Header}>
        <NoWifiIcon className={classes.NoWifiIcon} />
        <p style={{ marginTop: '5px' }}>It looks like you are offline!</p>
      </h2>
      <p style={{ fontSize: '14px' }}>
        Click the button below to try reloading.
      </p>
      <Button
        attachedClass={classes.ReloadButton}
        useShadow
        ariaLabel="Reload"
        title="Reload"
        onClick={handleClick}
      >
        Reload
      </Button>
    </div>
  );
};

export default OfflineNotification;

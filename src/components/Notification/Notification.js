import { useState } from 'react';

import { ReactComponent as NoWifiIcon } from '../../assets/images/no_wifi.svg';
import { ReactComponent as UpdateIcon } from '../../assets/images/update.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/chrest.svg';
import Button from '../common/Button/Button';
import classes from './Notification.module.scss';

const config = {
  'offline': {
    icon: <NoWifiIcon className={classes.Icon} />,
    message: <p>It looks like you are offline!</p>,
    buttonName: 'Reload',
  },
  'update': {
    icon: <UpdateIcon className={classes.Icon} />,
    message: <p>A new version is available!</p>,
    buttonName: 'Update',
  },
};

const Notification = ({ status, handleClick }) => {
  const [isOpened, setIsOpened] = useState(true);

  const close = () => setIsOpened(false);

  return isOpened ? (
    <div className={classes.Notification}>
      <h2 className={classes.Header}>
        {config[status].icon}
        {config[status].message}
      </h2>
      <Button
        attachedClass={classes.ReloadButton}
        useShadow
        ariaLabel={config[status].buttonName}
        title={config[status].buttonName}
        onClick={() => handleClick(status === 'update')}
      >
        {config[status].buttonName}
      </Button>
      <Button
        attachedClass={classes.CloseButton}
        ariaLabel="Close notification"
        title="Close notification"
        onClick={close}
      >
        <CloseIcon />
      </Button>
    </div>
  ) : null;
};

export default Notification;

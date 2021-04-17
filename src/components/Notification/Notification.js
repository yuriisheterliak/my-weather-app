import { ReactComponent as NoWifiIcon } from '../../assets/images/no_wifi.svg';
import { ReactComponent as UpdateIcon } from '../../assets/images/update.svg';
import Button from '../common/Button/Button';
import classes from './Notification.module.scss';

const Notification = ({ offline, waitingWorker, handleUpdate }) => {
  const icon = offline ? (
    <NoWifiIcon className={classes.Icon} />
  ) : (
    <UpdateIcon className={classes.Icon} />
  );
  const message = offline ? (
    <p>It looks like you are offline!</p>
  ) : (
    <p>A new version is available!</p>
  );
  const buttonName = offline ? 'Reload' : 'Update';

  const handleClick = () => {
    waitingWorker && handleUpdate();
    window.location.reload();
  };

  return (
    <div className={classes.Notification}>
      <h2 className={classes.Header}>
        {icon}
        {message}
      </h2>
      <Button
        attachedClass={classes.Button}
        useShadow
        ariaLabel={buttonName}
        title={buttonName}
        onClick={handleClick}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default Notification;

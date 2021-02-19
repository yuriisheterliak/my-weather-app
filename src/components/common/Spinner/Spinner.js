import React from 'react';

import { ReactComponent as Spinner } from '../../../assets/images/spinner.svg';
import classes from './Spinner.module.scss';

export default (props) => {
  let spinnerClasses = [classes.Spinner];
  if (props.small) spinnerClasses.push(classes.Small);
  if (props.big) spinnerClasses.push(classes.Big);

  return <Spinner className={spinnerClasses.join(' ')} />;
};

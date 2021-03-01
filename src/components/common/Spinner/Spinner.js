import React from 'react';

import { ReactComponent as SpinnerSvg } from '../../../assets/images/spinner.svg';
import classes from './Spinner.module.scss';

const Spinner = (props) => {
  let spinnerClasses = [classes.Spinner];
  if (props.small) spinnerClasses.push(classes.Small);
  if (props.big) spinnerClasses.push(classes.Big);

  return <SpinnerSvg className={spinnerClasses.join(' ')} />;
};

export default Spinner;

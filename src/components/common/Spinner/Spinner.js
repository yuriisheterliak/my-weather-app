import React from 'react';

import { ReactComponent as SpinnerSvg } from '../../../assets/images/spinner.svg';
import classes from './Spinner.module.scss';

const Spinner = ({ small, big }) => {
  const spinnerClasses = [classes.Spinner];
  if (small) spinnerClasses.push(classes.Small);
  if (big) spinnerClasses.push(classes.Big);

  return <SpinnerSvg className={spinnerClasses.join(' ')} />;
};

export default Spinner;

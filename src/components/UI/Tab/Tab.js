import React from 'react';

import classes from './Tab.module.scss';
import withFocusShadow from '../../../hoc/withFocusShadow';

const Tab = (props) => {
  const { extraClass, ...restProps } = props;

  let tabClasses = [classes.Tab, extraClass];
  if (props.active) tabClasses.push(classes.Active);

  return (
    <button
      className={tabClasses.join(' ')}
      onClick={() => props.onClick(...restProps.handlerParams)}
      title={props.title}
    >
      {props.children}
    </button>
  );
};

export default withFocusShadow(Tab);

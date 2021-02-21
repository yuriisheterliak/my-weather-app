import React, { memo } from 'react';

import classes from './Tab.module.scss';
import withFocusShadow from '../../../hoc/withFocusShadow';

const Tab = memo((props) => {
  let tabClasses = [classes.Tab, props.extraClass];
  if (props.active) tabClasses.push(classes.Active);

  return (
    <button
      className={tabClasses.join(' ')}
      onClick={() => props.onClick(props.handlerParams)}
      title={props.title}
    >
      {props.children}
    </button>
  );
});

export default withFocusShadow(Tab);

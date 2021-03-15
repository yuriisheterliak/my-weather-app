import React, { memo } from 'react';

import classes from './Tab.module.scss';
import useShadowOnFocus from '../../../hooks/useShadowOnFocus';

const Tab = memo((props) => {
  const extraClass = useShadowOnFocus();
  const tabClasses = [classes.Tab, extraClass];
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

export default Tab;

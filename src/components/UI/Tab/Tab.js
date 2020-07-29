import React from 'react';

import classes from './Tab.module.scss';

const Tab = (props) => {
  let tabClasses = [classes.Tab];
  if (props.active) tabClasses.push(classes.Active);

  return (
    <button
      className={tabClasses.join(' ')}
      onClick={() => props.onClick(props.timeFormat)}
      title={props.title}
    >
      {props.children}
    </button>
  );
};

export default Tab;

import { memo } from 'react';

import classes from './Tab.module.scss';
import useFocusIndicator from '../../../hooks/useFocusIndicator';

const Tab = memo((props) => {
  const outlineOnFocusClass = useFocusIndicator();
  const tabClasses = [classes.Tab, outlineOnFocusClass];
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

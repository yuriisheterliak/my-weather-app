import React, { memo } from 'react';

import withFocusShadow from '../../../hoc/withFocusShadow';

const Button = memo((props) => {
  const { extraClass, ...restProps } = props;

  return (
    <button className={extraClass} {...restProps}>
      {props.children}
    </button>
  );
});

export default withFocusShadow(Button);

import React, { memo } from 'react';

import useShadowOnFocus from '../../../hooks/useShadowOnFocus';

const Button = memo((props) => {
  const extraClass = useShadowOnFocus();

  return (
    <button
      className={extraClass}
      aria-label={props.ariaLabel}
      title={props.title}
    >
      {props.children}
    </button>
  );
});

export default Button;

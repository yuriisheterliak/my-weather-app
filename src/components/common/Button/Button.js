import React, { memo } from 'react';

import useShadowOnFocus from '../../../hooks/useShadowOnFocus';

const Button = memo(
  ({ type, attachedClass, ariaLabel, children, ...restProps }) => {
    const extraClass = useShadowOnFocus();

    return (
      <button
        type={type || 'button'}
        className={[attachedClass, extraClass].join(' ')}
        aria-label={ariaLabel}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;

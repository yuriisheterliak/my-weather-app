import React, { memo } from 'react';

import useFocusIndicator from '../../../hooks/useFocusIndicator';

const Button = memo(
  ({ type, attachedClass, useShadow, ariaLabel, children, ...restProps }) => {
    const outlineOnFocusClass = useFocusIndicator(useShadow);

    return (
      <button
        type={type || 'button'}
        className={[attachedClass, outlineOnFocusClass].join(' ')}
        aria-label={ariaLabel}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;

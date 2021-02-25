import React, { useState, useEffect } from 'react';

// Don't forget to add class(props.extraClass) to every wrapped components!

const withFocusShadow = (WrappedComponent) => (props) => {
  const [enableShadow, setEnableShadow] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.keyCode === 9) setEnableShadow(true);
    };
    const handleMouseDown = () => setEnableShadow(false);

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <WrappedComponent
      extraClass={enableShadow ? 'shadow-on-focus' : ''}
      {...props}
    />
  );
};

export default withFocusShadow;

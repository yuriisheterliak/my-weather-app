import { useState, useEffect } from 'react';

const useFocusIndicator = (useShadow = false) => {
  const [extraClass, setExtraClass] = useState('');
  const className = useShadow ? 'shadow-on-focus' : 'outline-on-focus';

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.keyCode === 9) setExtraClass(className);
    };
    const handleMouseDown = () => setExtraClass('');

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [className]);

  return extraClass;
};

export default useFocusIndicator;

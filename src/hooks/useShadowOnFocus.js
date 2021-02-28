import { useState, useEffect } from 'react';

const useShadowOnFocus = () => {
  const [extraClass, setExtraClass] = useState('');

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.keyCode === 9) setExtraClass('shadow-on-focus');
    };
    const handleMouseDown = () => setExtraClass('');

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return extraClass;
};

export default useShadowOnFocus;

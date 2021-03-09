import { useEffect } from 'react';

const useClickOutside = (elementRef, handler, extraCondition = false) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!extraCondition) return;
      if (elementRef.current && !elementRef.current.contains(e.target))
        handler();
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [elementRef, handler, extraCondition]);
};

export default useClickOutside;

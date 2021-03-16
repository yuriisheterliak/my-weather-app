import { useRef, useEffect } from 'react';

function useUpdateEffect(callback, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      callback();
    }
    // eslint-disable-next-line
  }, dependencies);
}

export default useUpdateEffect;

import { useState, useEffect } from 'react';

import { register } from '../../../serviceWorkerRegistration';
import useUpdateEffect from '../../../hooks/useUpdateEffect';

const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    register({
      onUpdate: (registration) => {
        setWaitingWorker(registration.waiting);
      },
    });
  }, []);

  useUpdateEffect(async () => {
    if (!('serviceWorker' in navigator)) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.waiting) {
      setWaitingWorker(registration.waiting);
    }
  });

  return { waitingWorker, setWaitingWorker };
};

export default useServiceWorker;

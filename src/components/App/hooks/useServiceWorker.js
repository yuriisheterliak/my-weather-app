import { useState, useEffect } from 'react';

import * as serviceWorker from '../../../serviceWorkerRegistration';

const useServiceWorker = () => {
  const [update, setUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        setUpdate(true);
        setWaitingWorker(registration.waiting);
      },
    });
  }, []);

  return { update, setUpdate, waitingWorker };
};

export default useServiceWorker;

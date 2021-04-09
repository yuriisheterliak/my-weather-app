/* eslint-disable no-restricted-globals */

import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');

registerRoute(
  fileExtensionRegexp,
  new CacheFirst({
    cacheName: 'other-files',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

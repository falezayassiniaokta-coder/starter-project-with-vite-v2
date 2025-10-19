import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
  })
);

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

self.addEventListener('install', (evt) => {
  console.log('Service Worker: Install');
  evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (evt) => {
  console.log('Service Worker: Activate');
  evt.waitUntil(clients.claim());
});

self.addEventListener('push', (evt) => {
  console.log('Service Worker: Push Received.');
  let payload = {};
  try {
    payload = evt.data ? evt.data.json() : {};
  } catch (err) {
    console.warn('Push event payload tidak valid JSON');
  }

  const notifTitle = payload.title ?? 'Notifikasi Story Baru';
  const notifOptions = payload.options ?? {
    body: 'Ada cerita baru yang menarik untukmu!',
    icon: '/favicon.png',
    badge: '/favicon.png',
  };

  evt.waitUntil(
    self.registration.showNotification(notifTitle, notifOptions)
  );
});
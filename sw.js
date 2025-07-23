const CACHE_NAME = 'static-v2';
const FILES_TO_CACHE = [
  '.', 
  'index.html', 
  'style.css', 
  'app.js', 
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', evt => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(response => response || fetch(evt.request))
  );
});

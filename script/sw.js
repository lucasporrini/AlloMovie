const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js',
  '/fallback.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Fichiers en cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activé');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        })
      }
    )
  );
});
